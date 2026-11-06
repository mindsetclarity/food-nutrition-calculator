# /foods category pages and TDEE/macro calculators

## Why
The site's goal is AdSense revenue from US/UK search traffic. `/foods` is a 2.1 MB page that hurts mobile speed, and the site has no tool for two of the highest-volume searches in its niche ("tdee calculator", "macro calculator").

## Goals
- `/foods` becomes a light hub: category tiles plus the foods that have editorial notes.
- 17 category pages at `/foods/category/<slug>`, each a sortable calorie chart of every food in that category.
- A category page is indexed only when it has a hand-written intro (about 150 words). All 17 get one.
- `/tdee-calculator`: age, sex, height, weight, activity → BMR, TDEE, and calorie targets to lose, maintain or gain.
- `/macro-calculator`: same inputs plus a goal → daily protein, carbs and fat in grams.
- Both tools: US (lb, ft/in) and metric (kg, cm) units, run entirely in the browser, about 400 words of unique explanation, linked to the TDEE article and food calculator, in the header and sitemap.

## Non-goals
- Calorie deficit and protein calculators (same code, later).
- Saving results, accounts, or sending inputs to a server.
- Changing food data or indexing rules for food and compare pages.

## Anti-goals
- A category page that is only a list: that repeats the thin-content problem.
- Medical advice. Results are estimates; very low calorie targets must not be recommended (floor below).
- Breaking any existing `/foods/<slug>` URL.

## Approaches
- **Category pages + hub (picked).** Real pages for real searches and a much smaller `/foods`.
- Paginate `/foods`: smaller page, but numbered pages match no search and are thin.
- Lazy-load cards on `/foods`: faster, but adds no pages and needs more client code.
- **Two calculator pages (picked)** vs one combined page: two searches, two pages, one shared formula module.

## Design
- `src/lib/foods/categories.ts`: category slug helpers and lookup; intros in `src/data/categoryIntros.ts` keyed by slug; `isIndexedCategory` is "has an intro".
- `src/pages/foods/category/[category].astro`: prerendered; intro, sortable table (native-button sort with a small inline script; server-rendered order is by calories so it works without JS), links to food pages.
- `src/lib/nutrition/energy.ts`: pure functions for BMR (Mifflin-St Jeor), TDEE, targets and macros, tested by a script.
- Calculator pages run those functions in a client script; nothing leaves the browser.
- Calorie targets: lose = TDEE − 500, gain = TDEE + 300, floored at 1,200 kcal (women) / 1,500 kcal (men) with a visible note when the floor applies.
- Macros: protein 1.6 g/kg (lose 1.8, gain 1.8), fat 25% of calories, carbs the remainder.

## Builder's calls
- Exact styling (reuse existing site components and tokens).
- Hub search behavior: it filters the foods shown and offers the calculator for everything else.
- Guard test extends the same pattern as `scripts/test-editorial-notes.mjs` and runs in `prebuild`.
