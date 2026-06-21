# Nutrition Engine V2 Phase 2 - Food Data Model

## 1. Phase 2 Purpose
The purpose of Phase 2 was to build a strong, curated USA food data model capable of scaling to 1000+ foods. It establishes the schema, validation, organization, and compatibility layer for local curated food data, ensuring it is category-ready, serving-size ready, recipe-ready, and USDA-compatible without relying on live USDA API calls or LLM-generated values for the local static database.

## 2. Files Inspected
- `src/lib/nutrition-engine/types.ts`
- `src/lib/nutrition-engine/engineContract.ts`
- `src/data/foods.ts` (did not exist previously)
- Project structure (`src/`)

## 3. Existing Food Data Structure Summary
No existing `src/data/foods.ts` was found during the initial inspection, implying the project was ready for a fresh, scalable data architecture to be laid out without legacy conflicts in `src/data/`.

## 4. New Schema Files Created
- `src/lib/nutrition-engine/data/foodSchema.ts`: Defines `CuratedFoodItem` and core types.
- `src/lib/nutrition-engine/data/categorySchema.ts`: Defines strict categories.
- `src/lib/nutrition-engine/data/servingSchema.ts`: Defines serving size rules and helpers.
- `src/lib/nutrition-engine/data/foodQuality.ts`: Adds quality flag checks (e.g., core nutrient completeness).
- `src/lib/nutrition-engine/data/foodValidation.ts`: Validation logic for all data schema constraints.
- `src/lib/nutrition-engine/data/index.ts`: Unified export of data models.

## 5. Category System Summary
Implemented a stable, enum-like category system (`CuratedFoodCategory`) mapped to `FOOD_CATEGORIES` definitions. Categories include `fruits`, `vegetables`, `grains_cereals`, `dairy_alternatives`, etc.

## 6. Serving System Summary
Established `CuratedServingSize` which enforces that units like "cup" or "tablespoon" are specific to the food rather than globally assumed. Grams must be explicitly defined and positive. Helper methods like `normalizeServingUnit` were added.

## 7. Validation System Summary
Created comprehensive validation spanning Identity (ID/slug uniqueness), Nutrients (finite positive numbers for core nutrients), Categories, Serving Sizes, and Source properties. 
Added `scripts/validate-food-data.mjs` and updated `package.json` to allow running `npm run validate:foods`.

## 8. Compatibility Strategy
Created a scalable directory structure at `src/data/foods/` with individual category files (`fruits.ts`, `vegetables.ts`, etc.), rolled up into `index.ts`.
A bridge file `src/data/foods.ts` exports `localFoods` to preserve any potential backward compatibility expectations from the rest of the application.

## 9. Current Food Count
Total foods added: 7 (6 fruits, 1 vegetable).

## 10. Sample Foods Added
- **Fruits**: Banana, Apple, Orange, Strawberries, Blueberries, Avocado
- **Vegetables**: Broccoli (Raw)

## 11. Intentionally Not Implemented
- The full 1000+ foods database (focus was on architecture).
- Calculator UI migration to V2.
- Recipe UI migration to V2.
- Live USDA API behavior updates.
- Auth, analytics, database servers, or any heavy external dependencies.

## 12. Phase 3 Recommendation
Proceed with Phase 3 to build the search engine foundation, utilizing the structured `aliases`, `tags`, and `usdaQueryHints` provided by this new Phase 2 data model.
