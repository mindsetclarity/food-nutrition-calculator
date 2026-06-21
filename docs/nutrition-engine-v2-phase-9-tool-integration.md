# Nutrition Engine V2 — Phase 9 Tool Integration

## Purpose
Phase 9 physically connects the clean UI of the calculators to the `nutrition-engine` API. Prior to this phase, logic was often duplicated or scattered in components. Now, the UI is purely a presenter of data that originates fully from deterministic engine calculations.

## Files Inspected
- `src/lib/nutrition-engine/engineContract.ts`
- `src/pages/api/recipe/calculate.ts`
- `src/lib/nutrition-engine/calculation/nutrientMath.ts`

## Files Created/Edited
- `src/lib/nutrition-engine/calculator/calculatorEngine.ts`
- `src/lib/nutrition-engine/calculator/calculatorTypes.ts`
- `src/lib/nutrition-engine/calculator/calculatorWarnings.ts`
- `src/pages/calculator.astro`
- `src/pages/recipe-nutrition-calculator.astro`
- `src/pages/api/foods/search.ts`
- `src/pages/api/foods/details.ts`
- `src/pages/api/calculator/totals.ts`

## Calculator Engine Flow
1. User enters a query into `calculator.astro`.
2. UI fetches `/api/foods/search`.
3. Engine runs `searchCalculatorFoods` combining USDA + Local data, stripping out heavy internals before returning to the UI.
4. User selects a food. UI fetches `/api/foods/details` to grab the canonical serving sizes.
5. User enters quantity/unit. UI sends the state to `/api/calculator/totals`.
6. Engine completely re-calculates the deterministic sum via `resolveCalculatorFood` and `calculateCalculatorTotals` and returns `CalculatorStateResult`.

## Recipe Engine Flow
1. User enters ingredients in textarea.
2. UI posts JSON to `/api/recipe/calculate`.
3. Engine runs `calculateRecipeEngine` which internally parses text, resolves food via source resolver, uses quantity engine for grams, applies nutrient math, and returns `totalNutrition` and `perServingNutrition`.
4. UI binds `perServingNutrition` to the Nutrition Facts-style label.

## Safety & LLM Boundaries
- **USDA/Local Fallback**: Works perfectly. If USDA is unavailable, the fallback local source handles requests seamlessly and appends `LOCAL_FALLBACK_USED` warnings.
- **LLM Safety**: The LLM is restricted exclusively to text-parsing in `parseFoodTextWithLLM`. It never generates calories. Final values are explicitly resolved through curated/USDA math endpoints.
- No API keys are exposed to the client in the new API routes.

## Mobile & Accessibility
- **Mobile**: Used Tailwind CSS grid classes (`grid-cols-1 lg:grid-cols-2` and `lg:grid-cols-3`) to stack panels nicely on smaller screens. 
- **Accessibility**: Inputs have associated labels, ARIA-roles are naturally handled via standard HTML inputs, interactive states use standard focus outlines.

## Phase 10 Recommendation
Phase 10 should consist of a final QA pass over the entire system, strict unit testing across edge cases, and validation against a massive list of ingredients to ensure total accuracy of deterministic results and error recovery.
