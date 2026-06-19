/**
 * These are general adult/children 4+ Daily Value references.
 * They should be verified against current FDA guidance before commercial use.
 * This is for personal estimation display, not legal packaging compliance.
 */
import type { DailyValueKey } from './types';

export const DAILY_VALUES: Record<DailyValueKey, number> = {
  totalFat: 78, // g
  saturatedFat: 20, // g
  cholesterol: 300, // mg
  sodium: 2300, // mg
  totalCarbohydrate: 275, // g
  fiber: 28, // g
  addedSugars: 50, // g
  protein: 50, // g (using 50g as general DV for adults)
  vitaminD: 20, // mcg
  calcium: 1300, // mg
  iron: 18, // mg
  potassium: 4700 // mg
};
