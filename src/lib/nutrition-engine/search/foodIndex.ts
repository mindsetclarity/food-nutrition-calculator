import type { EngineFoodItem } from '../types';
import type { SearchIndexedFood } from './searchTypes';
import { normalizeFoodText, tokenizeFoodQuery } from './normalizeQuery';

let defaultIndexCache: SearchIndexedFood[] | null = null;

export function getFoodSearchableText(food: EngineFoodItem): string {
  const parts = [
    food.displayName,
    food.canonicalName || '',
    food.category || '',
    ...(food.aliases || []),
    ...(food.tags || []),
    food.preparationState || ''
  ];
  return parts.filter(Boolean).join(' ').toLowerCase();
}

export function getFoodTokenSet(searchableText: string): Set<string> {
  return new Set(tokenizeFoodQuery(searchableText));
}

export function indexFoodItem(food: EngineFoodItem): SearchIndexedFood {
  const normalizedName = normalizeFoodText(food.displayName);
  const normalizedAliases = (food.aliases || []).map(normalizeFoodText);
  const normalizedSearchName = normalizeFoodText(food.canonicalName || food.displayName);
  const searchableText = getFoodSearchableText(food);
  const tokenSet = getFoodTokenSet(searchableText);
  
  let caloriesPreview: number | undefined;
  let proteinPreview: number | undefined;
  let defaultServingLabel: string | undefined;

  const defaultServing = food.servingSizes?.find(s => s.isDefault) || food.servingSizes?.[0];
  if (defaultServing) {
    defaultServingLabel = defaultServing.label;
    if (food.nutrientsPer100g.calories != null) {
      caloriesPreview = Math.round((food.nutrientsPer100g.calories / 100) * defaultServing.grams);
    }
    if (food.nutrientsPer100g.protein != null) {
      proteinPreview = Math.round((food.nutrientsPer100g.protein / 100) * defaultServing.grams);
    }
  } else {
    defaultServingLabel = "100 g";
    caloriesPreview = food.nutrientsPer100g.calories ?? undefined;
    proteinPreview = food.nutrientsPer100g.protein ?? undefined;
  }

  return {
    food,
    id: food.id,
    slug: food.slug,
    displayName: food.displayName,
    normalizedName,
    normalizedAliases,
    normalizedSearchName,
    category: food.category ? normalizeFoodText(food.category) : undefined,
    tags: (food.tags || []).map(normalizeFoodText),
    source: food.source,
    sourceLabel: food.sourceLabel,
    preparationState: food.preparationState ? normalizeFoodText(food.preparationState) : undefined,
    tokenSet,
    searchableText,
    caloriesPreview,
    proteinPreview,
    defaultServingLabel
  };
}

export function createFoodSearchIndex(foods: EngineFoodItem[]): SearchIndexedFood[] {
  return foods.map(indexFoodItem);
}

import { localFoods } from '../../../data/foods/index';

export function getDefaultLocalFoodSearchIndex(): SearchIndexedFood[] {
  if (defaultIndexCache) {
    return defaultIndexCache;
  }
  try {
    defaultIndexCache = createFoodSearchIndex(localFoods || []);
    return defaultIndexCache;
  } catch (e) {
    console.warn("Could not load localFoods for search index:", e);
    return [];
  }
}
