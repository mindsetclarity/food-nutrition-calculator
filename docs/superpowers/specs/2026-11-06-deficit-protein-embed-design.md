# Calorie deficit and protein calculators, embeddable recipe label

## Why
The site's goal is AdSense revenue from US/UK search. "Calorie deficit calculator" and "protein calculator" are popular searches with no tool on the site. The site also has almost no backlinks; a free recipe label for food bloggers can earn them.

## Goals
- `/calorie-deficit-calculator`: TDEE inputs plus goal weight and pace (0.5, 1, 1.5, 2 lb a week) → daily calories, deficit, estimated date, maintenance calories at goal weight.
- `/protein-calculator`: weight, activity, goal → daily grams range and per-meal amount.
- "Get embed code" on the recipe calculator gives a self-contained HTML label to paste into a blog.
- `/nutrition-label-generator`: a landing page for bloggers using the same calculator.
- All new pages in header or footer, sitemap, with unique written content.

## Non-goals
- Storing recipes, accounts, an iframe or a script widget.
- Commercial or FDA-compliant packaging labels.

## Anti-goals
- A keyword-rich or hidden credit link. Google's spam policy names these in distributed widgets.
- A pasted label that lets a recipe name inject markup into someone's blog.
- Recommending under-floor calories or a goal weight below a healthy range. No medical advice.
- Protein numbers that contradict the macro calculator.

## Approaches (embed)
- **A. Copy-paste HTML (picked).** No server or database, cannot slow or break later, and the credit is a real link on the host page. It does not update itself.
- B. Iframe: needs stored recipes, and a link inside an iframe generally is not a backlink.
- C. Script widget: often blocked by blog platforms, slows pages, depends on this site staying up.

## Design
- Deficit: target = TDEE − 500 × pace, floored at 1,200 kcal (women) / 1,500 kcal (men), never above TDEE; note when limited. Date: simulate weekly at that fixed intake, 7,700 kcal per kg, TDEE recalculated from the falling weight. If weight would level off first, say so and give the level instead of a date. Goal must be below current weight and at or above BMI 18.5.
- Protein g/kg: less active, maintain 0.8–1.2; active, maintain 1.4–1.6; lose 1.6–2.0; build muscle 1.6–2.2. Per meal = low ÷ 4 to high ÷ 3. Advise using goal weight if there is a lot to lose.
- Embed: `buildEmbedHtml` in `src/lib/nutrition-label/embedLabel.ts`, inline styles only, no scripts or classes, every value escaped, per-serving values and % Daily Value from existing label code. Visible credit: "Estimate by foodnutritioncalculator.com", linking only the domain, plus a not-for-commercial-packaging line.
- Tests: `scripts/test-energy.mjs` extended; new `scripts/test-embed.mjs`; both in `prebuild`.

## Builder's calls
- Layout and styling reuse existing tools. The generator page reuses `RecipeCalculatorShell` with its own copy.
- Only the recipe calculator gets the embed button, not the meal calculator.
