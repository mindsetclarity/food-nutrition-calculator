import { EngineFoodItem, NutritionNutrients, FoodServingSize } from '../types';
import { SourceProvider, SourceQuality, SourceSummary, SourceAttribution } from '../sourceTypes';
import { EngineConfidence } from '../confidence';
import { EngineWarning } from '../warnings';
import { FoodSearchMode } from '../search/searchTypes';

export type NutritionDataProvider = "usda" | "local_curated" | "local_estimated" | "llm_parse" | "unknown";

export interface FoodSourceSearchInput {
  query: string;
  limit?: number;
  includeUsda?: boolean;
  includeLocal?: boolean;
  preferUsda?: boolean;
  category?: string;
  mode?: FoodSearchMode;
  requireCoreNutrients?: boolean;
}

export interface FoodSourceSearchResult {
  provider: NutritionDataProvider;
  providerFoodId: string;
  localId?: string;
  slug?: string;
  displayName: string;
  brandName?: string;
  category?: string;
  sourceLabel: string;
  sourceQuality: SourceQuality;
  isEstimated: boolean;
  nutrientsPer100g?: NutritionNutrients;
  servingSizes?: FoodServingSize[];
  preview?: {
    calories?: number;
    protein?: number;
    defaultServingLabel?: string;
  };
  confidence: EngineConfidence;
  warnings?: EngineWarning[];
  raw?: any; // internal/server-side only
}

export interface ResolvedFoodSource {
  provider: NutritionDataProvider;
  food: EngineFoodItem;
  sourceAttribution: SourceAttribution;
  confidence: EngineConfidence;
  warnings: EngineWarning[];
  rawProviderId?: string;
  resolvedAt: number;
}

export interface SourceResolverResult {
  query: string;
  usdaResults: FoodSourceSearchResult[];
  localResults: FoodSourceSearchResult[];
  mergedResults: FoodSourceSearchResult[];
  selected?: ResolvedFoodSource;
  sourceSummary: SourceSummary;
  warnings: EngineWarning[];
  fallbackUsed: boolean;
  meta?: any;
}

export interface USDAFoodSearchRaw {
  fdcId: number;
  description: string;
  brandOwner?: string;
  foodCategory?: string;
  dataType?: string;
  foodNutrients?: any[];
  foodMeasures?: any[];
  foodPortions?: any[];
}
