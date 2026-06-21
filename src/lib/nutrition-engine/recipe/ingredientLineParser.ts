import type { ParsedIngredientLine } from './recipeTypes';
import { parseQuantityText } from '../quantity';
import { createWarning } from '../warnings';
import type { EngineWarning } from '../warnings';
import { mediumConfidence, lowConfidence, highConfidence, mergeConfidence } from '../confidence';
import { shouldSkipIngredientLine, cleanIngredientLine } from './ingredientCleaner';

const PREPARATION_WORDS = [
  "raw", "cooked", "boiled", "baked", "roasted", "fried", "grilled", "steamed",
  "canned", "drained", "sliced", "chopped", "diced", "minced", "unsweetened",
  "sweetened", "plain", "nonfat", "low fat", "whole", "mashed", "peeled",
  "grated", "melted", "toasted", "crushed"
];

export function extractPreparationHints(text: string): { foodText: string; preparation?: string } {
  let lower = text.toLowerCase();
  const foundPrepWords: string[] = [];
  
  // Also check for comma-separated notes at the end, e.g. "banana, sliced"
  const commaParts = text.split(',');
  let remainingText = text;
  
  if (commaParts.length > 1) {
    const afterComma = commaParts.slice(1).join(',').trim();
    const potentialPrepWords = afterComma.split(/\s+/).map(w => w.toLowerCase());
    
    // If the part after the comma contains prep words, consider it preparation
    if (potentialPrepWords.some(w => PREPARATION_WORDS.includes(w))) {
      remainingText = commaParts[0].trim();
      foundPrepWords.push(afterComma);
    }
  }

  // Check inline prep words
  let words = remainingText.split(/\s+/);
  let cleanedWords = [];

  for (const word of words) {
    const cleanWord = word.replace(/[^a-z]/gi, '').toLowerCase();
    if (PREPARATION_WORDS.includes(cleanWord)) {
      foundPrepWords.push(word);
    } else {
      cleanedWords.push(word);
    }
  }

  return {
    foodText: cleanedWords.join(' '),
    preparation: foundPrepWords.length > 0 ? foundPrepWords.join(' ') : undefined
  };
}

export function parseIngredientLine(line: string, lineNumber: number): ParsedIngredientLine {
  const cleaned = cleanIngredientLine(line, lineNumber);
  const warnings: EngineWarning[] = [];

  if (cleaned.isEmpty) {
    return {
      lineNumber,
      originalText: line,
      cleanedText: cleaned.cleanedText,
      foodText: "",
      confidence: highConfidence(["Skipped empty/instruction line"]),
      needsReview: false,
      warnings: []
    };
  }

  const quantityResult = parseQuantityText(cleaned.cleanedText);
  let parsedAmount = quantityResult.parsed?.amount;
  let parsedUnit = quantityResult.parsed?.unit !== 'unknown' ? quantityResult.parsed?.unit : undefined;
  let remainingFoodText = quantityResult.remainingFoodText || cleaned.cleanedText;

  if (!parsedAmount && !parsedUnit) {
    warnings.push(createWarning("INGREDIENT_QUANTITY_MISSING", "Missing quantity, defaulting to 1"));
    parsedAmount = 1;
  }

  const { foodText, preparation } = extractPreparationHints(remainingFoodText);

  let conf = quantityResult.confidence;
  if (!foodText.trim()) {
    conf = lowConfidence(["No food text found"]);
    warnings.push(createWarning("RECIPE_PARTIAL_RESULT", "No food name could be parsed"));
  }

  return {
    lineNumber,
    originalText: line,
    cleanedText: cleaned.cleanedText,
    quantity: parsedAmount,
    unit: parsedUnit,
    foodText: foodText || remainingFoodText,
    preparation,
    confidence: conf,
    needsReview: conf.needsReview,
    warnings: [...warnings, ...(quantityResult.warnings || [])]
  };
}

export function parseRecipeTextToIngredientLines(text: string): ParsedIngredientLine[] {
  if (!text) return [];
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
  return lines.map((l, i) => parseIngredientLine(l, i + 1));
}
