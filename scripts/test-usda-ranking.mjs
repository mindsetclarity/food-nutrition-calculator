/**
 * Checks for USDA search re-ranking.
 *
 *   node --experimental-strip-types scripts/test-usda-ranking.mjs
 *
 * Each case uses real FoodData Central records that USDA itself ranked in the
 * wrong order for the query, so the "intended" food is listed after the one
 * USDA put first.
 */
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';

// Astro/Vite resolve extensionless relative imports; plain node does not.
registerHooks({
  resolve(spec, ctx, next) {
    if (spec.startsWith('.') && !/\.[cm]?[jt]s$/.test(spec)) {
      try { return next(spec + '.ts', ctx); } catch {}
    }
    return next(spec, ctx);
  }
});

const { rankUsdaSearchFoods } = await import('../src/lib/usda/ranking.ts');
const { singularizeSimple } = await import('../src/lib/foods/foodNormalization.ts');

const top = (query, foods) => rankUsdaSearchFoods(foods, query)[0].description;
const f = (dataType, description, brandName) => ({ fdcId: Math.random(), dataType, description, brandName });

// USDA order in each list is as returned; the last entry is what the user meant.
assert.equal(top('egg', [
  f('Branded', 'SNICKERS EGG', 'SNICKERS'),
  f('Branded', 'JUST EGG', 'JUST'),
  f('Survey (FNDDS)', 'Egg, whole, raw')
]), 'Egg, whole, raw', 'generic egg beats a chocolate egg');

assert.equal(top('banana', [
  f('Branded', "BETTER'N PEANUT BUTTER BANANA", "BETTER'N PEANUT BUTTER"),
  f('SR Legacy', 'Bananas, dehydrated, or banana powder'),
  f('SR Legacy', 'Bananas, raw')
]), 'Bananas, raw', 'raw beats a spread and a powder');

assert.equal(top('avocado', [
  f('Survey (FNDDS)', 'Avocado dressing'),
  f('SR Legacy', 'Oil, avocado'),
  f('SR Legacy', 'Avocados, raw, California')
]), 'Avocados, raw, California', 'a food named by the head beats one qualified into a dressing');

assert.equal(top('milk', [
  f('Branded', 'JUNIPER VALLEY MILK', 'JUNIPER VALLEY'),
  f('Survey (FNDDS)', 'Milk, human'),
  f('Survey (FNDDS)', 'Milk, NFS')
]), 'Milk, NFS', 'NFS (not further specified) is the generic entry');

assert.equal(top('white rice', [
  f('Branded', 'MINUTE WHITE RICE', 'MINUTE'),
  f('Survey (FNDDS)', 'Beans and white rice'),
  f('SR Legacy', 'Rice, white, medium-grain, raw, enriched')
]), 'Rice, white, medium-grain, raw, enriched', 'a mixed dish does not win a single-ingredient query');

assert.equal(top('tofu', [
  f('SR Legacy', 'Tofu, fried'),
  f('SR Legacy', 'Tofu, raw, regular, prepared with calcium sulfate')
]), 'Tofu, raw, regular, prepared with calcium sulfate', 'unrequested frying is penalised');

// ...but asked-for preparation is honoured.
assert.equal(top('canned tuna', [
  f('Survey (FNDDS)', 'Tuna, fresh, raw'),
  f('Survey (FNDDS)', 'Fish, tuna, canned')
]), 'Fish, tuna, canned');

// Brand queries still find the brand.
assert.equal(top('cheerios', [
  f('Survey (FNDDS)', 'Cereal, oat, NFS'),
  f('SR Legacy', 'Cereals ready-to-eat, GENERAL MILLS, CHEERIOS')
]), 'Cereals ready-to-eat, GENERAL MILLS, CHEERIOS');

// Plural forms match their singular query.
assert.equal(top('potato', [
  f('Survey (FNDDS)', 'Potato patty'),
  f('SR Legacy', 'Potatoes, raw, skin')
]), 'Potatoes, raw, skin');

// A substitute is not the food ("chicken" ranked "Chicken, meatless" first in production)...
assert.equal(top('chicken', [
  f('Survey (FNDDS)', 'Chicken, meatless'),
  f('Survey (FNDDS)', 'Chicken, NFS')
]), 'Chicken, NFS');

// ...unless the user asked for it.
assert.equal(top('meatless chicken', [
  f('Survey (FNDDS)', 'Chicken, NFS'),
  f('Survey (FNDDS)', 'Chicken, meatless')
]), 'Chicken, meatless');

// Ties keep USDA's order, and degenerate input does not throw.
const tied = [f('SR Legacy', 'Apples, raw'), f('SR Legacy', 'Apples, raw')];
assert.equal(rankUsdaSearchFoods(tied, 'apple')[0], tied[0]);
assert.doesNotThrow(() => rankUsdaSearchFoods([f('Branded', undefined)], 'apple'));
assert.deepEqual(rankUsdaSearchFoods([], 'apple'), []);

// singularizeSimple fix underpinning the potato case.
assert.equal(singularizeSimple('potatoes'), 'potato');
assert.equal(singularizeSimple('tomatoes'), 'tomato');
assert.equal(singularizeSimple('boxes'), 'box');
assert.equal(singularizeSimple('berries'), 'berry');
assert.equal(singularizeSimple('grass'), 'grass');

console.log('usda ranking checks passed (19)');
