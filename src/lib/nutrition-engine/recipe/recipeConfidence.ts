import type { ResolvedIngredient, RecipeCalculationResult } from './recipeTypes';
import { mergeConfidence, highConfidence, mediumConfidence, lowConfidence } from '../confidence';
import type { EngineConfidence } from '../confidence';

export function calculateRecipeConfidence(ingredients: ResolvedIngredient[]): EngineConfidence {
  if (ingredients.length === 0) {
    return lowConfidence(["No ingredients to evaluate"]);
  }

  const ingredientConfidences = ingredients.map(i => i.confidence);
  const combined = mergeConfidence(ingredientConfidences);

  const unresolvedCount = ingredients.filter(i => i.status === "unresolved").length;
  const needsReviewCount = ingredients.filter(i => i.status === "needs_review").length;
  const resolvedCount = ingredients.filter(i => i.status === "resolved").length;

  if (unresolvedCount > 0) {
    return {
      level: "low",
      reasons: [...combined.reasons, `${unresolvedCount} unresolved ingredients`],
      needsReview: true
    };
  }

  if (needsReviewCount > 0) {
    return {
      level: "low",
      reasons: [...combined.reasons, `${needsReviewCount} ingredients need review`],
      needsReview: true
    };
  }

  if (resolvedCount === ingredients.length) {
    // Check if combined was somehow low or medium due to weak matches
    if (combined.level === "low") {
      return combined;
    }
    return highConfidence(["All ingredients resolved successfully"]);
  }

  return combined;
}

export function getRecipeNeedsReview(confidence: EngineConfidence, warnings: any[]): boolean {
  if (confidence.needsReview) return true;
  if (confidence.level === "low") return true;
  if (warnings.some(w => w.severity === "critical" || w.code === "RECIPE_PARTIAL_RESULT")) return true;
  return false;
}
