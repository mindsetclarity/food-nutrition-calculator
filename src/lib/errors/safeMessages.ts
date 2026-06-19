// src/lib/errors/safeMessages.ts
import type { AppErrorCode, FallbackReason } from './types';

export function getSafeUserMessage(code: AppErrorCode): string {
  switch (code) {
    case 'USDA_UNAVAILABLE':
    case 'USDA_TIMEOUT':
      return 'Food search is unavailable right now. Showing local fallback results when possible.';
    case 'USDA_NO_RESULTS':
      return 'No exact USDA matches found. Please try adjusting your search terms.';
    case 'LLM_UNAVAILABLE':
    case 'LLM_TIMEOUT':
    case 'LLM_BAD_RESPONSE':
    case 'PARSE_FAILED':
      return 'We could not parse this text reliably. Please review the ingredients manually or use basic search.';
    case 'DETAILS_UNAVAILABLE':
      return 'Detailed nutrition facts are currently unavailable for this item.';
    case 'UNSUPPORTED_UNIT':
      return 'This serving unit is not available for the selected food.';
    case 'INVALID_QUANTITY':
      return 'Please enter a valid quantity greater than 0.';
    case 'PARTIAL_NUTRITION_DATA':
      return 'Some nutrient values are unavailable from the selected source.';
    case 'INVALID_REQUEST':
    case 'VALIDATION_ERROR':
      return 'Please check your input and try again.';
    case 'NOT_FOUND':
      return 'The requested item could not be found.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
}

export function getFallbackMessage(reason: FallbackReason): string {
  switch (reason) {
    case 'usda_failed':
    case 'usda_timeout':
    case 'usda_missing_key':
      return 'Using local food data because the primary USDA service is unavailable or configuring.';
    case 'llm_failed':
    case 'llm_timeout':
    case 'llm_malformed':
      return 'Using basic ingredient parser because the intelligent parser is currently unavailable.';
    default:
      return 'Using fallback methods to complete your request.';
  }
}
