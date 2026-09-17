/**
 * Checks for LLM meal output normalization.
 *
 *   node --experimental-strip-types scripts/test-normalize-parsed-meal.mjs
 */
import assert from 'node:assert/strict';
import { normalizeParsedMeal } from '../src/lib/meal-parser/normalizeParsedMeal.ts';

const units = (items) =>
  normalizeParsedMeal({ items }).items.map((i) => [i.quantity, i.unit, i.foodName]);

// The food echoed as its own unit becomes a count - singular, plural, or
// matching only the head noun of a longer name.
assert.deepEqual(
  units([
    { quantity: 0.5, unit: 'banana', foodName: 'banana' },
    { quantity: 2, unit: 'egg', foodName: 'boiled eggs' },
    { quantity: 3, unit: 'Tomatoes', foodName: 'tomato' },
  ]),
  [[0.5, 'piece', 'banana'], [2, 'piece', 'boiled eggs'], [3, 'piece', 'tomato']]
);

// Real units are left alone.
assert.deepEqual(
  units([
    { quantity: 1, unit: 'bowl', foodName: 'oatmeal' },
    { quantity: 2, unit: 'slices', foodName: 'whole wheat toast' },
    { quantity: 1, unit: 'cup', foodName: 'rice' },
  ]),
  [[1, 'bowl', 'oatmeal'], [2, 'slices', 'whole wheat toast'], [1, 'cup', 'rice']]
);

// Missing unit stays null and flags review.
const [missing] = normalizeParsedMeal({ items: [{ quantity: 1, foodName: 'apple' }] }).items;
assert.equal(missing.unit, null);
assert.equal(missing.needsReview, true);

console.log('normalize-parsed-meal: all checks passed');
