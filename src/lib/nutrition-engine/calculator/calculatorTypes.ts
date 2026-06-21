import type { EngineConfidence } from '../confidence';
import type { EngineWarning } from '../warnings';
import type { NutritionTotals, EngineFoodItem, CalculatedFoodItem } from '../types';
import type { SourceSummary, SourceProvider } from '../sourceTypes';
import type { ResolvedServing } from '../quantity';

export interface CalculatorFoodInput {
  foodId?: string;
  slug?: string;
  query?: string;
  selectedSourceId?: string;
  quantity: number;
  unit: string;
  servingId?: string;
  originalText?: string;
}

export interface CalculatorSelectedItem {
  id: string; // unique instance ID in calculator state
  foodId: string;
  displayName: string;
  source: SourceProvider;
  sourceLabel: string;
  quantity: number;
  unit: string;
  resolvedServing: ResolvedServing;
  grams: number;
  nutrients: NutritionTotals;
  confidence: EngineConfidence;
  needsReview: boolean;
  warnings: EngineWarning[];
}

export interface CalculatorStateResult {
  items: CalculatorSelectedItem[];
  totals: NutritionTotals;
  sourceSummary: SourceSummary;
  warnings: EngineWarning[];
  confidence: EngineConfidence;
  needsReview: boolean;
  meta?: any;
}

export interface CalculatorAddFoodResult {
  selectedItem: CalculatorSelectedItem;
  updatedTotals?: CalculatorStateResult;
  warnings: EngineWarning[];
  confidence: EngineConfidence;
}

export interface CalculatorSearchForUIResult {
  results: any[]; // Compact results safe for UI
  sourceSummary: SourceSummary;
  warnings: EngineWarning[];
  fallbackUsed: boolean;
  meta?: any;
}
