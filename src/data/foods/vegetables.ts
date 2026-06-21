import type { CuratedFoodItem } from '../../lib/nutrition-engine/data/foodSchema';

export const vegetableFoods: CuratedFoodItem[] = [
  {
    id: "veg-broccoli-raw",
    slug: "broccoli-raw",
    displayName: "Broccoli (Raw)",
    canonicalName: "Broccoli, raw",
    searchName: "broccoli raw",
    category: "vegetables",
    source: "curated_us",
    sourceLabel: "Curated US local estimate",
    isEstimated: true,
    nutrientsPer100g: {
      calories: 34,
      protein: 2.82,
      carbs: 6.64,
      fat: 0.37,
      fiber: 2.6,
      sugar: 1.7
    },
    servingSizes: [
      { id: "100g", label: "100 g", grams: 100, unit: "g", quantity: 100 },
      { id: "cup", label: "1 cup chopped, 91 g", grams: 91, unit: "cup", quantity: 1, isDefault: true }
    ],
    aliases: ["raw broccoli"],
    tags: ["raw", "vegan", "vegetable"],
    preparationState: "raw",
    compareGroup: "vegetable",
    mealUseCases: ["snack", "salad"],
    qualityFlags: ["complete_core_nutrients", "local_estimate"]
  }
];
