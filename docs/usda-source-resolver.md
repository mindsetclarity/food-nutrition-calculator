# USDA Source Resolver

## Overview
The USDA Source Resolver (`src/lib/nutrition-engine/sources`) provides the data backbone for the nutrition calculator. It manages fetching, formatting, merging, and falling back across multiple data providers.

## USDA Role
USDA FoodData Central serves as the absolute **primary** source of nutrition truth. If a food exists in USDA and the API responds successfully, that food will rank at the top of the search results.

## Local Curated Database Role
The local database serves as the **fallback**. It powers the site when the USDA API is unreachable, unconfigured, or missing specific queried items.

## Source Priority
1. USDA Foundation / SR Legacy
2. USDA Branded
3. Local Curated USA Estimate

## Server-Only Key Management
`USDA_API_KEY` must **never** touch the client side. All resolution must happen on a Node/serverless backend.

## Timeout/Fallback Behavior
USDA calls use an `AbortController` restricted to 6000ms. If the timer trips, the resolver swallows the network failure, switches to Local mode, and applies a `USDA_TIMEOUT` warning so the UI can optionally display a fallback badge.

## Source Labels
To maintain transparency, every food retains a `sourceLabel` such as "USDA Foundation" or "Curated US local estimate". The UI uses these labels to build trust with the user.

## Details Resolution
To load the full macro profile for a calculator row, `resolveBestFoodSource()` is called. This queries the explicit provider (USDA via FDC ID, or Local via string ID) to construct the finalized `ResolvedFoodSource`.

## No Build-Time USDA Calls
USDA endpoints are strictly accessed during runtime execution by end-users. We do not scrape or pre-build USDA data to avoid mass rate limiting.

## Non-Affiliation Note
The application uses the USDA FoodData Central API. This application is not certified, endorsed, or approved by the USDA.
