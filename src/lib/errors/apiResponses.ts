// src/lib/errors/apiResponses.ts
import type { SafeApiSuccess, SafeApiError, AppErrorCode, ValidationErrorDetail } from './types';

export function ok<T>(data: T, meta?: Record<string, any>): Response {
  const body: SafeApiSuccess<T> = { ok: true, data, meta };
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export function fail(code: AppErrorCode, message: string, status: number = 400, details?: string | ValidationErrorDetail[]): Response {
  const body: SafeApiError = {
    ok: false,
    error: {
      code,
      message,
      ...(details ? { details } : {})
    }
  };
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

export function validationFail(message: string, details?: ValidationErrorDetail[]): Response {
  return fail('VALIDATION_ERROR', message, 400, details);
}

export function notFound(message: string = "Resource not found."): Response {
  return fail('NOT_FOUND', message, 404);
}

export function providerUnavailable(provider: 'USDA' | 'LLM', reason?: string): Response {
  const code = provider === 'USDA' ? 'USDA_UNAVAILABLE' : 'LLM_UNAVAILABLE';
  const msg = `${provider} service is currently unavailable. ${reason || ''}`.trim();
  return fail(code, msg, 503);
}

export function internalError(): Response {
  return fail('INTERNAL_ERROR', "An unexpected error occurred. Please try again later.", 500);
}
