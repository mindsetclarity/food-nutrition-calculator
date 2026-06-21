export type CuratedFoodSource = 
  | "curated_us" 
  | "local" 
  | "estimated" 
  | "usda_derived" 
  | "unknown";

export type CuratedFoodCategory =
  | "breakfast"
  | "fruits"
  | "vegetables"
  | "grains_cereals"
  | "dairy_alternatives"
  | "protein_foods"
  | "beans_legumes"
  | "nuts_seeds"
  | "snacks"
  | "desserts"
  | "beverages"
  | "condiments_oils"
  | "prepared_meals"
  | "fast_food_style"
  | "sauces_dressings"
  | "baking_ingredients"
  | "soups_stews"
  | "other";

export type PreparationState =
  | "raw"
  | "cooked"
  | "boiled"
  | "baked"
  | "grilled"
  | "roasted"
  | "fried"
  | "steamed"
  | "canned"
  | "dry"
  | "frozen"
  | "prepared"
  | "unknown";

export interface CuratedNutrientsPer100g {
  calories?: number | null;
  protein?: number | null;
  carbs?: number | null;
  fat?: number | null;
  fiber?: number | null;
  sugar?: number | null;
  sodium?: number | null;
  saturatedFat?: number | null;
  cholesterol?: number | null;
  potassium?: number | null;
  calcium?: number | null;
  iron?: number | null;
  vitaminA?: number | null;
  vitaminC?: number | null;
}

export interface CuratedServingSize {
  id: string;
  label: string;
  grams: number;
  unit: string; // We'll type this strictly in servingSchema or just string if preferred, but instructions say CuratedServingSize id, label, grams, unit, quantity, isDefault?, notes?, source?. Let's define them.
  quantity: number;
  isDefault?: boolean;
  notes?: string;
  source?: string;
}

export type QualityFlag =
  | "complete_core_nutrients"
  | "partial_nutrients"
  | "estimated_serving"
  | "generic_food"
  | "brand_specific"
  | "local_estimate"
  | "needs_review"
  | "common_us_food";

export interface CuratedFoodItem {
  id: string;
  slug: string;
  displayName: string;
  canonicalName: string;
  searchName: string;
  category: CuratedFoodCategory;
  subcategory?: string;
  source: CuratedFoodSource;
  sourceLabel: string;
  isEstimated: boolean;
  nutrientsPer100g: CuratedNutrientsPer100g;
  servingSizes: CuratedServingSize[];
  aliases: string[];
  tags: string[];
  preparationState?: PreparationState;
  cookedState?: string;
  defaultServingId?: string;
  usdaQueryHints?: string[];
  compareGroup?: string;
  recipeUseCases?: string[];
  mealUseCases?: string[];
  density?: number;
  qualityFlags?: QualityFlag[];
  warnings?: string[];
  notes?: string;
  updatedAt?: string;
}
