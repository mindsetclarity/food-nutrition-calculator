// src/lib/safety/inputLimits.ts

export const inputLimits = {
  foodSearchMinLength: 2,
  foodSearchMaxLength: 120,
  foodSearchResultLimit: 15,
  parseMealMaxChars: 1500,
  recipeMaxChars: 5000,
  recipeMaxIngredientLines: 50,
  mealMaxItemsPerSection: 20,
  compareMaxFoods: 4,
  quantityMin: 0.01,
  quantityMax: 10000,
  servingsMin: 1,
  servingsMax: 100,
};

export function isValidSearchQuery(q: string | null | undefined): boolean {
  if (!q) return false;
  const trimmed = q.trim();
  return trimmed.length >= inputLimits.foodSearchMinLength && trimmed.length <= inputLimits.foodSearchMaxLength;
}

export function isValidQuantity(q: number | null | undefined): boolean {
  if (q === undefined || q === null || isNaN(q)) return false;
  return q >= inputLimits.quantityMin && q <= inputLimits.quantityMax;
}
