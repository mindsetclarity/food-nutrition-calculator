export const NUTRITION_TRUTH_BOUNDARY = `
LLM output is advisory parsing assistance only. It must not be treated as verified nutrition data. USDA FoodData Central remains the primary nutrition source. The local database is fallback. The deterministic nutrition engine owns calories, macros, and totals.
`;

export function assertNutritionTruthBoundary(): string {
  return NUTRITION_TRUTH_BOUNDARY;
}

export function sanitizeUserMealText(input: string): string {
  return input.trim().substring(0, 1000);
}

export function validateLLMTask(task: string): boolean {
  return ['meal_parse', 'recipe_parse', 'food_query_suggestions', 'generic'].includes(task);
}

export function createNutritionTruthBoundarySystemPrompt(): string {
  return `
SAFETY BOUNDARY:
${NUTRITION_TRUTH_BOUNDARY}

Do not invent final nutrition values.
Express uncertainty where appropriate.
Never claim medical accuracy.
Focus on extracting food names, portions, preparation clues, and suggesting USDA search queries.
`;
}

export function redactSensitiveText(input: string): string {
  // Replace simple patterns if needed. For food descriptions, no-op for now.
  return input;
}

export function isUnsafePrompt(input: string): boolean {
  // Simple blocklist if needed
  return false;
}

export function createSafetyWarnings(response: any): string[] {
  const warnings: string[] = [];
  if (response?.text?.includes('blocked')) {
    warnings.push("Response may have been blocked or altered by safety filters.");
  }
  return warnings;
}
