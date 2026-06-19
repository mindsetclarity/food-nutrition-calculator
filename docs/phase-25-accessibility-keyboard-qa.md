# Phase 25: Accessibility + Keyboard QA Pass

## Objectives
- Ensure premium and accessible experience.
- Implement skip-to-content links.
- Provide visually clear focus indicators for keyboard navigation.
- Ensure proper semantic HTML with ARIA properties where needed.
- Enhance accessibility for dynamic features (adding/removing items from meal or comparison tool) using `aria-live`.
- Make missing nutrition data explicitly communicated to screen readers.

## Changes Implemented

### 1. Keyboard Navigation and Focus Management
- Global `skip-to-content` link implemented in layout shells (`Layout.astro` and `SiteLayout.astro`) linking to `<main id="main-content">`.
- Global style classes `.focus-premium` updated to be visible and clear across focusable items.
- Added `aria-label` to form inputs throughout components (`MealCalorieShell`, `RecipeCalculatorShell`, `MealTextParser`, `CompareFoodsShell`) that previously relied solely on placeholders.
- Added explicit `aria-label`s to dynamically generated functional buttons, such as the "Close modal" and "Remove item" buttons.
- Handled mobile menu focus state with global keyboard event listening (`ESC` to close).

### 2. Semantic Region Updates
- Replaced `<main>` without `id` with `<main id="main-content">` consistently across all shell wrappers to ensure the skip link accurately routes screen readers to content.
- Ensure correct data-table markup in `CompareNutritionTable.astro` with an explicit `caption` for screen reader users and proper `th scope="col"` / `th scope="row"` labeling.
- Added missing form labels to Calculator features. Where visual design prohibits visible labels, an `.sr-only` visually hidden label was provided to give clear context.

### 3. Dynamic Announcements (`aria-live`)
- Added a global `a11y-status` live region injected in root layout.
- Wired dynamically updated elements to push updates to the live region:
  - Adding/removing items in the primary Calculator.
  - Adding/removing items in the Compare Foods tool.
  - Clearing meal plans.
- Integrated `aria-live="polite"` directly into search results count for `FoodSearchFilter.astro`.

### 4. Contrast and Color Updates
- Reviewed contrast for status badges site-wide.
- Ran comprehensive replace script to update text utility classes from `text-green-700` and `text-blue-700` to `text-green-800` and `text-blue-800` to guarantee passing 4.5:1 ratio contrast against background badges, conforming to WCAG AA.

### 5. Nutrition Facts Label
- Enhanced data table formatting so when data is missing, the `—` character is still presented visually, but complemented by a `<span class="sr-only">No data</span>` wrapper explicitly informing screen reader users.

## Conclusion
The application meets the desired premium feel while delivering a robustly accessible core. The dynamic operations are successfully communicated to assistive technology, contrast has been tightened for reading clarity, and all core inputs are properly labeled.
