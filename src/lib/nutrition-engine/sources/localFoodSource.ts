import { searchLocalFoods, getFoodByIdFromIndex, getFoodBySlugFromIndex } from '../search/index';
import type { FoodSourceSearchInput, FoodSourceSearchResult, ResolvedFoodSource } from './sourceTypes';
import type { EngineFoodItem } from '../types';
import { EngineResult, createRecoverableError, createWarning } from '../index';

export function mapLocalFoodToSourceResult(food: EngineFoodItem, score: number, matchReason: string, confidence: any): FoodSourceSearchResult {
  const defaultServing = food.servingSizes?.find(s => s.isDefault) || food.servingSizes?.[0];
  let caloriesPreview, proteinPreview, defaultServingLabel;
  if (defaultServing) {
    defaultServingLabel = defaultServing.label;
    if (food.nutrientsPer100g.calories != null) caloriesPreview = Math.round((food.nutrientsPer100g.calories / 100) * defaultServing.grams);
    if (food.nutrientsPer100g.protein != null) proteinPreview = Math.round((food.nutrientsPer100g.protein / 100) * defaultServing.grams);
  } else {
    defaultServingLabel = "100 g";
    caloriesPreview = food.nutrientsPer100g.calories ?? undefined;
    proteinPreview = food.nutrientsPer100g.protein ?? undefined;
  }

  return {
    provider: food.source === "local" ? "local_curated" : food.source === "estimated" ? "local_estimated" : "local_curated",
    providerFoodId: food.id,
    localId: food.id,
    slug: food.slug,
    displayName: food.displayName,
    category: food.category,
    sourceLabel: food.sourceLabel || "Curated US local estimate",
    sourceQuality: food.isEstimated ? "estimated" : "fallback",
    isEstimated: food.isEstimated || false,
    nutrientsPer100g: food.nutrientsPer100g,
    servingSizes: food.servingSizes,
    preview: { calories: caloriesPreview, protein: proteinPreview, defaultServingLabel },
    confidence,
    warnings: food.warnings || []
  };
}

export async function searchLocalFoodSource(input: FoodSourceSearchInput): Promise<EngineResult<FoodSourceSearchResult[]>> {
  const res = searchLocalFoods({
    query: input.query,
    limit: input.limit,
    category: input.category,
    mode: input.mode,
    requireCoreNutrients: input.requireCoreNutrients
  });

  const results = res.results.map(r => mapLocalFoodToSourceResult(r.food, r.score, r.matchReason, r.confidence));

  return {
    ok: true,
    data: results,
    warnings: res.warnings || [],
    sourceSummary: { primarySource: "local", sourcesUsed: ["local"], hasUsda: false, hasLocal: true, hasEstimated: results.some(r => r.isEstimated), hasLlmParsed: false, hasPartialData: false, labels: ["Local fallback"], warnings: res.warnings || [] },
    confidence: { level: "high", reasons: ["Local search successful"], needsReview: false }
  };
}

export async function getLocalFoodSourceById(id: string): Promise<EngineResult<ResolvedFoodSource>> {
  const indexed = getFoodByIdFromIndex(id) || getFoodBySlugFromIndex(id);
  if (!indexed) {
    return {
      ok: false,
      error: createRecoverableError("FOOD_SOURCE_NOT_FOUND", "Local food not found", "No matching food source was found."),
      warnings: [],
      fallbackAvailable: false
    };
  }

  const food = indexed.food;
  const isEstimated = food.isEstimated || food.source === "estimated";

  return {
    ok: true,
    data: {
      provider: isEstimated ? "local_estimated" : "local_curated",
      food,
      sourceAttribution: { source: isEstimated ? "estimated" : "local", label: food.sourceLabel || "Local fallback", quality: isEstimated ? "estimated" : "fallback", isFallback: true },
      confidence: { level: "high", reasons: ["Local direct match"], needsReview: false },
      warnings: food.warnings || [],
      resolvedAt: Date.now()
    },
    warnings: [],
    sourceSummary: { primarySource: "local", sourcesUsed: ["local"], hasUsda: false, hasLocal: true, hasEstimated: isEstimated, hasLlmParsed: false, hasPartialData: false, labels: [food.sourceLabel || "Local fallback"], warnings: [] },
    confidence: { level: "high", reasons: [], needsReview: false }
  };
}
