import type { EngineWarning } from '../warnings';

export function createQuantityWarning(code: string, message: string, isRecoverable: boolean = true): EngineWarning {
  return { code: code as any, message, severity: "warning", userVisible: true };
}

export const QuantityWarnings = {
  missingQuantity: () => createQuantityWarning("QUANTITY_MISSING", "No quantity specified. Defaulting to 1.", true),
  invalidQuantity: (amount: number) => createQuantityWarning("QUANTITY_INVALID", `Invalid quantity amount: ${amount}.`, false),
  tooLarge: () => createQuantityWarning("QUANTITY_TOO_LARGE", "The specified quantity is unusually large.", true),
  unitUnknown: (unit: string) => createQuantityWarning("UNIT_UNKNOWN", `Unknown unit: '${unit}'.`, true),
  unitUnsupported: (unit: string) => createQuantityWarning("UNIT_UNSUPPORTED", `This unit ('${unit}') is not available for the selected food.`, true),
  servingNotFound: (id: string) => createQuantityWarning("SERVING_NOT_FOUND", `Serving size '${id}' was not found.`, true),
  defaultServingUsed: () => createQuantityWarning("DEFAULT_SERVING_USED", "Using the default serving size. Review if needed.", true),
  hundredGramFallback: () => createQuantityWarning("HUNDRED_GRAM_FALLBACK_USED", "Using 100 g because no suitable serving size was found.", true),
  densityRequired: () => createQuantityWarning("DENSITY_REQUIRED", "Volume conversion needs a food-specific serving size or density.", true),
  densityConversionUsed: () => createQuantityWarning("DENSITY_CONVERSION_USED", "Converted volume to grams using estimated density.", true),
  estimatedServing: () => createQuantityWarning("ESTIMATED_SERVING_USED", "The serving size gram weight is an estimate.", true),
  fractionParseFailed: () => createQuantityWarning("FRACTION_PARSE_FAILED", "Failed to parse fraction.", true),
  needsServingReview: () => createQuantityWarning("NEEDS_SERVING_REVIEW", "Quantity conversion may be inaccurate. Please verify.", true)
};
