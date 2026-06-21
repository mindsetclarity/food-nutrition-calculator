# Quantity & Serving Conversion Guide

## Quantity Parsing
The Quantity Parser (`parseQuantity.ts`) supports:
- Mixed fractions (`1 1/2 cups`)
- Simple fractions (`1/2 cup`)
- Decimals (`1.5 cups`, `.5 cup`)
- Number words (`one cup`, `half a banana`)

## Serving Resolution Priorities
When resolving a `FoodQuantity` to grams, the `servingResolver.ts` follows these strict priorities:

1. **Exact Serving ID**: If `servingId` is provided, multiply its `grams` by the amount. (Highest Confidence)
2. **Weight Conversion**: If the unit is a known weight (`g`, `kg`, `oz`, `lb`), perform deterministic conversion. (High Confidence)
3. **Food-Specific Serving Unit**: If the parsed unit matches a unit defined in the target food's `servingSizes` (e.g. `cup`, `medium`), use that serving's gram weight. (High Confidence)
4. **Density Conversion**: If the unit is a volume (`cup`, `tbsp`, `tsp`) and the target food defines `density` (g/ml), calculate `amount * volume_ml * density`. (Medium Confidence, triggers warning).
5. **Default Serving Fallback**: If the unit is unknown or unmatchable, use the food's default serving size. (Medium/Low Confidence depending on unit presence).
6. **100g Fallback**: If all else fails, default to 100g as the baseline multiplier. (Low Confidence, triggers warning).

## Unit Categories
- **Weight**: `g`, `kg`, `oz`, `lb`
- **Volume**: `cup`, `tbsp`, `tsp`
- **Count**: `piece`, `slice`, `bowl`, `can`, `package`
- **Serving**: `serving`, `medium`, `small`, `large`
