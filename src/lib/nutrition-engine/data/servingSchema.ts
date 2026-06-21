import type { CuratedServingSize } from './foodSchema';

export type ServingUnit = 
  | "g" 
  | "kg" 
  | "oz" 
  | "lb" 
  | "cup" 
  | "tbsp" 
  | "tsp" 
  | "piece" 
  | "slice" 
  | "serving" 
  | "medium" 
  | "small" 
  | "large" 
  | "bowl" 
  | "can" 
  | "package" 
  | "unknown";

export function isValidServingUnit(unit: string): unit is ServingUnit {
  const validUnits: ServingUnit[] = [
    "g", "kg", "oz", "lb", "cup", "tbsp", "tsp", 
    "piece", "slice", "serving", "medium", "small", 
    "large", "bowl", "can", "package", "unknown"
  ];
  return validUnits.includes(unit as ServingUnit);
}

export function isValidServingSize(serving: CuratedServingSize): boolean {
  if (!serving.id || !serving.label || !serving.unit) return false;
  if (typeof serving.grams !== 'number' || serving.grams <= 0 || !isFinite(serving.grams)) return false;
  if (typeof serving.quantity !== 'number' || serving.quantity <= 0 || !isFinite(serving.quantity)) return false;
  return true;
}

export function getDefaultServing(servings: CuratedServingSize[]): CuratedServingSize | undefined {
  if (!servings || servings.length === 0) return undefined;
  return servings.find(s => s.isDefault) || servings[0];
}

export function normalizeServingUnit(unit: string): string {
  const normalized = unit.toLowerCase().trim();
  switch (normalized) {
    case 'gram':
    case 'grams':
      return 'g';
    case 'ounce':
    case 'ounces':
      return 'oz';
    case 'pound':
    case 'pounds':
      return 'lb';
    case 'tablespoon':
    case 'tablespoons':
      return 'tbsp';
    case 'teaspoon':
    case 'teaspoons':
      return 'tsp';
    case 'cups':
      return 'cup';
    case 'pieces':
      return 'piece';
    case 'slices':
      return 'slice';
    case 'servings':
      return 'serving';
    default:
      return normalized;
  }
}
