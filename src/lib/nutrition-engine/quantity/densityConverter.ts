import type { EngineFoodItem } from '../types';
import type { NormalizedQuantityUnit } from './quantityTypes';
import { isVolumeUnit } from './unitConverter';

export function canUseDensity(food: EngineFoodItem): boolean {
  // Wait, does EngineFoodItem have density? Yes, we added it in Phase 2 for CuratedFoodItem.
  // The interface might not have it yet, we should check.
  // We'll safely cast it or assume it might have it.
  const density = (food as any).density;
  return typeof density === 'number' && density > 0;
}

export function getVolumeMl(unit: NormalizedQuantityUnit): number | null {
  switch (unit) {
    case 'cup': return 240; // 1 US cup is ~240 ml
    case 'tbsp': return 15;
    case 'tsp': return 5;
    default: return null;
  }
}

export function convertVolumeToGramsWithDensity(amount: number, unit: NormalizedQuantityUnit, density: number): number | null {
  if (amount <= 0 || density <= 0) return null;
  const ml = getVolumeMl(unit);
  if (ml === null) return null;
  
  // density is assumed to be g/ml
  const grams = amount * ml * density;
  return grams;
}
