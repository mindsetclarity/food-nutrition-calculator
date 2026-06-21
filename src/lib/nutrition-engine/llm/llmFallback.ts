import type { LLMParseInput, LLMValidatedParseOutput } from './llmTypes';
import { createWarning } from '../warnings';
import { parseRecipeTextToIngredientLines } from '../recipe';
import { lowConfidence, highConfidence } from '../confidence';

export function createLLMFallbackResult(input: LLMParseInput, reason: string): LLMValidatedParseOutput {
  const warnings = [createWarning("LLM_FALLBACK_USED" as any, `AI parsing was unavailable (${reason}), so the basic parser was used.`, "info")];

  if (input.mode === "recipe" || input.mode === "ingredient_line") {
    const lines = parseRecipeTextToIngredientLines(input.text);
    
    const items = lines.map(line => ({
      originalText: line.originalText,
      foodName: line.foodText,
      quantity: line.quantity,
      unit: line.unit,
      preparation: line.preparation,
      confidence: line.confidence.level,
      needsReview: line.needsReview
    }));

    return {
      items,
      warnings,
      confidence: highConfidence(["Deterministic fallback used"]), // The parser itself worked reliably
      needsReview: items.some(i => i.needsReview),
      sanitized: true
    };
  }

  // Meal mode fallback - just treat as one big string or simple split
  const items = [{
    originalText: input.text,
    foodName: input.text,
    confidence: "low" as const,
    needsReview: true
  }];

  return {
    items,
    warnings,
    confidence: lowConfidence(["Deterministic fallback used for unstructured meal text"]),
    needsReview: true,
    sanitized: true
  };
}

export function parseWithDeterministicFallback(input: LLMParseInput): LLMValidatedParseOutput {
  return createLLMFallbackResult(input, "fallback selected");
}
