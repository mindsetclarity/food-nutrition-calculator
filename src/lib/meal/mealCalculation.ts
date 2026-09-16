import type { MealFoodItem, MealSectionState, MealWarning, MealSourceSummary } from './types';
import { calculateMealTotals } from '../nutrition/calculateNutrition';
import type { NutritionTotals } from '../nutrition/types';

export function calculateMealSectionTotals(items: MealFoodItem[]): NutritionTotals {
  return calculateMealTotals(items);
}

export function calculateDayTotals(sections: Record<string, MealSectionState>): NutritionTotals {
  const allItems: MealFoodItem[] = [];
  Object.values(sections).forEach(section => {
    allItems.push(...section.items);
  });
  
  return calculateMealTotals(allItems);
}

export function getMealSourceSummary(sections: Record<string, MealSectionState>): MealSourceSummary {
  let usda = 0;
  let local = 0;
  let unknown = 0;

  Object.values(sections).forEach(section => {
    section.items.forEach(item => {
      if (item.source === 'usda') usda++;
      else if (item.source === 'local') local++;
      else unknown++;
    });
  });

  return { usda, local, unknown };
}

export function getMealWarnings(sections: Record<string, MealSectionState>): MealWarning[] {
  const warnings: MealWarning[] = [];
  const sourceSummary = getMealSourceSummary(sections);
  
  if (sourceSummary.local > 0) {
    warnings.push({ type: 'warning', text: "Local fallback values are estimates." });
  }

  const dayTotals = calculateDayTotals(sections);
  if (dayTotals.partialData && dayTotals.partialData.length > 0) {
    warnings.push({ type: 'warning', text: "Some nutrients are unavailable." });
  }

  if (hasAnyMealItems(sections)) {
    warnings.push({ type: 'info', text: "Nutrition values vary by brand, preparation method, and serving size." });
  }

  return warnings;
}

export function calculateMealContributionPercent(mealCal: number, dayCal: number): number {
  if (dayCal <= 0) return 0;
  return Math.round((mealCal / dayCal) * 100);
}

export function countMealItems(sections: Record<string, MealSectionState>): number {
  let count = 0;
  Object.values(sections).forEach(s => count += s.items.length);
  return count;
}

export function hasAnyMealItems(sections: Record<string, MealSectionState>): boolean {
  return countMealItems(sections) > 0;
}
