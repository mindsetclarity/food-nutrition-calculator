# Foods Category Pages and Calculators Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 2.1 MB `/foods` page with a light hub and 17 category charts, and add `/tdee-calculator` and `/macro-calculator`.

**Architecture:** Category data derives from existing foods via one helper; hand-written intros decide indexing. Formulas live in one pure module, used by one form component shared by both calculator pages.

**Tech Stack:** Astro 7 prerendered pages, TypeScript, inline client scripts, Node 22 test scripts with `node:assert/strict`.

**Spec:** `docs/superpowers/specs/2026-11-06-foods-categories-calculators-design.md`

## Global Constraints

- Category intro: about 150 words (test range 120–200).
- Indexed category ⇔ has an intro.
- Calorie targets: lose = TDEE − 500, gain = TDEE + 300, floor 1,200 kcal (women) / 1,500 kcal (men), visible note when the floor applies.
- Macros: protein 1.6 g/kg (1.8 for lose and gain), fat 25% of calories, carbs the remainder.
- Nothing typed into a calculator leaves the browser.
- No medical advice; existing `/foods/<slug>` URLs keep working.

## Review Focus

- A small person whose TDEE is already below the calorie floor must not see a "lose" target above their TDEE (Task 1 test).
- Empty, zero, negative or absurd input shows a message, not NaN (Task 1 test, Task 3 browser check).
- Switching units keeps the values the person typed, converted (Task 3 browser check).
- Foods with a missing nutrient sort last and show a dash, not 0 (Task 2 test on sort helper).
- A renamed category without an intro fails the build rather than silently noindexing (Task 2 test).

---

### Task 1: Energy formulas

**Files:** Create `src/lib/nutrition/energy.ts`, `scripts/test-energy.mjs`. Modify `package.json`.

**Interfaces — Produces:**
- `type Sex = 'male' | 'female'`, `type Goal = 'lose' | 'maintain' | 'gain'`, `type Activity = 'sedentary' | 'light' | 'moderate' | 'very' | 'extra'`
- `ACTIVITY_FACTORS: Record<Activity, number>` = 1.2, 1.375, 1.55, 1.725, 1.9
- `bmr({sex, age, weightKg, heightCm}): number` (Mifflin-St Jeor)
- `calorieTargets(tdee: number, sex: Sex): {lose, maintain, gain: number; floorApplied: boolean}`
- `macros({calories, weightKg, goal}): {protein, fat, carbs: number}` grams, rounded
- `lbToKg(lb)`, `kgToLb(kg)`, `ftInToCm(ft, inches)`, `cmToFtIn(cm): {ft, inches}`
- `validateProfile({age, weightKg, heightCm}): string[]`, messages for non-finite or out of range: age 18–100, weight 30–300 kg, height 120–230 cm

- [ ] **Step 1: Write the failing test** asserting: male 30y/80kg/180cm BMR 1780; female 30y/65kg/165cm BMR 1370.25; targets for TDEE 2759 male = lose 2259, maintain 2759, gain 3059, floorApplied false; TDEE 1600 female → lose 1200, floorApplied true; TDEE 1112 female → lose 1112 (never above TDEE), floorApplied true; macros 2000 kcal/80 kg/maintain = protein 128, fat 56, carbs 247; goal lose at 80 kg gives protein 144; carbs never negative; `validateProfile` returns a message for NaN, 0, -5 and age 17, none for valid input; `lbToKg(176)` ≈ 79.8; `ftInToCm(5, 11)` ≈ 180.3; `cmToFtIn(180)` round-trips to 5 ft 11 in, and inches never round up to 12.
- [ ] **Step 2: Run** `npm run -s test:energy`. Expected: FAIL, module not found.
- [ ] **Step 3: Implement** the module; add `test:energy` script.
- [ ] **Step 4: Run** it. Expected: `energy checks passed`.
- [ ] **Step 5: Commit** `feat(tools): add energy and macro formulas`

### Task 2: Category pages and hub

