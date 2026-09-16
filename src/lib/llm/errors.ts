export const LLM_ERRORS = {
  UNSUPPORTED: 'LLM_PROVIDER_UNSUPPORTED',
  NOT_CONFIGURED: 'LLM_PROVIDER_NOT_CONFIGURED',
  FAILED: 'LLM_REQUEST_FAILED',
  TIMEOUT: 'LLM_TIMEOUT',
  INVALID_RESPONSE: 'LLM_INVALID_RESPONSE',
  JSON_PARSE_FAILED: 'LLM_JSON_PARSE_FAILED',
  SAFETY_BLOCKED: 'LLM_SAFETY_BLOCKED',
  UNKNOWN: 'LLM_UNKNOWN_ERROR'
} as const;

export class LLMError extends Error {
  code: string;
  retryable: boolean;

  constructor(message: string, code: string = LLM_ERRORS.UNKNOWN, retryable: boolean = false) {
    super(message);
    this.name = 'LLMError';
    this.code = code;
    this.retryable = retryable;
  }
}
