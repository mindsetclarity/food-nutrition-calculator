# Calculator Engine Integration

## Architecture
The `calculator` module within the `nutrition-engine` serves as a dedicated translation layer. It prevents the raw complexity of internal Engine APIs from leaking into UI components.

## Search Flow
- Endpoint: `/api/foods/search?q=`
- Engine: `searchCalculatorFoods(query)`
- Mechanism: Queries the central `resolveFoodSources`, but maps the result back into lightweight `CalculatorSearchForUIResult` objects containing just `id`, `displayName`, `calories`, and `defaultServingLabel`.

## Selection Flow & Nutrient Calculation
- Endpoint: `/api/calculator/totals`
- Engine: `resolveCalculatorFood(input)` and `calculateCalculatorTotals(items)`
- Mechanism: To avoid replicating math on the client, the UI pushes its `[ { foodId, quantity, unit, servingId } ]` array to the API. 
- The engine runs Phase 5 `resolveServingToGrams`, then Phase 6 `calculateNutrientsForGrams`, aggregates the totals, aggregates the warnings, generates the global source summary, and returns the final state to the UI.

## Responsibilities
**UI:**
- Input capturing (keystrokes, selections).
- Rendering DOM elements.
- Managing local `selectedFoods` proxy state to bounce back to API.

**Engine:**
- All math.
- All unit to gram normalization.
- All warning generation.
- Source label aggregation.
