# Final Engine Architecture

## 1. Engine Folder Structure
- `/calculation`: Deterministic math (summing, per-serving scaling).
- `/data`: Local curated US food DB.
- `/llm`: Pure string parsing to structured ingredients. Does NOT assign nutrition.
- `/performance`: Memory cache & Promise Request Deduper.
- `/quantity`: Serving size and unit-to-gram conversion (including density).
- `/recipe`: Recipe orchestration and ingredient matching.
- `/search`: Search scoring and index creation.
- `/sources`: Resolvers prioritizing USDA -> Local Estimate.

## 2. Source Hierarchy
1. **USDA**: Highly trusted.
2. **Local**: Fallback for offline/timeout modes.
3. **LLM**: Never allowed to return nutrition keys.

## 3. UI Responsibilities
The UI is solely responsible for rendering JSON. It does not perform summing operations or fallback data loading. It just consumes the Engine's Result wrapper.

## 4. Security Boundaries
API Keys remain on the server (`/api/*`). The browser UI never makes USDA or LLM network requests directly.
