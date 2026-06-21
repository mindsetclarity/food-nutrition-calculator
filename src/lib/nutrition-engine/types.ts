import type { SourceProvider, SourceSummary } from './sourceTypes';
import type { EngineWarning } from './warnings';
import type { EngineConfidence } from './confidence';

export type NutritionSourceType = "usda" | "local" | "curated" | "estimated" | "llm_parse" | "unknown";

export type NutritionServingUnit = "g" | "kg" | "oz" | "lb" | "cup" | "tbsp" | "tsp" | "piece" | "slice" | "serving" | "medium" | "small" | "large" | "bowl" | "unknown";

export interface NutritionNutrients {
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

export interface FoodServingSize {
  id: string;
  label: string;
  grams: number;
  unit: NutritionServingUnit;
  quantity: number;
  isDefault?: boolean;
}

export interface EngineFoodItem {
  id: string;
  slug?: string;
  displayName: string;
  canonicalName?: string;
  category?: string;
  source: SourceProvider;
  sourceLabel?: string;
  isEstimated?: boolean;
  nutrientsPer100g: NutritionNutrients;
  servingSizes?: FoodServingSize[];
  aliases?: string[];
  tags?: string[];
  preparationState?: string;
  defaultServingId?: string;
  warnings?: EngineWarning[];
}

export interface ResolvedFood {
  food: EngineFoodItem;
  matchedName: string;
  source: SourceProvider;
  sourceLabel: string;
  confidence: EngineConfidence;
  needsReview: boolean;
  matchReason?: string;
  warnings?: EngineWarning[];
}

export interface FoodQuantity {
  amount: number;
  unit: NutritionServingUnit;
  grams?: number;
  servingId?: string;
  originalText?: string;
  needsReview?: boolean;
  warning?: EngineWarning;
}

export interface CalculatedFoodItem {
  foodId: string;
  displayName: string;
  quantity: FoodQuantity;
  grams: number;
  nutrients: NutritionNutrients;
  source: SourceProvider;
  sourceLabel: string;
  confidence: EngineConfidence;
  warnings: EngineWarning[];
}

export interface NutritionTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  saturatedFat: number;
  cholesterol: number;
  potassium: number;
  calcium: number;
  iron: number;
  vitaminA: number;
  vitaminC: number;
}

export interface RecipeIngredientInput {
  originalText: string;
  foodName?: string;
  quantity?: number;
  unit?: string;
  notes?: string;
}

export interface ResolvedRecipeIngredient {
  originalText: string;
  resolvedFood?: ResolvedFood;
  quantity?: FoodQuantity;
  calculatedItem?: CalculatedFoodItem;
  confidence: EngineConfidence;
  needsReview: boolean;
  warnings: EngineWarning[];
}

export interface RecipeNutritionResult {
  recipeName?: string;
  servings: number;
  totalNutrition: NutritionTotals;
  perServingNutrition: NutritionTotals;
  ingredients: ResolvedRecipeIngredient[];
  sourceSummary: SourceSummary;
  warnings: EngineWarning[];
  confidence: EngineConfidence;
}

export interface MealNutritionResult {
  items: CalculatedFoodItem[];
  totals: NutritionTotals;
  sourceSummary: SourceSummary;
  warnings: EngineWarning[];
  confidence: EngineConfidence;
}

export interface CompareNutritionResult {
  foods: CalculatedFoodItem[];
  basis: string;
  nutrients: NutritionTotals[];
  sourceSummary: SourceSummary;
  warnings: EngineWarning[];
}
