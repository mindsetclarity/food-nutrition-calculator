export const FoodCategories = [
  "Breakfast",
  "Eggs & Dairy",
  "Grains & Cereals",
  "Fruits",
  "Vegetables",
  "Meat & Poultry",
  "Seafood",
  "Beans & Plant Protein",
  "Prepared Meals",
  "Fast Food Style",
  "Snacks",
  "Desserts",
  "Beverages",
  "Condiments & Oils",
  "Nuts & Seeds",
  "Protein & Fitness Foods"
] as const;

export type FoodCategory = typeof FoodCategories[number];
