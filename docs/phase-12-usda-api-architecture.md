# Phase 12: USDA API Architecture

## 1. Purpose of Phase 12
The purpose of Phase 12 is to establish a robust, server-side architecture for interacting with the USDA FoodData Central API. It ensures that the primary source of nutritional truth is strictly integrated, strongly typed, properly mapped to the local schema, and completely secure (no API keys leaked to the client).

## 2. USDA-first nutrition hierarchy
1. **USDA**: Primary source of verified nutrition.
2. **Local**: Fallback dataset when USDA fails, is rate-limited, or returns zero useful results.
3. **LLM**: Out of scope for this phase, but positioned as the last-resort fallback.

## 3. API routes created
- `/api/foods/search.ts`
- `/api/foods/details.ts`

## 4. USDA endpoints used
- Search: `GET https://api.nal.usda.gov/fdc/v1/foods/search`
- Details: `GET https://api.nal.usda.gov/fdc/v1/food/{fdcId}`

## 5. Environment variables
- `USDA_API_KEY`: The official API key provided by Data.gov.

## 6. Server-only secret handling
The API key is accessed exclusively via `import.meta.env.USDA_API_KEY` within the Astro server-side API routes. The USDA client (`src/lib/usda/client.ts`) handles network requests internally, preventing the key from ever entering the client bundle or the JSON response payload.

## 7. Search route behavior
The search route bounds requests (limit 1-25) and hits the USDA search endpoint if the API key is present. If the USDA request succeeds, the results are normalized. If the key is missing or the USDA request fails, the endpoint transparently defaults to the `localFoods` dataset, mapping the local items into a consistent `NormalizedSearchResult` shape.

## 8. Details route behavior
The details route prioritizes `fdcId`. When provided, it fetches full profiles from the USDA API. If `source=local` or `id` starts with `local_`, it explicitly loads from the local dataset. Similar to search, if USDA fetching fails, it attempts to fall back to the local database if an `id` is present.

## 9. Nutrient mapping strategy
The `src/lib/usda/nutrients.ts` map aligns USDA's complex text names (e.g., "Carbohydrate, by difference" or "Energy") to the unified `NutrientProfile` keys (e.g., `carbohydrates`, `calories`). Crucially, it prefers `kcal` over `kJ` for Energy and drops unknown/unmapped nutrients entirely.

## 10. Normalization strategy
`normalize.ts` reshapes verbose USDA objects into the strict `FoodItem` schema used by the deterministic calculation engine. It guarantees serving size formatting (always falling back to 100g base calculations), extracts reliable brand information into the display name, and sets the `source` strictly to `"usda"`.

## 11. Fallback strategy
Fallbacks are implemented globally at the route level. Whenever `hasUsdaApiKey()` returns false or a network `fetch` throws/returns non-200, the catch block intercepts the failure and proceeds to query the deterministic local dataset. 

## 12. What Phase 12 does not implement
- Real USDA keys are not checked in.
- The UI (Calculator MVP) remains pointing to the local logic—UI integration is deferred to Phase 13.
- LLM natural language parsing.

## 13. How Phase 13 should connect UI
Phase 13 will replace the static client-side import of `searchLocalFoods` in `CalculatorShell.astro` with a `fetch('/api/foods/search?q=...')` call to hit these new server routes. The deterministic calculation engine will effortlessly digest the normalized USDA responses.

## 14. Manual testing instructions
1. Without `USDA_API_KEY` in `.env`:
   - Visit `/api/foods/search?q=chicken` -> You should see local fallback results (`source: "local"`).
2. With `USDA_API_KEY` set:
   - Visit `/api/foods/search?q=chicken` -> You should see rich USDA results (`source: "usda"`).

## 15. Known limitations
- USDA search queries can sometimes be noisy. We may need to refine the `dataType` filters (e.g., "Foundation", "SR Legacy") in Phase 13 if the results are too confusing.
- Rate limiting by USDA is possible, at which point the system will automatically fall back to local results.
