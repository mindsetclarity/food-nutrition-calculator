# Phase 13: USDA-First Calculator Search

## 1. Purpose of Phase 13
Phase 13 connects the user-facing Calculator MVP (`CalculatorShell.astro`) to the secure Phase 12 server-side API endpoints (`/api/foods/search` and `/api/foods/details`). It removes direct client-side dataset access, shifting the primary source of nutritional truth to the USDA FoodData Central API while retaining the local dataset purely as a graceful fallback.

## 2. USDA-first calculator flow
1. The user types a query (e.g., "chicken") into the search input.
2. The UI debounces the input for 300ms.
3. The UI makes an HTTP GET request to `/api/foods/search?q=chicken`.
4. The server handles fetching from the USDA securely (using the hidden `USDA_API_KEY`). 
5. The UI displays the results dynamically, updating source badges natively.

## 3. API routes used
- `/api/foods/search` for debounced autocompletion.
- `/api/foods/details` for resolving full nutrition values upon user selection.

## 4. Local fallback behavior
If the `USDA_API_KEY` is missing, the API rate limit is exceeded, or the network fails, the server routes intercept the error and query the Phase 9 local deterministic dataset. The search endpoint natively returns a `fallbackUsed: true` flag. The UI listens for this flag and renders a subtle warning notice below the search bar: *"USDA data is unavailable right now, so local fallback results are shown."*

## 5. How source badges work
Source badges display the `sourceLabel` retrieved from the normalized result item. Additionally, they use conditional Tailwind styling to indicate trust:
- **USDA**: Green pill (`bg-green-100 text-green-700`).
- **Local**: Blue pill (`bg-blue-100 text-blue-700`).

## 6. How selected food details work
When a user clicks an autocomplete button, the search bar transforms to a "Loading details..." state. A fetch request is made to `/api/foods/details`.
- For USDA items, it queries `fdcId=<fdcId>`.
- For Local items, it queries `id=<id>&source=local`.
Once the full `FoodItem` profile is loaded, the UI populates the quantity and unit selectors and clears the loading state.

## 7. How deterministic calculation still works
The API responses perfectly mirror the Phase 10 `FoodItem` schema. Therefore, when the user clicks "Add", the UI continues to pass the object into `calculateFoodItem` identically to Phase 11. The deterministic engine correctly scales USDA 100g values according to the selected quantity/unit, bypassing any need for duplicate UI-side formula management.

## 8. Error/loading/empty states
- **Loading**: Search dropdown indicates "Searching..." and aborts stale requests seamlessly via `AbortController`.
- **Empty**: If the API yields 0 results, a clean prompt suggests trying simpler terms like "chicken, rice, yogurt, oats, banana".
- **Error**: If the search fetch fully fails (network down), it displays "Search failed. Please try again."

## 9. Security confirmation
The `CalculatorShell.astro` client component contains zero references to `USDA_API_KEY`. Network tabs will only show calls to the internal `/api/...` boundaries. 

## 10. What Phase 13 does not implement
- LocalStorage persistence.
- Recipe analyzer flows.
- LLM (Natural Language) API parsing logic.

## 11. Manual testing steps
1. Try searching with a 1-character query (should abort and hide dropdown).
2. Type "banana" (should show loading, then render USDA or Local results).
3. Click an item (should fetch details and populate the units dropdown).
4. Remove the `.env` API key and retry (should gracefully show the fallback warning and blue Local badges).
5. Add 100g of item to meal to ensure totals and source summaries update correctly.

## 12. Known limitations
- Search requires network connectivity (the local fallback is server-mediated to maintain a single source of UI truth).
- If the USDA API goes down simultaneously with local network loss, the calculator cannot function.

## 13. Phase 14 or next-step recommendation
Proceed to Phase 14 to introduce LLM Natural Language Parsing to interpret raw descriptive text like "I ate 2 eggs and a slice of toast" into parsed calculation requests.
