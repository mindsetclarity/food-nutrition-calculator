# LLM Nutrition Safety Boundary

## Core Principle
The LLM understands messy text. USDA/local curated data provides food truth. The deterministic nutrition engine calculates final totals. The UI only displays results.

## LLM is a Parser Only
The LLM's only job is to look at unstructured text like "had a big bowl of oats with 2 spoons of sugar" and convert it into structured queries:
- Food: "oats", Quantity: 1, Unit: "bowl"
- Food: "sugar", Quantity: 2, Unit: "spoon"

## Forbidden Output Fields
The LLM must never return:
- `calories` / `kcal`
- `protein`
- `carbs` / `carbohydrates`
- `fat`
- `fiber`
- `sugar`
- `sodium`
- `cholesterol`
- `micronutrients` / `vitamins` / `minerals`

## Allowed Output Fields
- `originalText`: The exact string mapped to this item.
- `foodName`: The simplified core ingredient name.
- `quantity`: Number.
- `unit`: String.
- `preparation`: Hints like "cooked", "diced", "raw".
- `confidence`: "high" | "medium" | "low".

## Examples

### Safe Parsing (Allowed)
Input: "2 tbsp peanut butter"
Output:
```json
{
  "foodName": "peanut butter",
  "quantity": 2,
  "unit": "tbsp"
}
```

### Unsafe Hallucination (Forbidden and automatically stripped)
Input: "2 tbsp peanut butter"
Output:
```json
{
  "foodName": "peanut butter",
  "quantity": 2,
  "unit": "tbsp",
  "calories": 190,   // STRIPPED
  "protein": 7       // STRIPPED
}
```
If the system detects this, the nutrition values are silently deleted and a warning (`LLM_NUTRITION_FIELDS_STRIPPED`) is added.

## Fallback Behavior
If the LLM provider goes down, hits a rate limit, or hallucinates bad JSON:
1. The request times out or is caught.
2. The deterministic regex-based parser takes over.
3. The engine continues without crashing.

## Privacy & API Key Safety
- The LLM API key runs server-side only. It is never bundled into the browser.
- Full API errors (e.g. "Unauthorized 401", "Key expired") are redacted before reaching the client to prevent exposing infrastructure details.
- User recipe text is parsed ephemerally and is not stored in a database or logged permanently.
