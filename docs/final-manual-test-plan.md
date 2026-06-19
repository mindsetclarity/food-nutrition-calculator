# Final Manual Test Plan

Run `npm run dev` locally and verify the following:

## Core Tools
1. **Calculator (`/calculator`)**
   - Search for "banana", add it.
   - Verify totals update.
2. **Recipe (`/recipe-nutrition-calculator`)**
   - Paste a small recipe (e.g. 1 cup oats, 1 banana).
   - Verify parsing and per-serving calculations.
3. **Compare (`/compare-foods`)**
   - Add "banana" and "apple".
   - Verify comparison table renders.
4. **Meal (`/meal-calorie-calculator`)**
   - Add breakfast items.
   - Verify total meal calories.

## Static Pages
1. **Home (`/`)**
   - Verify hero section renders nicely on mobile and desktop.
2. **Foods (`/foods`, `/foods/banana`)**
   - Verify nutrition facts label appears.
3. **Learn (`/learn`, `/learn/calories-vs-macros`)**
   - Verify text is readable.
4. **Legal (`/about`, `/privacy`, `/terms`, `/disclaimer`)**
   - Verify "Not Medical Advice" disclaimer is clearly visible.

## System
1. **Sitemap (`/sitemap.xml`)**
   - Verify it loads and lists main pages.
2. **Robots (`/robots.txt`)**
   - Verify it allows crawling but disallows `/api`.
3. **404 (`/non-existent-page`)**
   - Verify the fallback page displays.
