/**
 * Checks how auto-matched ingredients pick a USDA record.
 *
 *   node --experimental-strip-types scripts/test-resolve-food.mjs
 *
 * The bug this guards: the recipe and meal flows took the top search result even when
 * it could not measure the recipe's unit. "1 cup rolled oats" matched a Foundation
 * record with no cup measure, so the ingredient was silently left out of the totals.
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

const { findMeasurableFood, detailsUrl } = await import('../src/lib/foods/resolveFood.ts');

const food = (name, units) => ({ id: name, name, displayName: name, servingSizes: units.map(([unit, grams]) => ({ unit, label: unit, grams })), nutrientsPer100g: { calories: 100 } });
const foods = {
  1: food('Oats, Foundation', [['serving', 40]]),
  2: food('Oats, raw', [['cup', 80]]),
  3: food('Oats, SR', [['cup', 81]]),
  4: food('Oats, branded', [['cup', 90]]),
};
const fake = (results, broken = []) => {
  const calls = [];
  const getJson = async url => {
    calls.push(url);
    if (url.startsWith('/api/foods/search')) return { results };
    const id = Number(new URL(url, 'http://x').searchParams.get('fdcId'));
    if (broken.includes(id)) throw new Error('network');
    return foods[id] ? { ok: true, food: foods[id] } : { ok: false };
  };
  return { getJson, calls };
};
const usda = ids => ids.map(id => ({ source: 'usda', fdcId: String(id), id: `usda-${id}` }));

// The first record cannot measure cups, so the next one that can is used.
let f = fake(usda([1, 2, 3, 4]));
let r = await findMeasurableFood('rolled oats', 1, 'cup', f.getJson);
assert.equal(r.food.name, 'Oats, raw');
assert.equal(r.error, null);
assert.equal(f.calls.filter(u => u.includes('details')).length, 2, 'stops at the first record that works');
assert.ok(f.calls[0].includes('q=rolled%20oats'));

// A different food is never swapped in just because it has the unit: a candy that
// happens to list tablespoons is worse than an honest "not counted".
foods[5] = food('Peanut Butter', [['oz', 28]]);
foods[6] = food('Peanut Butter Cups', [['tbsp', 10]]);
foods[7] = food('Peanut butter, reduced sodium', [['tbsp', 16]]);
r = await findMeasurableFood('peanut butter', 2, 'tbsp', fake(usda([5, 6])).getJson);
assert.equal(r.food.name, 'Peanut Butter', 'keeps the top match rather than a different food');
r = await findMeasurableFood('peanut butter', 2, 'tbsp', fake(usda([5, 6, 7])).getJson);
assert.equal(r.food.name, 'Peanut butter, reduced sodium', 'same food, just a different USDA record');
foods[8] = food('Bananas, raw', [['serving', 126]]);
foods[9] = food('Banana, raw', [['cup', 150]]);
r = await findMeasurableFood('banana', 1, 'cup', fake(usda([8, 9])).getJson);
assert.equal(r.food.name, 'Banana, raw', 'singular and plural names are the same food');

// Weights work on any record, so no extra requests are made.
f = fake(usda([1, 2]));
r = await findMeasurableFood('rolled oats', 100, 'g', f.getJson);
assert.equal(r.food.name, 'Oats, Foundation');
assert.equal(f.calls.filter(u => u.includes('details')).length, 1);

// No unit yet: keep the top match, as before.
r = await findMeasurableFood('rolled oats', 1, '', fake(usda([1, 2])).getJson);
assert.equal(r.food.name, 'Oats, Foundation');

// Nothing can measure the unit: keep the top match, so the person sees the unit problem.
r = await findMeasurableFood('rolled oats', 1, 'clove', fake(usda([1, 2])).getJson);
assert.equal(r.food.name, 'Oats, Foundation');

// A record that fails to load is skipped.
r = await findMeasurableFood('rolled oats', 1, 'cup', fake(usda([1, 2]), [1]).getJson);
assert.equal(r.food.name, 'Oats, raw');

// Only the first three records are tried.
f = fake(usda([1, 1, 1, 4]));
r = await findMeasurableFood('rolled oats', 1, 'cup', f.getJson);
assert.equal(r.food.name, 'Oats, Foundation');
assert.equal(f.calls.filter(u => u.includes('details')).length, 3);

// No results, or nothing loads.
assert.deepEqual(await findMeasurableFood('zzz', 1, 'cup', fake([]).getJson), { food: null, error: 'No match found' });
assert.deepEqual(await findMeasurableFood('zzz', 1, 'cup', fake(usda([99])).getJson), { food: null, error: 'Could not find details' });

// Details URLs for USDA and local foods.
assert.equal(detailsUrl({ source: 'usda', fdcId: '123', id: 'usda-123' }), '/api/foods/details?fdcId=123');
assert.equal(detailsUrl({ source: 'local', fdcId: '0', id: 'local_apple' }), '/api/foods/details?id=local_apple&source=local');

console.log('resolve food checks passed');
