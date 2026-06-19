import type { MealTotals } from '../nutrition/types';
import type { PerServingNutrition } from './types';

export function validateServings(value: number): { isValid: boolean; error?: string } {
  if (typeof value !== 'number' || !isFinite(value)) {
    return { isValid: false, error: "Servings must be a finite number." };
  }
  if (value <= 0) {
    return { isValid: false, error: "Enter a serving count greater than zero." };
  }
  if (value > 100) {
    return { isValid: false, error: "Servings cannot exceed 100." };
  }
  return { isValid: true };
}

export function divideNutrientsByServings(totals: MealTotals, servings: number): PerServingNutrition {
  if (servings <= 0 || !isFinite(servings)) servings = 1;

  const perServing: PerServingNutrition = {
    calories: totals.calories !== null ? totals.calories / servings : null,
    protein: totals.nutrients.protein !== null ? totals.nutrients.protein / servings : null,
    carbohydrates: totals.nutrients.carbohydrates !== null ? totals.nutrients.carbohydrates / servings : null,
    fat: totals.nutrients.fat !== null ? totals.nutrients.fat / servings : null,
    fiber: totals.nutrients.fiber !== null ? totals.nutrients.fiber / servings : null,
    sugar: totals.nutrients.sugar !== null ? totals.nutrients.sugar / servings : null,
    sodium: totals.nutrients.sodium !== null ? totals.nutrients.sodium / servings : null
  };

  return perServing;
}
