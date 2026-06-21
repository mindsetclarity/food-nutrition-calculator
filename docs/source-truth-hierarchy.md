# Source Truth Hierarchy

To ensure the Food Nutrition Calculator remains accurate, trustworthy, and deterministic, all calculations adhere to this strict hierarchy of truth.

## 1. USDA Primary Source
Data originating from the USDA FoodData Central API is the highest priority truth. It overwrites any local or estimated assumptions.

## 2. Curated Local Fallback
When USDA data is unavailable, offline, or rate-limited, the application relies on the bundled curated US local database (`src/data/foods`). This data is considered verified enough for general use but carries a "Local fallback" label.

## 3. Estimated Local Values
Certain foods in the local database may be marked as `isEstimated: true`. These are approximations and are clearly badged in the UI to prevent misleading users.

## 4. LLM Parsing Helper Only
The LLM (e.g., Gemini/GPT) is used exclusively as a text parsing engine. It is allowed to translate "I ate a big bowl of oats" into:
`[ { query: "oats", quantity: 1, unit: "bowl" } ]`

**The LLM is NEVER allowed to state the nutritional macros of "oats".**

## 5. Deterministic Calculation Ownership
The final math (`calories = (caloriesPer100g / 100) * grams`) is owned entirely by the TypeScript engine (`nutrition-engine`).

## Prohibited Behavior
- The LLM cannot invent verified nutrition truth.
- Local data should not be labeled "USDA" if it did not come directly from the API.
- USDA data should not be silently modified by the UI without exposing a warning.
