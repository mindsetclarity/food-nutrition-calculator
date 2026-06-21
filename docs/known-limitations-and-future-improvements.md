# Known Limitations & Future Improvements

## Limitations
1. **Estimates Only:** All food data, even USDA, are averages.
2. **Offline Local Data Limit:** Currently ~1000 items manually curated. The engine supports far more, but data must be fed in.
3. **Parser Errors:** LLM text extraction can occasionally confuse directions with ingredients if heavily unstructured text is pasted.
4. **Not Medical Advice:** Engine clearly states that UI should inform the user not to use this for diabetic dose calculation without review.

## Future Improvements
1. Create a `UserFavorites` Database.
2. Build an image scanner route relying on the LLM parsing boundary.
3. Expand local DB to 5000+ items.
