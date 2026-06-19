import type { MealTotals } from '../nutrition/types';

export type NutritionLabelMode = "recipe" | "meal" | "food";

export interface NutritionLabelNutrients {
  calories: number | null;
  protein: number | null;
  carbohydrates: number | null;
  fat: number | null;
  fiber: number | null;
  sugar: number | null;
  sodium: number | null;
  saturatedFat?: number | null;
  transFat?: number | null;
  cholesterol?: number | null;
  addedSugars?: number | null;
  vitaminD?: number | null;
  calcium?: number | null;
  iron?: number | null;
  potassium?: number | null;
}

export interface NutritionLabelInput {
  title?: string;
  servingLabel?: string;
  servingsPerContainer?: number | string;
  nutrients: NutritionLabelNutrients;
  mode?: NutritionLabelMode;
  sourceSummary?: any;
  warnings?: string[];
  showPercentDailyValue?: boolean;
}

export interface NutritionLabelRow {
  label: string;
  amount: number | null;
  unit: string;
  percentDailyValue?: number | null;
  indentLevel: number;
  bold: boolean;
  optional: boolean;
  unavailable: boolean;
  nutrientKey: string;
}

export type DailyValueKey = 'totalFat' | 'saturatedFat' | 'cholesterol' | 'sodium' | 'totalCarbohydrate' | 'fiber' | 'addedSugars' | 'protein' | 'vitaminD' | 'calcium' | 'iron' | 'potassium';

export interface PercentDailyValueResult {
  percent: number | null;
  formatted: string | null;
}
