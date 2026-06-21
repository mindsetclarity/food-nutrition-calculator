import type { LLMParseOutput, LLMValidatedParseOutput, LLMParsedIngredient, LLMParsedMealItem } from './llmTypes';
import { createWarning } from '../warnings';
import { mergeConfidence, highConfidence, mediumConfidence, lowConfidence } from '../confidence';
import type { EngineConfidence } from '../confidence';

export function validateLLMParsedIngredient(item: any): LLMParsedIngredient {
  const confidence = item.confidence && ["high", "medium", "low"].includes(item.confidence) 
    ? item.confidence 
    : "medium";

  return {
    originalText: String(item.originalText || ""),
    foodName: String(item.foodName || ""),
    quantity: typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : undefined,
    unit: item.unit ? String(item.unit) : undefined,
    preparation: item.preparation ? String(item.preparation) : undefined,
    notes: item.notes ? String(item.notes) : undefined,
    confidence: confidence,
    needsReview: Boolean(item.needsReview || confidence === "low"),
    suggestedSearchQueries: Array.isArray(item.suggestedSearchQueries) 
      ? item.suggestedSearchQueries.map(String) 
      : undefined
  };
}

export function validateLLMParsedMealItem(item: any): LLMParsedMealItem {
  const base = validateLLMParsedIngredient(item);
  return {
    ...base,
    mealSection: item.mealSection ? String(item.mealSection) : undefined
  };
}

export function sanitizeLLMParsedItem(item: any, isMeal: boolean): any {
  // Strip dangerous/unwanted fields, especially nutrition
  const sanitizedItem = isMeal ? validateLLMParsedMealItem(item) : validateLLMParsedIngredient(item);
  return sanitizedItem;
}

export function limitLLMItems(items: any[], maxItems: number = 50): any[] {
  if (!Array.isArray(items)) return [];
  return items.slice(0, maxItems);
}

export function normalizeLLMConfidence(value: string): "high" | "medium" | "low" {
  if (value === "high" || value === "medium" || value === "low") return value;
  return "medium"; // Default fallback
}

export function validateLLMParseOutput(raw: any, isMeal: boolean, maxItems: number = 50): LLMValidatedParseOutput {
  const warnings = [];
  let sanitized = false;

  let itemsArr = [];
  if (Array.isArray(raw)) {
    itemsArr = raw;
  } else if (raw && Array.isArray(raw.items)) {
    itemsArr = raw.items;
  }

  if (itemsArr.length === 0) {
    warnings.push(createWarning("LLM_SCHEMA_INVALID" as any, "LLM returned no valid items array."));
  }

  if (itemsArr.length > maxItems) {
    warnings.push(createWarning("LLM_OUTPUT_LIMITED" as any, `Output limited to ${maxItems} items.`));
    itemsArr = limitLLMItems(itemsArr, maxItems);
    sanitized = true;
  }

  const items = itemsArr.map(item => sanitizeLLMParsedItem(item, isMeal));

  let confidenceLevel: EngineConfidence;
  
  if (items.length === 0) {
    confidenceLevel = lowConfidence(["No items parsed"]);
  } else {
    // Generate an overall confidence based on items
    const hasLow = items.some(i => i.confidence === "low");
    const hasMedium = items.some(i => i.confidence === "medium");
    if (hasLow) confidenceLevel = lowConfidence(["Some items have low parse confidence"]);
    else if (hasMedium) confidenceLevel = mediumConfidence(["Some items have medium parse confidence"]);
    else confidenceLevel = highConfidence(["Parsed clearly"]);
  }

  return {
    items,
    warnings,
    confidence: confidenceLevel,
    needsReview: confidenceLevel.needsReview || items.some(i => i.needsReview),
    sanitized
  };
}
