export type EngineErrorCode = 
  | "INVALID_INPUT"
  | "FOOD_NOT_FOUND"
  | "USDA_ERROR"
  | "USDA_TIMEOUT"
  | "USDA_KEY_MISSING"
  | "LOCAL_DATA_ERROR"
  | "LLM_ERROR"
  | "LLM_BAD_RESPONSE"
  | "QUANTITY_ERROR"
  | "UNIT_UNSUPPORTED"
  | "CALCULATION_ERROR"
  | "RECIPE_PARSE_ERROR"
  | "INTERNAL_ENGINE_ERROR"
  | "USDA_BAD_RESPONSE"
  | "SOURCE_RESOLUTION_FAILED"
  | "FOOD_SOURCE_NOT_FOUND"
  | "INVALID_PROVIDER_INPUT";

export interface EngineError {
  code: EngineErrorCode;
  message: string;
  safeMessage: string;
  details?: any;
  cause?: any;
  recoverable: boolean;
}

export function createEngineError(code: EngineErrorCode, message: string, safeMessage: string, details?: any, cause?: any): EngineError {
  return {
    code,
    message,
    safeMessage,
    details,
    cause,
    recoverable: false,
  };
}

export function createRecoverableError(code: EngineErrorCode, message: string, safeMessage: string, details?: any, cause?: any): EngineError {
  return {
    code,
    message,
    safeMessage,
    details,
    cause,
    recoverable: true,
  };
}

export function createFatalEngineError(code: EngineErrorCode, message: string, safeMessage: string, details?: any, cause?: any): EngineError {
  return {
    code,
    message,
    safeMessage,
    details,
    cause,
    recoverable: false,
  };
}

export function getSafeEngineMessage(error: EngineError): string {
  return error.safeMessage;
}
