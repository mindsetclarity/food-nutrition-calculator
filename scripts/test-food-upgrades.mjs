/**
 * Guards portion calories on food pages and the /compare-foods prefill links.
 *
 *   node --experimental-strip-types scripts/test-food-upgrades.mjs
 */
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';

registerHooks({
  resolve(spec, ctx, next) {
    if (spec.startsWith('.') && !/\.[cm]?[jt]s$/.test(spec)) {
      try { return next(spec + '.ts', ctx); } catch {}
    }
    return next(spec, ctx);
  }
});

const { portionRows, formatGrams } = await import('../src/lib/foods/portions.ts');
const { compareToken, compareHref, parseCompareParams, withCompareParams } = await import('../src/lib/compare/compareLink.ts');

// --- portions ---
const banana = {
  nutrientsPer100g: { calories: 89, protein: 1.09, carbohydrates: 22.8, fat: 0.33 },
  servingSizes: [
    { unit: 'piece', label: '1 medium', grams: 118 },
    { unit: 'g', label: '100 g', grams: 100 },
    { unit: 'piece', label: '1 medium', grams: 118 }, // duplicate
    { unit: 'cup', label: '1 cup', grams: 0 },        // unusable weight
  ],
};
assert.deepEqual(portionRows(banana), [
  { label: '1 medium', grams: 118, calories: 105, protein: 1.3 },
  { label: '100 g', grams: 100, calories: 89, protein: 1.1 },
]);

// 100 g row added when missing; null nutrients stay null.
const rows = portionRows({ nutrientsPer100g: { calories: 250, protein: null, carbohydrates: 0, fat: 0 }, servingSizes: [{ unit: 'slice', label: '1 slice', grams: 28 }] });
assert.deepEqual(rows, [
  { label: '1 slice', grams: 28, calories: 70, protein: null },
  { label: '100 g', grams: 100, calories: 250, protein: null },
]);
assert.deepEqual(portionRows({ nutrientsPer100g: { calories: 50, protein: 2, carbohydrates: 0, fat: 0 }, servingSizes: [] }), [
  { label: '100 g', grams: 100, calories: 50, protein: 2 },
]);
// NaN / negative grams never produce a row.
assert.equal(portionRows({ nutrientsPer100g: { calories: 50, protein: 2, carbohydrates: 0, fat: 0 }, servingSizes: [{ unit: 'x', label: 'bad', grams: NaN }, { unit: 'x', label: 'neg', grams: -5 }] }).length, 1);

// Unusable rows are dropped: malformed USDA labels, repeated labels, 0-kcal specks.
const odd = portionRows({
  nutrientsPer100g: { calories: 36, protein: 3, carbohydrates: 0, fat: 0 },
  servingSizes: [
    { unit: 'x', label: '1 grams 1 serving', grams: 1 },
    { unit: 'cup', label: '1 cup', grams: 248 },
    { unit: 'cup', label: '1 Cup', grams: 246 },
    { unit: 'x', label: '1 sprig', grams: 1 },
  ],
});
assert.deepEqual(odd.map(r => r.label), ['1 cup', '100 g']);
// A zero-calorie food (water) still shows its 0 kcal portions.
assert.equal(portionRows({ nutrientsPer100g: { calories: 0, protein: 0, carbohydrates: 0, fat: 0 }, servingSizes: [{ unit: 'cup', label: '1 cup', grams: 237 }] })[0].calories, 0);
assert.equal(formatGrams(28.3495), '28');
assert.equal(formatGrams(4.26), '4.3');

// Every real local food yields sensible rows.
const { localFoods } = await import('../src/data/foods.ts');
for (const food of localFoods) {
  const rows = portionRows(food);
  assert.ok(rows.length > 0, `${food.slug}: no portion rows`);
  assert.equal(new Set(rows.map(r => r.label.toLowerCase())).size, rows.length, `${food.slug}: repeated portion label`);
  for (const r of rows) {
    assert.ok(!/\bgrams?\b/i.test(r.label), `${food.slug}: malformed label ${r.label}`);
    if ((food.nutrientsPer100g.calories ?? 0) > 0) assert.ok(r.calories !== 0, `${food.slug}: ${r.label} shows 0 kcal`);
  }
}

// --- compare links ---
assert.equal(compareToken({ source: 'local', slug: 'banana', id: 'local_0001' }), 'banana');
assert.equal(compareToken({ source: 'usda', slug: 'x', id: 'usda-171705' }), 'usda-171705');
assert.equal(compareToken({ source: 'llm_estimate', slug: 'x', id: 'est-1' }), null);

assert.equal(compareHref(['banana']), '/compare-foods?a=banana');
assert.equal(compareHref(['banana', 'usda-171705']), '/compare-foods?a=banana&b=usda-171705');
assert.equal(compareHref([]), '/compare-foods');

assert.deepEqual(parseCompareParams('?a=banana&b=usda-171705'), [
  { id: 'banana', source: 'local' },
  { id: 'usda-171705', source: 'usda' },
]);
// Bad shapes, extras beyond d, and duplicates are dropped; order a→d kept.
assert.deepEqual(parseCompareParams('?b=apple&a=<script>&c=apple&d=Usda-1&e=pear'), [{ id: 'apple', source: 'local' }]);
assert.deepEqual(parseCompareParams('?a=' + 'x'.repeat(200)), []);
assert.deepEqual(parseCompareParams(''), []);
// Address sync keeps other params and replaces only a–d.
assert.equal(withCompareParams('?utm_source=x&a=old&b=old2', ['banana']), '?utm_source=x&a=banana');
assert.equal(withCompareParams('?a=old', []), '');
assert.equal(withCompareParams('', ['oats', 'usda-9']), '?a=oats&b=usda-9');

// Round trip.
assert.deepEqual(parseCompareParams(compareHref(['oats', 'usda-9']).split('?')[1]).map(t => t.id), ['oats', 'usda-9']);

console.log('food upgrades: ok');
