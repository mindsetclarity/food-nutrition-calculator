# Nutrition Engine V2

## What Nutrition Engine V2 is
Nutrition Engine V2 is the future central brain of the Food Nutrition Calculator application. It is designed to be a deterministic, robust, and typed engine that handles all nutrition calculations, data source prioritization, error handling, and confidence scoring across the app.

## What this folder owns
This folder owns the core architecture contracts, types, shared guards, result wrappers, confidence logic, warnings, and safe calculation boundaries for the new engine.

## What this folder does not own
It does not own UI components, frontend rendering logic, user session state, database access layers directly (it only defines the contracts), or non-nutrition application logic.

## Nutrition Truth Hierarchy
1. USDA FoodData Central API = primary source when configured and available.
2. Curated USA local food database = fallback and fast support layer.
3. LLM = parsing/helper only, never final nutrition truth.

## LLM Boundary
The LLM understands messy text (parsing, splitting recipe ingredients, normalizing food names, suggesting search queries, identifying uncertainty). The LLM must **never** own final nutrition values. It cannot calculate final calories, macros, or override USDA/local food data. It cannot replace deterministic calculation.

## USDA/Local Source Rules
USDA and local data sources provide the verified "truth" for nutrition values. The engine relies on these sources to drive accurate calculations for the user. 

## Future Phase Plan
Future phases will implement the contracts defined here:
- Search
- USDA resolver
- Quantity engine
- Recipe engine
- UI integration
- Analytics, etc.

## Current Status
* [x] **Phase 1:** Core types, wrappers, confidence, and engine contracts.
* [x] **Phase 2:** Curated USA food data model (1000+ foods schema).
* [x] **Phase 3:** Local search engine and scoring algorithm.
* [x] **Phase 4:** USDA source resolver and fallbacks.
* [x] **Phase 5:** Quantity + Serving Size + Unit Conversion Engine.
* [x] **Phase 6:** Recipe logic + math aggregator.
* [x] **Phase 7:** Safe LLM text parsing (No nutrition logic in LLM).
* [x] **Phase 8:** Performance/Caching layer.
* [x] **Phase 9:** Calculator + Recipe integration (Attached Engine to UI & API).
* [x] **Phase 10:** Final QA, golden tests, architecture hardening, and launch readiness verification completed.

## Current Phase 2 Status
Phase 2 created the Curated USA Food Data Model for 1000+ Foods:
- Food data schema foundation added.
- Category schema added.
- Serving schema added.
- Validation helpers added.
- Local database prepared for 1000+ foods.
- Tools are not migrated yet.
- Search engine implementation is Phase 3.
