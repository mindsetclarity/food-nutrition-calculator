# Nutrition Engine V2 — Phase 6: Complex Recipe Understanding Engine

## 1. Phase 6 Purpose
Build a deterministic, rule-based recipe engine that acts as the core mathematical and parsing backbone for processing ingredients. It converts messy, unstructured lines into cleanly resolved macros without relying on any LLM logic yet.

## 2. Files Inspected
- `src/lib/nutrition-engine/quantity/`
- `src/lib/nutrition-engine/sources/`

## 3. Existing Recipe Behavior Found
The API routes and recipe folder did not previously exist in this clean architecture. The calculator UI integration is still pending for Phase 9.

## 4. New Recipe Module Files
- `src/lib/nutrition-engine/recipe/recipeTypes.ts`
- `src/lib/nutrition-engine/recipe/ingredientCleaner.ts`
- `src/lib/nutrition-engine/recipe/ingredientLineParser.ts`
- `src/lib/nutrition-engine/recipe/ingredientResolver.ts`
- `src/lib/nutrition-engine/recipe/recipeCalculator.ts`
- `src/lib/nutrition-engine/recipe/recipeConfidence.ts`
- `src/lib/nutrition-engine/recipe/recipeWarnings.ts`
- `src/lib/nutrition-engine/recipe/recipeGuards.ts`

## 5. Ingredient Cleaning Rules
`ingredientCleaner.ts` handles:
- Removing leading bullets/numbers (`*`, `-`, `1.`)
- Normalizing weird whitespace and unicode fractions
- Stripping comment parentheses e.g. `(optional)`
- Detecting empty or instruction lines like "Preheat oven to 350".

## 6. Ingredient Line Parsing Rules
`ingredientLineParser.ts` uses Phase 5's `parseQuantityText`. It pulls out the amount, unit, and leaves the remaining string as `foodText`. It also extracts standard preparation verbs like "sliced" or "cooked" to aid source resolution.

## 7. Ingredient Resolver Flow
`resolveIngredient()` takes the parsed `foodText` and queries the Phase 4 `resolveFoodSources()` contract. Once a USDA/Local source is found, it uses the Phase 5 `resolveServingToGrams()` contract to turn the parsed unit/amount into solid grams.

## 8. Nutrient Math Formula
The new `calculation` folder handles deterministic math:
`nutrient amount = (nutrientPer100g / 100) * grams`
All missing nutrients are kept as `undefined`/`null` to prevent faking data.

## 9. Recipe Total & Per-Serving Formula
`calculateRecipeTotals` cleanly adds the macros of all `resolved` and `needs_review` ingredients.
`calculatePerServingNutrition` divides this total by the `servings` count (minimum 1) and rounds cleanly.

## 10. Partial Result Behavior
If 4 out of 5 ingredients are resolved, the engine still returns the recipe total for the 4 known items. It marks the recipe with a `RECIPE_PARTIAL_RESULT` warning and drops confidence to `low`/`needsReview` so the UI knows not to guarantee accuracy.

## 11. Confidence Rules
- High: All lines resolved with known units.
- Low: Any unresolved item, missing quantity, unsupported unit, or partial USDA macros.

## 12. Warning Rules
Includes detailed ingredient-level tracking (`INGREDIENT_UNRESOLVED`, `INGREDIENT_QUANTITY_MISSING`) and global warnings (`RECIPE_NO_RESOLVED_INGREDIENTS`).

## 13. API Route Changes
Created a new, fully safe, non-breaking JSON route at `src/pages/api/recipe/calculate.ts` that safely invokes the engine and strips all server secrets before returning data.

## 14. What was intentionally not changed
The frontend recipe calculator UI (`src/pages/recipe-nutrition-calculator.astro`) was intentionally NOT modified in this phase to prevent breaking the live app before Phase 9.

## 15. Recommended Phase 7 Next Step
Integrate the LLM parsing helper (Phase 7) solely for transforming complex paragraph-based recipe text into clear line-by-line inputs, retaining the deterministic engine for everything else.

Nutrition Engine V2 Phase 6 recipe understanding engine complete.
