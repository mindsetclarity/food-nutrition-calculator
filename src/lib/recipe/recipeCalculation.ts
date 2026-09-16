import { calculateMealTotals } from '../nutrition/calculateNutrition';
import type { CalculatedFoodItem } from '../nutrition/types';
import { divideNutrientsByServings } from './servings';
import type { RecipeTotals } from './types';

export function calculateRecipeTotals(items: CalculatedFoodItem[], servings: number): RecipeTotals {
  const mealTotals = calculateMealTotals(items);
  const safeServings = servings > 0 && isFinite(servings) ? servings : 1;
  const perServing = divideNutrientsByServings(mealTotals, safeServings);

  return {
    ...mealTotals,
    servings: safeServings,
    perServing
  };
}
