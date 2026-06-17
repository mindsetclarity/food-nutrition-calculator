export type Unit = 'g' | 'oz' | 'lb' | 'serving' | 'cup' | 'tbsp' | 'tsp' | 'piece' | 'slice' | 'can' | 'bottle' | 'packet' | 'scoop';
export type Source = 'USDA' | 'Local' | 'LLM';

export interface NutritionInfo {
  calories: number; // kcal
  protein: number; // g
  carbs: number; // g
  fat: number; // g
  fiber: number; // g
  sugar?: number | null; // g
  sodium?: number | null; // mg
}

export interface FoodItem {
  id: string; // Will be FDC ID for USDA, or custom string for Local
  name: string;
  aliases?: string[];
  category: string;
  nutritionPer100g: NutritionInfo;
  defaultUnit: Unit;
  source: Source;
  standardUnits: {
    [key in Unit]?: number; // Weight in grams
  };
}

// 1 oz = 28.3495g
// 1 lb = 453.592g
const OZ = 28.35;
const LB = 453.59;

export const localFoods: FoodItem[] = [
  // Breakfast
  {
    id: 'local-scrambled-eggs',
    name: 'Scrambled Eggs',
    category: 'Breakfast',
    source: 'Local',
    nutritionPer100g: { calories: 148, protein: 9.9, carbs: 1.3, fat: 11, fiber: 0, sugar: 1.1, sodium: 168 },
    defaultUnit: 'piece', // typically 1 large egg scrambled is ~61g
    standardUnits: { 'g': 1, 'oz': OZ, 'piece': 61, 'serving': 122 }
  },
  {
    id: 'local-fried-egg',
    name: 'Fried Egg',
    category: 'Breakfast',
    source: 'Local',
    nutritionPer100g: { calories: 196, protein: 13.6, carbs: 0.8, fat: 14.8, fiber: 0, sugar: 0.4, sodium: 207 },
    defaultUnit: 'piece',
    standardUnits: { 'g': 1, 'oz': OZ, 'piece': 46 }
  },
  {
    id: 'local-bacon',
    name: 'Bacon (Cooked)',
    category: 'Breakfast',
    source: 'Local',
    nutritionPer100g: { calories: 541, protein: 37, carbs: 1.4, fat: 42, fiber: 0, sugar: 0, sodium: 1717 },
    defaultUnit: 'slice',
    standardUnits: { 'g': 1, 'oz': OZ, 'slice': 8 }
  },
  {
    id: 'local-oatmeal',
    name: 'Oatmeal (Cooked)',
    category: 'Breakfast',
    source: 'Local',
    nutritionPer100g: { calories: 71, protein: 2.5, carbs: 12, fat: 1.5, fiber: 1.7, sugar: 0.3, sodium: 49 },
    defaultUnit: 'cup',
    standardUnits: { 'g': 1, 'oz': OZ, 'cup': 234, 'serving': 234 }
  },
  {
    id: 'local-greek-yogurt',
    name: 'Greek Yogurt (Plain, Non-fat)',
    category: 'Breakfast',
    source: 'Local',
    nutritionPer100g: { calories: 59, protein: 10, carbs: 3.6, fat: 0.4, fiber: 0, sugar: 3.2, sodium: 36 },
    defaultUnit: 'cup',
    standardUnits: { 'g': 1, 'oz': OZ, 'cup': 245, 'serving': 170 }
  },
  {
    id: 'local-whole-milk',
    name: 'Whole Milk',
    category: 'Beverage',
    source: 'Local',
    nutritionPer100g: { calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3, fiber: 0, sugar: 5.1, sodium: 43 },
    defaultUnit: 'cup',
    standardUnits: { 'g': 1, 'oz': OZ, 'cup': 244 }
  },
  {
    id: 'local-orange-juice',
    name: 'Orange Juice',
    category: 'Beverage',
    source: 'Local',
    nutritionPer100g: { calories: 45, protein: 0.7, carbs: 10.4, fat: 0.2, fiber: 0.2, sugar: 8.4, sodium: 1 },
    defaultUnit: 'cup',
    standardUnits: { 'g': 1, 'oz': OZ, 'cup': 248 }
  },
  {
    id: 'local-toast-white',
    name: 'Toast (White Bread)',
    category: 'Breakfast',
    source: 'Local',
    nutritionPer100g: { calories: 293, protein: 9, carbs: 54, fat: 4.3, fiber: 2.5, sugar: 5.3, sodium: 512 },
    defaultUnit: 'slice',
    standardUnits: { 'g': 1, 'oz': OZ, 'slice': 22 }
  },
  {
    id: 'local-bagel',
    name: 'Bagel (Plain)',
    category: 'Breakfast',
    source: 'Local',
    nutritionPer100g: { calories: 275, protein: 10.6, carbs: 53, fat: 1.7, fiber: 2.2, sugar: 6.1, sodium: 439 },
    defaultUnit: 'piece',
    standardUnits: { 'g': 1, 'oz': OZ, 'piece': 105 }
  },
  
  // Lunch / Dinner
  {
    id: 'local-grilled-chicken-breast',
    name: 'Grilled Chicken Breast',
    category: 'Meat',
    source: 'Local',
    nutritionPer100g: { calories: 151, protein: 30.5, carbs: 0, fat: 3.6, fiber: 0, sugar: 0, sodium: 74 },
    defaultUnit: 'piece',
    standardUnits: { 'g': 1, 'oz': OZ, 'piece': 150, 'serving': 85 } // 3 oz serving
  },
  {
    id: 'local-ground-beef',
    name: 'Ground Beef (80% Lean, Cooked)',
    category: 'Meat',
    source: 'Local',
    nutritionPer100g: { calories: 254, protein: 25.8, carbs: 0, fat: 16.1, fiber: 0, sugar: 0, sodium: 76 },
    defaultUnit: 'serving',
    standardUnits: { 'g': 1, 'oz': OZ, 'serving': 85, 'lb': LB }
  },
  {
    id: 'local-salmon',
    name: 'Salmon (Cooked)',
    category: 'Meat',
    source: 'Local',
    nutritionPer100g: { calories: 206, protein: 22.1, carbs: 0, fat: 12.3, fiber: 0, sugar: 0, sodium: 61 },
    defaultUnit: 'serving',
    standardUnits: { 'g': 1, 'oz': OZ, 'serving': 85 }
  },
  {
    id: 'local-white-rice',
    name: 'White Rice (Cooked)',
    category: 'Grain',
    source: 'Local',
    nutritionPer100g: { calories: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4, sugar: 0.1, sodium: 1 },
    defaultUnit: 'cup',
    standardUnits: { 'g': 1, 'oz': OZ, 'cup': 158 }
  },
  {
    id: 'local-spaghetti-tomato',
    name: 'Spaghetti with Tomato Sauce',
    category: 'Dish',
    source: 'Local',
    nutritionPer100g: { calories: 104, protein: 3.5, carbs: 20, fat: 1.5, fiber: 1.5, sugar: 3, sodium: 200 },
    defaultUnit: 'cup',
    standardUnits: { 'g': 1, 'oz': OZ, 'cup': 250 }
  },
  {
    id: 'local-mac-cheese',
    name: 'Macaroni and Cheese',
    category: 'Dish',
    source: 'Local',
    nutritionPer100g: { calories: 164, protein: 7, carbs: 18, fat: 7.5, fiber: 1.2, sugar: 2, sodium: 345 },
    defaultUnit: 'cup',
    standardUnits: { 'g': 1, 'oz': OZ, 'cup': 190 }
  },
  {
    id: 'local-baked-potato',
    name: 'Baked Potato',
    category: 'Vegetable',
    source: 'Local',
    nutritionPer100g: { calories: 93, protein: 2.5, carbs: 21, fat: 0.1, fiber: 2.2, sugar: 1.2, sodium: 10 },
    defaultUnit: 'piece',
    standardUnits: { 'g': 1, 'oz': OZ, 'piece': 173 }
  },
  {
    id: 'local-broccoli',
    name: 'Broccoli (Cooked)',
    category: 'Vegetable',
    source: 'Local',
    nutritionPer100g: { calories: 35, protein: 2.4, carbs: 7.2, fat: 0.4, fiber: 3.3, sugar: 1.4, sodium: 41 },
    defaultUnit: 'cup',
    standardUnits: { 'g': 1, 'oz': OZ, 'cup': 156 }
  },
  {
    id: 'local-cheeseburger',
    name: 'Cheeseburger (Fast Food)',
    category: 'Dish',
    source: 'Local',
    nutritionPer100g: { calories: 264, protein: 14.8, carbs: 30, fat: 10, fiber: 1.3, sugar: 5.5, sodium: 531 },
    defaultUnit: 'piece',
    standardUnits: { 'g': 1, 'oz': OZ, 'piece': 114 }
  },
  {
    id: 'local-french-fries',
    name: 'French Fries',
    category: 'Dish',
    source: 'Local',
    nutritionPer100g: { calories: 312, protein: 3.4, carbs: 41, fat: 15, fiber: 3.8, sugar: 0.3, sodium: 210 },
    defaultUnit: 'serving',
    standardUnits: { 'g': 1, 'oz': OZ, 'serving': 117 } // medium fry
  },

  // Snacks & Others
  {
    id: 'local-peanut-butter',
    name: 'Peanut Butter',
    category: 'Snack',
    source: 'Local',
    nutritionPer100g: { calories: 588, protein: 25, carbs: 20, fat: 50, fiber: 6, sugar: 9, sodium: 17 },
    defaultUnit: 'tbsp',
    standardUnits: { 'g': 1, 'oz': OZ, 'tbsp': 16, 'tsp': 5 }
  },
  {
    id: 'local-potato-chips',
    name: 'Potato Chips',
    category: 'Snack',
    source: 'Local',
    nutritionPer100g: { calories: 536, protein: 7, carbs: 53, fat: 35, fiber: 4.8, sugar: 0.3, sodium: 526 },
    defaultUnit: 'oz',
    standardUnits: { 'g': 1, 'oz': OZ, 'serving': 28 } // 1 oz serving
  },
  {
    id: 'local-chocolate-chip-cookie',
    name: 'Chocolate Chip Cookie',
    category: 'Dessert',
    source: 'Local',
    nutritionPer100g: { calories: 488, protein: 5.5, carbs: 64, fat: 24, fiber: 2.8, sugar: 34, sodium: 340 },
    defaultUnit: 'piece',
    standardUnits: { 'g': 1, 'oz': OZ, 'piece': 16 }
  },
  {
    id: 'local-water',
    name: 'Water',
    category: 'Beverage',
    source: 'Local',
    nutritionPer100g: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0, sodium: 0 },
    defaultUnit: 'bottle',
    standardUnits: { 'g': 1, 'oz': 29.57, 'cup': 240, 'bottle': 500 }
  },
  {
    id: 'local-soda',
    name: 'Soda (Cola)',
    category: 'Beverage',
    source: 'Local',
    nutritionPer100g: { calories: 37, protein: 0, carbs: 9.6, fat: 0, fiber: 0, sugar: 9.6, sodium: 4 },
    defaultUnit: 'can',
    standardUnits: { 'g': 1, 'oz': 29.57, 'can': 368, 'bottle': 500 }
  }
];
