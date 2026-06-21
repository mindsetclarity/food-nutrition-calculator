import type { EngineWarning } from '../warnings';

export const CalculatorWarnings = {
  noNaN: (field: string): EngineWarning => ({
    code: "NUTRITION_VALUE_MISSING",
    message: `Missing or invalid value for ${field}.`,
    severity: "warning",
    userVisible: true
  }),
  unsupportedUnit: (unit: string): EngineWarning => ({
    code: "UNSUPPORTED_UNIT",
    message: `The unit '${unit}' is not explicitly supported for this food.`,
    severity: "warning",
    userVisible: true
  }),
  sourceFallback: (): EngineWarning => ({
    code: "LOCAL_FALLBACK_USED",
    message: "Primary source was unavailable. Local estimates were used.",
    severity: "info",
    userVisible: true
  }),
  partialNutrients: (): EngineWarning => ({
    code: "PARTIAL_NUTRIENT_DATA",
    message: "Some nutrients are unavailable from the selected source.",
    severity: "warning",
    userVisible: true
  }),
  needsReview: (): EngineWarning => ({
    code: "NEEDS_USER_REVIEW",
    message: "Please review the calculated quantity.",
    severity: "warning",
    userVisible: true
  })
};
