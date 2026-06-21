export type EngineWarningCode = 
  | "USDA_UNAVAILABLE"
  | "LOCAL_FALLBACK_USED"
  | "LLM_PARSE_USED"
  | "LLM_PARSE_FAILED"
  | "PARTIAL_NUTRIENT_DATA"
  | "MISSING_SERVING_SIZE"
  | "UNSUPPORTED_UNIT"
  | "ESTIMATED_SERVING"
  | "LOW_CONFIDENCE_MATCH"
  | "NEEDS_USER_REVIEW"
  | "INVALID_QUANTITY"
  | "UNKNOWN_FOOD"
  | "NO_RESULTS"
  | "SOURCE_UNKNOWN"
  | "RECIPE_PARTIAL_RESULT"
  | "NUTRITION_VALUE_MISSING"
  | "USDA_RATE_LIMIT"
  | "LLM_PROVIDER_MISSING"
  | "LLM_DISABLED"
  | "LLM_TIMEOUT"
  | "LLM_BAD_JSON"
  | "LLM_SCHEMA_INVALID"
  | "LLM_FALLBACK_USED"
  | "LLM_NUTRITION_FIELDS_STRIPPED"
  | "LLM_LOW_CONFIDENCE"
  | "LLM_OUTPUT_LIMITED"
  | "LLM_UNSAFE_OUTPUT_REJECTED"
  | "USDA_RATE_LIMITED"
  | "USDA_EMPTY_RESULT"
  | "USDA_MALFORMED_RESPONSE"
  | "LOCAL_NO_MATCH"
  | "SOURCE_MERGE_DUPLICATE_SKIPPED"
  | "PARTIAL_USDA_NUTRIENTS"
  | "PROVIDER_RESULT_LIMITED"
  | "USDA_TIMEOUT";

export interface EngineWarning {
  code: EngineWarningCode;
  message: string;
  severity: "info" | "warning" | "error";
  field?: string;
  itemId?: string;
  userVisible: boolean;
}

export function createWarning(code: EngineWarningCode, message: string, options?: Partial<EngineWarning>): EngineWarning {
  return {
    code,
    message,
    severity: options?.severity || "warning",
    field: options?.field,
    itemId: options?.itemId,
    userVisible: options?.userVisible ?? true,
  };
}
