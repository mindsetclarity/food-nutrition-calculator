# Major 1000+ Foods Tool Upgrade

## 1. Purpose
This upgrade expands the local food database from a small seed dataset to 1000+ realistic foods and re-architects the underlying tool engine to handle this scale with high performance, preserving USDA-first nutrition truth.

## 2. Data Architecture
- Data is split into categories under `src/data/foods/` (e.g. `fruits.ts`, `vegetables.ts`, `snacks.ts`) to prevent a single massive file.
- Everything is exported via `src/data/foods/index.ts`.
- `src/data/foods.ts` simply re-exports the index to maintain 100% backward compatibility for existing code.

## 3. Search Architecture
- `src/lib/foods/foodIndex.ts` provides an in-memory `IndexedFood` structure built once.
- `src/lib/foods/foodSearch.ts` executes fast lookups using scored filtering instead of heavy dependency-based fuzzy matching.

## 4. Category System
Categories follow strict enumerations to map to `FoodCategoryGrid.astro` and directory filters.

## 5. Alias/Synonym System
- Synonyms are normalized using `normalizeSynonyms` (e.g. `garbanzo` -> `chickpea`, `mac n cheese` -> `macaroni and cheese`).
- `aliases` in the `FoodItem` schema support arbitrary variations for matching.

## 6. Serving Size Strategy
- Gram conversions remain deterministic.
- Missing values in micronutrients are returned as `null` and displayed as `—` (no fake zeroes).

## 7. Tool Upgrades
- The API routes `/api/foods/search` and `/api/foods/details` use the precomputed index for local lookups, preventing repeated heavy filtering logic on every request.

## 8. Foods Directory Upgrades
- The main directory (`/foods`) only displays the first 100 foods initially.
- A "Load More Foods" button unlocks additional foods dynamically via client-side JavaScript, ensuring no massive DOM freeze occurs on mobile devices.
- Filtering updates immediately against the rendered subset.

## 9. Validation
- Slugs are uniquely generated and checked during the generation phase.
- Duplicate IDs are prevented algorithmically.

## 10. Known Limitations
- The algorithmic expansion focuses on core macros (Calories, Protein, Carbs, Fat, Fiber, Sugar, Sodium). Other micronutrients are left undefined to prevent hallucinated health claims.
- Generating all 1400 static pages takes roughly 30 seconds. If the DB scales to 10,000+ foods, SSR or pagination on the build step might be required.

## 11. Future Improvements
- Integrate fuzzy matching via a WebAssembly or lightweight library if typos become more complex.
- Convert `.astro` generation of `[slug].astro` to server-side rendering (SSR) if build times exceed 2 minutes.
