import type { FoodItem } from '../nutrition/types';

export interface PortionRow { label: string; grams: number; calories: number | null; protein: number | null }

const scale = (per100: number | null | undefined, grams: number, digits: number) => {
  if (per100 == null || !Number.isFinite(per100)) return null;
  const f = 10 ** digits;
  return Math.round((per100 * grams) / 100 * f) / f;
};

/** Calories and protein for each listed portion, plus 100 g, from per-100 g values. */
export function portionRows(food: Pick<FoodItem, 'servingSizes' | 'nutrientsPer100g'>): PortionRow[] {
  const seen = new Set<string>();
  const servings = (food.servingSizes ?? []).filter(s => Number.isFinite(s.grams) && s.grams > 0);
  if (!servings.some(s => s.grams === 100)) servings.push({ unit: 'g', label: '100 g', grams: 100 });
  return servings.flatMap(s => {
    const key = `${s.label}|${s.grams}`;
    if (seen.has(key)) return [];
    seen.add(key);
    const n = food.nutrientsPer100g;
    return [{ label: s.label, grams: s.grams, calories: scale(n.calories, s.grams, 0), protein: scale(n.protein, s.grams, 1) }];
  });
}
