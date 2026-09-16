import type { CalculationInput, ValidationResult } from './types';
import { resolveQuantityToGrams } from './unitConversions';

export function validateCalculationInput(input: Partial<CalculationInput>): ValidationResult {
  if (!input.food) {
    return { isValid: false, error: "Food data is missing." };
  }

  if (!input.food.nutrientsPer100g) {
    return { isValid: false, error: "Nutrition data is missing for this food." };
  }

  if (typeof input.quantity !== 'number' || isNaN(input.quantity) || input.quantity <= 0) {
    return { isValid: false, error: "Enter a quantity greater than zero." };
  }

  if (!input.unit || input.unit.trim() === '') {
    return { isValid: false, error: "Choose a unit for this food." };
  }

  const resolved = resolveQuantityToGrams(input.food, input.quantity, input.unit);
  if (resolved.error || resolved.grams === null) {
    return { isValid: false, error: resolved.error || "This unit is not available for the selected food." };
  }

  return { isValid: true };
}
