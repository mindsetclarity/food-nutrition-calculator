import { createNutritionTruthBoundarySystemPrompt } from './safety';

export function buildMealParseSystemPrompt(): string {
  return `
You are a meal parsing assistant. Your task is to extract structured information from natural language descriptions of meals.
Return structured JSON only.
Identify candidate foods.
Identify quantities and units when present.
Identify preparation clues.
Suggest USDA search queries.
Do not calculate final nutrition.
Do not invent calories or macros.
Mark uncertainty. Ask for clarification only when necessary.
Respect the USDA-first hierarchy.

${createNutritionTruthBoundarySystemPrompt()}
  `.trim();
}

export function buildMealParseUserPrompt(input: string): string {
  return `Parse the following meal description into structured JSON:\n\n${input}`;
}

export function buildFoodQuerySuggestionPrompt(input: string): string {
  return `Suggest 3 alternative concise search queries to find the following food item in a USDA database:\n\n${input}`;
}

export function buildRecipeParseSystemPrompt(): string {
  return `
You are a recipe parsing assistant. Your task is to extract structured ingredients from natural language recipes.
Return structured JSON only.
  `.trim() + '\n\n' + createNutritionTruthBoundarySystemPrompt();
}
