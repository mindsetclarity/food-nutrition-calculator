import type { CuratedFoodItem } from './foodSchema';
import { isValidServingSize } from './servingSchema';

export type FoodDataQuality = "excellent" | "good" | "partial" | "estimated" | "needs_review";

export function hasCoreNutrients(food: CuratedFoodItem): boolean {
  const { calories, protein, carbs, fat } = food.nutrientsPer100g;
  return (
    typeof calories === 'number' && isFinite(calories) &&
    typeof protein === 'number' && isFinite(protein) &&
    typeof carbs === 'number' && isFinite(carbs) &&
    typeof fat === 'number' && isFinite(fat)
  );
}

export function hasCompleteServingData(food: CuratedFoodItem): boolean {
  if (!food.servingSizes || food.servingSizes.length === 0) return false;
  return food.servingSizes.every(isValidServingSize);
}

export function hasEstimatedData(food: CuratedFoodItem): boolean {
  return food.isEstimated || food.qualityFlags?.includes("local_estimate") || food.qualityFlags?.includes("estimated_serving") || false;
}

export function hasPartialNutrients(food: CuratedFoodItem): boolean {
  return food.qualityFlags?.includes("partial_nutrients") || !hasCoreNutrients(food);
}

export function getFoodDataQuality(food: CuratedFoodItem): FoodDataQuality {
  if (food.qualityFlags?.includes("needs_review") || food.warnings && food.warnings.length > 0) {
    return "needs_review";
  }
  
  if (!hasCoreNutrients(food)) {
    return "partial";
  }
  
  if (hasEstimatedData(food)) {
    return "estimated";
  }
  
  if (hasCompleteServingData(food)) {
    return "excellent";
  }
  
  return "good";
}

export function getFoodQualityWarnings(food: CuratedFoodItem): string[] {
  const warnings: string[] = [];
  
  if (!hasCoreNutrients(food)) {
    warnings.push("Missing one or more core nutrients (calories, protein, carbs, fat).");
  }
  
  if (!hasCompleteServingData(food)) {
    warnings.push("Missing or invalid serving size data.");
  }
  
  if (food.isEstimated) {
    warnings.push("Nutrient values are estimated.");
  }
  
  if (food.warnings) {
    warnings.push(...food.warnings);
  }
  
  return warnings;
}
