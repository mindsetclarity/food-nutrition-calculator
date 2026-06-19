# Phase 20: Meal Calorie Calculator

## 1. Purpose of Phase 20
The goal of Phase 20 is to build a premium, functional Meal Calorie Calculator where users can organize foods by meal section (Breakfast, Lunch, Dinner, Snacks, Drinks) and calculate totals for each meal as well as the entire day.

## 2. Route Created
- `/meal-calorie-calculator`

## 3. User Flow
1. User lands on `/meal-calorie-calculator`.
2. The user sees an empty state or Quick Start example buttons.
3. The user selects a meal section (e.g., "Breakfast") and clicks "Add Food".
4. A modal opens allowing them to search for foods via the USDA-first API.
5. They select a food, adjust quantity and unit, and click "Add to Meal".
6. The food is added to the section, section totals recalculate, and the full-day totals recalculate.
7. The user can remove individual foods, clear a section, or clear the entire day.

## 4. Meal Sections Strategy
Sections are pre-defined in `src/lib/meal/mealSections.ts` with strict IDs (`breakfast`, `lunch`, `dinner`, `snacks`, `drinks`). This provides a structured, familiar template for users to organize their day without requiring an overly complex custom-section builder.

## 5. USDA-first Search Behavior
- The "Add Food" modal utilizes the existing `/api/foods/search` endpoint.
- Searches are debounced (300ms) and require a minimum of 2 characters.
- Results display the standard USDA vs. Local source badges.

## 6. Local Fallback Behavior
- If USDA search fails or local foods appear in the search, they can be safely added.
- The UI reliably marks them with grey badges.
- A prominent notice automatically appears if any local foods are in the meal plan, stating "Local fallback values are estimates."

## 7. Deterministic Engine Usage
- All calculations for an added food item pass through `calculateFoodItem` (from Phase 10).
- All meal section totals and full-day totals pass through `calculateMealTotals` (from Phase 10).
- This ensures 100% mathematical consistency across the entire app (Recipe page, Compare page, Meal page).

## 8. Meal Section Total Behavior
- When an item is added or removed, the section's `NutritionTotals` object is updated using the engine.
- A totals bar at the bottom of each section card displays Calories, Protein, Carbs, and Fat.

## 9. Full-day Total Behavior
- The `DayTotalsPanel` aggregates all items across all sections.
- It displays Calories, Protein, Carbs, Fat, Fiber, Sugar, and Sodium.
- A `MealMacroBreakdown` component visually displays the percentage contribution of each meal to the total daily calorie intake using dynamic progress bars.

## 10. Example Meal Behavior
- Quick start buttons (e.g., "Simple Breakfast") use pre-defined templates in `src/lib/meal/mealExamples.ts`.
- When clicked, they silently perform searches against the API and resolve the items to ensure they flow through the deterministic engine properly, rather than relying on hardcoded fake nutrition data.

## 11. Optional Parser Behavior
- The Natural Language Parser (`/api/parse-meal`) was intentionally omitted to minimize scope creep and ensure stability. The user flows via manual search are robust enough for this phase.

## 12. Source Badge/Warning Behavior
- Source badges mark individual results and added foods.
- `MealSourceSummary` aggregates the sources used in the current day (e.g., "Sources: 2 USDA, 1 Local Fallback").
- `MealNotice` aggregates dynamic warnings (e.g., missing data, varying serving sizes, local estimates).

## 13. SEO Notes
- Optimized Title & Meta Description explain it's a USDA-first meal and daily calorie calculator.
- H1 is clear.
- Contains relevant internal links to `/calculator`, `/recipe-nutrition-calculator`, and `/compare-foods`.

## 14. Accessibility Decisions
- Search inputs and quantity/unit fields use standard labels.
- Modal uses semantic focus states and a clear close button.
- "Remove" buttons have aria-labels identifying their action.
- Warning labels use appropriate contrast.

## 15. Mobile Decisions
- Meal section cards stack cleanly.
- The `DayTotalsPanel` uses a flexible grid that adapts nicely to smaller viewports.
- The search modal fills the screen efficiently on mobile.
- No horizontal scrolling bugs exist.

## 16. Performance Decisions
- The application utilizes Vanilla JavaScript inside `MealCalorieShell.astro`.
- Avoids heavy dependencies.
- Modals are hidden using CSS (`hidden` class) rather than complex DOM insertion/removal, keeping state simple.

## 17. What Was Intentionally Not Implemented
- Saved meals / User accounts.
- Database persistence.
- Calorie target personalization.
- PDF Export.
- Integration of the NLP Meal Parser (to keep the page extremely stable).

## 18. Known Limitations
- "Clear All Meals" wipes everything instantly (with a native JS confirm dialog to prevent accidents). If the user refreshes the page, their day is lost since there is no local storage or database. This is explicitly the intended behavior for Phase 20.

## 19. Phase 21 Recommendation
Proceed to Phase 21: Learn Hub and Articles.
