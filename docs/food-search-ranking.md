# Food Search Quality and Ranking Guide

## 1. Purpose
The Food Nutrition Calculator local search engine ensures users find the foods they are looking for through a combination of string normalization, token expansion, synonyms, and rule-based scoring.

## 2. Query Normalization
Normalization strips `\s+` noise, standardizes spaces, removes punctuation `[^\w\s-]`, strips accents `normalize("NFD")`, fixes hyphenated prefixes, and converts edge-case colloquialisms into structured data.

## 3. Stop Words
Common noise words (`fresh`, `plain`, `food`, `the`, etc.) are removed from the query tokens to prevent false-positive matches across hundreds of unassociated items.

## 4. Synonyms
Food nomenclature is chaotic. Synonyms explicitly map user intents like `garbanzo` back to the internal index value of `chickpeas`.

## 5. Aliases
Local food data may provide an `aliases: []` array. Aliases behave exactly like display names during token processing. 

## 6. Food Index
When the application starts, it processes all raw foods into `SearchIndexedFood` objects, compiling all strings and aliases into a unified `tokenSet` and pre-caching previews like default calories/protein.

## 7. Scoring Priority
- Exact Name Match (+1000)
- Exact Alias Match (+950)
- Synonym Match (+900)
- Starts With Name (+750)
- Starts With Alias (+700)
- All Tokens Match (+600)
- Fuzzy Spelling Match (+150)
- Partial Tokens (+30 per token)

## 8. Match Types
The system returns a distinct `matchType` (`exact_name`, `synonym`, `fuzzy`, etc.) to inform callers or analytics exactly *how* a food was retrieved.

## 9. Confidence Levels
The Phase 1 EngineConfidence mechanism automatically labels matches:
- **High**: >= 900 score
- **Medium**: >= 600 score
- **Low**: < 600 score (with `needsReview` set to true)

## 10. Search Modes
Modes include `calculator`, `recipe`, `directory`, `compare`, and `meal`. Modes adjust clamping on returned limits (e.g., `directory` pagination uses max 50, whereas `recipe` uses max 15).

## 11. Category Filtering
Providing a `category` to the search input strictly boosts elements matching the string.

## 12. Preparation Matching
Tokens matching explicit preparation instructions (`cooked`, `raw`, `baked`) receive an additional +150 boost, ensuring `cooked rice` accurately surfaces the cooked preparation over the dry version.

## 13. Fuzzy Matching Rules
A simple substring presence threshold catches typographical deviations (e.g. `bannana`) if the query is at least 4 characters long.

## 14. Performance Strategy
Precomputing the searchable text array into token sets ensures that a given query only needs simple `Set.has()` checks instead of constant RegEx parsing. 

## 15. Limitations
This is not an LLM. Misspellings like `apele` for `apple` won't be caught. 

## 16. Phase 4 USDA Merge Notes
USDA endpoints do not respect local normalizations. The search system will eventually query USDA asynchronously and merge results via `searchFoodsEngine`. 

## 17. Phase 9 UI Integration Notes
The search interface is fully deterministic. UI should expose `displayName`, `sourceLabel`, `caloriesPreview`, `proteinPreview`, and `defaultServingLabel` but mask internal numeric scores.
