import type { CalculatedFoodItem, MealTotals } from '../nutrition/types';

export interface PerServingNutrition {
  calories: number | null;
  protein: number | null;
  carbohydrates: number | null;
  fat: number | null;
  fiber: number | null;
  sugar: number | null;
  sodium: number | null;
}

export interface RecipeTotals extends MealTotals {
  servings: number;
  perServing: PerServingNutrition;
}
