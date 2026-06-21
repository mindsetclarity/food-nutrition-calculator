import type { EngineFoodItem, NutritionServingUnit } from '../types';
import type { SourceProvider } from '../sourceTypes';
import type { EngineWarning } from '../warnings';
import type { EngineConfidence } from '../confidence';

export type FoodSearchMode = "calculator" | "recipe" | "directory" | "compare" | "meal";

export interface FoodSearchInput {
  query: string;
  limit?: number;
  category?: string;
  tags?: string[];
  preparationState?: string;
  includeEstimated?: boolean;
  includePartial?: boolean;
  requireCoreNutrients?: boolean;
  sourcePreference?: "any" | "local" | "curated" | "estimated";
  mode?: FoodSearchMode;
}

export type FoodSearchMatchType = 
  | "exact_name"
  | "exact_alias"
  | "synonym"
  | "starts_with_name"
  | "starts_with_alias"
  | "all_tokens"
  | "partial_tokens"
  | "category_match"
  | "tag_match"
  | "preparation_match"
  | "fuzzy"
  | "fallback";

export interface FoodSearchResult {
  food: EngineFoodItem;
  id: string;
  slug?: string;
  displayName: string;
  category?: string;
  source: SourceProvider;
  sourceLabel?: string;
  isEstimated?: boolean;
  caloriesPreview?: number;
  proteinPreview?: number;
  defaultServingLabel?: string;
  score: number;
  matchType: FoodSearchMatchType;
  matchReason: string;
  confidence: EngineConfidence;
  warnings?: EngineWarning[];
}

export interface FoodSearchResponse {
  query: string;
  normalizedQuery: string;
  results: FoodSearchResult[];
  total: number;
  returned: number;
  warnings?: EngineWarning[];
  meta?: any;
}

export interface SearchIndexedFood {
  food: EngineFoodItem;
  id: string;
  slug?: string;
  displayName: string;
  normalizedName: string;
  normalizedAliases: string[];
  normalizedSearchName: string;
  category?: string;
  tags: string[];
  source: SourceProvider;
  sourceLabel?: string;
  preparationState?: string;
  tokenSet: Set<string>;
  searchableText: string;
  caloriesPreview?: number;
  proteinPreview?: number;
  defaultServingLabel?: string;
}
