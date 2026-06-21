# USDA Food Import Pipeline

## 1. Purpose
This pipeline connects the Food Nutrition Calculator to the USDA FoodData Central database. It fetches food records based on curated search terms, normalizes the data into our local food schema, and saves them as statically imported local datasets. This expands our core food database with thousands of verified foods while maintaining high-performance local search and offline capability.

## 2. USDA Source
All data is sourced from [USDA FoodData Central](https://fdc.nal.usda.gov/). We prioritize the following data types:
- Foundation
- SR Legacy
- Survey (FNDDS)

## 3. Environment Variable Required
To run the import pipeline, you must have an active USDA API Key.
Add the following to `.env.local` in the project root:
```env
USDA_API_KEY=your_api_key_here
```

## 4. How to run import script
Execute the script from the root directory:
```bash
node scripts/import-usda-foods.mjs
```
*Note: Make sure your API key is correctly configured before running.*

## 5. How files are generated
The script fetches USDA records in batches based on categories (Fruits, Vegetables, Grains, etc.). It normalizes nutrients, parses serving sizes, generates a slug, deduplicates, and validates basic nutrient limits.
Generated files are written to:
`src/data/foods/generated/`
For example: `usda-fruits.ts`, `usda-vegetables.ts`, and an `index.ts` file that exports all of them as `usdaFoods`.

## 6. How validation works
To validate that the imported data strictly follows the app's `foodSchema.ts`:
```bash
node scripts/test-food-data-validation.mjs
```
This script ensures:
- Unique IDs and slugs
- Complete required fields (displayName, sourceLabel, etc.)
- Finite and non-negative macro-nutrients
- Proper category usage

## 7. How to update dataset later
To update the dataset:
1. Edit `scripts/import-usda-foods.mjs` to add new search terms if needed.
2. Run `node scripts/import-usda-foods.mjs` again.
3. Validate and review git diff before committing.

## 8. Data quality rules
- Reject foods with missing basic macros.
- Avoid heavily branded duplicates.
- Only safe aliases are automatically added.
- Partial micronutrients are allowed (null/undefined).
- Deduplicate on `slug` to prevent identical items.
- Ensure the final result maintains high query relevance.

## 9. Limitations
- We currently do not import all 300,000+ USDA foods to prevent UI bloat and slow searches.
- Some branded foods might sneak in if their generic names match our terms exactly.
- Missing default servings fallback to 100g automatically.

## 10. Security rules
- Do not expose `USDA_API_KEY` in frontend code.
- Do not print the full API key in console logs (it is masked).
- Do not commit `.env.local`.

## 11. Do not commit secrets
Never commit `.env.local` or hardcode the API key in `import-usda-foods.mjs`.
