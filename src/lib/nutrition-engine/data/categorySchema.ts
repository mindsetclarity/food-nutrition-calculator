import type { CuratedFoodCategory } from './foodSchema';

export interface FoodCategoryDefinition {
  id: CuratedFoodCategory;
  label: string;
  description: string;
  order: number;
  icon?: string;
  examples?: string[];
  isCoreCategory: boolean;
}

export const FOOD_CATEGORIES: Record<CuratedFoodCategory, FoodCategoryDefinition> = {
  breakfast: {
    id: "breakfast",
    label: "Breakfast",
    description: "Breakfast foods and cereals",
    order: 1,
    isCoreCategory: true,
  },
  fruits: {
    id: "fruits",
    label: "Fruits",
    description: "Fresh, frozen, and dried fruits",
    order: 2,
    isCoreCategory: true,
  },
  vegetables: {
    id: "vegetables",
    label: "Vegetables",
    description: "Fresh, frozen, and canned vegetables",
    order: 3,
    isCoreCategory: true,
  },
  grains_cereals: {
    id: "grains_cereals",
    label: "Grains & Cereals",
    description: "Rice, pasta, bread, and grains",
    order: 4,
    isCoreCategory: true,
  },
  dairy_alternatives: {
    id: "dairy_alternatives",
    label: "Dairy & Alternatives",
    description: "Milk, cheese, yogurt, and plant-based alternatives",
    order: 5,
    isCoreCategory: true,
  },
  protein_foods: {
    id: "protein_foods",
    label: "Protein Foods",
    description: "Meat, poultry, seafood, eggs, and plant-based meats",
    order: 6,
    isCoreCategory: true,
  },
  beans_legumes: {
    id: "beans_legumes",
    label: "Beans & Legumes",
    description: "Lentils, chickpeas, and beans",
    order: 7,
    isCoreCategory: true,
  },
  nuts_seeds: {
    id: "nuts_seeds",
    label: "Nuts & Seeds",
    description: "Nuts, seeds, and nut butters",
    order: 8,
    isCoreCategory: true,
  },
  snacks: {
    id: "snacks",
    label: "Snacks",
    description: "Chips, crackers, and snack foods",
    order: 9,
    isCoreCategory: false,
  },
  desserts: {
    id: "desserts",
    label: "Desserts",
    description: "Sweets, pastries, and ice cream",
    order: 10,
    isCoreCategory: false,
  },
  beverages: {
    id: "beverages",
    label: "Beverages",
    description: "Drinks, juices, and coffee/tea",
    order: 11,
    isCoreCategory: false,
  },
  condiments_oils: {
    id: "condiments_oils",
    label: "Condiments & Oils",
    description: "Cooking oils, spices, and condiments",
    order: 12,
    isCoreCategory: false,
  },
  prepared_meals: {
    id: "prepared_meals",
    label: "Prepared Meals",
    description: "Ready-to-eat and frozen meals",
    order: 13,
    isCoreCategory: false,
  },
  fast_food_style: {
    id: "fast_food_style",
    label: "Fast Food Style",
    description: "Burgers, pizza, and fast food items",
    order: 14,
    isCoreCategory: false,
  },
  sauces_dressings: {
    id: "sauces_dressings",
    label: "Sauces & Dressings",
    description: "Salad dressings, pasta sauces, and gravies",
    order: 15,
    isCoreCategory: false,
  },
  baking_ingredients: {
    id: "baking_ingredients",
    label: "Baking Ingredients",
    description: "Flour, sugar, and baking supplies",
    order: 16,
    isCoreCategory: false,
  },
  soups_stews: {
    id: "soups_stews",
    label: "Soups & Stews",
    description: "Canned and prepared soups",
    order: 17,
    isCoreCategory: false,
  },
  other: {
    id: "other",
    label: "Other",
    description: "Other food items",
    order: 18,
    isCoreCategory: false,
  }
};

export function getFoodCategoryById(id: string): FoodCategoryDefinition | undefined {
  if (isValidFoodCategory(id)) {
    return FOOD_CATEGORIES[id];
  }
  return undefined;
}

export function getFoodCategoryLabel(id: string): string {
  const category = getFoodCategoryById(id);
  return category ? category.label : "Unknown Category";
}

export function isValidFoodCategory(id: string): id is CuratedFoodCategory {
  return id in FOOD_CATEGORIES;
}
