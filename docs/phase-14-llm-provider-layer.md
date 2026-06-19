# Phase 14: LLM Provider Layer

## 1. Purpose of Phase 14
The purpose of Phase 14 is to construct a safe, secure, provider-agnostic LLM integration layer. This foundational infrastructure paves the way for advanced natural language meal parsing in Phase 15 without embedding API keys in the frontend, risking nutrition hallucination, or permanently locking the project to a single AI provider.

## 2. What was created
- `src/lib/llm/types.ts`: Core interfaces, ensuring consistent request/response schemas.
- `src/lib/llm/config.ts`: Environment reading logic, establishing safe fallbacks.
- `src/lib/llm/client.ts`: The central routing system to pick an appropriate provider.
- `src/lib/llm/errors.ts`: Unified error structures.
- `src/lib/llm/safety.ts`: Aggressive guardrails to enforce the nutrition truth hierarchy.
- `src/lib/llm/json.ts`: Robust, fail-safe JSON parsing utilities.
- `src/lib/llm/prompts.ts`: High-level prompt generators (to be implemented functionally in Phase 15).
- `src/lib/llm/providers/*`: Implementations for Mock, Gemini, OpenAI, and DeepSeek.
- `/api/llm/health`: A safe diagnostic endpoint.

## 3. Provider abstraction overview
The system unifies the complexities of various LLMs into one function: `generateWithLLM()`. Regardless of the selected provider, this function takes a generic `LLMRequest` (which includes tasks, messages, format, timeouts) and returns a normalized `LLMResponse`.

## 4. Supported providers
- **Mock**: Enabled by default (`LLM_PROVIDER=mock`). Returns instant, deterministic JSON.
- **Gemini**: Supported via `GEMINI_API_KEY`.
- **OpenAI**: Supported via `OPENAI_API_KEY`.
- **DeepSeek**: Supported via `DEEPSEEK_API_KEY`.

## 5. Environment variables
`.env.example` has been heavily updated with clearly scoped namespaces:
```
LLM_PROVIDER=mock
LLM_MODEL=mock-food-parser
LLM_TIMEOUT_MS=20000
LLM_MAX_OUTPUT_TOKENS=1200
```
There are subsequent keys mapped for `GEMINI_*`, `OPENAI_*`, and `DEEPSEEK_*`.

## 6. Server-only key handling
Like the USDA configuration, all LLM secrets are bound strictly to `import.meta.env`. Because no frontend UI files or client-side scripts directly import the `src/lib/llm/client.ts`, the keys will never be statically compiled into the final Vite bundle. 

## 7. Mock provider behavior
The mock provider bypasses all network calls, faking a 300ms delay. It instantly returns a well-formed JSON object representing a "mock food" for `meal_parse` tasks. This enables frontend UI development in Phase 15 to proceed without a live API key.

## 8. Gemini provider behavior
Uses pure native `fetch` against `https://generativelanguage.googleapis.com/v1beta`. It isolates system messages via the `systemInstruction` attribute and cleanly translates safety failures (e.g., `finishReason === 'SAFETY'`) into unified warning arrays rather than crashes.

## 9. OpenAI provider behavior
Uses `fetch` against `https://api.openai.com/v1/chat/completions`. Leverages `response_format: { type: "json_object" }` if the incoming request specifies JSON, guaranteeing cleanly returned formats. 

## 10. DeepSeek provider behavior
DeepSeek offers identical API signatures to OpenAI. The `deepseek.ts` provider clones the OpenAI request structures but targets `https://api.deepseek.com` with the respective `DEEPSEEK_API_KEY`.

## 11. Timeout/error handling
The layer introduces a native `AbortController` wrapper. It reads `LLM_TIMEOUT_MS` (default 20 seconds). If a request stalls, the controller forcibly aborts it, returning a graceful `{ ok: false, error: LLM_ERRORS.TIMEOUT }` response instead of indefinitely hanging the server context.

## 12. JSON helper behavior
The LLM response is frequently unpredictable. `safeParseJSON` attempts to index `{` and `[` to aggressively extract the true payload out from behind markdown blocks (e.g., ` ```json `). It falls back to basic structural repairs (like stripping trailing commas) if native parsing fails.

## 13. Safety boundary
Every AI generation inherently includes the following strict directive via `createNutritionTruthBoundarySystemPrompt()`:
*LLM output is advisory parsing assistance only. It must not be treated as verified nutrition data. USDA FoodData Central remains the primary nutrition source. The local database is fallback. The deterministic nutrition engine owns calories, macros, and totals.*

## 14. Nutrition truth hierarchy
The system reinforces that Phase 14 generates "Search Queries", "Quantities", and "Units"—never calories or macros. The extracted elements will subsequently be funnelled into the deterministic Phase 10 engine. 

## 15. What Phase 14 does not implement
- The UI modal for "Paste a recipe / natural text".
- Integration into the Calculator layout.
- The `/api/parse-meal` execution endpoint.
- Database persistance.

## 16. How Phase 15 should use this layer
Phase 15 will create the `/api/parse-meal` server endpoint. That endpoint will use `buildMealParseSystemPrompt()`, forward it to `generateJSONWithLLM()`, and return the deeply parsed `items` array to the frontend.

## 17. Manual testing steps
1. Run `npm run dev`.
2. Visit `http://localhost:4321/api/llm/health`.
3. Observe the structured output indicating that `mock` is the configured provider.
4. Note that no API keys, private tokens, or stack traces leak.

## 18. Known limitations
- The raw `fetch` providers are intentionally lightweight and minimal. They don't include native retry/backoff logic (retries are left to the consumer to implement).
- Streaming UI is not supported via this simple REST wrapper.
