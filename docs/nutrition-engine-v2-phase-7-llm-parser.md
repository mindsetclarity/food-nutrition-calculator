# Nutrition Engine V2 — Phase 7: Controlled LLM Parsing Layer

## 1. Phase 7 Purpose
Add a carefully controlled LLM layer that helps the nutrition engine understand messy food text and recipe text, while strictly preventing the LLM from calculating nutrition values or bypassing the USDA/Local truth.

## 2. Files Inspected
- `src/lib/nutrition-engine/`
- `src/lib/nutrition-engine/recipe/`
- `.env.example` (did not exist)
- `src/pages/api/`

## 3. Existing LLM Architecture Found
No pre-existing LLM abstractions, provider wrappers, or keys were found. The system was purely deterministic.

## 4. New LLM Module Files
- `src/lib/nutrition-engine/llm/llmTypes.ts`
- `src/lib/nutrition-engine/llm/llmPrompt.ts`
- `src/lib/nutrition-engine/llm/llmSchema.ts`
- `src/lib/nutrition-engine/llm/llmSafety.ts`
- `src/lib/nutrition-engine/llm/llmGuards.ts`
- `src/lib/nutrition-engine/llm/llmFallback.ts`
- `src/lib/nutrition-engine/llm/llmParser.ts`
- `src/lib/nutrition-engine/llm/index.ts`

## 5. LLM Parser Role
The LLM is strictly used as an input parser. It converts messy, unstructured recipes and natural language meal descriptions into structured JSON arrays of items (foodName, quantity, unit, preparation).

## 6. Prohibited Behavior
The LLM is **not** allowed to:
- Estimate calories
- Calculate macros
- Output any nutrient fields
- Provide medical or dietary advice

## 7. Prompt Safety Design
`llmPrompt.ts` explicitly commands the LLM to act as a parser only and forbids nutrition calculation. It provides clear JSON schemas for expected outputs without any nutrient keys.

## 8. Schema Validation
`llmSchema.ts` ensures the parsed output conforms to the expected structure. It limits the number of items to prevent abuse and ensures `confidence` levels are normalized.

## 9. Nutrition Field Stripping
`llmSafety.ts` implements a strict safety boundary. If a rogue LLM attempts to return fields like `calories`, `protein`, or `fat`, the safety module aggressively strips them and attaches a `LLM_NUTRITION_FIELDS_STRIPPED` warning before passing the data to the rest of the engine.

## 10. Fallback Behavior
If the LLM times out, returns bad JSON, or the provider is missing, `llmFallback.ts` catches the error and silently routes the request back through the deterministic Phase 6 `ingredientLineParser`. The system will never crash due to an LLM failure.

## 11. Recipe Engine Optional Integration
`recipeCalculator.ts` now accepts an optional `parserMode` in `RecipeOptions`. When set to `"llm_assisted"`, it queries the LLM for ingredient parsing before continuing with the deterministic USDA matching and math.

## 12. API Route Changes
No breaking changes were made to existing routes. The `parseMealEngine` contract was established to use the new LLM parser.

## 13. Test Cases
`test-llm-parser.mjs` was created to verify the mock LLM parsing behavior and specifically tests the `enforceLLMNutritionBoundary` to ensure forbidden fields are stripped.

## 14. What was intentionally not changed
- Real API keys were not hardcoded.
- Existing frontend UI was not modified.
- USDA data structure and deterministic math from Phase 6 were untouched.

## 15. Recommended Phase 8 Next Step
Now that the parser is safe and functional, the next phase should introduce caching mechanisms to prevent redundant API calls to the USDA and the LLM.

Nutrition Engine V2 Phase 7 controlled LLM parser complete.
