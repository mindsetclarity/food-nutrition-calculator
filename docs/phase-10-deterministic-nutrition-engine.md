# Phase 10: Deterministic Nutrition Calculation Engine

## 1. Purpose of Deterministic Engine
This engine calculates calories, macros, and micronutrients deterministically from resolved food data. It normalizes unit inputs, resolves quantities to grams, scales per-100g nutrient profiles, and tallies meals/recipes. It explicitly decouples calculation logic from data fetching or UI state.

## 2. Nutrition Truth Hierarchy
The engine calculates *whatever* is passed to it, but enforces the strict reporting of its source metadata based on the hierarchy:
1. **USDA FoodData Central API**: Primary truth.
2. **Local dataset**: Secondary fallback (estimated).
3. **LLM fallback**: Last-resort estimate only.

## 3. What this phase does NOT do
- No UI components or interactive calculator logic.
- No USDA API calls.
- No LLM API calls.
- No new fake nutrition data was invented.

## 4. File Structure
All engine code resides in `src/lib/nutrition/`:
- `types.ts`: Extended with `CalculationInput`, `CalculatedFoodItem`, `NutritionTotals`, etc.
- `unitConversions.ts`: Standardized unit aliases and resolved quantity-to-grams mapping.
- `nutrientUtils.ts`: Pure functions for multiplying, adding, rounding, and handling null nutrients.
- `validation.ts`: Safely checks food, quantity, and unit validity before calculation.
- `sourceSummary.ts`: Tallies source types (USDA, Local, LLM) across a meal and flags estimates.
- `calculateNutrition.ts`: Exposes `calculateFoodItem` and `calculateMealTotals`.

## 5. Calculation Formula
For a single item:
`factor = resolvedGrams / 100`
`calculatedNutrient = baseNutrient * factor`
Each macro/micronutrient is processed safely using `multiplyNutrient`, allowing null values to remain null instead of crashing or converting falsely to zero.

## 6. Unit Conversion Strategy
Units are normalized (e.g., "ounces", "ounce", "oz" -> "oz"). 
Fixed conversions are used for grams (1:1), ounces (28.3495g), and pounds (453.592g). All other units (cups, tbsp, slices) look up the food-specific `servingSizes` array.

## 7. Serving Size Strategy
Volumetric units are purely context-dependent. 1 cup of food A will resolve to different grams than 1 cup of food B, depending entirely on `food.servingSizes`.

## 8. Rounding Strategy
- Calories: nearest whole number.
- Macros (Protein, Carbs, Fat, Fiber, Sugar, Saturated Fat): 1 decimal place.
- Micronutrients (Sodium, Potassium, Cholesterol): nearest whole number.

## 9. Source Summary Strategy
When summing multiple `CalculatedFoodItem`s in a meal, `createSourceSummary` counts the frequency of each source, prepares a friendly label (e.g., "2 USDA, 1 local database"), and raises aggregate warning flags if any non-USDA data was included.

## 10. Validation Strategy
`validateCalculationInput` strictly enforces that quantities are numbers > 0, units are known, and that the specified unit is actually available for the selected food. Errors are returned gracefully as friendly strings for the UI to consume, preventing app crashes.

## 11. How future USDA data will use the engine
Phase 12 will normalize USDA API responses into `FoodItem` objects and pass them identically through `calculateFoodItem`. The engine will see `source: 'usda'` and calculate exactly the same way.

## 12. How future LLM parsing will use the engine
Phase 14 will map natural language to known foods, inject the input into `calculateFoodItem`, and potentially use `source: 'llm_estimate'`. The engine will automatically generate the required AI warning labels.

## 13. Known Limitations
- If a user inputs a volume unit (e.g., "cup") that the specific `FoodItem` does not list in its `servingSizes`, the engine strictly rejects it rather than guessing density.

## 14. Phase 11 Recommendation
Begin connecting this deterministic engine to the React/Astro UI layer. Create the interactive Calculator store/state that manages the list of added foods, handles user input for quantities/units, and displays the `calculateMealTotals` output in real-time.

---

## Internal Calculation Checks (Sanity Validation)

- **100g calculation**: `calculateFoodItem` scales perfectly by 1.0.
- **Serving resolution**: A unit of "slice" correctly looks up the food's `grams` for "slice" and multiplies by quantity.
- **Fixed conversions**: `ouncesToGrams(2)` successfully returns `56.699`.
- **Invalid quantities**: `quantity: -1` or `quantity: "two"` safely returns `isValid: false` and an error string.
- **Null handling**: `addNutrientValues(5, null)` safely returns `5`. `addNutrientValues(null, null)` returns `null`.
- **Source warnings**: Adding a local food generates the warning *"Local database values are estimated fallback data."*
- **Meal totals**: `calculateMealTotals` correctly identifies `partialData` if some items are missing Potassium but others have it.
