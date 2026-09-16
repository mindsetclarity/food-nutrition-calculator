# Phase 16: Recipe Nutrition Calculator

## 1. Purpose of Phase 16
The goal of Phase 16 was to build a dedicated Recipe Nutrition Calculator that leverages the existing LLM parser, USDA-first data resolution, and deterministic engine. It introduces per-serving calculation logic alongside total recipe nutrition.

## 2. Recipe page user flow
1. User navigates to `/recipe-nutrition-calculator`.
2. Pastes a multi-line ingredient list, sets a recipe name (optional), and configures a serving count.
3. Clicks "Parse recipe".
4. The system delegates text parsing to the existing `/api/parse-meal` endpoint (reusing the exact Phase 15 code).
5. The UI generates review cards for each matched ingredient.
6. The user resolves matches, and checks their accuracy. 
7. Total and Per-Serving nutrition amounts automatically recalculate as matches populate.

## 3. Components created
- `src/pages/recipe-nutrition-calculator.astro`: Top level page wrapper.
- `src/components/recipe/RecipeCalculatorShell.astro`: The full interactive UI shell encompassing the parser form, review section, and calculated results.
- `src/lib/recipe/types.ts`: Typings for serving counts and recipe totals.
- `src/lib/recipe/servings.ts`: Mathematical helper functions to compute per-serving properties.
- `src/lib/recipe/recipeCalculation.ts`: Core wrapper for applying Phase 10's `calculateMealTotals` alongside the serving division logic.
- `src/lib/recipe/index.ts`: Public module exports.

## 4. Parser reuse from Phase 15
The recipe calculator heavily reuses the exact `/api/parse-meal` integration established in Phase 15. The LLM remains isolated as a pure structural parser. It receives text, infers units and quantities, and yields JSON for the UI to digest. It outputs absolutely no caloric or macronutrient metrics directly.

## 5. Basic fallback behavior
If the LLM offline fallback (mock mode or networking failure) kicks in, the Phase 15 `basicFallbackParse` safely splits the recipe via line breaks. The user is presented with a yellow warning badge reminding them to manually review every field.

## 6. USDA-first ingredient resolution
For each matched ingredient row, the client loops through the familiar `fetch('/api/foods/search?q=...')` and subsequently hits `/api/foods/details`. If USDA is offline or no USDA item matches, the UI seamlessly delegates to the local database, tagging it with a blue badge.

## 7. Deterministic calculation usage
The UI client hooks directly into `calculateFoodItem` and `calculateRecipeTotals`. All multiplication logic converting quantities into USDA metric standard values takes place entirely within standard deterministic boundaries.

## 8. Total recipe nutrition calculation
Totals sum together calories, protein, carbs, fat, fiber, sugar, and sodium across all *valid* ingredient items.

## 9. Per-serving nutrition calculation
Per-serving amounts divide the total values by the value present in the "Servings/Yield" UI input box. A safe-division module (`servings.ts`) validates that numbers cannot approach Infinity or become negative.

## 10. Source badge/source summary behavior
Each ingredient review card prints clear green "USDA" or blue "Local" identifiers right beneath the food title. 

## 11. Validation behavior
- Handles >1500 chars limit gracefully (handled by /api/parse-meal).
- Warns users if quantities are null.
- Validates the serving bounds dynamically on input update, forcing fallback to 1 if negative numbers are entered.

## 12. Accessibility notes
- Inputs all rely on specific explicit `<label>` tags or `aria-label` tags. 
- High-contrast states apply to all valid and invalid feedback scenarios.
- The use of dynamic `title=""` fields truncates verbose food labels while preserving full access on hover.

## 13. Mobile notes
- Uses standard CSS grids with `col-span` rules configured specifically to collapse down to stack logic beneath `lg:` tailwind breakpoints.
- The "Right" side sticky panel drops to the bottom organically.

## 14. Security/privacy notes
- Uses NO `localStorage` or `sessionStorage`.
- Uses NO database entries.
- Contains NO keys directly exposed to the DOM (all API tokens sit in `.env`).

## 15. What was intentionally not implemented
- Nutrition Facts Label graphic display (pushed to Phase 17).
- Persistent user accounts/database tracking.

## 16. Known limitations
- Ingredients without precise unit conversions registered in the USDA database ("1 cup of unspecified mass") may struggle to compute, throwing validation errors and prompting the user to edit the unit input manually.

## 17. Phase 17 recommendation
Phase 17 should tackle the visual layout of an authentic, regulatory-styled Nutrition Facts label graphic that maps to these underlying calculated data layers.
