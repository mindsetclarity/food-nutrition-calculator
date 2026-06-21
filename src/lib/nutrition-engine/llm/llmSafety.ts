import { createWarning } from '../warnings';
import type { EngineWarning } from '../warnings';

const FORBIDDEN_NUTRITION_FIELDS = [
  "calories", "kcal", "protein", "carbs", "carbohydrates", "fat",
  "fiber", "sugar", "sodium", "cholesterol", "micronutrients",
  "macros", "nutrients", "nutrition", "totalCalories", "perServing",
  "servingNutrition", "vitamin", "minerals"
];

export function containsForbiddenNutritionFields(value: any): boolean {
  if (!value || typeof value !== 'object') return false;
  
  for (const key of Object.keys(value)) {
    if (FORBIDDEN_NUTRITION_FIELDS.some(forbidden => key.toLowerCase().includes(forbidden.toLowerCase()))) {
      return true;
    }
  }
  return false;
}

export function stripNutritionClaims(value: any): any {
  if (!value || typeof value !== 'object') return value;
  
  const safeObj = { ...value };
  for (const key of Object.keys(safeObj)) {
    if (FORBIDDEN_NUTRITION_FIELDS.some(forbidden => key.toLowerCase().includes(forbidden.toLowerCase()))) {
      delete safeObj[key];
    }
  }
  return safeObj;
}

export function ensureNoFinalNutritionValues(output: any): { safeOutput: any, warnings: EngineWarning[] } {
  const warnings: EngineWarning[] = [];
  let wasStripped = false;

  let items = [];
  if (Array.isArray(output)) {
    items = output;
  } else if (output && Array.isArray(output.items)) {
    items = output.items;
  }

  const safeItems = items.map(item => {
    if (containsForbiddenNutritionFields(item)) {
      wasStripped = true;
      return stripNutritionClaims(item);
    }
    return item;
  });

  if (wasStripped) {
    warnings.push(createWarning("LLM_NUTRITION_FIELDS_STRIPPED" as any, "Nutrition values from AI were ignored. Final totals use food data only.", "info"));
  }

  return {
    safeOutput: Array.isArray(output) ? safeItems : { ...output, items: safeItems },
    warnings
  };
}

export function enforceLLMNutritionBoundary(output: any): { safeOutput: any, warnings: EngineWarning[] } {
  return ensureNoFinalNutritionValues(output);
}

export function redactSensitiveProviderError(error: any): string {
  // Never expose raw stack traces or API key errors
  if (!error) return "Unknown provider error";
  const msg = error.message || String(error);
  
  if (msg.toLowerCase().includes("key") || msg.toLowerCase().includes("token") || msg.toLowerCase().includes("unauthorized") || msg.toLowerCase().includes("401")) {
    return "LLM provider authentication error.";
  }
  
  return "AI parsing was unavailable, so the basic parser was used.";
}
