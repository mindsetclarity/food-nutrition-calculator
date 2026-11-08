// Picks a food for an ingredient the person did not choose by hand (recipe, meal text,
// meal examples). The top search result is not always usable: USDA Foundation records
// often have no cup or spoon measures, so "1 cup rolled oats" matched a record that could
// not measure it and the ingredient was silently left out. This tries the next few
// results until one can measure the unit, and otherwise keeps the top match.
import type { FoodItem } from '../nutrition/types';
import { resolveQuantityToGrams } from '../nutrition/unitConversions';

interface SearchResult {
  source?: string;
  fdcId?: string | number;
  id: string;
}

type GetJson = (url: string) => Promise<any>;

const MAX_TRIES = 3; // ponytail: up to 3 details requests per ingredient; raise if matches still miss.

// What the food is, from how USDA and the local list name foods: the text before the
// first comma ("Oats, raw" → "oat"), singular, so "Bananas, raw" and "Banana, raw" match.
const headOf = (food: FoodItem) =>
  (food.name || food.displayName || '').split(',')[0].trim().toLowerCase().replace(/e?s$/, '');

export function detailsUrl(result: SearchResult): string {
  return result.source === 'usda' && result.fdcId && String(result.fdcId) !== '0'
    ? `/api/foods/details?fdcId=${result.fdcId}`
    : `/api/foods/details?id=${encodeURIComponent(result.id)}&source=local`;
}

export async function findMeasurableFood(
  query: string,
  quantity: number | null | undefined,
  unit: string | null | undefined,
  getJson: GetJson,
): Promise<{ food: FoodItem | null; error: string | null }> {
  const search = await getJson(`/api/foods/search?q=${encodeURIComponent(query)}`);
  const results: SearchResult[] = search?.results ?? [];
  if (!results.length) return { food: null, error: 'No match found' };

  let first: FoodItem | null = null;
  for (const result of results.slice(0, MAX_TRIES)) {
    const details = await getJson(detailsUrl(result)).catch(() => null);
    const food: FoodItem | null = details?.ok ? details.food : null;
    if (!food) continue;
    first ??= food;
    // Only another record of the same food: "Peanut Butter Cups" listing tablespoons
    // must not stand in for "Peanut Butter".
    if (headOf(food) !== headOf(first)) continue;
    // No unit yet means nothing to check; any quantity works for testing a unit.
    if (!unit || resolveQuantityToGrams(food, quantity && quantity > 0 ? quantity : 1, unit).grams !== null) {
      return { food, error: null };
    }
  }
  return first ? { food: first, error: null } : { food: null, error: 'Could not find details' };
}
