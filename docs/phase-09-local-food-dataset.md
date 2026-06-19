# Phase 9: US-Focused Local Seed Food Dataset

## Overview
Phase 9 establishes the local seed food dataset for the Food Nutrition Calculator. This dataset acts as a fallback layer and a development seed to support the calculator interface, compare foods tool, and meal calculator prior to the full integration of the USDA FoodData Central API.

## Nutrition Truth Hierarchy
The platform strictly follows this hierarchy for data truth:
1. **USDA FoodData Central API**: The primary source of truth for all nutrition data. (Future Phase)
2. **Local US-focused Seed Dataset**: The secondary fallback used when the USDA API is unavailable, fails, returns no results, or during early development. (This Phase)
3. **LLM Fallback**: The absolute last resort for estimating nutrition of complex user queries. (Future Phase)

**Crucial Note**: The local dataset is explicitly marked as estimated (`isEstimated: true`) and its source is labeled as `"Local database"`. It must not be presented as verified USDA data.

## Data Schema & Types
A robust TypeScript schema (`src/lib/nutrition/types.ts`) was created to ensure type safety and consistency:
- `FoodItem`: Core interface defining id, slug, name, displayName, aliases, category, source metadata, default units, serving sizes, and nutrients.
- `NutrientProfile`: Standardized structure for calories, macros, and key micronutrients per 100g.
- `ServingSize`: Supports multiple serving options (e.g., cups, slices, pieces) with explicit gram weights for accurate math.

## Categories
US-friendly categories were defined in `src/data/foodCategories.ts` to organize the data logically:
- Breakfast, Eggs & Dairy, Grains & Cereals, Fruits, Vegetables, Meat & Poultry, Seafood, Beans & Plant Protein, Prepared Meals, Fast Food Style, Snacks, Desserts, Beverages, Condiments & Oils, Nuts & Seeds, Protein & Fitness Foods.

## Serving Size Strategy
Instead of relying on universal generic conversions (which are inaccurate for volume-to-weight), the dataset stores food-specific serving sizes. For instance, 1 cup of oatmeal has a different gram weight than 1 cup of broccoli. 

## Unit Conversion Strategy
Helper functions in `src/lib/nutrition/unitConversions.ts` handle standardized conversions (ounces/pounds to grams) and resolve abstract units (like "1 serving" or "1 slice") to concrete gram amounts based on the specific food's `servingSizes` array.

## The Dataset
`src/data/foods.ts` contains exactly 90 hand-curated US-focused food items.
- Covers common breakfast foods (eggs, bacon, oatmeal, coffee).
- Covers lunch/dinner staples (chicken breast, salmon, rice, pizza, burgers).
- Covers snacks, desserts, and beverages (protein bars, chips, soda).
- Each item includes rich aliases for better future searchability (e.g., "sunny side up" for fried egg).

## Future Integration Notes
- **USDA**: The schema is designed to easily map USDA API responses into `FoodItem` objects.
- **LLM**: The `aliases` field is specifically designed to help an LLM or fuzzy search match user natural language to exact dataset entries.

## Known Limitations
- Micronutrients (like saturated fat, cholesterol, potassium) are not fully populated for all items yet, prioritizing the core macros (calories, protein, carbs, fat).
- The dataset is intentionally limited to 90 items. Real-world usage relies on the upcoming USDA integration.

## Usage
Future phases should import from `src/lib/nutrition/foodSearch.ts` to query this local data via `searchLocalFoods(query)`, `getFoodBySlug(slug)`, or `getAllLocalFoods()`.
