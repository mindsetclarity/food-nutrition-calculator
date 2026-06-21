# Recipe Understanding Engine

## Architecture
The recipe engine follows a strict deterministic pipeline:
`Clean Input -> Parse Line (Amount/Unit/Food) -> Resolve Source (USDA/Local) -> Convert to Grams -> Calculate Math`

## LLM Boundary
There is **zero** LLM interference in the core calculation logic. The LLM is prohibited from calculating calories or looking up macros. It is strictly an optional front-end text scrubber (coming in Phase 7).

## Ingredient Statuses
Each ingredient receives a strict status after processing:
- `resolved`: Good match, good quantity, core macros exist.
- `needs_review`: Weak match, missing quantity, default serving fallback used, or partial macros.
- `unresolved`: Source search found nothing, or quantity was completely incomprehensible.
- `skipped`: Empty line or recipe instruction ("Bake for 20 mins").

## Quantity Conversion
Uses the Phase 5 engine. If a recipe says "1 cup oats", it finds the "cup" serving in the matched food's database entry. If it doesn't exist, it looks for density mappings. If that fails, it falls back to the default serving with a heavy warning.

## Source Hierarchy
1. USDA
2. Local Curated
3. Local Estimated

All ingredients keep a `sourceLabel` so the UI can clearly state where the data came from.

## Future UI Integration Notes (Phase 9)
When the UI connects to this engine, it should check `ingredient.status === 'needs_review'`. If true, the UI should visually flag that ingredient row, allowing the user to click it and manually select a different food or unit.
