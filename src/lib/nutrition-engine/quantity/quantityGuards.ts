import type { NormalizedQuantityUnit, ResolvedServing } from './quantityTypes';
import { normalizeQuantityUnit } from './unitConverter';

export function isFinitePositiveAmount(value: any): boolean {
  return typeof value === 'number' && isFinite(value) && value > 0;
}

export function clampReasonableAmount(value: number, mode: "calculator" | "recipe" | "meal" = "calculator"): number {
  if (!isFinitePositiveAmount(value)) return 1;
  const maxAmounts = {
    calculator: 10000,
    recipe: 100000,
    meal: 10000
  };
  const max = maxAmounts[mode] || 10000;
  return Math.min(value, max);
}

export function isSupportedQuantityUnit(unit: string): boolean {
  return normalizeQuantityUnit(unit) !== 'unknown';
}

export function isLikelyUnsafeAmount(amount: number, unit: NormalizedQuantityUnit): boolean {
  if (amount > 10000 && unit !== 'g') return true;
  if (amount > 100000 && unit === 'g') return true;
  return false;
}

export function sanitizeQuantityAmount(value: any): number {
  if (isFinitePositiveAmount(value)) return value;
  return 1;
}

export function ensureNoNaNGrams(value: any): number {
  if (typeof value === 'number' && isFinite(value) && value >= 0) return value;
  return 0; // fallback safe
}

export function validateResolvedServing(result: ResolvedServing): boolean {
  return (
    isFinitePositiveAmount(result.amount) &&
    isFinitePositiveAmount(result.grams) &&
    result.normalizedUnit !== undefined
  );
}
