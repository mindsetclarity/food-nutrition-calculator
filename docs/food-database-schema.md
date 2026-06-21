# Food Database Schema

## 1. Purpose of Curated Food Database
The curated USA food database provides the foundational, validated nutrition truth for the calculator. It is a scalable fallback and fast support layer. The LLM parses user input, but never generates final nutrition truth.

## 2. Canonical Food Item Schema
Each food must adhere to the `CuratedFoodItem` schema:
- `id`: Unique identifier (e.g., `fruit-banana`)
- `slug`: URL-friendly identifier
- `displayName`: Short UI name
- `canonicalName`: Full descriptive name
- `searchName`: Optimized name for matching
- `category`: Strict category ID
- `source`, `sourceLabel`, `isEstimated`: Source attribution
- `nutrientsPer100g`: Macronutrients and micronutrients
- `servingSizes`: Array of valid serving sizes
- `aliases`, `tags`, `warnings`, `qualityFlags`

## 3. Nutrient Schema
`CuratedNutrientsPer100g` must include at minimum: `calories`, `protein`, `carbs`, `fat`. These cannot be negative, NaN, or Infinity.
Optional nutrients (like fiber, sugar, sodium) can be `number | null | undefined`. Missing values should not be defaulted to 0 unless known.

## 4. Serving Size Schema
`CuratedServingSize`:
- `id`, `label`, `grams`, `unit`, `quantity`, `isDefault`
- Grams and quantity must be positive.
- Food-specific units (like cup/tbsp) must be mapped to their specific gram weight for that food.

## 5. Category Rules
Strict category enums (`breakfast`, `fruits`, `vegetables`, etc.). New categories must be added to `FOOD_CATEGORIES` in `categorySchema.ts`.

## 6. Alias Rules
Aliases improve search matching (e.g., "garbanzo beans" for chickpeas). They must be arrays of lowercase strings.

## 7. Tag Rules
Tags ("raw", "cooked", "vegan") help with filtering.

## 8. Source Rules
Must declare source accurately:
- `curated_us`: Local curated data
- `usda_derived`: Values derived from USDA but stored locally
- `isEstimated`: Boolean flag indicating if the values are estimates

## 9. Quality Flags
Quality indicators: `complete_core_nutrients`, `partial_nutrients`, `estimated_serving`, `local_estimate`, `needs_review`.

## 10. Recipe Readiness Fields
`recipeUseCases`: 'baking', 'smoothie', 'main', etc.
`preparationState`: 'raw', 'cooked', 'dry', etc.

## 11. Compare Readiness Fields
`compareGroup`: Logical grouping for comparison (e.g., 'fruit', 'cooked_grain').

## 12. Meal Readiness Fields
`mealUseCases`: 'breakfast', 'lunch', 'snack', etc.

## 13. Examples
```typescript
{
  id: "fruit-banana",
  slug: "banana",
  displayName: "Banana",
  // ...
  source: "curated_us",
  isEstimated: true,
  // ...
}
```

## 14. Do-Not-Do Rules
- DO NOT fake USDA claims if the data is not actually USDA.
- DO NOT use LLM-generated truth for final values.
- DO NOT assume 1 cup is universally the same gram weight for all foods.
- DO NOT leave ID or Slug missing or duplicated.
