/**
 * Checks for the deterministic meal parser - what users get whenever no LLM
 * provider is configured.
 *
 *   node --experimental-strip-types scripts/test-basic-meal-parser.mjs
 */
import assert from 'node:assert/strict';
import { basicFallbackParse } from '../src/lib/meal-parser/basicParser.ts';

const parse = (text) =>
  basicFallbackParse(text).items.map((i) => [i.quantity, i.unit, i.foodName, i.usdaSearchQuery]);

// Articles and number words become quantities instead of polluting the food
// name - and with it the USDA search query.
assert.deepEqual(parse('a banana'), [[1, 'piece', 'banana', 'banana']]);
assert.deepEqual(parse('an apple'), [[1, 'piece', 'apple', 'apple']]);
assert.deepEqual(parse('two eggs'), [[2, 'piece', 'eggs', 'eggs']]);
assert.deepEqual(parse('half a cup rice'), [[0.5, 'cup', 'rice', 'rice']]);

// "of" after a unit is dropped.
assert.deepEqual(
  parse('a slice of whole wheat toast'),
  [[1, 'slice', 'whole wheat toast', 'whole wheat toast']]
);

// Fractions.
assert.deepEqual(parse('1/2 cup oats'), [[0.5, 'cup', 'oats', 'oats']]);

// Existing behaviour that must not regress.
assert.deepEqual(parse('200g greek yogurt'), [[200, 'g', 'greek yogurt', 'greek yogurt']]);
assert.deepEqual(parse('2 scrambled eggs'), [[2, 'piece', 'scrambled eggs', 'scrambled eggs']]);
assert.deepEqual(parse('1.5 cups milk'), [[1.5, 'cups', 'milk', 'milk']]);
assert.deepEqual(
  parse('1 cup oats, 200g greek yogurt and a banana').map((r) => r[2]),
  ['oats', 'greek yogurt', 'banana']
);

// Degenerate quantities fall back to one serving of the whole segment rather
// than producing Infinity or zero grams.
assert.deepEqual(parse('1/0 cup rice'), [[1, 'serving', '1/0 cup rice', '1/0 cup rice']]);
assert.deepEqual(parse('0 cups rice'), [[1, 'serving', '0 cups rice', '0 cups rice']]);

// A word that merely starts with an article is left alone.
assert.deepEqual(parse('avocado'), [[1, 'serving', 'avocado', 'avocado']]);

// rawText keeps what the user actually typed.
assert.equal(basicFallbackParse('a banana').items[0].rawText, 'a banana');

console.log('basic meal parser checks passed (14)');
