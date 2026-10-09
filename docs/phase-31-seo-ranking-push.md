# Phase 31 — SEO Ranking Push

Technical SEO (sitemap, canonical, schema, prerender) is already done. The
remaining levers are: search-intent titles, more indexable pages, and authority.

## Part A — code (this phase)

1. **Search-intent titles & descriptions on food pages** (`src/lib/foods/foodSeo.ts`)
   - Title: `Calories in Apple: 95 kcal per 1 medium (182 g) | Nutrition Facts`
   - Description: calories + protein/carbs/fat for the default serving and per 100 g.
   - Matches how people search ("calories in apple") and lifts CTR.

2. **Data-driven FAQ on every food page** + `FAQPage` JSON-LD
   - "How many calories are in 1 medium apple?", "How much protein…?",
     "Is apple high in fiber?" — answers computed from the food's own numbers,
     so every page gets unique, answerable text.

3. **Static comparison pages `/compare/[a]-vs-[b]`**
   - Each food paired with its 3 nearest same-category foods by calories/100 g
     (deduped, slugs in alphabetical order) — a few hundred pages.
   - Server-rendered table (per 100 g + per serving), computed verdict sentences,
     FAQ + `FAQPage` schema, links to both food pages and the interactive tool.
   - Linked from each food page ("Compare apple with…") so crawlers find them.
   - Added to `sitemap.xml`.

4. Verify: `npm run build`, `npm run check:links`, spot-check rendered HTML.

## Part B — owner actions (off-code, highest impact after A)

- Google Search Console: submit `/sitemap.xml`; watch Pages → "not indexed";
  Performance → queries at positions 8–20 and improve those pages first.
- Backlinks: tool directories (AlternativeTo, Product Hunt, SaaSHub), link from
  the Play Store listing, helpful Reddit/Quora answers linking the exact tool.
- Bing Webmaster Tools: import from GSC (2 minutes, extra traffic).

## Part C — next phases

- Expand food database 141 → 1,000+. Audience is tier-1 (US, UK, CA, AU) first,
  India second. **Done so far: 141 → 449** via `scripts/add-foods-from-usda.mjs`
  (real USDA values; new categories: Bread & Bakery, Fast Food Style, Prepared Meals,
  Snacks, Desserts, Beverages, Condiments & Oils, Indian Foods). USDA lacks many
  Indian/UK dishes (butter chicken, tikka masala, rajma, crumpets) — those need a
  second source such as UK CoFID or India's IFCT before they can be added.
  **Now 549** (batch 2 added US/UK takeaway, Chinese/Mexican dishes, desserts, drinks).
  **Now 1,018** (batch 3: meat cuts, fish and shellfish, cheeses, cereals, breads, soups,
  sandwiches, snacks, dips, sweets, cocktails, sauces, spices, and a new Baking & Cooking
  Ingredients category). The script also skips any USDA record already in the data.
- Learn articles 8 → 50+, each linking to food + compare pages. **Now 19** (pizza, burgers,
  alcohol, protein, snacks, coffee, bread, Indian takeaway, rice, eggs, fruit).
- Bylines + "last updated" dates on articles: **done** (editorial team + USDA source links).
  Still open: a named, credentialed reviewer (a real person; do not invent one).

## Keeping live URLs alive

Compare pages are partly chosen by calorie distance, so adding foods reshuffles them.
`src/data/publishedComparePairs.ts` freezes every pair that has been published; the
build always includes them and fails if one references a removed food. The import
script appends the current pairs before adding foods. Removed foods get a 301 in
`astro.config.mjs` (`redirects`).
