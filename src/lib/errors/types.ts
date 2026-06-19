// src/lib/errors/types.ts

export type AppErrorCode =
  | 'INVALID_REQUEST'
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'USDA_UNAVAILABLE'
  | 'USDA_TIMEOUT'
  | 'USDA_NO_RESULTS'
  | 'LLM_UNAVAILABLE'
  | 'LLM_TIMEOUT'
  | 'LLM_BAD_RESPONSE'
  | 'PARSE_FAILED'
  | 'DETAILS_UNAVAILABLE'
  | 'UNSUPPORTED_UNIT'
  | 'INVALID_QUANTITY'
  | 'PARTIAL_NUTRITION_DATA'
  | 'UNKNOWN_SOURCE'
  | 'INTERNAL_ERROR';

export type AppErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface ValidationErrorDetail {
  field: string;
  message: string;
}

export type FallbackReason =
  | 'usda_failed'
  | 'usda_timeout'
  | 'usda_missing_key'
  | 'llm_failed'
  | 'llm_timeout'
  | 'llm_malformed';

export interface SafeApiSuccess<T> {
  ok: true;
  data: T;
  meta?: Record<string, any>;
}

export interface SafeApiError {
  ok: false;
  error: {
    code: AppErrorCode;
    message: string;
    details?: ValidationErrorDetail[] | string;
  };
}

export type SafeApiResponse<T> = SafeApiSuccess<T> | SafeApiError;

export interface UserFacingError {
  title: string;
  message: string;
  recoverable: boolean;
  code?: AppErrorCode;
}
