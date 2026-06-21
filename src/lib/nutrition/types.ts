export type FoodSource = "local" | "usda" | "llm_estimate";

export interface NutrientProfile {
  calories: number | null;
  protein: number | null;
  carbohydrates: number | null;
  fat: number | null;
  fiber?: number | null;
  sugar?: number | null;
  sodium?: number | null;
  saturatedFat?: number | null;
  cholesterol?: number | null;
  potassium?: number | null;
}

export interface ServingSize {
  id?: string;
  unit: string;
  label: string;
  grams: number;
  quantity?: number;
  isDefault?: boolean;
}

export interface FoodItem {
  id: string;
  slug: string;
  name: string; // Keep for backward compatibility
  searchName: string;
  displayName: string;
  aliases: string[];
  category: string;
  subcategory?: string;
  description?: string;
  source: FoodSource;
  sourceLabel: string;
  isEstimated: boolean;
  defaultUnit?: string;
  defaultQuantity?: number;
  servingSizes: ServingSize[];
  nutrientsPer100g: NutrientProfile;
  tags?: string[];
  commonNames?: string[];
  brandType?: string;
  preparationState?: string;
  cookedState?: string;
  defaultServing?: string;
  usdaQueryHints?: string[];
  compareGroup?: string;
  recipeIngredientType?: string;
  mealUseCases?: string[];
  density?: number;
  notes?: string;
  warnings?: string[];
  updatedAt?: string;
  commonUses?: string[];
  usdaSearchTerms?: string[];
  usda?: {
    fdcId: number;
    dataType?: string;
    brandName?: string;
    publicationDate?: string;
  };
}

export interface CalculationInput {
  food: FoodItem;
  quantity: number;
  unit: string;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface CalculatedFoodItem {
  id: string; // usually distinct from foodId if it's a line item in a meal
  foodId: string;
  slug: string;
  displayName: string;
  quantity: number;
  unit: string;
  grams: number;
  nutrients: NutrientProfile;
  source: FoodSource;
  sourceLabel: string;
  isEstimated: boolean;
  servingUsed?: ServingSize;
  warnings: string[];
  validation: ValidationResult;
}

export interface SourceSummary {
  usda: number;
  local: number;
  llmEstimate: number;
  unknown: number;
  total: number;
  label: string;
  hasEstimates: boolean;
  hasLLMEstimates: boolean;
  warnings: string[];
}

export interface NutritionTotals {
  nutrients: NutrientProfile;
  calories: number;
  itemCount: number;
  totalGrams: number;
  sourceSummary: SourceSummary;
  warnings: string[];
  partialData: string[]; // List of nutrients that had null values in some but not all items
  invalidItems: CalculatedFoodItem[];
}

