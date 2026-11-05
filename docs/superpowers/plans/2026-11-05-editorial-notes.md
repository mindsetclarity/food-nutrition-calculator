# Editorial Notes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Put hand-written notes on the 45 curated compare pages and their foods, index a page only when it has a note, and drop the app promo from food pages.

**Architecture:** Two typed data maps (`compareNotes.ts`, `foodNotes.ts`) keyed by slug. `comparePairs.ts` derives indexing from them. Pages render a note when one exists. One Node test script guards key validity and coverage.

**Tech Stack:** Astro 7 (prerendered pages), TypeScript, Node 22 `--experimental-strip-types` test scripts using `node:assert/strict`.

**Spec:** `docs/superpowers/specs/2026-11-05-editorial-notes-design.md`

## Global Constraints

- Compare note: 150–250 words total; food note: ~120 words (100–160).
- Indexed ⇔ has a note. No note → `noindex, follow`, not in sitemap.
- No medical claims; general guidance only. Every number in a note must match the page's own data (per 100 g / default serving from `nutrientFor`, `getDefaultServing`).
- No restating the nutrition table as the note's content; notes cover use, context, choice, portions, tips.
- US/UK audience: US spelling, mention UK names where they differ (e.g. "chips" for fries).
- `AppPromo` stays on `src/pages/index.astro`, removed from food pages.

## Review Focus

- A note keyed by a typo'd slug → build/test fails (not a silently noindexed page). Covered in Task 1 test.
- A curated pair or curated food with no note → test fails, so nothing drops out of Google. Covered in Task 1 test.
- Pair slug key in non-alphabetical order (`banana-vs-apple`) → treated as a typo, test fails. Covered in Task 1 test.
- Note word counts outside range → test fails. Covered in Task 1 test.
- Food page with no note still renders unchanged (no empty "About" card). Covered in Task 2 verification.

---

### Task 1: Note data types, indexing rule, guard test

**Files:**
- Create: `src/data/compareNotes.ts`, `src/data/foodNotes.ts`, `scripts/test-editorial-notes.mjs`
- Modify: `src/lib/compare/comparePairs.ts:12-70`, `package.json` (scripts)

**Interfaces:**
- Produces:
  - `export interface CompareNote { summary: string; body: string[]; chooseA: string; chooseB: string }` and `export const COMPARE_NOTES: Record<string, CompareNote>` in `compareNotes.ts` (`chooseA` refers to the alphabetically first food in the slug).
  - `export interface FoodNote { body: string[] }` and `export const FOOD_NOTES: Record<string, FoodNote>` in `foodNotes.ts`.
  - In `comparePairs.ts`: `export const CURATED` (unchanged values, now exported); `isIndexedComparePair(slug)` = `slug in COMPARE_NOTES`; `isIndexedFood(slug)` = `slug in FOOD_NOTES`. Remove `INDEXED_PAIRS`/`INDEXED_FOODS`.

- [ ] **Step 1: Write the failing test** `scripts/test-editorial-notes.mjs` (same `registerHooks` header as `scripts/test-seo-paths.mjs`):

```js
const { COMPARE_NOTES } = await import('../src/data/compareNotes.ts');
const { FOOD_NOTES } = await import('../src/data/foodNotes.ts');
const { CURATED, getAllComparePairs } = await import('../src/lib/compare/comparePairs.ts');
const { getAllFoodPages } = await import('../src/lib/foods/foodPageData.ts');
const words = s => s.trim().split(/\s+/).length;
const pairSlugs = new Set(getAllComparePairs().map(p => p.slug));
const foodSlugs = new Set(getAllFoodPages().map(f => f.slug));
const curatedPairs = CURATED.map(([x, y]) => [x, y].sort().join('-vs-'));
for (const k of Object.keys(COMPARE_NOTES)) assert.ok(pairSlugs.has(k), `compare note for unknown pair ${k}`);
for (const k of Object.keys(FOOD_NOTES)) assert.ok(foodSlugs.has(k), `food note for unknown food ${k}`);
for (const s of curatedPairs) assert.ok(COMPARE_NOTES[s], `curated pair missing note: ${s}`);
for (const s of new Set(CURATED.flat())) assert.ok(FOOD_NOTES[s], `curated food missing note: ${s}`);
for (const [k, n] of Object.entries(COMPARE_NOTES)) {
  const w = words([n.summary, ...n.body, n.chooseA, n.chooseB].join(' '));
  assert.ok(w >= 150 && w <= 250, `${k}: ${w} words`);
}
for (const [k, n] of Object.entries(FOOD_NOTES)) {
  const w = words(n.body.join(' '));
  assert.ok(w >= 100 && w <= 160, `${k}: ${w} words`);
}
console.log(`editorial notes OK: ${Object.keys(COMPARE_NOTES).length} pairs, ${Object.keys(FOOD_NOTES).length} foods`);
```

