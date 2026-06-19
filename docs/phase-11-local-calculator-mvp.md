# Phase 11: Local Calculator MVP

## 1. Purpose of Phase 11
The purpose of Phase 11 is to connect the existing Calculator UI to the local seed dataset (Phase 9) and the deterministic nutrition calculation engine (Phase 10) to create a fully functional, browser-based Calculator Minimum Viable Product (MVP).

## 2. What was connected
- **UI to Data**: Wired up the `src/data/foods.ts` dataset so that users can search for foods directly from the local dataset.
- **UI to Engine**: Integrated `src/lib/nutrition/calculateNutrition.ts` to process all food inputs (quantity, unit) locally in the browser, completely avoiding API calls or backend dependencies.
- **Added Components**: Created `src/components/calculator/CalculatorShell.astro` to serve as a clean, unified interface for search, quantity entry, and nutritional totals.

## 3. Local dataset usage
- Used `searchLocalFoods` and `getFoodById` from `src/lib/nutrition/foodSearch.ts` to power a fast, real-time dropdown search.
- The dropdown handles case-insensitive partial searches and displays the food item's category and source.

## 4. Deterministic engine usage
- When an item is added, `calculateFoodItem` processes the input, validates the unit, and outputs the calculated `CalculatedFoodItem`.
- The meal list recalculates its totals using `calculateMealTotals` whenever an item is added or removed, ensuring perfectly deterministic summation and rounding.

## 5. User flow
1. **Search**: The user begins typing in the "Food Item" input. If 2 or more characters are entered, the autocomplete dropdown appears.
2. **Select**: Clicking an option populates the selected food area and reveals the quantity and unit inputs, pre-populated with default values.
3. **Add**: The user clicks "Add" to resolve the nutrition facts via the engine and push the item to the meal list.
4. **Review/Manage**: The item appears in the list with a summary of its source and macros. The totals display dynamically updates. The user can remove individual items or click "Clear All" to reset.

## 6. Source badge behavior
All foods in the MVP are sourced from the local database. A persistent "Local database" badge correctly highlights this. The totals summary displays a message about the nature of estimated data and plans to transition to USDA data in future phases.

## 7. Validation behavior
- Inputs strictly check for positive non-zero quantities.
- Units are verified dynamically; standard aliases and available serving sizes are the only options presented, preventing invalid units.
- A friendly error container catches validation issues and displays a localized prompt.

## 8. Mobile behavior
The layout scales safely down to small devices. Search input takes full width, and horizontally scrollable areas ensure that tables don't compress unreadably or force horizontal page scroll.

## 9. Known limitations
- Authentication and saving meals are omitted; refreshing the page clears the meal state.
- Some edge case foods might not have comprehensive macro data available. 
- Recipe-style parsing or comparison tools are out of scope.

## 10. Why USDA/LLM are not implemented yet
Phase 11 specifically requested a completely deterministic local environment to test the architecture, rounding, and summation without dealing with network latency or variable third-party schemas.

## 11. Phase 12 recommendation
Begin integrating the USDA FoodData Central API for real-time search and verified nutrition data retrieval, falling back to local and eventually LLM when USDA data is sparse.
