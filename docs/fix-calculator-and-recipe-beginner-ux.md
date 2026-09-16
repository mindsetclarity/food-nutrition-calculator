# Beginner UX Enhancements for Food & Recipe Calculators

## 1. Problem Summary
The Food Calculator and Recipe Calculator tools were previously overly technical, displaying complex dashboard statistics before user input, using intimidating parser/AI terminology, and burying the primary call-to-action under excessive trust badges and large hero graphics. A first-time user would be distracted by "deterministic engine" disclaimers instead of simply searching for an ingredient.

## 2. Food Calculator Structure Changes
**Before:**
- Massive PageHeader taking up screen space.
- "MealTextParser" built directly into the Food Calculator.
- A "0" totals dashboard immediately visible before adding items.
- Duplicate trust badges and AI explanation text.

**After:**
- A simple, tight `CalculatorHero.astro` with clear subtitles.
- 3-step indicator added: 1. Search, 2. Add amount, 3. Review totals.
- "MealTextParser" removed entirely to follow the "One primary action per screen" rule (Search).
- Result totals are completely hidden inside an empty state ("Start by adding one food") until an item is successfully added to the meal.

## 3. Recipe Calculator Structure Changes
**Before:**
- Overwhelming hero graphic.
- Advanced nutrition detail tables permanently visible on the right sidebar.
- Technical wording: "Resolve Candidates", "Parse recipe", "Deterministic Data".

**After:**
- A clean `RecipeHero.astro`.
- 3-step indicator added: 1. Paste recipe, 2. Review matches, 3. See totals.
- Per-serving totals correctly promoted to the most visually dominant block.
- Total Recipe Nutrition demoted into an expandable `<details>` block ("Show ingredient breakdown").
- Wording simplified: "Analyze Recipe", "Review matches", "Update match".

## 4. Elements Removed/Collapsed
- Food Calculator: Removed the text parsing input entirely (this belongs in the Recipe Calculator or a dedicated Meal tool).
- Food Calculator & Recipe Calculator: Replaced "0 total" displays with clear graphical empty states.
- Recipe Calculator: Nested the `Total Recipe Nutrition` breakdown table behind a `<details>` tag.
- Shared: Removed excessive provider warnings, moving AI caveats into small, unified footers.

## 5. Beginner UX Decisions
- **Progressive Disclosure:** Users no longer see detailed breakdown bars or labels until they have successfully added their first item.
- **Copy Simplification:** Replaced "AI Parsing Assist" with "AI helps read your text. Final totals come from food data."
- **Clear Primary Action:** The Food Calculator search bar is now the focal point, with a helpful placeholder.

## 6. Mobile Decisions
- By hiding the large empty totals dashboards, mobile users no longer have to scroll past meaningless "0" data to get to the search bar.
- `<details>` tags reduce vertical scroll height significantly on smaller screens.

## 7. Accessibility Decisions
- Search inputs, dropdown selects, and remove buttons maintain ARIA support.
- Color contrast for empty states and disabled buttons remains within WCAG standards.
- Replaced ambiguous icons with text-backed labels where possible.

## 8. Functionality Preserved
- The deterministic math engine and calculate function remains entirely unchanged.
- USDA-first API routing with local DB fallback remains fully intact.
- LLM parsing API integration stays connected to the Recipe tool.
- No `package.json` dependencies were altered.

## 9. Manual Tests
- Verified the `/calculator` tool searches, adds, clear, and calculates properly.
- Verified `/calculator` does not show totals until items are added.
- Verified `/recipe-nutrition-calculator` parses lists and allows updating matches correctly.

## 10. Build Result
- Validation build passed successfully.
