# Phase 15: Natural Language Meal Parser UX

## 1. Purpose of Phase 15
The goal of Phase 15 was to upgrade the Calculator Page with a premium "Describe your meal" text parser panel. It lets users rapidly add multiple items using everyday English, which an AI parses, resolves via USDA data, and routes into the deterministic calculation engine.

## 2. User flow
1. The user types a sentence like `"2 boiled eggs, 1 banana, 1 cup cooked oatmeal"`.
2. They click "Parse meal".
3. The UI queries `/api/parse-meal`, hitting the LLM to yield structured JSON.
4. The `MealTextParser.astro` UI automatically attempts to resolve the suggested USDA queries in parallel via `/api/foods/search` and `/api/foods/details`.
5. The user reviews the matched items, confirming unit and quantities.
6. The user clicks "Add valid items", pushing everything natively into the main `CalculatorShell` meal list.

## 3. /api/parse-meal behavior
The `POST /api/parse-meal` endpoint:
- Exists at `src/pages/api/parse-meal.ts`.
- Validates the incoming text length (2 - 1500 chars).
- Sends a structured prompt to the Phase 14 LLM integration layer (`generateJSONWithLLM`).
- Safely extracts and normalizes the JSON into a guaranteed schema containing candidates like `{ rawText, foodName, quantity, unit, usdaSearchQuery, needsReview }`.
- Features a hard cap to drop arrays longer than 12 elements.

## 4. LLM provider usage
The endpoint imports `generateJSONWithLLM` from `src/lib/llm/client.ts`. By default, `.env.example` points `LLM_PROVIDER` to `"mock"`, meaning offline developers or CI machines will successfully parse a fake meal instantly. When a real API key is inserted, it switches dynamically.

## 5. Mock/basic fallback behavior
If the LLM layer fails (e.g., timeout, rate limit, or network crash) or if `provider === 'basic'`, the `basicFallbackParse` logic activates. It applies a RegExp over commas and newlines to blindly split items and attempt rudimentary quantity mapping. A yellow warning clearly informs the user that a fallback parser was used and items demand manual review.

## 6. JSON parsing and normalization
`normalizeParsedMeal` forces safety constraints over raw LLM JSON. If a quantity parses as `NaN` or `<= 0`, it defaults to `null` and toggles `needsReview: true`. Unrecognized schemas are caught and reported as warnings without throwing server exceptions.

## 7. USDA-first resolution flow
1. Client issues `fetch('/api/foods/search?q=...')`.
2. Resolves top FDC ID or local fallback ID.
3. Client issues `fetch('/api/foods/details?fdcId=...')`.
4. Binds the full `FoodItem` profile to the parsed card in memory.
If it fails to map, the UI displays "Could not find a food match. Try editing the food name." and refuses to enable the "Add" button for that card.

## 8. Deterministic engine usage
The `/api/parse-meal` endpoint calculates exactly zero nutrition. When items are added, `MealTextParser.astro` dispatches a CustomEvent (`add-parsed-items`). `CalculatorShell.astro` loops over the list, invoking the purely deterministic `calculateFoodItem` (Phase 10 logic).

## 9. Source transparency rules
Items resolved from USDA receive green badges. Items resolved from Local Fallbacks receive blue badges. A disclaimer prominently states: *"AI helps parse your meal text, but it does not calculate final calories or macros. Foods are matched through USDA-first search..."*

## 10. Validation rules
- Prevented over 1500 chars.
- Limited array size to 12.
- Items lacking a valid quantity or unit lock the "Add valid items" button to enforce human review.

## 11. Security/privacy rules
- Zero LLM API keys are exposed to the browser.
- No user text is logged to the server disk.
- No database persistence hooks exist.
- Safely catches and swallows internal stack traces.

## 12. Accessibility notes
- The parser textarea binds to an `sr-only` label.
- High-contrast states apply to valid/invalid fields.
- Clear error text (e.g. "Failed to load") instead of pure color mapping.

## 13. Mobile notes
- The parser stacks cleanly above the manual form.
- The parsed review items are rendered as modular flex cards instead of a constrained table, remaining readable on tiny screens.

## 14. What was intentionally not implemented
- Recipe logic (analyzing entire recipes).
- Saved historical meals.
- Account-based logging.

## 15. Known limitations
- The LLM may sometimes guess a `usdaSearchQuery` that the strict USDA API fails to find a match for. The user must manually edit the query and re-click "Find Match".
- Natural language implies a degree of ambiguity; the basic fallback struggles with complex fractions like "1 1/2 cups". 

## 16. Phase 16 recommendation
Proceed to construct the dedicated **Recipe Nutrition Calculator**, which leverages the same parser engine but divides the total nutrition mathematically by a specified "yield/servings" variable.
