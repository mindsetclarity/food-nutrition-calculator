import type { FoodItem } from '../nutrition/types';

export interface PortionRow { label: string; grams: number; calories: number | null; protein: number | null }

const scale = (per100: number | null | undefined, grams: number, digits: number) => {
  if (per100 == null || !Number.isFinite(per100)) return null;
  const f = 10 ** digits;
  return Math.round((per100 * grams) / 100 * f) / f;
};

/** Grams for display: whole grams from 10 g up, one decimal below. */
export const formatGrams = (g: number) => String(g >= 10 ? Math.round(g) : Math.round(g * 10) / 10);

/**
 * Calories and protein for each listed portion, plus 100 g, from per-100 g values.
 * Skips portions a reader can't use: no positive weight, malformed USDA labels
 * ("1 grams 1 serving"), repeated labels, and specks that round to 0 kcal for a
 * food that has calories (a parsley sprig, a drop of juice).
 */
export function portionRows(food: Pick<FoodItem, 'servingSizes' | 'nutrientsPer100g'>): PortionRow[] {
  const n = food.nutrientsPer100g;
  const seen = new Set<string>();
  const servings = (food.servingSizes ?? []).filter(s => Number.isFinite(s.grams) && s.grams > 0 && !/\bgrams?\b/i.test(s.label));
  if (!servings.some(s => s.grams === 100)) servings.push({ unit: 'g', label: '100 g', grams: 100 });
  return servings.flatMap(s => {
    const key = s.label.trim().toLowerCase();
    if (seen.has(key)) return [];
    const row = { label: s.label, grams: s.grams, calories: scale(n.calories, s.grams, 0), protein: scale(n.protein, s.grams, 1) };
    if (row.calories === 0 && (n.calories ?? 0) > 0) return [];
    seen.add(key);
    return [row];
  });
}
