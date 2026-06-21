import { NutritionNutrients, NutritionTotals } from '../types';

export function sanitizeNutritionTotals(totals: Partial<NutritionTotals>): NutritionTotals {
  return {
    calories: Math.max(0, totals.calories || 0),
    protein: Math.max(0, totals.protein || 0),
    carbs: Math.max(0, totals.carbs || 0),
    fat: Math.max(0, totals.fat || 0),
    fiber: Math.max(0, totals.fiber || 0),
    sugar: Math.max(0, totals.sugar || 0),
    sodium: Math.max(0, totals.sodium || 0),
    saturatedFat: Math.max(0, totals.saturatedFat || 0),
    cholesterol: Math.max(0, totals.cholesterol || 0),
    potassium: Math.max(0, totals.potassium || 0),
    calcium: Math.max(0, totals.calcium || 0),
    iron: Math.max(0, totals.iron || 0),
    vitaminA: Math.max(0, totals.vitaminA || 0),
    vitaminC: Math.max(0, totals.vitaminC || 0),
  };
}

export function calculateNutrientsForGrams(nutrientsPer100g: NutritionNutrients, grams: number): NutritionNutrients {
  if (typeof grams !== 'number' || isNaN(grams) || grams < 0) {
    return {};
  }
  
  const multiplier = grams / 100;
  const result: NutritionNutrients = {};

  for (const [key, val] of Object.entries(nutrientsPer100g)) {
    if (typeof val === 'number' && !isNaN(val) && val >= 0) {
      (result as any)[key] = val * multiplier;
    }
  }

  return result;
}

export function addNutritionTotals(items: NutritionNutrients[]): NutritionTotals {
  const totals: NutritionTotals = sanitizeNutritionTotals({});

  for (const item of items) {
    for (const [key, val] of Object.entries(item)) {
      if (typeof val === 'number' && !isNaN(val) && val > 0) {
        (totals as any)[key] = ((totals as any)[key] || 0) + val;
      }
    }
  }

  return totals;
}

export function divideNutritionTotals(totals: NutritionTotals, divisor: number): NutritionTotals {
  if (typeof divisor !== 'number' || isNaN(divisor) || divisor <= 0) {
    return sanitizeNutritionTotals(totals);
  }

  const result: NutritionTotals = sanitizeNutritionTotals({});
  for (const [key, val] of Object.entries(totals)) {
    if (typeof val === 'number') {
      (result as any)[key] = val / divisor;
    }
  }

  return result;
}

export function roundNutritionTotals(totals: NutritionTotals, decimals: number = 1): NutritionTotals {
  const factor = Math.pow(10, decimals);
  const result: NutritionTotals = sanitizeNutritionTotals({});
  
  for (const [key, val] of Object.entries(totals)) {
    if (typeof val === 'number') {
      (result as any)[key] = Math.round(val * factor) / factor;
    }
  }

  return result;
}

export function hasCoreNutrition(totals: NutritionNutrients | NutritionTotals): boolean {
  return typeof totals.calories === 'number' && !isNaN(totals.calories) &&
         typeof totals.protein === 'number' && !isNaN(totals.protein) &&
         typeof totals.carbs === 'number' && !isNaN(totals.carbs) &&
         typeof totals.fat === 'number' && !isNaN(totals.fat);
}
