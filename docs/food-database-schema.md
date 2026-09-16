# Food Database Schema

## `FoodItem` Schema

The `FoodItem` schema has been updated to handle a larger and more complex database of 1000+ foods.

```typescript
export interface FoodItem {
  id: string; // Unique local identifier (e.g., local_0001)
  slug: string; // Unique URL-friendly slug
  name: string; // Original generic name, kept for compatibility
  searchName: string; // Precomputed lowercased search friendly name
  displayName: string; // Human-readable label (e.g., "Apple, Raw")
  aliases: string[]; // List of alternative names
  category: string; // Main category
  subcategory?: string; 
  description?: string;
  source: FoodSource; // "local", "usda", or "llm_estimate"
  sourceLabel: string;
  isEstimated: boolean; // True for locally generated data
  defaultUnit?: string;
  defaultQuantity?: number;
  servingSizes: ServingSize[];
  nutrientsPer100g: NutrientProfile;
  tags?: string[]; // e.g., ["raw", "fruit", "high-fiber"]
  commonNames?: string[];
  brandType?: string;
  preparationState?: string; // e.g., "Raw", "Cooked", "Baked"
  cookedState?: string;
  defaultServing?: string;
  usdaQueryHints?: string[];
  compareGroup?: string; // Useful for grouping foods in the compare tool
  recipeIngredientType?: string;
  mealUseCases?: string[];
  density?: number;
  notes?: string;
  warnings?: string[];
  updatedAt?: string;
  commonUses?: string[];
  usdaSearchTerms?: string[];
}
```

## `NutrientProfile` Schema

```typescript
export interface NutrientProfile {
  calories: number | null;
  protein: number | null;
  carbohydrates: number | null;
  fat: number | null;
  fiber?: number | null;
  sugar?: number | null;
  sodium?: number | null;
  saturatedFat?: number | null;
  cholesterol?: number | null;
  potassium?: number | null;
  calcium?: number | null;
  iron?: number | null;
  vitaminA?: number | null;
  vitaminC?: number | null;
}
```

## `ServingSize` Schema

```typescript
export interface ServingSize {
  id?: string;
  unit: string;
  label: string;
  grams: number;
  quantity?: number;
  isDefault?: boolean;
}
```

## Category Rules

Categories must belong to the following standardized set to ensure the UI behaves predictably:
- Breakfast
- Fruits
- Vegetables
- Grains & Cereals
- Dairy & Alternatives
- Protein Foods
- Beans & Plant Protein
- Nuts & Seeds
- Snacks
- Desserts
- Beverages
- Condiments & Oils
- Prepared Meals
- Fast Food Style
- Sauces & Dressings
- Baking Ingredients
- Soups & Stews

## Alias Rules

- Aliases should include alternative names, singular/plural variants, or preparation variations.
- No two items should have identical aliases if they resolve to drastically different foods unless context clarifies it.
- Keep aliases strictly lowercased in the database definition for fast matching.

## Tag Rules

- Limit tags to meaningful, searchable concepts (e.g., `high-protein`, `vegan`, `dairy-free`).
- Avoid subjective health claims like `doctor-approved` or `fat-burning`.

## Source Rules & Quality Flags

- `source: "local"` implies deterministic, pre-calculated data.
- `isEstimated: true` means it's an aggregation or generic estimate, not a branded, lab-tested exact value.
- Quality flags like `estimated-serving` or `partial-nutrients` can be added to the `tags` array to warn users.

## Validation Rules

- `id` and `slug` must be unique across the entire 1000+ item database.
- `slug` must be URL-safe (lowercase, hyphenated).
- All items must have `calories`, `protein`, `carbohydrates`, and `fat` defined (can be 0, must not be NaN/Infinity).
- Gram conversions in `servingSizes` must be positive.
