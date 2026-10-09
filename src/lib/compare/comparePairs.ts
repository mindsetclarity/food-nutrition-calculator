import { getAllFoodPages } from '../foods/foodPageData';
import type { FoodItem } from '../nutrition/types';
import { PUBLISHED_COMPARE_PAIRS } from '../../data/publishedComparePairs';

export interface ComparePair {
  slug: string; // "apple-vs-banana" (food slugs in alphabetical order)
  a: FoodItem;
  b: FoodItem;
}

const NEIGHBORS = 3;

// Popular "X vs Y" searches that calorie distance alone misses. Extend from Search Console queries.
const CURATED: [string, string][] = [
  ['apple', 'banana'], ['banana', 'orange'], ['strawberry', 'blueberry'], ['avocado', 'banana'],
  ['cheese-pizza', 'pepperoni-pizza'], ['cheeseburger', 'cheese-pizza'], ['french-fries', 'onion-rings'],
  ['white-bread', 'whole-wheat-bread'], ['sourdough-bread', 'white-bread'], ['bagel', 'english-muffin'], ['bagel', 'croissant'],
  ['cooked-white-rice', 'cooked-quinoa'], ['cooked-white-rice', 'cooked-pasta'], ['naan', 'pita-bread'],
  ['beer', 'red-wine'], ['beer', 'light-beer'], ['cola', 'diet-cola'], ['black-coffee', 'latte-nonfat-milk'], ['latte-nonfat-milk', 'mocha'],
  ['milk', 'almond-milk-unsweetened'], ['oat-milk', 'almond-milk-unsweetened'], ['soy-milk', 'oat-milk'],
  ['greek-yogurt-plain-nonfat', 'nonfat-skim-yogurt'], ['greek-yogurt-plain-nonfat', 'cottage-cheese'], ['butter', 'margarine'], ['butter', 'olive-oil'],
  ['grilled-chicken-breast', 'grilled-salmon'], ['chicken-breast', 'chicken-thigh'], ['salmon', 'tuna'], ['grilled-chicken-breast', 'dry-tofu'],
  ['almond', 'walnut'], ['almond', 'cashews'], ['butter-peanut', 'butter-almond'], ['egg', 'greek-yogurt-plain-nonfat'],
  ['potato', 'sweet-potato'], ['broccoli', 'cauliflower'], ['spinach', 'kale'],
  ['dark-chocolate', 'milk-chocolate'], ['vanilla-ice-cream', 'frozen-yogurt'], ['honey', 'maple-syrup'], ['white-sugar', 'honey'],
  ['chicken-curry', 'chicken-biryani'], ['roti-chapati', 'paratha'], ['dosa', 'idli'], ['samosa', 'pakora'],
];

// Each food paired with its NEIGHBORS closest same-category foods by calories/100 g,
// plus the CURATED pairs. Deduped, so several hundred pages.
function buildPairs(): ComparePair[] {
  const foods = getAllFoodPages().filter(f => f.nutrientsPer100g?.calories != null);
  const pairs = new Map<string, ComparePair>();
  const add = (x: FoodItem, y: FoodItem) => {
    const [a, b] = [x, y].sort((p, q) => p.slug.localeCompare(q.slug));
    const slug = `${a.slug}-vs-${b.slug}`;
    if (!pairs.has(slug)) pairs.set(slug, { slug, a, b });
  };
  const bySlug = new Map(foods.map(f => [f.slug, f]));
  for (const [x, y] of [...PUBLISHED_COMPARE_PAIRS, ...CURATED]) {
    const fx = bySlug.get(x), fy = bySlug.get(y);
    // A renamed or removed food must fail the build, not silently 404 a live page:
    // drop the pair and add a redirect for its URL in astro.config.mjs.
    if (!fx || !fy) throw new Error(`Compare pair ${x}-vs-${y} references unknown food "${!fx ? x : y}"`);
    add(fx, fy);
  }
  for (const food of foods) {
    const kcal = food.nutrientsPer100g.calories!;
    foods
      .filter(o => o.slug !== food.slug && o.category === food.category)
      .sort((x, y) => Math.abs(x.nutrientsPer100g.calories! - kcal) - Math.abs(y.nutrientsPer100g.calories! - kcal))
      .slice(0, NEIGHBORS)
      .forEach(other => add(food, other));
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
