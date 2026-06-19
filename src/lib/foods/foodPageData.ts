import { localFoods } from '../../data/foods';
import type { FoodItem } from '../nutrition/types';

export function getAllFoodPages(): FoodItem[] {
  return localFoods.filter(food => food.slug);
}

export function getFoodPageBySlug(slug: string): FoodItem | undefined {
  return localFoods.find(food => food.slug === slug);
}

export function getRelatedFoods(food: FoodItem, limit: number = 4): FoodItem[] {
  return localFoods
    .filter(f => f.slug !== food.slug && f.category === food.category)
    .slice(0, limit);
}

export function getFoodCategoryCounts(): Record<string, number> {
  return localFoods.reduce((acc, food) => {
    if (food.category) {
      acc[food.category] = (acc[food.category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
}

export function getFeaturedFoods(): FoodItem[] {
  return localFoods.slice(0, 8);
}

export function getPopularFoods(): FoodItem[] {
  // Just returning a few common foods for now
  const popularSlugs = ['banana', 'grilled-chicken-breast', 'greek-yogurt-plain-nonfat', 'oatmeal-cooked'];
  return localFoods.filter(f => popularSlugs.includes(f.slug || ''));
}
