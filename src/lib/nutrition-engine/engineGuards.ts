import { NutritionNutrients, NutritionTotals } from './types';
import { SourceProvider } from './sourceTypes';

export function isFiniteNumber(value: any): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

export function safeNumber(value: any, fallback: number = 0): number {
  return isFiniteNumber(value) ? value : fallback;
}

export function safePositiveNumber(value: any, fallback: number = 0): number {
  const num = safeNumber(value, fallback);
  return num >= 0 ? num : 0;
}

export function sanitizeNutrientValue(value: any): number | null | undefined {
  if (value === null || value === undefined) return value;
  if (!isFiniteNumber(value)) return null;
  return value >= 0 ? value : 0;
}

export function sanitizeTotals(totals: NutritionTotals): NutritionTotals {
  return {
    calories: safePositiveNumber(totals.calories),
    protein: safePositiveNumber(totals.protein),
    carbs: safePositiveNumber(totals.carbs),
    fat: safePositiveNumber(totals.fat),
    fiber: safePositiveNumber(totals.fiber),
    sugar: safePositiveNumber(totals.sugar),
    sodium: safePositiveNumber(totals.sodium),
    saturatedFat: safePositiveNumber(totals.saturatedFat),
    cholesterol: safePositiveNumber(totals.cholesterol),
    potassium: safePositiveNumber(totals.potassium),
    calcium: safePositiveNumber(totals.calcium),
    iron: safePositiveNumber(totals.iron),
    vitaminA: safePositiveNumber(totals.vitaminA),
    vitaminC: safePositiveNumber(totals.vitaminC),
  };
}

export function isKnownSource(source: any): source is SourceProvider {
  const known: SourceProvider[] = ["usda", "local", "curated", "llm_parse", "estimated", "unknown"];
  return known.includes(source as SourceProvider);
}

export function normalizeSource(source: any): SourceProvider {
  return isKnownSource(source) ? source : "unknown";
}

export function isValidQuantity(quantity: any): boolean {
  return isFiniteNumber(quantity) && quantity > 0;
}

export function hasNutrientData(nutrients: NutritionNutrients): boolean {
  return Object.values(nutrients).some(v => isFiniteNumber(v));
}

export function hasPartialNutrientData(nutrients: NutritionNutrients): boolean {
  const values = Object.values(nutrients);
  const hasSome = values.some(v => isFiniteNumber(v));
  const hasNull = values.some(v => v === null || v === undefined);
  return hasSome && hasNull;
}

export function ensureArray<T>(value: T | T[] | undefined | null): T[] {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

export function ensureString(value: any): string {
  return typeof value === 'string' ? value : String(value || '');
}
