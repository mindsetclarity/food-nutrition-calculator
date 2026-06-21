# Recipe Calculator Engine Integration

## Architecture
The Recipe Calculator integrates deeply with the Phase 6 `calculateRecipeEngine`. The UI acts solely as an orchestrator of user input, feeding multiline strings into the `api/recipe/calculate` endpoint, and mapping the deterministic results back to visual cards.

## Flow & Processing Steps
1. **Input Format**: Users submit a `recipeName`, a `servings` count, and a multiline `ingredientsText` block.
2. **Ingredient Parsing**: The engine splits text line by line. If a line is empty, it's skipped.
3. **Source Resolving**: Each line is matched against the Phase 4 Source Resolver. It attempts local/USDA lookup to find a canonical food instance.
4. **Quantity Resolving**: Extracted amounts (e.g. `1/2 cup`) are passed through Phase 5 `resolveServingToGrams`.
5. **Deterministic Math**: Once grams are known, `calculateNutrientsForGrams` generates the exact macro/micronutrient breakdown. 
6. **Total vs Per-Serving**: `addNutritionTotals` sums the complete recipe. `divideNutritionTotals(totals, servings)` calculates the final per-serving output.

## Nutrition Facts-style Label
The UI features a `NutritionLabel.astro` component. This component strictly accepts the `perServingNutrition` object returned by the engine API. It formats decimals, rounds values to the nearest gram, and ensures proper labeling compliance without actually calculating anything itself.

## Warnings and Safety
If an ingredient fails to parse or fails to match a known food, the engine flags it as an "Unresolved match" in the UI ingredient breakdown, appending specific warnings so the user understands their totals may be partial.
