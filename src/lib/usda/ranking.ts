import type { UsdaSearchFood } from './types';
import { tokenizeFoodQuery } from '../foods/foodNormalization';

/**
 * Re-ranks USDA search results for what a person means by a plain food name.
 *
 * USDA's own relevance order favours Branded records: "egg" ranked SNICKERS EGG
 * first, "banana" a peanut-butter spread, "avocado" avocado dressing. The meal,
 * recipe and meal-text flows auto-pick the top result, so those became the
 * logged food. On 28 everyday queries USDA's order put the intended food first
 * 13 times; this ordering does it 24 times.
 *
 * It leans on how USDA names generic foods: the text before the first comma
 * says what the food is ("Bananas"), everything after qualifies it ("raw").
 */

// Generic reference data describes the food itself rather than one product.
const DATA_TYPE_WEIGHT: Record<string, number> = {
  'Foundation': 30,
  'SR Legacy': 30,
  'Survey (FNDDS)': 25
};

// Qualifiers USDA attaches that say nothing about which food it is.
const NOISE = new Set([
  'raw', 'whole', 'plain', 'nf', 'fresh', 'regular', 'without',
  'commercially', 'prepared', 'enriched', 'unenriched', 'grade', 'large', 'medium',
  'all', 'type', 'variety', 'ready', 'to', 'eat'
]);

// Processing that changes nutrition; only wanted when the query asks for it.
const PREPARATION = /\b(fried|canned|breaded|dehydrated|dried|powder|flavored|sweetened|frozen|smoked|pickled)\b/i;

// Records that are a stand-in for the food rather than the food itself:
// "Chicken, meatless" ranked first for "chicken" in production.
const SUBSTITUTE = /\b(meatless|imitation|substitute|analog|vegetarian|vegan|plant[- ]based|meat[- ]free|dairy[- ]free)\b/i;

export function scoreUsdaSearchFood(food: UsdaSearchFood, query: string): number {
  const queryTokens = tokenizeFoodQuery(query);
  if (queryTokens.length === 0) return 0;

  const [headText, ...tailParts] = (food.description || '').split(',');
  const head = tokenizeFoodQuery(headText);
  const tail = tokenizeFoodQuery(tailParts.join(' '));
  const everything = new Set([...head, ...tail, ...tokenizeFoodQuery(food.brandName || '')]);

  const stray = (tokens: string[]) =>
    tokens.filter((t) => !queryTokens.includes(t) && !NOISE.has(t) && !/^\d+$/.test(t)).length;

  let score = DATA_TYPE_WEIGHT[food.dataType || ''] ?? 0;
  score += (queryTokens.filter((t) => everything.has(t)).length / queryTokens.length) * 30;
  if (queryTokens.every((t) => head.includes(t))) score += 10;

  // A stray word in the head names a different food ("Lomi salmon", "Beans and
  // white rice"); in the tail it only narrows the same food.
  score -= stray(head) * 8;
  score -= stray(tail) * 2;

  const description = food.description || '';
  const prep = description.match(PREPARATION);
  if (prep && !query.toLowerCase().includes(prep[1].toLowerCase().slice(0, 4))) score -= 6;

  const substitute = description.match(SUBSTITUTE);
  if (substitute && !query.toLowerCase().includes(substitute[1].toLowerCase().slice(0, 5))) score -= 25;

  if (/\bNFS\b/.test(description)) score += 8; // FNDDS "not further specified"
  if (/\braw\b/i.test(description)) score += 3;

  return score;
}

/** Stable: ties keep USDA's order. */
export function rankUsdaSearchFoods<T extends UsdaSearchFood>(foods: T[], query: string): T[] {
  return foods
    .map((food, index) => ({ food, index, score: scoreUsdaSearchFood(food, query) }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map((entry) => entry.food);
}
