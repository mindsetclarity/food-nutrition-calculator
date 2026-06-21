import type { EngineWarning } from '../warnings';
import type { EngineConfidence } from '../confidence';
import type { SourceSummary } from '../sourceTypes';
import type { NutritionTotals, NutritionNutrients } from '../types';
import type { FoodSourceSearchResult } from '../sources/sourceTypes';
import type { ResolvedQuantity } from '../quantity/quantityTypes';

export interface RecipeOptions {
  preferUsda?: boolean;
  includeLocalFallback?: boolean;
  requireReviewForLowConfidence?: boolean;
  mode?: "recipe" | "meal" | "calculator";
  maxIngredients?: number;
  allowPartialResults?: boolean;
  parserMode?: "deterministic" | "llm_assisted" | "auto";
}

export interface RecipeInput {
  recipeName?: string;
  ingredientsText: string;
  servings: number;
  options?: RecipeOptions;
}

export interface IngredientLine {
  lineNumber: number;
  originalText: string;
  cleanedText: string;
  isEmpty: boolean;
  isComment?: boolean;
  warnings: EngineWarning[];
}

export interface ParsedIngredientLine {
  lineNumber: number;
  originalText: string;
  cleanedText: string;
  quantity?: number;
  unit?: string;
  foodText: string;
  preparation?: string;
  notes?: string;
  confidence: EngineConfidence;
  needsReview: boolean;
  warnings: EngineWarning[];
}

export interface ResolvedIngredient {
  lineNumber: number;
  originalText: string;
  parsed: ParsedIngredientLine;
  resolvedFood?: FoodSourceSearchResult;
  resolvedSource?: string;
  resolvedServing?: ResolvedQuantity;
  calculatedNutrition?: NutritionNutrients;
  status: "resolved" | "needs_review" | "unresolved" | "skipped";
  confidence: EngineConfidence;
  warnings: EngineWarning[];
}

export interface RecipeCalculationResult {
  recipeName?: string;
  servings: number;
  ingredients: ResolvedIngredient[];
  totalNutrition: NutritionTotals;
  perServingNutrition: NutritionTotals;
  sourceSummary: SourceSummary;
  confidence: EngineConfidence;
  warnings: EngineWarning[];
  meta?: any;
}
