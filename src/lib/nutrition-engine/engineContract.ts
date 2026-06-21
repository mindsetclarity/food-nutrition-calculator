import type { EngineResult, EngineSuccess, EngineFailure } from './resultTypes';
import type { 
  EngineFoodItem, 
  ResolvedFood, 
  CalculatedFoodItem, 
  NutritionTotals, 
  RecipeIngredientInput, 
  ResolvedRecipeIngredient, 
  RecipeNutritionResult, 
  MealNutritionResult 
} from './types';
import type { SourceSummary } from './sourceTypes';
import { resolveBestFoodSource } from './sources';
import { calculateRecipeNutrition } from './recipe';
import type { RecipeInput, RecipeCalculationResult } from './recipe';
import { searchLocalFoods } from './search';
import type { FoodSearchInput, FoodSearchResponse } from './search';
import { 
  parseQuantityText, 
  resolveServingToGrams 
} from './quantity';
import type {
  QuantityParseResult, 
  ServingResolutionInput, 
  ResolvedServing
} from './quantity';
import { resolveFoodSources } from './sources';
import { parseFoodTextWithLLM } from './llm';

/**
 * Central search entry.
 * Phase 4: USDA + Local Source Resolver handles the search.
 */
export async function searchFoodsEngine(input: FoodSearchInput): Promise<EngineResult<FoodSearchResponse>> {
  try {
    const res = await resolveFoodSources(input);
    if (!res.ok) {
      return { ok: false, error: res.error, warnings: res.warnings, fallbackAvailable: res.fallbackAvailable };
    }
    
    // Adapt back to FoodSearchResponse for existing search interface contract compatibility
    const results = res.data.mergedResults.map((mr, idx) => ({
      food: {
        id: mr.providerFoodId,
        displayName: mr.displayName,
        source: mr.provider === 'usda' ? 'usda' : 'local' as any,
        sourceLabel: mr.sourceLabel,
        nutrientsPer100g: mr.nutrientsPer100g || {},
      },
      id: mr.providerFoodId,
      displayName: mr.displayName,
      source: mr.provider === 'usda' ? 'usda' : 'local' as any,
      sourceLabel: mr.sourceLabel,
      score: 1000 - idx,
      matchType: "exact_name" as any,
      matchReason: "Source resolver match",
      confidence: mr.confidence,
      warnings: mr.warnings
    }));

    return {
      ok: true,
      data: {
        query: input.query,
        normalizedQuery: input.query,
        results,
        total: results.length,
        returned: results.length,
        warnings: res.data.warnings
      },
      warnings: res.data.warnings,
      sourceSummary: res.data.sourceSummary,
      confidence: res.confidence || { level: "high", reasons: [], needsReview: false }
    };
  } catch (error: any) {
    return {
      ok: false,
      error: {
        code: "INTERNAL_ENGINE_ERROR",
        message: error.message || "Unknown error in searchFoodsEngine",
        safeMessage: "An error occurred while searching for foods.",
        recoverable: true
      },
      warnings: []
    };
  }
}

/**
 * Phase 5 Quantity Parsing
 */
export async function parseQuantityEngine(input: { text: string }): Promise<EngineResult<QuantityParseResult>> {
  try {
    const result = parseQuantityText(input.text);
    return { ok: true, data: result, warnings: result.warnings };
  } catch (error: any) {
    return {
      ok: false,
      error: { code: "QUANTITY_PARSE_ERROR", message: error.message, safeMessage: "Could not parse quantity." },
      warnings: []
    };
  }
}

/**
 * Phase 5 Serving Resolution
 */
export async function resolveServingEngine(input: ServingResolutionInput): Promise<EngineResult<ResolvedServing>> {
  try {
    const result = resolveServingToGrams(input);
    return { ok: true, data: result, warnings: result.warnings };
  } catch (error: any) {
    return {
      ok: false,
      error: { code: "SERVING_RESOLVE_ERROR", message: error.message, safeMessage: "Could not resolve serving size." },
      warnings: []
    };
  }
}

/**
 * Future single food calculation.
 */
export async function calculateFoodItemEngine(input: { resolvedFood: ResolvedFood; amount: number; unit: string }): Promise<EngineResult<CalculatedFoodItem>> {
  throw new Error("calculateFoodItemEngine not implemented in Phase 1");
}

/**
 * Future calculator/meal totals.
 */
export async function calculateMealTotalsEngine(input: { items: CalculatedFoodItem[] }): Promise<EngineResult<MealNutritionResult>> {
  throw new Error("calculateMealTotalsEngine not implemented in Phase 1");
}

/**
 * Future meal parser.
 */
export async function parseMealEngine(text: string): Promise<EngineResult<any>> {
  return await parseFoodTextWithLLM({
    text,
    mode: "meal"
  });
}

/**
 * Future ingredient resolver.
 */
export async function parseRecipeEngine(input: { recipeText: string }): Promise<EngineResult<RecipeIngredientInput[]>> {
  throw new Error("parseRecipeEngine not implemented in Phase 1");
}

/**
 * Future ingredient resolver.
 */
export async function resolveRecipeIngredientsEngine(input: { ingredients: RecipeIngredientInput[] }): Promise<EngineResult<ResolvedRecipeIngredient[]>> {
  throw new Error("resolveRecipeIngredientsEngine not implemented in Phase 1");
}

/**
 * Future recipe totals and per-serving values.
 */
export async function calculateRecipeNutritionEngine(input: { resolvedIngredients: ResolvedRecipeIngredient[]; servings: number; recipeName?: string }): Promise<EngineResult<RecipeNutritionResult>> {
  throw new Error("calculateRecipeNutritionEngine not implemented in Phase 1");
}

/**
 * Full recipe calculation engine (Phase 6).
 */
export async function calculateRecipeEngine(input: RecipeInput): Promise<EngineResult<RecipeCalculationResult>> {
  return await calculateRecipeNutrition(input);
}

/**
 * USDA/local resolver for a single food item.
 */
export async function resolveFoodEngine(input: { foodId: string; sourceHint?: string }): Promise<EngineResult<any>> {
  return await resolveBestFoodSource(input.sourceHint || 'local', input.foodId);
}

/**
 * Future source summary.
 */
export function generateSourceSummaryEngine(input: { sources: any[] }): SourceSummary {
  throw new Error("generateSourceSummaryEngine not implemented in Phase 1");
}
