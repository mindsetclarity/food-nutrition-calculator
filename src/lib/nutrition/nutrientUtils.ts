import type { NutrientProfile } from './types';

export function safeNumber(value: number | null | undefined): number | null {
  if (value === null || value === undefined || isNaN(value)) return null;
  return value;
}

export function hasKnownNutrient(value: number | null | undefined): boolean {
  return safeNumber(value) !== null;
}

export function multiplyNutrient(value: number | null | undefined, factor: number): number | null {
  const num = safeNumber(value);
  if (num === null) return null;
  return num * factor;
}

export function roundCalories(value: number | null | undefined): number | null {
  const num = safeNumber(value);
  if (num === null) return null;
  return Math.round(num);
}

export function roundMacro(value: number | null | undefined): number | null {
  const num = safeNumber(value);
  if (num === null) return null;
  return Math.round(num * 10) / 10;
}

export function roundMicronutrient(value: number | null | undefined): number | null {
  const num = safeNumber(value);
  if (num === null) return null;
  return Math.round(num);
}

export function roundNutrient(value: number | null | undefined, nutrientKey: keyof NutrientProfile): number | null {
  switch (nutrientKey) {
    case 'calories':
      return roundCalories(value);
    case 'protein':
    case 'carbohydrates':
    case 'fat':
    case 'fiber':
    case 'sugar':
    case 'saturatedFat':
      return roundMacro(value);
    case 'sodium':
    case 'cholesterol':
    case 'potassium':
      return roundMicronutrient(value);
    default:
      return roundMacro(value);
  }
}

export function addNutrientValues(a: number | null | undefined, b: number | null | undefined): number | null {
  const safeA = safeNumber(a);
  const safeB = safeNumber(b);
  
  if (safeA === null && safeB === null) return null;
  if (safeA === null) return safeB;
  if (safeB === null) return safeA;
  
  return safeA + safeB;
}

export function createEmptyNutrientProfile(): NutrientProfile {
  return {
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
    sodium: 0,
    saturatedFat: 0,
    cholesterol: 0,
    potassium: 0,
  };
}

export function createNullNutrientProfile(): NutrientProfile {
  return {
    calories: null,
    protein: null,
    carbohydrates: null,
    fat: null,
    fiber: null,
    sugar: null,
    sodium: null,
    saturatedFat: null,
    cholesterol: null,
    potassium: null,
  };
}
