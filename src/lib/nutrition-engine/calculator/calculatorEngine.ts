import type { EngineResult } from '../resultTypes';
import { resolveBestFoodSource } from '../sources';
import { resolveServingToGrams } from '../quantity';
import { calculateNutrientsForGrams, addNutritionTotals, sanitizeNutritionTotals, hasCoreNutrition, roundNutritionTotals } from '../calculation/nutrientMath';
import { CalculatorWarnings } from './calculatorWarnings';
import { searchFoodsEngine } from '../engineContract';
import { mergeConfidence } from '../confidence';
import type { EngineWarning } from '../warnings';
import type { EngineConfidence } from '../confidence';
import type { SourceSummary } from '../sourceTypes';
import type { 
  CalculatorFoodInput, 
  CalculatorSelectedItem, 
  CalculatorStateResult, 
  CalculatorAddFoodResult,
  CalculatorSearchForUIResult
} from './calculatorTypes';

/**
 * Searches foods and returns safe data for UI.
 */
export async function searchCalculatorFoods(query: string): Promise<EngineResult<CalculatorSearchForUIResult>> {
  const result = await searchFoodsEngine({ query, options: { maxResults: 15 } });
  if (!result.ok) {
    return { ok: false, error: result.error, warnings: result.warnings };
  }

  // Strip complex internals for the UI
  const safeResults = result.data.results.map(r => ({
    id: r.id,
    displayName: r.displayName,
    source: r.source,
    sourceLabel: r.sourceLabel,
    calories: r.food?.nutrientsPer100g?.calories,
    protein: r.food?.nutrientsPer100g?.protein,
    defaultServingLabel: r.food?.servingSizes?.find(s => s.isDefault)?.label || "100 g",
    warnings: r.warnings
  }));

  return {
    ok: true,
    data: {
      results: safeResults,
      sourceSummary: result.sourceSummary,
      warnings: result.warnings,
      fallbackUsed: result.sourceSummary.hasLocal && !result.sourceSummary.hasUsda,
    },
    warnings: result.warnings,
    confidence: result.confidence,
    sourceSummary: result.sourceSummary
  };
}

/**
 * Resolves a food, calculates its serving logic, and returns a CalculatorSelectedItem
 */
export async function resolveCalculatorFood(input: CalculatorFoodInput): Promise<EngineResult<CalculatorAddFoodResult>> {
  if (!input.foodId) {
    return {
      ok: false,
      error: { code: "INVALID_INPUT", message: "Missing foodId", safeMessage: "Cannot add food without an ID." },
      warnings: []
    };
  }

  const resolveRes = await resolveBestFoodSource(input.selectedSourceId || "local", input.foodId);
  if (!resolveRes.ok) {
    return {
      ok: false,
      error: resolveRes.error,
      warnings: resolveRes.warnings
    };
  }

  const food = resolveRes.data.food;
  const warnings: EngineWarning[] = [...resolveRes.warnings];
  const confidences: EngineConfidence[] = [resolveRes.confidence || { level: "high", reasons: [], needsReview: false }];

  // 1. Resolve quantity & serving -> grams
  const resolvedServing = resolveServingToGrams({
    food,
    amount: input.quantity,
    unit: input.unit,
    servingId: input.servingId
  });

  warnings.push(...resolvedServing.warnings);
  confidences.push(resolvedServing.confidence);

  // 2. Deterministic Nutrient Calculation
  const nutrients = calculateNutrientsForGrams(food.nutrientsPer100g, resolvedServing.grams);
  
  if (!hasCoreNutrition(nutrients)) {
    warnings.push(CalculatorWarnings.partialNutrients());
  }

  const finalConfidence = mergeConfidence(confidences);

  const selectedItem: CalculatorSelectedItem = {
    id: crypto.randomUUID(),
    foodId: food.id,
    displayName: food.displayName,
    source: food.source,
    sourceLabel: food.sourceLabel || food.source,
    quantity: input.quantity,
    unit: input.unit,
    resolvedServing,
    grams: resolvedServing.grams,
    nutrients: sanitizeNutritionTotals(nutrients), // Always safe
    confidence: finalConfidence,
    needsReview: finalConfidence.needsReview,
    warnings
  };

  return {
    ok: true,
    data: {
      selectedItem,
      warnings,
      confidence: finalConfidence
    },
    warnings,
    sourceSummary: resolveRes.data.sourceSummary,
    confidence: finalConfidence
  };
}

/**
 * Calculates sum of all selected items.
 */
export function calculateCalculatorTotals(items: CalculatorSelectedItem[]): CalculatorStateResult {
  const nutrientsList = items.map(item => item.nutrients);
  const rawTotals = addNutritionTotals(nutrientsList);
  const totals = roundNutritionTotals(rawTotals, 1);

  const warnings: EngineWarning[] = [];
  const confidences: EngineConfidence[] = items.map(item => item.confidence);
  
  // Aggregate warnings uniquely
  for (const item of items) {
    for (const w of item.warnings) {
      if (!warnings.find(x => x.code === w.code)) {
        warnings.push(w);
      }
    }
  }

  // Generate source summary
  const sourcesUsed = new Set<string>();
  let hasUsda = false;
  let hasLocal = false;

  for (const item of items) {
    sourcesUsed.add(item.source);
    if (item.source === 'usda') hasUsda = true;
    if (item.source === 'local' || item.source === 'curated') hasLocal = true;
  }

  const sourceSummary: SourceSummary = {
    primarySource: hasUsda ? "usda" : (hasLocal ? "local" : "unknown"),
    sourcesUsed: Array.from(sourcesUsed),
    hasUsda,
    hasLocal,
    hasEstimated: false,
    hasLlmParsed: false,
    hasPartialData: !!warnings.find(w => w.code === "PARTIAL_NUTRIENT_DATA"),
    labels: items.map(i => i.sourceLabel).filter((v, i, a) => a.indexOf(v) === i),
    warnings: []
  };

  const finalConfidence = confidences.length > 0 ? mergeConfidence(confidences) : { level: "high", reasons: [], needsReview: false };

  return {
    items,
    totals,
    sourceSummary,
    warnings,
    confidence: finalConfidence,
    needsReview: finalConfidence.needsReview
  };
}
