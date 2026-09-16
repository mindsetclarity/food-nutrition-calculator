# Food Search Ranking Engine

The local food search engine has been upgraded to support 1000+ foods with high performance, avoiding heavy library dependencies and massive DOM freezes.

## Normalization

All foods and search queries are normalized before matching:
1. Converted to lowercase.
2. Punctuation is removed.
3. Multiple whitespaces are collapsed.
4. Stop words (`and`, `with`, `a`, `the`) are removed.
5. Simple singularization is applied (`strawberries` -> `strawberry`).

## Synonyms

A built-in synonym dictionary maps common US terms:
- `garbanzo` -> `chickpea`
- `soda` / `pop` -> `soft drink`
- `cilantro` -> `coriander`
- `mac n cheese` -> `macaroni and cheese`

## Scoring System

Items are scored based on query relevance using `src/lib/foods/foodScoring.ts`:

| Match Type | Points |
| :--- | :--- |
| Exact Display Name Match | +100 |
| Exact Alias Match | +90 |
| Starts With Display Name | +50 |
| Starts With Alias | +40 |
| All Tokens Present | +20 |
| Preparation State Match | +15 |
| Exact Token Match | +10 per token |
| Partial Token Match | +3 per token |

**Tie Breaking:**
If two foods have the same score, a tiny penalty is applied based on string length, which causes shorter, more fundamental food names to rank higher than complex variations.

## Ranking Order & Category Boost

By default, results are sorted strictly descending by score. If a `category` filter is active, only items in that category are scored and returned.

## Fallback Behavior

1. The API attempts to resolve the search using the USDA database first (if configured).
2. If the USDA API fails, times out, or returns no results, the local index of 1000+ foods provides immediate fallback results.
3. Fallback results use the `isEstimated: true` flag and display a clear warning/badge in the UI to ensure transparent data sourcing.

## Performance Notes

- **Precomputed Index:** The index is built once in memory using `buildFoodIndex()`.
- **Token Sets:** Token arrays are converted to `Set` for fast lookup during user keystrokes.
- **Client-Side Debounce:** A 250-400ms debounce should be applied on the client side to avoid freezing the browser.
- **Payload Size:** The API returns compact DTOs with a `nutrientsPreview` to avoid returning the entire `1000+` item database in search results.
