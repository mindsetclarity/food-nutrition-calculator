# Nutrition Engine Performance Strategy

## 1000+ Foods Performance Goals
The core data layer uses a local memory array of ~1000 foods. 
Performance goals:
- Exact matches in < 5ms.
- Full index scoring in < 20ms.
- Never rebuild the index repeatedly.

## Cache Namespaces & TTL Strategy
- `local_search`: 15 mins. Highly safe to cache.
- `usda_search`: 10 mins. Prevents API spam.
- `usda_details`: 15 mins. Static-ish data.
- `source_resolver`: 5 mins. Merged results can change if USDA comes online.

## Request Dedupe Strategy
Concurrent requests identical in key are collapsed into a single Promise. This is especially useful for batch operations (like resolving 20 ingredients in a recipe where 5 might resolve to the same underlying USDA query).

## Recipe Ingredient Dedupe Strategy
Instead of global caching, which risks mixing personal user inputs, the recipe engine uses a localized `RequestDeduper` bounded to the single recipe calculation run. This resolves duplicated lines without storing them across sessions.

## Compact API Response Strategy
UI components often only need `id`, `displayName`, `nutrientsPer100g`, `isEstimated`, and `sourceLabel`. `resultLimiter.ts` provides compacting helpers to strip `tokenSet`, `providerData`, and huge description blocks before sending JSON to the client.

## Security & Privacy
- No user-specific data (health goals, whole recipes) in global caches.
- No DB storage; everything lives in process memory.
- No analytics or external tracking scripts.

## Future Ideas
- Pre-warm `local_search` cache on server startup.
- Use Edge caching headers for Next.js/Astro static data.
