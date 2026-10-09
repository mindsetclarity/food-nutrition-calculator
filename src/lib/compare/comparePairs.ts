import { getAllFoodPages } from '../foods/foodPageData';
import type { FoodItem } from '../nutrition/types';

export interface ComparePair {
  slug: string; // "apple-vs-banana" (food slugs in alphabetical order)
  a: FoodItem;
  b: FoodItem;
}

const NEIGHBORS = 3;

// Each food paired with its NEIGHBORS closest same-category foods by calories/100 g —
// the foods people actually weigh against each other. Deduped, so a few hundred pages.
// ponytail: calorie distance is a naive similarity; swap for curated pairs from Search Console queries later.
function buildPairs(): ComparePair[] {
  const foods = getAllFoodPages().filter(f => f.nutrientsPer100g?.calories != null);
  const pairs = new Map<string, ComparePair>();
  for (const food of foods) {
    const kcal = food.nutrientsPer100g.calories!;
    foods
      .filter(o => o.slug !== food.slug && o.category === food.category)
      .sort((x, y) => Math.abs(x.nutrientsPer100g.calories! - kcal) - Math.abs(y.nutrientsPer100g.calories! - kcal))
      .slice(0, NEIGHBORS)
      .forEach(other => {
        const [a, b] = [food, other].sort((x, y) => x.slug.localeCompare(y.slug));
        const slug = `${a.slug}-vs-${b.slug}`;
        if (!pairs.has(slug)) pairs.set(slug, { slug, a, b });
      });
  }
  return [...pairs.values()];
}

let cache: ComparePair[] | undefined;
export function getAllComparePairs(): ComparePair[] {
  return (cache ??= buildPairs());
}

export function getComparePairsForFood(slug: string): ComparePair[] {
  return getAllComparePairs().filter(p => p.a.slug === slug || p.b.slug === slug);
}
