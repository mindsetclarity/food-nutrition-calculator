// src/lib/safety/nutritionGuards.ts

export function isFinitePositiveNumber(value: any): boolean {
  return typeof value === 'number' && !isNaN(value) && isFinite(value) && value >= 0;
}

export function safeNumber(value: any, fallback: number | null = null): number | null {
  if (value === null || value === undefined) return fallback;
  const num = Number(value);
  if (isNaN(num) || !isFinite(num) || num < 0) return fallback;
  return num;
}

export function safeNutrientValue(value: any): number | null {
  return safeNumber(value, null);
}

export function hasPartialNutrition(nutrients: Record<string, any> | null | undefined): boolean {
  if (!nutrients) return true;
  // Check if core macros are completely missing
  return (
    nutrients.calories === null || nutrients.calories === undefined ||
    nutrients.protein === null || nutrients.protein === undefined ||
    nutrients.carbohydrates === null || nutrients.carbohydrates === undefined ||
    nutrients.fat === null || nutrients.fat === undefined
  );
}

export function sanitizeNutritionTotals(totals: Record<string, number>): Record<string, number> {
  const sanitized: Record<string, number> = {};
  for (const [key, val] of Object.entries(totals)) {
    sanitized[key] = safeNumber(val, 0) as number;
  }
  return sanitized;
}
