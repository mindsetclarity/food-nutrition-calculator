# Phase 19: Compare Foods Tool

## 1. Purpose of Phase 19
The goal of Phase 19 is to build a premium and robust Compare Foods Tool where users can search, select, and view side-by-side comparisons of up to 4 foods. The tool focuses on accurate macro and micronutrient comparison while clearly disclosing the source and estimated nature of the data.

## 2. Compare Page Route
- `/compare-foods`

## 3. User Flow
1. User lands on `/compare-foods`.
2. Uses the search bar (or quick start example buttons) to find foods.
3. Selects a food from the debounced dropdown search results.
4. Food is added to the comparison list via a fetch to `/api/foods/details`.
5. Once at least 2 foods are selected, the side-by-side comparison table, insights, and macro cards appear.
6. User can switch the basis between "Per 100g" and "Per Serving".
7. User can remove foods or continue adding up to a maximum of 4.

## 4. USDA-first Search Behavior
- The search panel debounces keystrokes and hits the existing `/api/foods/search` endpoint.
- Search results display source badges (USDA vs. Local) and category labels to aid selection.

## 5. Local Fallback Behavior
- If USDA search fails or local foods appear in the search, they can be safely added.
- The `SourceBadge` reliably marks them.
- A prominent yellow notice appears if any local foods are being compared, stating that "Local fallback values are estimates."

## 6. Comparison Basis Behavior
- **Per 100g (Default):** Normalizes everything to 100 grams for a direct ratio comparison.
- **Per Serving:** Looks up the primary serving size for each food and calculates the nutrients based on that gram weight using the Phase 10 deterministic `calculateFoodItem` engine.

## 7. Compare Library Utilities
Several utilities were created under `src/lib/compare/`:
- `compareFoods.ts`: Orchestrates row generation, basis switching, and insight building.
- `compareFormatting.ts`: Number rounding and readable label extraction.
- `compareRanking.ts`: Determines "Highest" and "Lowest" safely.
- `types.ts`: Defines interfaces like `CompareFood`, `CompareBasis`, and `CompareResult`.

## 8. Nutrient Display Rules
- Calories, Sodium, Cholesterol, and Potassium are rounded to the nearest whole number.
- Other macros/micronutrients are rounded to 1 decimal place.
- Missing values (null) are displayed as "—" and do not falsely compute as "0".
- A "Highest" or "Lowest" badge is added to the cell if there are at least two known values to compare against.

## 9. Difference Insight Rules
- The system generates up to 4 neutral, factual insights.
- Example: "[Food] has the most protein among the compared foods."
- It explicitly avoids giving health advice, ranking foods generically as "healthiest", or providing medical context.
- Mentions if partial data affects the comparison.

## 10. Source Badge/Warning Behavior
- Source badges mark individual results and selected foods.
- `CompareSourceSummary` aggregates the sources used in the current comparison (e.g., "2 USDA, 1 Local").
- `CompareNotice` aggregates dynamic warnings (e.g., missing data, varying serving sizes).

## 11. Accessibility Decisions
- Search inputs use standard labels.
- "Highest/Lowest" is conveyed through text badges, not solely relying on color.
- Remove buttons clearly indicate their purpose.
- Focus states are preserved.

## 12. Mobile Decisions
- The comparison table layout scrolls horizontally within its own wrapper on smaller screens to prevent global page scrolling.
- A hint text ("Scroll sideways to compare if needed") is provided.
- Selected food cards and insights stack vertically on mobile.

## 13. Performance Decisions
- The application utilizes Vanilla JavaScript directly interacting with the DOM inside `CompareFoodsShell.astro`.
- Avoids heavy dependencies like React/Vue.
- Debounces search API calls.
- Fetches detailed nutrition data asynchronously only when a food is clicked.

## 14. What Was Intentionally Not Implemented
- Saved comparisons / Database persistence.
- LLM nutrition estimation or LLM comparison coaching.
- A Custom Gram/Unit comparison (deferred to avoid UI clutter; "Per 100g" and "Per Serving" serve 95% of use cases).
- Automatic "Best for you" health decisions.

## 15. Known Limitations
- "Per Serving" comparisons might compare drastically different weights (e.g., 1 slice of bread vs. 1 whole pizza), which is inherently misleading without strict user attention. A warning is shown to mitigate this.
- If the `calculateFoodItem` API doesn't have serving size data for a food, "Per Serving" falls back to 100g safely.

## 16. Phase 20 Recommendation
Proceed to Phase 20: Meal Calorie Calculator, to allow aggregations of multiple foods into a single daily or meal total.
