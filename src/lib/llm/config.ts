import type { LLMProviderName } from './types';

export function getLLMProviderName(): LLMProviderName {
  const provider = import.meta.env.LLM_PROVIDER?.toLowerCase();
  if (provider === 'gemini') return 'gemini';
  if (provider === 'openai') return 'openai';
  if (provider === 'deepseek') return 'deepseek';
  return 'mock';
}

export function getLLMModel(provider?: LLMProviderName): string {
  const p = provider || getLLMProviderName();
  if (p === 'gemini') return import.meta.env.GEMINI_MODEL || 'gemini-2.5-flash';
  if (p === 'openai') return import.meta.env.OPENAI_MODEL || 'gpt-4o-mini';
  if (p === 'deepseek') return import.meta.env.DEEPSEEK_MODEL || 'deepseek-chat';
  return import.meta.env.LLM_MODEL || 'mock-food-parser';
}

export function getLLMTimeoutMs(): number {
  return Number(import.meta.env.LLM_TIMEOUT_MS) || 20000;
}

export function getLLMMaxOutputTokens(): number {
  return Number(import.meta.env.LLM_MAX_OUTPUT_TOKENS) || 1200;
}

export function getLLMBaseUrl(provider: LLMProviderName): string {
  if (provider === 'gemini') return import.meta.env.GEMINI_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta';
  if (provider === 'openai') return import.meta.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';
  if (provider === 'deepseek') return import.meta.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com';
  return '';
}

export function isLLMConfigured(provider?: LLMProviderName): boolean {
  const p = provider || getLLMProviderName();
  if (p === 'mock') return true;
  if (p === 'gemini') return !!import.meta.env.GEMINI_API_KEY;
  if (p === 'openai') return !!import.meta.env.OPENAI_API_KEY;
  if (p === 'deepseek') return !!import.meta.env.DEEPSEEK_API_KEY;
  return false;
}

export function getLLMConfigSafe() {
  const provider = getLLMProviderName();
  return {
    provider,
    configured: isLLMConfigured(provider),
    model: getLLMModel(provider),
    timeoutMs: getLLMTimeoutMs()
  };
}
