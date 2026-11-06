import { CATEGORY_INTROS } from '../../data/categoryIntros';
import type { FoodItem } from '../nutrition/types';
import { getAllFoodPages } from './foodPageData';

export const categorySlug = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function sortFoodsByCalories(foods: FoodItem[]): FoodItem[] {
  const kcal = (f: FoodItem) => f.nutrientsPer100g?.calories ?? Infinity;
  return [...foods].sort((a, b) => kcal(a) - kcal(b));
}

export function getAllCategories() {
  const groups = new Map<string, FoodItem[]>();
  for (const food of getAllFoodPages()) {
    if (!food.category) continue;
    groups.set(food.category, [...(groups.get(food.category) ?? []), food]);
  }
  return [...groups]
    .map(([name, foods]) => ({ name, slug: categorySlug(name), foods: sortFoodsByCalories(foods) }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

// Like food and compare pages: indexed only with hand-written text.
export const isIndexedCategory = (slug: string) => Object.hasOwn(CATEGORY_INTROS, slug);
