import type { FoodItem, CalculatedFoodItem, NutritionTotals } from '../nutrition/types';

export type MealSectionId = 'breakfast' | 'lunch' | 'dinner' | 'snacks' | 'drinks' | 'custom';

export interface MealSectionDefinition {
  id: MealSectionId;
  label: string;
  description: string;
  sortOrder: number;
}

export interface MealFoodItem extends CalculatedFoodItem {
  mealItemId: string; // Unique ID for the item in the UI
}

export interface MealSectionState {
  id: MealSectionId;
  items: MealFoodItem[];
  totals: NutritionTotals;
}

export interface MealDayState {
  sections: Record<MealSectionId, MealSectionState>;
  dayTotals: NutritionTotals;
}

export interface MealSourceSummary {
  usda: number;
  local: number;
  unknown: number;
}

export interface MealWarning {
  type: 'warning' | 'info';
  text: string;
}

export interface MealExampleItem {
  query: string;
  quantity: number;
  unit: string;
}

export interface MealExample {
  id: string;
  label: string;
  sectionId: MealSectionId;
  items: MealExampleItem[];
}
