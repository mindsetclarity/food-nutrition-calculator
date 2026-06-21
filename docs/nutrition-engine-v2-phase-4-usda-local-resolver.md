# Nutrition Engine V2 — Phase 4: USDA + Local Source Resolver

## 1. Phase 4 Purpose
Phase 4 implements a secure, server-side USDA integration alongside a fallback system that leverages the Phase 3 local curated database. It ensures the application is USDA-first but resilient, providing near-instant local fallbacks if the USDA key is missing, rate-limited, or timing out.

## 2. Files Inspected
- `src/lib/nutrition-engine/*`
- `src/lib/nutrition-engine/search/*`

## 3. Current USDA Architecture Found
As the repository is a fresh start, no prior USDA client or `.env.example` existed. This allowed us to build the USDA resolver from scratch with zero legacy tech debt.

## 4. Current API Route Behavior Found
The `src/pages/api` directory did not exist. Therefore, we didn't have to alter existing API endpoints. They will be constructed securely in future phases utilizing the contracts built here.

## 5. New Source Resolver Files
- `sourceTypes.ts`
- `usdaClient.ts`
- `usdaMapper.ts`
- `usdaSearch.ts`
- `usdaDetails.ts`
- `localFoodSource.ts`
- `sourceMerger.ts`
- `sourceResolver.ts`
- `sourceGuards.ts`
- `index.ts`

## 6. USDA Client Summary
`usdaClient.ts` provides a robust, timeout-aware fetch wrapper (`fetchUsdaJson`) pointing at `api.nal.usda.gov`. It safely maps HTTP 429 and timeouts to custom `EngineError` states without throwing stack traces.

## 7. USDA Key Security Rules
`USDA_API_KEY` is retrieved purely via `process.env`. It is strictly forbidden to leak this key to the browser. All USDA functions explicitly require execution on the server.

## 8. USDA Mapper Summary
`usdaMapper.ts` normalizes USDA's `foodNutrients` arrays (by ID and name variants) into our deterministic `NutritionNutrients` interface.

## 9. USDA Search Summary
`searchUsdaFoods` executes paginated queries to USDA and employs a 10-minute in-memory cache to prevent over-fetching for identical queries.

## 10. USDA Details Summary
`getUsdaFoodDetails` retrieves specific USDA items by FDC ID, caching them for 15 minutes, and normalizing them into full `EngineFoodItem` structures.

## 11. Local Source Adapter Summary
`localFoodSource.ts` wraps the Phase 3 local search engine so its output structurally matches `FoodSourceSearchResult`, allowing seamless 1-to-1 merging with USDA results.

## 12. Source Merger Summary
`mergeFoodSourceResults` deduplicates results by canonical name and prioritizes USDA records (unless explicitly configured to prefer local), filling the rest of the limit with curated local results.

## 13. Source Resolver Summary
`resolveFoodSources` is the master orchestrator. It executes both USDA and Local searches concurrently (or sequentially if falling back) and returns a `SourceResolverResult` complete with a transparent `SourceSummary`.

## 14. Timeout/Fallback Behavior
If the USDA API takes longer than 6000ms or if no key is present, the resolver gracefully aborts the network request, sets `fallbackUsed: true`, and resolves purely with local curated data.

## 15. Cache/Dedupe Behavior
A simple `Map` based TTL cache exists for both USDA search and details requests to prevent spamming the API and eating into rate limits.

## 16. Warning/Error Additions
New warnings and errors include `USDA_TIMEOUT`, `USDA_KEY_MISSING`, `LOCAL_FALLBACK_USED`, and `PARTIAL_USDA_NUTRIENTS`.

## 17. API Route Changes
No routes were changed because they do not exist yet.

## 18. Missing USDA Key Behavior
The application continues to function 100% locally. The resolver detects the missing key, injects a `USDA_KEY_MISSING` warning, and seamlessly powers the site with the local database.

## 19. Security Check Result
All secrets are locked within `usdaClient.ts`. No env files were modified. No keys are logged or printed in the tests.

## 20. Recommended Phase 5 Next Step
Phase 5 should implement the deterministic quantity engine (unit conversions, grams math, scaling) so we can multiply these resolved food sources accurately.

Nutrition Engine V2 Phase 4 USDA local source resolver complete.
