import type { ParsedQuantity, QuantityParseResult } from './quantityTypes';
import { normalizeQuantityUnit } from './unitConverter';
import type { EngineWarning } from '../warnings';
import type { EngineConfidence } from '../confidence';

const FRACTION_MAP: Record<string, number> = {
  '1/2': 0.5,
  '1/4': 0.25,
  '3/4': 0.75,
  '1/3': 0.3333,
  '2/3': 0.6667,
  '1/8': 0.125,
  '3/8': 0.375,
  '5/8': 0.625,
  '7/8': 0.875
};

const NUMBER_WORDS: Record<string, number> = {
  'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4,
  'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9,
  'ten': 10, 'half': 0.5, 'a': 1, 'an': 1
};

function parseAmount(text: string): { amount: number; remaining: string; warning?: string } {
  let lowerText = text.toLowerCase().trim();
  
  // Mixed fractions (e.g. "1 1/2")
  const mixedMatch = lowerText.match(/^(\d+)\s+(\d+\/\d+)(.*)/);
  if (mixedMatch) {
    const whole = parseInt(mixedMatch[1], 10);
    const fractionStr = mixedMatch[2];
    const fractionVal = FRACTION_MAP[fractionStr] || parseSimpleFraction(fractionStr);
    if (fractionVal !== null) {
      return { amount: whole + fractionVal, remaining: mixedMatch[3].trim() };
    }
  }

  // Simple fractions (e.g. "1/2")
  const fractionMatch = lowerText.match(/^(\d+\/\d+)(.*)/);
  if (fractionMatch) {
    const fractionStr = fractionMatch[1];
    const fractionVal = FRACTION_MAP[fractionStr] || parseSimpleFraction(fractionStr);
    if (fractionVal !== null) {
      return { amount: fractionVal, remaining: fractionMatch[2].trim() };
    }
  }

  // Decimals / Integers (e.g. "1.5", "2", ".5")
  const numberMatch = lowerText.match(/^([0-9]*\.?[0-9]+)(.*)/);
  if (numberMatch) {
    const amount = parseFloat(numberMatch[1]);
    return { amount, remaining: numberMatch[2].trim() };
  }

  // Number words
  for (const [word, value] of Object.entries(NUMBER_WORDS)) {
    if (lowerText.startsWith(word + ' ')) {
      return { amount: value, remaining: lowerText.slice(word.length).trim() };
    }
  }

  // If exact word match at the end
  if (NUMBER_WORDS[lowerText] !== undefined) {
    return { amount: NUMBER_WORDS[lowerText], remaining: '' };
  }

  // Fallback to 1 if no quantity specified but it has a valid string
  return { amount: 1, remaining: text, warning: 'QUANTITY_MISSING' };
}

function parseSimpleFraction(frac: string): number | null {
  const parts = frac.split('/');
  if (parts.length === 2) {
    const num = parseFloat(parts[0]);
    const den = parseFloat(parts[1]);
    if (!isNaN(num) && !isNaN(den) && den !== 0) {
      return num / den;
    }
  }
  return null;
}

export function parseQuantityText(input: string): QuantityParseResult {
  const text = input.trim();
  const warnings: EngineWarning[] = [];
  
  if (!text) {
    warnings.push({ code: "INVALID_QUANTITY" as any, message: "Empty quantity input.", severity: "warning", userVisible: true });
    return {
      parsed: { amount: 1, unit: 'unknown', normalizedUnit: 'unknown', confidence: { level: 'low', reasons: ['Empty input'], needsReview: true }, needsReview: true, warnings },
      warnings,
      confidence: { level: 'low', reasons: ['Empty input'], needsReview: true }
    };
  }

  const { amount, remaining, warning: amountWarning } = parseAmount(text);
  
  if (amountWarning) {
    warnings.push({ code: amountWarning as any, message: "No amount found, defaulting to 1.", severity: "info", userVisible: true });
  }

  if (amount <= 0 || !isFinite(amount)) {
    warnings.push({ code: "INVALID_QUANTITY" as any, message: `Invalid amount: ${amount}`, severity: "warning", userVisible: true });
    return {
      parsed: { amount: 1, unit: 'unknown', normalizedUnit: 'unknown', confidence: { level: 'low', reasons: ['Invalid amount'], needsReview: true }, needsReview: true, warnings },
      warnings,
      confidence: { level: 'low', reasons: ['Invalid amount'], needsReview: true }
    };
  }

  // Extract unit
  // We'll take the first word of the remaining text as the potential unit
  let unit = 'unknown';
  let foodText = remaining;
  let unitConfidence: "high" | "low" = "low";

  const firstWordMatch = remaining.match(/^([a-zA-Z]+)(.*)/);
  if (firstWordMatch) {
    const potentialUnit = firstWordMatch[1];
    const normalized = normalizeQuantityUnit(potentialUnit);
    if (normalized !== 'unknown') {
      unit = potentialUnit;
      foodText = firstWordMatch[2].trim();
      unitConfidence = "high";
    }
  }

  const normalizedUnit = normalizeQuantityUnit(unit);
  
  let confidenceLevel: "high" | "medium" | "low" = "medium";
  const reasons = [];
  let needsReview = false;

  if (amountWarning) {
    confidenceLevel = "low";
    reasons.push("Assumed quantity 1");
    needsReview = true;
  } else if (unitConfidence === "high") {
    confidenceLevel = "high";
    reasons.push("Matched known unit");
  } else {
    confidenceLevel = "low";
    reasons.push("Unknown unit");
    needsReview = true;
  }

  const confidence: EngineConfidence = {
    level: confidenceLevel,
    reasons,
    needsReview
  };

  const parsed: ParsedQuantity = {
    originalText: text,
    amount,
    unit,
    normalizedUnit,
    foodText,
    confidence,
    needsReview,
    warnings
  };

  return {
    parsed,
    remainingFoodText: foodText,
    warnings,
    confidence
  };
}
