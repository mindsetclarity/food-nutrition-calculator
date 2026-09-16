import type { FoodItem } from '../nutrition/types';

export function filterFoodsByQuery(foods: FoodItem[] | undefined, query: string | undefined): FoodItem[] {
  const safeFoods = Array.isArray(foods) ? foods : [];
  if (!query) return safeFoods;
  
  const lowerQuery = String(query).toLowerCase();
  if (!lowerQuery) return safeFoods;
  
  return safeFoods.filter(food => {
    const nameMatch = food?.name?.toLowerCase().includes(lowerQuery) ?? false;
    const displayMatch = food?.displayName?.toLowerCase().includes(lowerQuery) ?? false;
    const aliasMatch = food?.aliases?.some(alias => alias?.toLowerCase().includes(lowerQuery)) ?? false;
    const categoryMatch = food?.category?.toLowerCase().includes(lowerQuery) ?? false;
    
    return nameMatch || displayMatch || aliasMatch || categoryMatch;
  });
}

export function filterFoodsByCategory(foods: FoodItem[] | undefined, category: string | undefined): FoodItem[] {
  const safeFoods = Array.isArray(foods) ? foods : [];
  if (!category || category === 'All' || category === '') return safeFoods;
  return safeFoods.filter(food => food?.category === category);
}

export function sortFoodsForDirectory(foods: FoodItem[] | undefined): FoodItem[] {
  const safeFoods = Array.isArray(foods) ? foods : [];
  // Simple alphabetical sort by display name
  return [...safeFoods].sort((a, b) => {
    const nameA = String(a?.displayName || a?.name || "");
    const nameB = String(b?.displayName || b?.name || "");
    return nameA.localeCompare(nameB);
  });
}

export function getUniqueCategories(foods: FoodItem[] | undefined): string[] {
  const safeFoods = Array.isArray(foods) ? foods : [];
  const categories = new Set(
    safeFoods
      .map(food => food?.category)
      .filter((c): c is string => Boolean(c))
  );
  return Array.from(categories).sort();
}
