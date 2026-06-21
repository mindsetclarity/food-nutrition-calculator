import type { CuratedFoodItem } from '../../lib/nutrition-engine/data/foodSchema';

export const fruitFoods: CuratedFoodItem[] = [
  {
    id: "fruit-banana",
    slug: "banana",
    displayName: "Banana",
    canonicalName: "Banana, raw",
    searchName: "banana raw",
    category: "fruits",
    source: "curated_us",
    sourceLabel: "Curated US local estimate",
    isEstimated: true,
    nutrientsPer100g: {
      calories: 89,
      protein: 1.09,
      carbs: 22.84,
      fat: 0.33,
      fiber: 2.6,
      sugar: 12.23,
      sodium: 1,
      saturatedFat: 0.11,
      potassium: 358,
    },
    servingSizes: [
      { id: "100g", label: "100 g", grams: 100, unit: "g", quantity: 100 },
      { id: "medium", label: "1 medium, 118 g", grams: 118, unit: "medium", quantity: 1, isDefault: true },
      { id: "small", label: "1 small, 101 g", grams: 101, unit: "small", quantity: 1 },
      { id: "large", label: "1 large, 136 g", grams: 136, unit: "large", quantity: 1 }
    ],
    aliases: ["bananas", "raw banana"],
    tags: ["raw", "vegan", "fruit"],
    preparationState: "raw",
    usdaQueryHints: ["banana raw", "bananas"],
    compareGroup: "fruit",
    mealUseCases: ["snack", "breakfast"],
    recipeUseCases: ["smoothie", "baking"],
    qualityFlags: ["complete_core_nutrients", "common_us_food", "local_estimate"]
  },
  {
    id: "fruit-apple",
    slug: "apple",
    displayName: "Apple",
    canonicalName: "Apple, raw, with skin",
    searchName: "apple raw",
    category: "fruits",
    source: "curated_us",
    sourceLabel: "Curated US local estimate",
    isEstimated: true,
    nutrientsPer100g: {
      calories: 52,
      protein: 0.26,
      carbs: 13.81,
      fat: 0.17,
      fiber: 2.4,
      sugar: 10.39,
      sodium: 1,
      potassium: 107
    },
    servingSizes: [
      { id: "100g", label: "100 g", grams: 100, unit: "g", quantity: 100 },
      { id: "medium", label: "1 medium, 182 g", grams: 182, unit: "medium", quantity: 1, isDefault: true }
    ],
    aliases: ["apples", "red apple", "green apple"],
    tags: ["raw", "vegan", "fruit"],
    preparationState: "raw",
    compareGroup: "fruit",
    mealUseCases: ["snack"],
    qualityFlags: ["complete_core_nutrients", "local_estimate"]
  },
  {
    id: "fruit-orange",
    slug: "orange",
    displayName: "Orange",
    canonicalName: "Orange, raw",
    searchName: "orange raw",
    category: "fruits",
    source: "curated_us",
    sourceLabel: "Curated US local estimate",
    isEstimated: true,
    nutrientsPer100g: {
      calories: 47,
      protein: 0.94,
      carbs: 11.75,
      fat: 0.12,
      fiber: 2.4,
      sugar: 9.35,
      vitaminC: 53.2
    },
    servingSizes: [
      { id: "100g", label: "100 g", grams: 100, unit: "g", quantity: 100 },
      { id: "medium", label: "1 medium, 131 g", grams: 131, unit: "medium", quantity: 1, isDefault: true }
    ],
    aliases: ["oranges", "navel orange"],
    tags: ["raw", "vegan", "fruit"],
    preparationState: "raw",
    compareGroup: "fruit",
    mealUseCases: ["snack"],
    qualityFlags: ["complete_core_nutrients", "local_estimate"]
  },
  {
    id: "fruit-strawberries",
    slug: "strawberries",
    displayName: "Strawberries",
    canonicalName: "Strawberries, raw",
    searchName: "strawberries raw",
    category: "fruits",
    source: "curated_us",
    sourceLabel: "Curated US local estimate",
    isEstimated: true,
    nutrientsPer100g: {
      calories: 32,
      protein: 0.67,
      carbs: 7.68,
      fat: 0.3,
      fiber: 2.0,
      sugar: 4.89,
      vitaminC: 58.8
    },
    servingSizes: [
      { id: "100g", label: "100 g", grams: 100, unit: "g", quantity: 100 },
      { id: "cup", label: "1 cup, whole, 144 g", grams: 144, unit: "cup", quantity: 1, isDefault: true }
    ],
    aliases: ["strawberry"],
    tags: ["raw", "vegan", "fruit"],
    preparationState: "raw",
    compareGroup: "fruit",
    mealUseCases: ["snack", "breakfast"],
    qualityFlags: ["complete_core_nutrients", "local_estimate"]
  },
  {
    id: "fruit-blueberries",
    slug: "blueberries",
    displayName: "Blueberries",
    canonicalName: "Blueberries, raw",
    searchName: "blueberries raw",
    category: "fruits",
    source: "curated_us",
    sourceLabel: "Curated US local estimate",
    isEstimated: true,
    nutrientsPer100g: {
      calories: 57,
      protein: 0.74,
      carbs: 14.49,
      fat: 0.33,
      fiber: 2.4,
      sugar: 9.96
    },
    servingSizes: [
      { id: "100g", label: "100 g", grams: 100, unit: "g", quantity: 100 },
      { id: "cup", label: "1 cup, 148 g", grams: 148, unit: "cup", quantity: 1, isDefault: true }
    ],
    aliases: ["blueberry"],
    tags: ["raw", "vegan", "fruit"],
    preparationState: "raw",
    compareGroup: "fruit",
    mealUseCases: ["snack", "breakfast"],
    qualityFlags: ["complete_core_nutrients", "local_estimate"]
  },
  {
    id: "fruit-avocado",
    slug: "avocado",
    displayName: "Avocado",
    canonicalName: "Avocado, raw",
    searchName: "avocado raw",
    category: "fruits", // Botanically a fruit
    source: "curated_us",
    sourceLabel: "Curated US local estimate",
    isEstimated: true,
    nutrientsPer100g: {
      calories: 160,
      protein: 2.0,
      carbs: 8.53,
      fat: 14.66,
      fiber: 6.7,
      sugar: 0.66,
      potassium: 485
    },
    servingSizes: [
      { id: "100g", label: "100 g", grams: 100, unit: "g", quantity: 100 },
      { id: "half", label: "1/2 medium, 100 g", grams: 100, unit: "medium", quantity: 0.5, isDefault: true }
    ],
    aliases: ["hass avocado"],
    tags: ["raw", "vegan", "fruit", "healthy fat"],
    preparationState: "raw",
    compareGroup: "fruit", // or 'vegetable' depending on culinary use
    mealUseCases: ["snack", "breakfast", "salad"],
    qualityFlags: ["complete_core_nutrients", "local_estimate"]
  }
];
