import type { ParsedIngredientLine, ResolvedIngredient, RecipeOptions } from './recipeTypes';
import { resolveFoodSources } from '../sources';
import type { FoodSourceSearchResult } from '../sources';
import { resolveServingToGrams } from '../quantity';
import { calculateIngredientNutrition } from '../calculation';
import { createWarning } from '../warnings';
import type { EngineWarning } from '../warnings';
import { mergeConfidence, mediumConfidence, lowConfidence, highConfidence } from '../confidence';
import type { EngineConfidence } from '../confidence';
import type { EngineFoodItem } from '../types';
import { createRequestDeduper } from '../performance';

const recipeResolutionDeduper = createRequestDeduper<ResolvedIngredient>();

export async function resolveIngredient(parsed: ParsedIngredientLine, options?: RecipeOptions): Promise<ResolvedIngredient> {
  const warnings: EngineWarning[] = [...parsed.warnings];
  let status: ResolvedIngredient["status"] = "unresolved";

  if (!parsed.foodText.trim()) {
    return {
      lineNumber: parsed.lineNumber,
      originalText: parsed.originalText,
      parsed,
      status: "skipped", // Or unresolved, but let's call it unresolved if it was meant to be an ingredient
      confidence: lowConfidence(["No food text"]),
      warnings: [...warnings, createWarning("RECIPE_PARTIAL_RESULT", "No food text found")]
    };
  }

  // 1. Resolve Food
  const searchRes = await resolveFoodSources({
    query: parsed.foodText,
    limit: 5,
    includeUsda: options?.includeLocalFallback !== false,
    includeLocal: true,
    preferUsda: options?.preferUsda !== false,
    category: undefined
  });

  if (!searchRes.ok || searchRes.data.mergedResults.length === 0) {
    warnings.push(createWarning("INGREDIENT_UNRESOLVED", `Could not find food matching: ${parsed.foodText}`));
    return {
      lineNumber: parsed.lineNumber,
      originalText: parsed.originalText,
      parsed,
      status: "unresolved",
      confidence: lowConfidence(["Food source not found"]),
      warnings
    };
  }

  // Choose best candidate
  let bestCandidate: FoodSourceSearchResult = searchRes.data.mergedResults[0];
  
  // Prefer candidate that matches preparation if any (simple approach)
  if (parsed.preparation) {
    const prepWords = parsed.preparation.toLowerCase().split(' ');
    const betterCandidate = searchRes.data.mergedResults.find(r => {
      const name = r.displayName.toLowerCase();
      return prepWords.some(w => name.includes(w));
    });
    if (betterCandidate) {
      bestCandidate = betterCandidate;
    }
  }

  // 2. Resolve Quantity to Grams
  // We need an EngineFoodItem to pass to resolveServingToGrams.
  const tempFoodItem: EngineFoodItem = {
    id: bestCandidate.providerFoodId,
    displayName: bestCandidate.displayName,
    source: bestCandidate.provider as any,
    sourceLabel: bestCandidate.sourceLabel,
    nutrientsPer100g: bestCandidate.nutrientsPer100g || {},
    servingSizes: bestCandidate.servingSizes || [],
    isEstimated: bestCandidate.isEstimated
  };

  const servingRes = resolveServingToGrams({
    food: tempFoodItem,
    amount: parsed.quantity || 1,
    unit: parsed.unit || 'unknown'
  });

  const servingWarnings = servingRes.warnings || [];
  warnings.push(...servingWarnings);

  // 3. Combine confidences
  const confidences: EngineConfidence[] = [
    parsed.confidence,
    bestCandidate.confidence,
    servingRes.confidence
  ];

  const finalConfidence = mergeConfidence(confidences);
  const needsReview = finalConfidence.needsReview || options?.requireReviewForLowConfidence && finalConfidence.level === 'low';

  status = needsReview ? "needs_review" : "resolved";

  if (bestCandidate.warnings) {
    warnings.push(...bestCandidate.warnings);
  }

  const result: ResolvedIngredient = {
    lineNumber: parsed.lineNumber,
    originalText: parsed.originalText,
    parsed,
    resolvedFood: bestCandidate,
    resolvedSource: bestCandidate.provider,
    resolvedServing: servingRes,
    status,
    confidence: finalConfidence,
    warnings
  };

  // 4. Calculate Nutrition
  result.calculatedNutrition = calculateIngredientNutrition(result);

  if (!result.calculatedNutrition) {
    result.status = "unresolved";
    result.confidence = lowConfidence(["Missing nutrient data"]);
    warnings.push(createWarning("PARTIAL_USDA_NUTRIENTS", "Missing core nutrients"));
  }

  return result;
}

export async function resolveIngredients(parsedIngredients: ParsedIngredientLine[], options?: RecipeOptions): Promise<ResolvedIngredient[]> {
  const localDeduper = createRequestDeduper<ResolvedIngredient>();
  
  const promises = parsedIngredients.map(p => {
    // Basic dedupe key within this recipe request.
    const foodText = p.foodText.toLowerCase().trim();
    const qty = p.quantity || 1;
    const unit = (p.unit || 'unknown').toLowerCase().trim();
    const prep = (p.preparation || '').toLowerCase().trim();
    const key = `${foodText}|${qty}|${unit}|${prep}`;
    
    // Dedupe identically parsed ingredients within the same recipe calculation
    return localDeduper.dedupeRequest(key, async () => {
      // Create a fresh clone so lines aren't sharing object refs directly 
      // where line numbers matter
      const resolved = await resolveIngredient(p, options);
      return { ...resolved, lineNumber: p.lineNumber, originalText: p.originalText, parsed: p };
    });
  });
  
  return Promise.all(promises);
}
