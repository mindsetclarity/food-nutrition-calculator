/**
 * Regression checks for USDA nutrient extraction.
 *
 *   node --experimental-strip-types scripts/test-usda-normalize.mjs
 *
 * The bug these guard: Branded foods return foodNutrients entries shaped
 * { type, id, amount } with no .nutrient descriptor. Reading item.nutrient.name
 * threw a TypeError, which surfaced as a 500 from /api/foods/details and an
 * unusable "Food details could not be loaded" for every Branded search result.
 */
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';

// Astro/Vite resolve extensionless relative imports; plain node does not.
// This hook lets the test import the real source instead of a copy of it.
registerHooks({
  resolve(spec, ctx, next) {
    if (spec.startsWith('.') && !/\.[cm]?[jt]s$/.test(spec)) {
      try { return next(spec + '.ts', ctx); } catch {}
    }
    return next(spec, ctx);
  }
});

const { extractNutrientsPer100g, hasUsableNutrients } = await import('../src/lib/usda/normalize.ts');

// --- the actual crash case, verbatim from fdcId 2012128 ----------------------
const brandedEntries = [
  { type: 'FoodNutrient', id: 26035666, amount: 0 },
  { type: 'FoodNutrient', id: 26035660, amount: 125 },
  { type: 'FoodNutrient', id: 26035654, amount: 12.5 }
];

const branded = extractNutrientsPer100g(brandedEntries);
assert.equal(branded.calories, null, 'undescribed entries must not be mapped');
assert.equal(hasUsableNutrients(branded), false, 'branded-without-descriptors is unusable');

// amount: 0 is the nasty one - it passes a null check and used to reach .name
assert.doesNotThrow(
  () => extractNutrientsPer100g([{ type: 'FoodNutrient', id: 1, amount: 0 }]),
  'amount:0 with no descriptor must not throw'
);

// --- the nested shape (Foundation / SR Legacy) still works -------------------
const legacy = extractNutrientsPer100g([
  { nutrient: { name: 'Energy', unitName: 'kcal' }, amount: 89 },
  { nutrient: { name: 'Protein', unitName: 'g' }, amount: 1.09 },
  { nutrient: { name: 'Sodium, Na', unitName: 'mg' }, amount: 1 }
]);
assert.equal(legacy.calories, 89);
assert.equal(legacy.protein, 1.09);
assert.equal(legacy.sodium, 1);
assert.equal(hasUsableNutrients(legacy), true);

// Energy is published in both kcal and kJ; only kcal is calories.
const kj = extractNutrientsPer100g([
  { nutrient: { name: 'Energy', unitName: 'kJ' }, amount: 372 }
]);
assert.equal(kj.calories, null, 'kJ energy must not be read as calories');

// A kJ entry must not stop a later kcal entry being picked up.
const both = extractNutrientsPer100g([
  { nutrient: { name: 'Energy', unitName: 'kJ' }, amount: 372 },
  { nutrient: { name: 'Energy', unitName: 'kcal' }, amount: 89 }
]);
assert.equal(both.calories, 89);

// --- the flat shape some responses use --------------------------------------
const flat = extractNutrientsPer100g([
  { nutrientName: 'Protein', unitName: 'g', amount: 5 }
]);
assert.equal(flat.protein, 5, 'flat nutrientName shape should map');

// --- the /foods/search shape: flat fields, `value` instead of `amount` -------
// Entry shape from searching fdcId 2012128, where the detail endpoint returned
// no descriptors but search returns them all.
const search = extractNutrientsPer100g([
  { nutrientId: 1008, nutrientName: 'Energy', unitName: 'KCAL', value: 312 },
  { nutrientId: 1003, nutrientName: 'Protein', unitName: 'G', value: 12.5 }
]);
assert.equal(search.calories, 312, 'search `value` should map, uppercase KCAL accepted');
assert.equal(search.protein, 12.5);
assert.equal(hasUsableNutrients(search), true);

// Entries missing fields used to crash normalizeUsdaSearchResult's own loop.
assert.doesNotThrow(() => extractNutrientsPer100g([{ value: 5 }, { nutrientName: 'Protein' }]));

// --- degenerate inputs ------------------------------------------------------
assert.doesNotThrow(() => extractNutrientsPer100g(undefined));
assert.doesNotThrow(() => extractNutrientsPer100g([]));
assert.doesNotThrow(() => extractNutrientsPer100g([null, undefined]));
assert.doesNotThrow(() => extractNutrientsPer100g([{ nutrient: {}, amount: 5 }]));
assert.equal(hasUsableNutrients(extractNutrientsPer100g([])), false);

console.log('usda normalize checks passed (18)');
