# Nutrition Engine V2 — Phase 1 Architecture Audit & Contract

## 1. Phase 1 Purpose
The purpose of Phase 1 is to create the foundation of a strong, centralized nutrition engine that will later power the Food Nutrition Calculator tools. This phase creates the architecture contracts, types, shared guards, result wrappers, confidence logic, warnings, and safe calculation boundaries. It establishes the "rules of truth" without touching existing code or risking UI breakage.

## 2. Current Architecture Summary
After auditing the repository at `C:\foodnutritioncalculator.com`, it was found that the project is in a very early stage. The `src/lib` and `src/data` directories were not yet present. The existing pages simply include `index.astro` and a `Welcome.astro` component. 

## 3. Existing Files Inspected
The root directory, `src/pages`, and `src/components` were listed. No existing calculation logic, foods database, API routes, or USDA integrations currently exist in the codebase.

## 4. Existing Nutrition Calculation Locations
None found.

## 5. Existing Food Data Locations
None found.

## 6. Existing USDA Integration Locations
None found.

## 7. Existing LLM Integration Locations
None found.

## 8. Existing Calculator Flow
None found.

## 9. Existing Recipe Calculator Flow
None found.

## 10. Problems Found
No legacy problems found as the legacy code does not yet exist in the repository structure provided. This makes establishing a clean foundation even safer.

## 11. New Nutrition Engine V2 Folder Structure
Created `src/lib/nutrition-engine/` with the following files:
- `types.ts`
- `resultTypes.ts`
- `sourceTypes.ts`
- `warnings.ts`
- `confidence.ts`
- `errors.ts`
- `engineGuards.ts`
- `engineContract.ts`
- `index.ts`
- `README.md`

## 12. Engine Contracts Created
- `searchFoodsEngine`
- `resolveFoodEngine`
- `calculateFoodItemEngine`
- `calculateMealTotalsEngine`
- `parseRecipeEngine`
- `resolveRecipeIngredientsEngine`
- `calculateRecipeNutritionEngine`
- `generateSourceSummaryEngine`

## 13. Nutrition Truth Rules
- USDA FoodData Central API = primary source when configured and available.
- Curated USA local food database = fallback and fast support layer.
- LLM = parsing/helper only, never final nutrition truth.

## 14. LLM Boundary Rules
- The LLM understands messy text, normalizes food names, and splits ingredients.
- The LLM must not calculate final calories, macros, or override USDA/local food data.
- The LLM must not invent verified nutrition values or replace deterministic calculation.

## 15. Source Hierarchy Rules
Primary: USDA. Fallback: Local curated DB. Helper: LLM.

## 16. What was Intentionally Not Changed
No existing UI, APIs, or routing configurations were modified. No new dependencies were installed. No calculation behavior was moved because the repository is a fresh Astro setup.

## 17. Server/Client Boundary Notes
- Shared types are safe for frontend and backend.
- USDA client must remain server-side in future phases.
- LLM provider calls must remain server-side in future phases.
- UI can import types/contracts but should not import server-only provider clients.

## 18. Phase 2 Recommendation
Phase 2 should focus on implementing the underlying deterministic math and standardizing local food data schemas to conform to the new `EngineFoodItem` interfaces. 

Nutrition Engine V2 Phase 1 architecture contract complete.
