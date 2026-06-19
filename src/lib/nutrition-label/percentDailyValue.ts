import { DAILY_VALUES } from './dailyValues';
import type { DailyValueKey, PercentDailyValueResult } from './types';

export function getDailyValueForNutrient(key: DailyValueKey): number | null {
  return DAILY_VALUES[key] || null;
}

export function calculatePercentDailyValue(value: number | null | undefined, dailyValue: number | null): number | null {
  if (value === null || value === undefined || dailyValue === null || dailyValue <= 0) return null;
  return Math.round((value / dailyValue) * 100);
}

export function formatPercentDailyValue(percent: number | null): string | null {
  if (percent === null) return null;
  return `${percent}%`;
}

export function shouldShowPercentDailyValue(key: DailyValueKey, value: number | null | undefined): boolean {
  if (value === null || value === undefined) return false;
  const dv = getDailyValueForNutrient(key);
  return dv !== null && dv > 0;
}
