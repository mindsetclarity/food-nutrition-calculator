import type { LLMParserMode } from './llmTypes';

export function buildLLMParsingPrompt(mode: LLMParserMode): string {
  const basePrompt = `
You are a food and recipe parsing assistant. You are a parser ONLY.
Do not calculate nutrition.
Do not estimate calories.
Do not estimate macros.
Do not output nutrient values.
Do not provide medical, diet, or health advice.
Return ONLY structured JSON containing the parsed food information.
If unsure about a quantity or food name, set confidence to "low" and needsReview to true.
`;

  let modeSpecificPrompt = "";
  let exampleOutput = "";

  if (mode === "recipe" || mode === "ingredient_line") {
    modeSpecificPrompt = `
Parse the provided recipe or ingredient lines into individual items.
Extract the original text, the core food name, the quantity (as a number), the unit (as a string), and any preparation hints (e.g., "sliced", "cooked").
If you cannot determine a quantity or unit, leave them undefined or null.
`;
    exampleOutput = `
Expected output format (JSON only):
{
  "items": [
    {
      "originalText": "2 tbsp peanut butter",
      "foodName": "peanut butter",
      "quantity": 2,
      "unit": "tbsp",
      "preparation": null,
      "confidence": "high",
      "needsReview": false,
      "suggestedSearchQueries": ["peanut butter"]
    }
  ]
}
`;
  } else if (mode === "meal") {
    modeSpecificPrompt = `
Parse the provided meal description into individual food items.
Extract the original text, the core food name, the quantity, the unit, and preparation hints.
You can optionally guess the meal section (e.g., "breakfast", "lunch", "snack").
`;
    exampleOutput = `
Expected output format (JSON only):
{
  "items": [
    {
      "originalText": "had a bowl of oats",
      "foodName": "oats",
      "quantity": 1,
      "unit": "bowl",
      "preparation": null,
      "mealSection": "breakfast",
      "confidence": "medium",
      "needsReview": true,
      "suggestedSearchQueries": ["rolled oats"]
    }
  ]
}
`;
  }

  return `${basePrompt}\n${modeSpecificPrompt}\n${exampleOutput}`;
}
