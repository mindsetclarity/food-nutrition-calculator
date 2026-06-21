import type { RecipeInput } from './recipeTypes';
import { createWarning } from '../warnings';

export function sanitizeRecipeName(name?: string): string {
  if (!name) return "";
  return name.trim().substring(0, 100);
}

export function sanitizeIngredientsText(text?: string): string {
  if (!text) return "";
  return text.trim().substring(0, 10000);
}

export function validateServingsInput(servings: any): number {
  if (typeof servings === 'number' && !isNaN(servings) && servings > 0) {
    return servings;
  }
  if (typeof servings === 'string') {
    const parsed = parseFloat(servings);
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }
  return 1;
}

export function validateRecipeInput(input: any): RecipeInput {
  return {
    recipeName: sanitizeRecipeName(input?.recipeName),
    ingredientsText: sanitizeIngredientsText(input?.ingredientsText),
    servings: validateServingsInput(input?.servings),
    options: input?.options || {}
  };
}

export function clampMaxIngredientLines(lines: string[], max: number = 50): string[] {
  return lines.slice(0, max);
}

export function isLikelyInstructionLine(line: string): boolean {
  const lower = line.toLowerCase();
  const instructions = ["preheat", "bake", "stir", "cook", "boil", "mix", "combine", "serve"];
  return instructions.some(i => lower.startsWith(i));
}

export function shouldSkipIngredientLine(line: string): boolean {
  if (!line.trim()) return true;
  if (isLikelyInstructionLine(line)) return true;
  return false;
}