**Files:** Create `src/lib/foods/categories.ts`, `src/data/categoryIntros.ts`, `src/pages/foods/category/[category].astro`, `src/components/foods/CategoryTiles.astro`, `scripts/test-categories.mjs`. Modify `src/components/foods/FoodsDirectoryShell.astro`, `src/pages/foods/[slug].astro`, `src/pages/sitemap.xml.ts`, `package.json`. Delete `FoodCategoryGrid.astro` if nothing else uses it.

**Interfaces — Produces:**
- `categorySlug(name: string): string`: lowercase, runs of non-alphanumerics become `-` (`Dairy & Alternatives` → `dairy-alternatives`)
- `getAllCategories(): {name, slug, foods: FoodItem[]}[]`
- `sortFoodsByCalories(foods): FoodItem[]`: ascending, missing calories last
- `CategoryIntro {heading: string; metaDescription: string; body: string[]}`, `CATEGORY_INTROS: Record<string, CategoryIntro>`
- `isIndexedCategory(slug)` = `Object.hasOwn(CATEGORY_INTROS, slug)`

- [ ] **Step 1: Write the failing test:** every category has an intro; no intro for an unknown slug; word count 120–200; meta description ≤ 160 chars; slugs unique; `sortFoodsByCalories` puts a missing-calorie food last.
- [ ] **Step 2: Run** `npm run -s test:categories`. Expected: FAIL.
- [ ] **Step 3: Implement** helpers, empty intros map, category page (intro, sortable table of food link, kcal, protein, carbs, fat per 100 g with a dash for missing values, `aria-sort`, server-rendered in calorie order), hub (category tiles with counts, search filter over noted foods only, link to the calculator for everything else), category link in food-page breadcrumbs, sitemap entries for indexed categories.
- [ ] **Step 4: Write all 17 intros**, from each category's real foods: what the chart is useful for, surprises in the numbers, how to read per-100 g against real portions.
- [ ] **Step 5: Run** the test; add it and `test:energy` to `prebuild`; build. Expected: PASS; `/foods` HTML under 200 KB; `dist/client/foods/category/fruits.html` is `index, follow`; `/foods/banana` still builds.
- [ ] **Step 6: Commit** `feat(foods): category charts and a light foods hub`

### Task 3: Calculator pages

**Files:** Create `src/components/calculator/EnergyCalculator.astro`, `src/pages/tdee-calculator.astro`, `src/pages/macro-calculator.astro`. Modify `src/components/site/Header.astro`, `src/components/site/Footer.astro`, `src/pages/sitemap.xml.ts`, the `relatedTool` of `tdee-explained` and `how-to-count-macros-for-beginners`.

**Interfaces — Consumes:** everything from Task 1.

- [ ] **Step 1: Build `EnergyCalculator.astro`** with prop `mode: 'tdee' | 'macros'`: real `<form>` with labels, unit radio (US default), sex radio, age, height, weight, activity select (plus goal select in macros mode), `aria-live` results area written with `textContent`, errors from `validateProfile`, floor note text: "This target is held at a minimum of {floor} calories. Talk to a doctor or registered dietitian before eating less than this."
- [ ] **Step 2: Build both pages**: `prerender = true`, about 400 words of unique explanation, FAQ with schema, an estimate-not-advice line, not for under-18s or during pregnancy, links to `/learn/tdee-explained` and `/calculator`.
- [ ] **Step 3: Add links** to header, footer, sitemap, article `relatedTool`.
- [ ] **Step 4: Build and check in a browser:** male 30y 5 ft 11 in 176 lb moderate gives a BMR near 1,780; empty form shows a message; switching units keeps converted values; header does not wrap at 1024 px; no request is sent on calculate.
- [ ] **Step 5: Commit** `feat(tools): add TDEE and macro calculators`

### Task 4: Owner review and deploy

- [ ] **Step 1:** Fresh final review of the branch, fix findings.
- [ ] **Step 2:** Owner reads intros and tries the calculators.
- [ ] **Step 3:** Merge to `main`, deploy, verify live.
