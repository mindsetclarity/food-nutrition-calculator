import type { UsdaSearchFood, UsdaFoodDetails, NormalizedSearchResult } from './types';
import type { FoodItem, NutrientProfile, ServingSize } from '../nutrition/types';
import { mapUsdaNutrientName } from './nutrients';

export function createUsdaSlug(fdcId: number, description: string): string {
  const safeDesc = description.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return `usda-${fdcId}-${safeDesc}`.substring(0, 100);
}

export function getDisplayNameFromUsda(description: string, brandName?: string): string {
  let name = description.split(',')[0] || description;
  name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  if (brandName) {
    return `${brandName} ${name}`;
  }
  return name;
}

export function normalizeUsdaSearchResult(food: UsdaSearchFood): NormalizedSearchResult {
  const nutrientsPreview: Partial<NutrientProfile> = {};
  
  if (food.foodNutrients) {
    for (const nut of food.foodNutrients) {
      const key = mapUsdaNutrientName(nut.nutrientName);
      if (key === 'calories' && nut.unitName.toLowerCase() !== 'kcal') {
        continue;
      }
      if (key) {
        nutrientsPreview[key] = nut.value;
      }
    }
  }

  return {
    id: `usda-${food.fdcId}`,
    fdcId: food.fdcId,
    slug: createUsdaSlug(food.fdcId, food.description),
    name: food.description,
    displayName: getDisplayNameFromUsda(food.description, food.brandName),
    description: food.description,
    brandName: food.brandName || null,
    dataType: food.dataType || null,
    source: 'usda',
    sourceLabel: 'USDA FoodData Central',
    isEstimated: false,
    nutrientsPreview
  };
}

export function normalizeUsdaSearchResults(foods: UsdaSearchFood[]): NormalizedSearchResult[] {
  return foods.map(normalizeUsdaSearchResult);
}

export function extractNutrientsPer100g(foodNutrients?: { nutrient: { name: string, unitName: string }, amount?: number }[]): NutrientProfile {
  const profile: NutrientProfile = {
    calories: null, protein: null, carbohydrates: null, fat: null,
    fiber: null, sugar: null, sodium: null, saturatedFat: null,
    cholesterol: null, potassium: null
  };

  if (!foodNutrients) return profile;

  for (const item of foodNutrients) {
    if (item.amount === undefined || item.amount === null) continue;
    
    const key = mapUsdaNutrientName(item.nutrient.name);
    if (!key) continue;

    if (key === 'calories' && item.nutrient.unitName.toLowerCase() !== 'kcal') {
      continue;
    }

    profile[key] = item.amount;
  }

  return profile;
}

export function createServingSizesFromUsda(food: UsdaFoodDetails): ServingSize[] {
  const sizes: ServingSize[] = [];
  
  if (food.servingSize && food.servingSizeUnit === 'g') {
    let label = `${food.servingSize}g`;
    if (food.householdServingFullText) {
      label = `${food.householdServingFullText} (${label})`;
    }
    sizes.push({
      unit: 'serving',
      label: label,
      grams: food.servingSize
    });
  }

  return sizes;
}

export function normalizeUsdaFoodDetails(food: UsdaFoodDetails): FoodItem {
  const slug = createUsdaSlug(food.fdcId, food.description);
  const displayName = getDisplayNameFromUsda(food.description, food.brandName);
  const servingSizes = createServingSizesFromUsda(food);

  return {
    id: `usda-${food.fdcId}`,
    slug,
    name: food.description,
    displayName,
    aliases: [],
    category: food.foodCategory?.description || 'Unknown',
    source: 'usda',
    sourceLabel: 'USDA FoodData Central',
    isEstimated: false,
    defaultUnit: servingSizes.length > 0 ? 'serving' : 'g',
    defaultQuantity: 1,
    servingSizes,
    nutrientsPer100g: extractNutrientsPer100g(food.foodNutrients),
    usda: {
      fdcId: food.fdcId,
      dataType: food.dataType,
      brandName: food.brandName,
      publicationDate: food.publicationDate
    }
  };
}
