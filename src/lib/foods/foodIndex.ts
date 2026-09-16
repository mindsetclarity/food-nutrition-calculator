import { localFoods } from '../../data/foods';
import type { FoodItem } from '../nutrition/types';
import { normalizeFoodName, tokenizeFoodQuery } from './foodNormalization';

export interface IndexedFood {
  item: FoodItem;
  id: string;
  slug: string;
  displayName: string;
  normalizedName: string;
  normalizedAliases: string[];
  category: string;
  tags: string[];
  tokenSet: Set<string>;
  searchableText: string;
  preparationState?: string;
  source: string;
}

let searchIndex: IndexedFood[] | null = null;
let foodMap: Map<string, FoodItem> | null = null;

export function buildFoodIndex(): void {
  if (searchIndex !== null) return; // Only build once

  searchIndex = localFoods.map((food: FoodItem) => {
    const normalizedName = normalizeFoodName(food.displayName);
    const normalizedAliases = (food.aliases || []).map(normalizeFoodName);
    
    const tokens = [
      ...tokenizeFoodQuery(food.displayName),
      ...normalizedAliases.flatMap(tokenizeFoodQuery)
    ];

    return {
      item: food,
      id: food.id,
      slug: food.slug,
      displayName: food.displayName,
      normalizedName,
      normalizedAliases,
      category: food.category,
      tags: food.tags || [],
      tokenSet: new Set(tokens),
      searchableText: `${normalizedName} ${normalizedAliases.join(' ')} ${food.category} ${(food.tags || []).join(' ')}`,
      preparationState: food.preparationState,
      source: food.source
    };
  });

  foodMap = new Map();
  localFoods.forEach(food => {
    foodMap!.set(food.id, food);
    foodMap!.set(food.slug, food); // Allow lookup by slug
  });
}

export function getSearchIndex(): IndexedFood[] {
  if (searchIndex === null) buildFoodIndex();
  return searchIndex!;
}

export function getFoodByIdOrSlug(idOrSlug: string): FoodItem | undefined {
  if (foodMap === null) buildFoodIndex();
  return foodMap!.get(idOrSlug);
}