- [ ] **Step 2: Create both data files with empty maps and the types, export `CURATED`, switch the two `isIndexed*` functions.** Add `"test:notes": "node --experimental-strip-types scripts/test-editorial-notes.mjs"` to `package.json`.

- [ ] **Step 3: Run** `npm run test:notes` — Expected: FAIL `curated pair missing note: apple-vs-banana` (proves coverage guard works; stays red until Tasks 3–4).

- [ ] **Step 4: Commit** `feat(seo): index compare and food pages only when they have a note`

### Task 2: Render notes; drop app promo from food pages

**Files:**
- Modify: `src/pages/compare/[pair].astro`, `src/pages/foods/[slug].astro`

**Interfaces:**
- Consumes: `COMPARE_NOTES`, `FOOD_NOTES` from Task 1.

- [ ] **Step 1: Compare page.** `const note = COMPARE_NOTES[pair.slug]`. If present: render `note.summary` as a `<p class="text-lg text-gray-800 mb-4">` directly under the H1 (above the existing auto summary list), and before the "Nutrition per 100 g" section add a card (same classes as existing sections) with `<h2>Which should you pick?</h2>`, the `body` paragraphs, then two bold-led lines: "Pick {a.displayName} if …" / "Pick {b.displayName} if …" using `chooseA` / `chooseB`. Use the note's `summary` as the meta description when present (trim to 160 chars at a word boundary).
- [ ] **Step 2: Food page.** `const note = FOOD_NOTES[food.slug]`. If present, after `<FoodNutritionSummary>` add a card `<h2>About {food.displayName.toLowerCase()}</h2>` + `body` paragraphs. Remove the `AppPromo` import and `<AppPromo variant="card" />`.
- [ ] **Step 3: Verify** with one temporary note each for `apple-vs-banana` and `apple` (real text, kept for Task 3/4): `npm run build`, then `grep -o 'name="robots" content="[^"]*' dist/client/compare/apple-vs-banana.html dist/client/compare/bagel-vs-croissant.html dist/client/foods/apple.html dist/client/foods/broccoli.html` → `index` for the two with notes, `noindex` for the others; `grep -c "Which should you pick" dist/client/compare/apple-vs-banana.html` → 1; `grep -c "About " dist/client/foods/broccoli.html` → no About card; `grep -c bhaskar dist/client/foods/apple.html` → 0.
- [ ] **Step 4: Commit** `feat(seo): show editorial notes on compare and food pages`

### Task 3: Write the 45 compare notes

**Files:** Modify `src/data/compareNotes.ts`

- [ ] **Step 1:** For each pair in `CURATED`, read both foods' per-100 g and default-serving numbers (`nutrientFor`, `getDefaultServing` via a throwaway script in the scratchpad), then write the note: `summary` (1–2 sentences answering "which is better/lighter and for what"), `body` 2–3 paragraphs (when each wins: weight loss, workouts, satiety, blood sugar, budget, taste/use; one practical tip), `chooseA`/`chooseB`. Numbers quoted must match the data.
- [ ] **Step 2:** `npm run test:notes` — compare checks pass (food checks still red until Task 4).
- [ ] **Step 3: Commit** `content: editorial notes for 45 curated comparisons`

### Task 4: Write the curated food notes

**Files:** Modify `src/data/foodNotes.ts`

- [ ] **Step 1:** For each unique food in `CURATED.flat()`: 100–160 words on how it's usually eaten (US and UK), a realistic portion, and what's genuinely worth knowing (e.g. cooked vs dry weight for rice, ripeness and sugar for bananas). No table restating.
- [ ] **Step 2:** `npm run test:notes` → `editorial notes OK: 45 pairs, N foods`.
- [ ] **Step 3:** `npm run build` then `npm run test:seo-paths` → PASS; sitemap check: build output count of indexed pages equals 45 compare + N foods.
- [ ] **Step 4: Commit** `content: editorial notes for curated foods`

### Task 5: Owner review and deploy

- [ ] **Step 1:** Owner reads the notes (link both data files). Apply edits.
- [ ] **Step 2:** Merge `feat/editorial-notes` into `main` (fast-forward), `npm run build`, `npx wrangler deploy --config dist/server/wrangler.json` (run in background; ~12 min).
- [ ] **Step 3: Verify live:** `/compare/apple-vs-banana` shows "Which should you pick"; `/sitemap.xml` lists 45 compare + N foods; a non-curated compare page is `noindex`. Push `main`.
