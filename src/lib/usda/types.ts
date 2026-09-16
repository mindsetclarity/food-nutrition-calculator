import type { FoodItem, NutrientProfile } from '../nutrition/types';

export interface UsdaSearchFood {
  fdcId: number;
  description: string;
  dataType?: string;
  brandName?: string;
  foodCategory?: string;
  foodNutrients?: UsdaSearchNutrient[];
}

export interface UsdaSearchNutrient {
  nutrientId: number;
  nutrientName: string;
  nutrientNumber: string;
  unitName: string;
  value: number;
}

export interface UsdaSearchResponse {
  totalHits: number;
  currentPage: number;
  totalPages: number;
  foods: UsdaSearchFood[];
}

export interface UsdaFoodDetails {
  fdcId: number;
  description: string;
  dataType?: string;
  brandName?: string;
  foodCategory?: { description: string };
  publicationDate?: string;
  servingSize?: number;
  servingSizeUnit?: string;
  householdServingFullText?: string;
  foodNutrients?: UsdaDetailsNutrient[];
}

export interface UsdaDetailsNutrient {
  nutrient: {
    id: number;
    number: string;
    name: string;
    unitName: string;
  };
  amount?: number;
}

export interface NormalizedSearchResult {
  id: string;
  fdcId: number;
  slug: string;
  name: string;
  displayName: string;
  description: string;
  brandName: string | null;
  dataType: string | null;
  source: 'usda';
  sourceLabel: 'USDA FoodData Central';
  isEstimated: boolean;
  nutrientsPreview: Partial<NutrientProfile>;
}

export interface UsdaApiResponse<T> {
  ok: boolean;
  data?: T;
  error?: string;
}
