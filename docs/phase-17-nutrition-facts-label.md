# Phase 17: Nutrition Facts Label Component

## 1. Purpose of Phase 17
The goal of Phase 17 was to create a modular, reusable component mimicking the recognizable United States Nutrition Facts label. This label serves as a premium UI augmentation, making estimated deterministic totals much easier for users to scan and interpret.

## 2. What component was created
The core piece is `src/components/nutrition-label/NutritionFactsLabel.astro`. It acts as an orchestrator for several atomic sub-components (`NutritionFactsRow.astro`, `NutritionFactsDivider.astro`, `NutritionFactsWarning.astro`, `NutritionFactsFootnote.astro`). A `NutritionFactsMini.astro` component was also scaffolded for potential compact use cases in later phases.

## 3. FDA-style, not commercial compliance
This feature is heavily positioned as an *estimate wrapper*. Legal disclaimers ("This label preview is for personal estimation only and is not a commercial packaging label.") have been baked directly into the component's render tree, fulfilling strict protections against claiming FDA certification.

## 4. Component Props
The main component accepts a `NutritionLabelInput` configuration payload:
- `title`
- `servingLabel`
- `servingsPerContainer`
- `nutrients`
- `mode`
- `sourceSummary`
- `warnings`
- `showPercentDailyValue`
- `compact`

## 5. Utility functions
The logic driving the label lives in `src/lib/nutrition-label/`:
- `types.ts`
- `dailyValues.ts`: Holds configuration limits.
- `percentDailyValue.ts`: Runs DV division and rounding.
- `formatLabelValue.ts`: Normalizes padding, decimals, and empty states.
- `buildNutritionLabel.ts`: Converts arbitrary nutrient dictionaries into structured arrays suitable for sequential Astro rendering.

## 6. Daily Value strategy
Standard FDA baseline values (e.g., 78g fat, 275g carbs, 2300mg sodium) were ported into a constant lookup dictionary. 

## 7. %DV calculation strategy
For each row, if a `dvKey` mapping exists, it divides the calculated nutrient amount against the reference constant, rounds to the nearest whole integer, and displays it.

## 8. Missing data behavior
Missing data is incredibly common with user-input recipes. The label components are built safely:
- Any `null` nutrient value returns "—" (an em dash) rather than crashing.
- It triggers a `detectPartialData` utility which pushes an explicit "Some nutrients are unavailable from the selected food data" string into the active warnings queue.

## 9. Source warning behavior
Warnings dynamically calculate based on `sourceSummary`. If a local fallback database was accessed, the label states, "Some values use local fallback data and are estimates."

## 10. Recipe page integration
The component was imported directly into `RecipeCalculatorShell.astro`. Because the recipe calculator parses ingredients entirely via client-side JavaScript, a `<script>` tag equipped with a `window.addEventListener('update-nutrition-label')` observer handles DOM manipulation natively. The label is hidden when no valid totals exist and fades in automatically alongside populated data.

## 11. Accessibility decisions
- Applied robust `aria-label` definitions.
- Avoided canvas/image rendering completely in favor of structured text and semantic `<h>` hierarchy.
- Relied on real borders and semantic text for dividers rather than images.

## 12. Mobile decisions
- Confined to a flexible width bounded tightly to standard mobile portrait layouts using `max-w-sm`.
- Warnings block wraps intelligently underneath the bounding box instead of causing page overflows.

## 13. What was intentionally not implemented
- Export to PNG/PDF functionality.
- Legal print formatting logic.
- Saved custom labels in user accounts.

## 14. Known limitations
- Trans fats and added sugars are currently not tracked by the deterministic engine mappings, so they naturally default to omitting the rows entirely.

## 15. Phase 18 recommendation
Phase 18 should begin constructing the robust "Foods Directory" and standalone "Detail Pages" allowing users to inspect raw USDA data or individual items outside of the unified calculators.
