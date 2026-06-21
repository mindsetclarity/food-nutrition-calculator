import type { EngineFoodItem } from '../types';
import type { EngineConfidence } from '../confidence';
import type { EngineWarning } from '../warnings';
import type { SourceProvider } from '../sourceTypes';

export type QuantityUnit = 
  | "g" | "gram" | "grams"
  | "kg" | "kilogram" | "kilograms"
  | "oz" | "ounce" | "ounces"
  | "lb" | "lbs" | "pound" | "pounds"
  | "cup" | "cups"
  | "tbsp" | "tablespoon" | "tablespoons"
  | "tsp" | "teaspoon" | "teaspoons"
  | "piece" | "pieces"
  | "slice" | "slices"
  | "serving" | "servings"
  | "medium" | "small" | "large"
  | "bowl" | "can" | "package"
  | "unknown" | string;

export type NormalizedQuantityUnit = 
  | "g" | "kg" | "oz" | "lb"
  | "cup" | "tbsp" | "tsp"
  | "piece" | "slice" | "serving"
  | "medium" | "small" | "large"
  | "bowl" | "can" | "package"
  | "unknown";

export interface ParsedQuantity {
  originalText?: string;
  amount: number;
  unit: string;
  normalizedUnit: NormalizedQuantityUnit;
  foodText?: string;
  confidence: EngineConfidence;
  needsReview: boolean;
  warnings: EngineWarning[];
}

export interface ServingResolutionInput {
  food: EngineFoodItem;
  amount: number;
  unit: string;
  servingId?: string;
  originalText?: string;
  allowEstimated?: boolean;
  mode?: "calculator" | "recipe" | "meal";
}

export interface ResolvedServing {
  amount: number;
  unit: string;
  normalizedUnit: NormalizedQuantityUnit;
  grams: number;
  servingId?: string;
  servingLabel?: string;
  source: SourceProvider;
  isEstimated: boolean;
  confidence: EngineConfidence;
  needsReview: boolean;
  warnings: EngineWarning[];
}

export interface GramConversionResult {
  ok: boolean;
  grams?: number;
  warning?: EngineWarning;
  needsReview?: boolean;
  source: SourceProvider;
}

export interface QuantityParseResult {
  parsed: ParsedQuantity;
  remainingFoodText?: string;
  warnings: EngineWarning[];
  confidence: EngineConfidence;
}
