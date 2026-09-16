# Phase 28: Error Handling, Fallbacks & Safety Hardening

## 1. Purpose of Phase 28
The goal of this phase was to production-harden the application against provider failures, malformed data, bad user input, and unexpected runtime conditions. We enforced safety limits on inputs, normalized parsing fallbacks, properly encapsulated error states, and refined the fallback UI/UX to be transparent and recoverable.

## 2. Error architecture summary
Created `src/lib/errors/types.ts` to explicitly define:
- `AppErrorCode` (e.g. `USDA_TIMEOUT`, `VALIDATION_ERROR`, etc.)
- `FallbackReason`
- Safe API Response shapes (`SafeApiResponse`, `SafeApiSuccess`, `SafeApiError`).

## 3. API hardening summary
Updated key endpoints to handle boundaries securely:
- `api/foods/search.ts`: Enforces input length limits, gracefully catches `fetch` failures, and safely wraps results without leaking error stack traces.
- `api/foods/details.ts`: Returns proper 404s for invalid IDs. Reverts to local fallback if the USDA request throws an error.
- `api/parse-meal.ts`: Rejects excessively long input strings (over 1500 chars). It now catches LLM request timeouts and errors, safely switching to `basicFallbackParse`.

## 4. USDA fallback behavior
When the USDA FoodData Central API times out or is missing a key, endpoints will catch the rejection and return normalized `local` database results automatically, preventing the app from freezing. A fallback message explicitly informs the user that local data is being utilized.

## 5. LLM fallback behavior
LLM failures (timeout, configuration, or API failure) will immediately route the request to the client-safe basic fallback parser. We also catch excessively long prompt strings to mitigate prompt injection/rate limits before they hit the provider.

## 6. Input validation limits
Standardized in `src/lib/safety/inputLimits.ts`:
- `foodSearchMinLength: 2`
- `foodSearchMaxLength: 120`
- `parseMealMaxChars: 1500`
- `quantityMin: 0.01`
- `quantityMax: 10000`

## 7. Nutrition guard behavior
Implemented `src/lib/safety/nutritionGuards.ts`:
- `isFinitePositiveNumber` and `safeNumber` filter out NaN, Infinity, and negative values.
- `hasPartialNutrition` validates whether core macros are missing from an object.

## 8. Source guard / SourceBadge behavior
Implemented `src/lib/safety/sourceGuards.ts` ensuring that `SourceBadge.astro` doesn't crash on `null` or unexpected source strings. It defaults cleanly to `"Unknown"` or `"Estimated"` using `normalizeSource`.

## 9. Client recovery UX summary
The clients already featured dynamic validation handling (e.g., throwing safe UI notices via hidden divs like `<div id="error-msg">`). 
- When USDA returns `fallbackUsed`, we unhide the `fallbackNotice` message.
- Search timeouts reset gracefully.
- The UI handles bad units safely through the Deterministic Engine's validation.

## 10. 404/500 page summary
Created a dedicated `src/pages/404.astro` page. It features:
- A friendly, calm interface.
- Direct quick links to core product tools.
- A `noindex` tag for SEO safety.
Also secured dynamic Astro routes (`/foods/[slug]` and `/learn/[slug]`) to return a `404` status for invalid slugs.

## 11. Security/secret handling confirmation
- No provider errors, stack traces, or `process.env` details are returned in API JSON bodies.
- Only safe user-facing codes like `USDA_UNAVAILABLE` or `An internal server error occurred` are returned.

## 12. Accessibility of errors/validation
Maintained ARIA live region standards (`a11y-status`) and semantic HTML tags. The 404 page is fully navigable by keyboard.

## 13. What was intentionally not implemented
- Global heavy error tracking (e.g., Sentry) was skipped.
- Analytics and DB history were not added as they remain outside scope.
- `500.astro` was skipped since standard Astro deployments often handle 500s directly on the hosting provider level (e.g. Vercel) and injecting it manually can clash with SSG/SSR behaviors.

## 14. Known limitations
- The client-side DOM still relies heavily on manual query selectors for error states, which is safe and lightweight, but can become cumbersome if error states grow extremely complex.
- Some tools inherently rely on UI JS to be enabled for basic interaction.

## 15. Phase 29 recommendation
Move on to Phase 29 for final launch preparation, telemetry integration, deployment environment validation, and final polish.
