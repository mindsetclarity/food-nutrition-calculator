import { localFoods } from '../../data/foods';
import type { FoodItem } from './types';

export function getAllLocalFoods(): FoodItem[] {
  return localFoods;
}

export function getFoodBySlug(slug: string): FoodItem | undefined {
  return localFoods.find(food => food.slug === slug);
}

export function getFoodById(id: string): FoodItem | undefined {
  return localFoods.find(food => food.id === id);
}

export function searchLocalFoods(query: string): FoodItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return localFoods.filter(food => {
    if (food.name.toLowerCase().includes(q)) return true;
    if (food.displayName.toLowerCase().includes(q)) return true;
    if (food.slug.includes(q)) return true;
    if (food.aliases.some(alias => alias.toLowerCase().includes(q))) return true;
    return false;
  });
}

export function getFoodsByCategory(category: string): FoodItem[] {
  return localFoods.filter(food => food.category === category);
}
