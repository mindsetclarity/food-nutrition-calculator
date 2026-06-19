# Phase 18: Foods Directory + Food Detail Pages

## 1. Purpose of Phase 18
The goal of Phase 18 is to build a premium Foods Directory that helps users browse common US foods and access detailed food pages. It leverages the local seed dataset from Phase 9 to statically generate food pages without over-engineering dynamic API routes or making build-time calls to USDA.

## 2. Routes Created
- `/foods` (Directory Page)
- `/foods/[slug]` (Food Detail Pages)

## 3. Static Generation Strategy
`[slug].astro` uses `getStaticPaths` to pre-generate pages for all foods defined in the local seed dataset (`src/data/foods.ts`). To ensure this works with our Vercel adapter setup, `export const prerender = true;` was added to `[slug].astro`. 

## 4. Why Only Local Seed Foods Get Pages
The USDA database is massive and continuously changing. Creating static pages for every USDA entry would lead to exorbitant build times and hosting costs. Instead, this phase focuses only on the carefully curated local fallback dataset of common US foods. Users can still use the calculator for live USDA-first search.

## 5. Directory Page Structure
- **Hero Section**: Features a premium layout with clear value propositions and strong CTAs directing users to the calculator.
- **Search & Filter**: Client-side filtering allowing users to search by name, alias, and category.
- **Category Grid**: Allows quick browsing of food categories.
- **Food Grid**: Displays `FoodCard`s with high-level nutrition information (calories, protein) and source badging.

## 6. Food Detail Page Structure
- **Hero Section**: Shows food name, category, and source badge. Contains CTAs to add to the calculator or compare foods.
- **Nutrition Summary**: Displays primary macros and micronutrients per 100g.
- **Serving Sizes**: Lists common serving sizes and weights.
- **Macro Breakdown**: Visually displays the percentage of calories from protein, carbs, and fat.
- **Source Notice**: Explicitly states the data is from the local fallback and is an estimate.
- **Related Foods**: Suggests up to 4 other foods in the same category.
- **Nutrition Facts Label**: Integrates the Phase 17 component to display an FDA-style label preview for personal estimation.

## 7. Nutrition Facts Label Integration
The Phase 17 `NutritionFactsLabel.astro` component was successfully integrated into the food detail pages. A minor bug in the component (`nutrientKey` undefined) was fixed. The label is clearly marked as a preview for personal use, not for commercial packaging.

## 8. Source/Estimate Warning Strategy
- `SourceBadge` is prominently displayed on cards and detail pages.
- `FoodSourceNotice` explicitly states the local data nature and estimation.
- The Nutrition Facts label includes warnings and disclaimers.

## 9. SEO Strategy
- Custom SEO logic was added to `src/lib/foods/foodSeo.ts`.
- The `/foods` directory page has an optimized title and meta description.
- Each `/foods/[slug]` page dynamically generates a title and meta description based on the food's display name, avoiding keyword stuffing while highlighting that values are estimates.

## 10. Accessibility Notes
- Search inputs have labels.
- Category filters use standard `button` elements and visually indicate their state.
- Food cards are fully keyboard accessible with visible focus rings.
- Good contrast ratios are maintained, and warnings are text-based rather than relying purely on color.

## 11. Mobile Notes
- The layout is fully responsive, utilizing CSS grid and flexbox for clean stacking on small screens.
- Search and filter controls expand to full width.
- Nutrition summary items stack effectively, and the Nutrition Facts label fits without horizontal scrolling.

## 12. Performance Notes
- `[slug].astro` is completely statically generated.
- No heavy client JS frameworks; vanilla TS/JS is used for filtering.
- Filtering is extremely lightweight.
- Build-time USDA calls and LLM nutrition calls are avoided completely.

## 13. What Was Intentionally Not Implemented
- Compare foods tool functionality (reserved for Phase 19).
- Meal calorie calculator page (reserved for Phase 20).
- Live, dynamic routing for non-local USDA foods on the `/foods` path.
- LLM nutrition estimation during build time.
- Medical claims or assertions of 100% accuracy.

## 14. Known Limitations
- Categories on the `/foods` page only show categories present in the local database.
- Saturated fat, trans fat, and some other micro-nutrients are currently not populated from the local dataset into the Nutrition Facts label (they display as missing/unavailable).

## 15. Phase 19 Recommendation
Proceed to Phase 19: Compare Foods Tool, allowing side-by-side nutrition comparisons.
