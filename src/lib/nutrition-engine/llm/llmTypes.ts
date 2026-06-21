import type { EngineWarning, EngineConfidence } from '../index';

export type LLMParserMode = "recipe" | "meal" | "food_query" | "ingredient_line";

export interface LLMParsedIngredient {
  originalText: string;
  foodName: string;
  quantity?: number;
  unit?: string;
  preparation?: string;
  notes?: string;
  confidence: "high" | "medium" | "low";
  needsReview: boolean;
  suggestedSearchQueries?: string[];
  warnings?: EngineWarning[];
}

export interface LLMParsedMealItem {
  originalText: string;
  foodName: string;
  quantity?: number;
  unit?: string;
  preparation?: string;
  mealSection?: string;
  confidence: "high" | "medium" | "low";
  needsReview: boolean;
  suggestedSearchQueries?: string[];
  warnings?: EngineWarning[];
}

export interface LLMParseInput {
  text: string;
  mode: LLMParserMode;
  maxItems?: number;
  locale?: string;
  userGoal?: string; // Optional but do not use for medical advice
  allowRecipeParsing?: boolean;
  allowMealParsing?: boolean;
}

export interface LLMParseOutput {
  items: (LLMParsedIngredient | LLMParsedMealItem)[];
  parser: string;
  usedLLM: boolean;
  provider?: string;
  confidence: EngineConfidence;
  warnings: EngineWarning[];
  rawText?: string; // internal only
  needsReview: boolean;
}

export interface LLMValidatedParseOutput {
  items: (LLMParsedIngredient | LLMParsedMealItem)[];
  warnings: EngineWarning[];
  confidence: EngineConfidence;
  needsReview: boolean;
  sanitized: boolean;
}
