# Nutrition Engine V2 — Phase 5
**Quantity + Serving Size + Unit Conversion Engine**

## Overview
Phase 5 implements the quantity and serving size module (`src/lib/nutrition-engine/quantity`). It handles translating user-provided quantities (like "1.5 cups" or "100g") into a deterministic gram weight that the Nutrition Engine can use to calculate nutrients accurately.

## Architecture & Data Flow

1. **parseQuantityText**: Extracts amount and unit from raw text using regex, string matching, and fraction maps.
2. **unitConverter**: Normalizes extracted units into standardized internal formats (e.g., `NormalizedQuantityUnit`). Includes hardcoded weight conversion for standard metrics (`oz`, `lb`, `kg`, `g`).
3. **servingResolver**: Central logic to map an amount and a unit to a target food's serving sizes. Returns `ResolvedServing` containing total grams.
4. **densityConverter**: Handles edge-case volume-to-weight conversions (like "1 cup milk") when the food data schema includes `density` properties (grams/ml).
5. **quantityGuards & quantityWarnings**: Ensures output is strictly numeric, safe to compute, and appends confidence/warnings if a fallback is triggered.

## Core Rules Implemented
- **Final nutrition math is ALWAYS based on grams**.
- Blind volume-to-weight conversions (e.g. 1 cup = 240g universally) are strictly forbidden. Volume conversions either use food-specific serving objects (e.g. `1/2 cup = 40g`) or known `density` (e.g. milk).
- **Defaulting to 100g base** is the absolute last resort when no valid unit, serving, or density can be found.

## Next Phases
- Phase 6: Nutrition Math & Calculator Module. This phase will take the `grams` resolved here and multiply them against the `nutrientsPer100g` from Phase 1/2.
