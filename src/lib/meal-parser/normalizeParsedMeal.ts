import type { ParsedMealItem, ParsedMealResponse } from './types';

const sameWord = (a: string, b: string) =>
  a === b || a + 's' === b || b + 's' === a || a + 'es' === b || b + 'es' === a;

/**
 * LLMs often echo the food as its own unit for countable items ("2 egg eggs",
 * "0.5 banana banana"). Treat that as a count, matching the basic parser's 'piece'.
 */
export function normalizeUnit(unit: unknown, foodName: string): string | null {
  if (!unit) return null;
  const u = String(unit).trim().toLowerCase();
  const headNoun = foodName.toLowerCase().split(/\s+/).pop() ?? '';
  return headNoun && sameWord(u, headNoun) ? 'piece' : u;
}

export function normalizeParsedMeal(data: any): ParsedMealResponse {
  const response: ParsedMealResponse = {
    items: [],
    overallConfidence: 0,
    needsClarification: false,
    clarifyingQuestions: [],
    warnings: []
  };

  if (!data || typeof data !== 'object') {
    response.warnings.push("Invalid parsed data structure.");
    return response;
  }

  response.overallConfidence = typeof data.overallConfidence === 'number' ? Math.max(0, Math.min(1, data.overallConfidence)) : 0.8;
  response.needsClarification = !!data.needsClarification;
  
  if (Array.isArray(data.clarifyingQuestions)) {
    response.clarifyingQuestions = data.clarifyingQuestions.map(String);
  }
  
  if (Array.isArray(data.warnings)) {
    response.warnings = data.warnings.map(String);
  }

  if (Array.isArray(data.items)) {
    data.items.forEach((item: any, index: number) => {
      if (index >= 12) return; 
      
      let qty = typeof item.quantity === 'number' ? item.quantity : parseFloat(item.quantity);
      if (isNaN(qty) || qty <= 0) qty = null;
      
      const foodName = item.foodName ? String(item.foodName).trim() : '';
      const needsReview = !!item.needsReview || qty === null || !item.unit || !foodName;
      
      const normalizedItem: ParsedMealItem = {
        id: `parsed-${Date.now()}-${index}`,
        rawText: item.rawText ? String(item.rawText) : foodName,
        foodName: foodName,
        quantity: qty,
        unit: normalizeUnit(item.unit, foodName),
        preparation: item.preparation ? String(item.preparation) : null,
        usdaSearchQuery: item.usdaSearchQuery ? String(item.usdaSearchQuery) : foodName,
        confidence: typeof item.confidence === 'number' ? Math.max(0, Math.min(1, item.confidence)) : 0.8,
        needsReview: needsReview,
        notes: Array.isArray(item.notes) ? item.notes.map(String) : [],
        warnings: Array.isArray(item.warnings) ? item.warnings.map(String) : []
      };

      if (!normalizedItem.foodName) {
        normalizedItem.warnings.push("Food name missing. Please edit.");
      }

      response.items.push(normalizedItem);
    });
    
    if (data.items.length > 12) {
      response.warnings.push(`Limited to 12 items. Dropped ${data.items.length - 12} items.`);
    }
  } else {
    response.warnings.push("No items array found in parsed response.");
  }

  return response;
}
