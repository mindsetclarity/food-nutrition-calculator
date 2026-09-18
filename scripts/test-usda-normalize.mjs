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

// --- serving sizes from foodPortions ------------------------------------------
// Ignoring foodPortions left every USDA food with grams only, so a recipe line
// like "1 cup salsa" failed with "This unit is not available". Portions below
// are verbatim from the live API, one per USDA shape.
const { normalizeUsdaFoodDetails } = await import('../src/lib/usda/normalize.ts');
const { resolveQuantityToGrams } = await import('../src/lib/nutrition/unitConversions.ts');
const U = { name: 'undetermined' };
const food = (foodPortions, description = 'Test') => normalizeUsdaFoodDetails({ fdcId: 1, description, foodPortions });
const grams = (f, qty, unit) => resolveQuantityToGrams(f, qty, unit).grams;

// Survey (FNDDS): the measure is in portionDescription, modifier is a code.
const salsa = food([
  { measureUnit: U, modifier: '21000', portionDescription: '1 tablespoon', gramWeight: 16 },
  { measureUnit: U, modifier: '10205', portionDescription: '1 cup', gramWeight: 256 },
  { measureUnit: U, modifier: '90000', portionDescription: 'Quantity not specified', gramWeight: 32 },
  { measureUnit: U, modifier: '64616', portionDescription: 'Guideline amount per sandwich', gramWeight: 16 }
]);
assert.equal(grams(salsa, 1, 'cup'), 256);
assert.equal(grams(salsa, 2, 'tbsp'), 32);
assert.deepEqual(salsa.servingSizes.map(s => s.unit), ['tbsp', 'cup'], 'placeholders are not units');

// SR Legacy: the measure is in modifier, amount may be more than 1.
const onion = food([
  { amount: 1, measureUnit: U, modifier: 'cup, chopped', gramWeight: 160 },
  { amount: 1, measureUnit: U, modifier: 'large', gramWeight: 150 },
  { amount: 1, measureUnit: U, modifier: 'medium (2-1/2" dia)', gramWeight: 110 },
  { amount: 10, measureUnit: U, modifier: 'rings', gramWeight: 60 }
]);
assert.equal(grams(onion, 1, 'piece'), 110, 'a medium one is the piece');
assert.equal(grams(onion, 1, 'cups'), 160);
assert.equal(grams(onion, 1, 'rings'), 6, 'gramWeight is per amount');

// Foundation: the measure is in measureUnit.
const cheddar = food([
  { amount: 1, measureUnit: { name: 'cup' }, portionDescription: 'shredded', gramWeight: 105 },
  { amount: 1, measureUnit: { name: 'RACC' }, gramWeight: 30 }
]);
assert.equal(grams(cheddar, 1, 'serving'), 30);
assert.equal(grams(cheddar, 1, 'tbsp'), 105 / 16, 'tbsp derived from cup');
// The food's own name as the measure is one piece.
assert.equal(grams(food([{ amount: 1, measureUnit: { name: 'egg' }, gramWeight: 50.3 }], 'Eggs, Grade A'), 2, 'piece'), 100.6);
assert.equal(grams(food([{ amount: 5, measureUnit: { name: 'tomatoes' }, gramWeight: 49.7 }], 'Tomatoes, grape, raw'), 1, 'piece'), 9.9);

// A unit the food lacks says which ones work, instead of a dead end.
assert.match(resolveQuantityToGrams(cheddar, 1, 'clove').error, /g, oz, lb, cup, serving/);
assert.doesNotThrow(() => food(undefined));

console.log('usda normalize checks passed (30)');
