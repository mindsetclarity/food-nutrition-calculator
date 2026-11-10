# Topic Clusters Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Related tools and guides" block to every calculator, article and food chart page, driven by one topic-cluster map.

**Architecture:** A pure TS module holds the five clusters and a `getRelated` selector (no Astro imports, so Node tests can load it). One Astro component turns ids into titled links and is dropped into each page shell.

**Tech Stack:** Astro 7, TypeScript, Tailwind 4, Node 22 test scripts (`--experimental-strip-types`).

**Spec:** `docs/superpowers/specs/2026-11-10-topic-clusters-design.md`

## Global Constraints

- Block limits: at most 2 tools, 3 articles, 2 charts.
- Article pages: tools and charts only; skip the tool already in `article.relatedTool.href`.
- Never link a page to itself.
- Link class: `text-emerald-700 font-semibold hover:underline` (site convention).
- Branch `topic-clusters` from `main`; commits end with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

- A cluster slug typo (article renamed) → test fails, not a broken link on the live site.
- A new calculator page added without a cluster → test fails.
- A page in two clusters → the same link appears once.
- A small cluster (Body measurements has 2 articles) → the block shows what exists, no empty headings.
- Rotation → different pages in one cluster don't all show the same first members.

---

### Task 1: Cluster data, selector and test

**Files:**
- Create: `src/lib/topicClusters.ts`
- Create: `scripts/test-topic-clusters.mjs`
- Modify: `package.json` (add `test:topic-clusters`, append to `prebuild`)

**Interfaces:**
- Produces:
  - `type RelatedKind = 'tool' | 'article' | 'chart'`
  - `TOOL_NAMES: Record<string, string>` — tool path (e.g. `/tdee-calculator`) → link text (e.g. `TDEE calculator`). All 14 tool pages: calculator, compare-foods, meal-calorie, recipe-nutrition, nutrition-label-generator, tdee, macro, calorie-deficit, protein, bmi, body-fat, calories-burned, water-intake, ideal-weight.
  - `TOPIC_CLUSTERS: { id: string; tools: string[]; articles: string[]; charts: string[] }[]` — five clusters exactly as in the approved conversation table.
  - `getRelated(kind: RelatedKind, id: string, skip?: string[]): { tools: string[]; articles: string[]; charts: string[] }`

- [ ] **Step 1: Write the test** (`scripts/test-topic-clusters.mjs`, same `registerHooks` header as `test-categories.mjs`):
  - every tool path has `src/pages/<path>.astro` and a `TOOL_NAMES` entry; every file in `src/pages/*-calculator.astro`, `calculator.astro`, `compare-foods.astro`, `nutrition-label-generator.astro` is in some cluster;
  - every article slug matches a `slug: '...'` line in `src/data/learnArticles.ts` or `src/data/learn/*.ts` (read as text; the article module uses `import.meta.glob`), and every such slug is in some cluster;
  - every chart slug is a key of `CATEGORY_INTROS`, and every key is in some cluster;
  - for every member of every cluster: `getRelated` result excludes itself, has no duplicates, respects 2/3/2;
  - `getRelated('tool', '/bmi-calculator').articles.length > 0` (small cluster still yields links);
  - `getRelated('article', 'tdee-explained', ['/tdee-calculator']).tools` excludes `/tdee-calculator`;
  - rotation: the `tools` lists for `/tdee-calculator` and `/calorie-deficit-calculator` differ in first element or order.
- [ ] **Step 2:** `node --experimental-strip-types scripts/test-topic-clusters.mjs` → fails (module missing).
- [ ] **Step 3: Implement** `getRelated`: gather the clusters containing `id` for `kind`; for each kind, concatenate members in cluster order, dedupe, drop `id` and `skip`; rotate the list so it starts after `id`'s position in its first cluster's list for that kind (position 0 for other kinds); take the limit.
- [ ] **Step 4:** test passes; add the script to `package.json` and the end of `prebuild`.
- [ ] **Step 5: Commit** `feat(links): topic cluster map and related-link selector`.

### Task 2: RelatedLinks component and page wiring

**Files:**
- Create: `src/components/site/RelatedLinks.astro`
- Modify: `src/components/calculator/ToolPage.astro` (5 body calculators)
- Modify: `src/pages/{tdee,macro,calorie-deficit,protein}-calculator.astro`, `calculator.astro`, `meal-calorie-calculator.astro`, `recipe-nutrition-calculator.astro`, `compare-foods.astro`, `nutrition-label-generator.astro`
- Modify: `src/components/learn/LearnArticleLayout.astro`, `src/pages/foods/category/[category].astro`

**Interfaces:**
- Consumes: `getRelated`, `TOOL_NAMES` (Task 1); `getLearnArticleBySlug` (`src/lib/learn/articleData.ts`); `CATEGORY_INTROS[slug].heading`.
- Produces: `<RelatedLinks kind={RelatedKind} id={string} skip?={string[]} />`

- [ ] **Step 1: Build the component:** a `<section aria-labelledby>` card (white, rounded-2xl, border, like ToolPage's content card) headed "Related tools and guides", with up to three groups "Calculators", "Guides", "Calorie charts", each a `<ul>` of links; a group with no items is omitted; the whole section is omitted when all are empty. Article text = article title; chart text = intro heading; tool text = `TOOL_NAMES`.
- [ ] **Step 2: Wire it in** after the FAQ (tool pages), after the related articles (articles, `skip={[article.relatedTool?.href].filter(Boolean)}`, `kind="article"`), after the table/tiles (charts). Tool pages pass their own path as `id`.
- [ ] **Step 3:** `npm run build` → passes; grep built HTML of `/tdee-calculator`, `/learn/tdee-explained`, `/foods/category/fruits` for "Related tools and guides" and expected hrefs.
- [ ] **Step 4:** check a 375 px page in headless Edge (scratchpad harness) for layout, then run `check:links` in the background → 0 broken.
- [ ] **Step 5: Commit** `feat(links): related tools and guides block on tools, articles and charts`.

### Task 3: Final review

- [ ] Fresh opus subagent reviews the branch against the spec; re-grade and fix findings; commit.
