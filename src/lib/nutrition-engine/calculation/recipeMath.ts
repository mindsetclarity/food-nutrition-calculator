import type { ResolvedIngredient } from '../recipe/recipeTypes';
import type { NutritionTotals, NutritionNutrients } from '../types';
import { calculateNutrientsForGrams, addNutritionTotals, divideNutritionTotals, sanitizeNutritionTotals, roundNutritionTotals } from './nutrientMath';
import { createWarning } from '../warnings';
import type { EngineWarning } from '../warnings';

export function calculateIngredientNutrition(ingredient: ResolvedIngredient): NutritionNutrients | undefined {
  if (ingredient.status !== 'resolved' && ingredient.status !== 'needs_review') return undefined;
  if (!ingredient.resolvedFood?.nutrientsPer100g || typeof ingredient.resolvedServing?.grams !== 'number') return undefined;

  return calculateNutrientsForGrams(ingredient.resolvedFood.nutrientsPer100g, ingredient.resolvedServing.grams);
}

export function calculateRecipeTotals(resolvedIngredients: ResolvedIngredient[]): NutritionTotals {
  const allNutrients: NutritionNutrients[] = [];
  
  for (const ing of resolvedIngredients) {
    if (ing.calculatedNutrition) {
      allNutrients.push(ing.calculatedNutrition);
    }
  }

  return roundNutritionTotals(addNutritionTotals(allNutrients), 2);
}

export function calculatePerServingNutrition(totalNutrition: NutritionTotals, servings: number): NutritionTotals {
  const safeServings = typeof servings === 'number' && !isNaN(servings) && servings > 0 ? servings : 1;
  return roundNutritionTotals(divideNutritionTotals(totalNutrition, safeServings), 2);
}

export function validateServings(servings: any): number {
  if (typeof servings === 'number' && !isNaN(servings) && servings > 0) return servings;
  if (typeof servings === 'string') {
    const num = parseFloat(servings);
    if (!isNaN(num) && num > 0) return num;
  }
  return 1;
}
