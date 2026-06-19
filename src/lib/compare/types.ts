import type { FoodItem } from '../nutrition/types';

export type CompareBasis = '100g' | 'serving';

export type CompareNutrientKey = 
  | 'calories'
  | 'protein'
  | 'carbohydrates'
  | 'fat'
  | 'fiber'
  | 'sugar'
  | 'sodium'
  | 'saturatedFat'
  | 'cholesterol'
  | 'potassium';

export interface CompareFood extends FoodItem {
  compareId: string; // Unique ID for the comparison instance
  selectedServing?: string; // If 'serving' basis is used
}

export interface CompareCell {
  foodId: string;
  value: number | null;
  formatted: string;
  label?: 'Highest' | 'Lowest' | 'Similar' | null;
}

export interface CompareNutrientRow {
  key: CompareNutrientKey;
  label: string;
  unit: string;
  cells: CompareCell[];
}

export interface CompareInsight {
  text: string;
  type: 'info' | 'warning' | 'neutral';
}

export interface CompareWarning {
  text: string;
  type: 'warning';
}

export interface CompareSourceSummary {
  usda: number;
  local: number;
  unknown: number;
}

export interface CompareResult {
  basis: CompareBasis;
  foods: CompareFood[];
  rows: CompareNutrientRow[];
  insights: CompareInsight[];
  warnings: CompareWarning[];
  sourceSummary: CompareSourceSummary;
}
