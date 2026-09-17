import type { LLMProviderName } from './types';

export function getLLMProviderName(): LLMProviderName {
  const provider = import.meta.env.LLM_PROVIDER?.toLowerCase();
  if (provider === 'gemini') return 'gemini';
  if (provider === 'openai') return 'openai';
  if (provider === 'deepseek') return 'deepseek';
  if (provider === 'nemotron') return 'nemotron';
  if (provider === 'openrouter') return 'openrouter';
  return 'mock';
}

export function getLLMModel(provider?: LLMProviderName): string {
  const p = provider || getLLMProviderName();
  if (p === 'gemini') return import.meta.env.GEMINI_MODEL || 'gemini-2.5-flash';
  if (p === 'openai') return import.meta.env.OPENAI_MODEL || 'gpt-4o-mini';
  if (p === 'deepseek') return import.meta.env.DEEPSEEK_MODEL || 'deepseek-chat';
  if (p === 'nemotron') return import.meta.env.NEMOTRON_MODEL || 'nvidia/llama-3.1-nemotron-ultra-253b-v1';
  if (p === 'openrouter') return import.meta.env.OPENROUTER_MODEL || 'nvidia/nemotron-3-super-120b-a12b:free';
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
  if (provider === 'nemotron') return import.meta.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1';
  if (provider === 'openrouter') return import.meta.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1';
  return '';
}

export function isLLMConfigured(provider?: LLMProviderName): boolean {
  const p = provider || getLLMProviderName();
  if (p === 'mock') return true;
  if (p === 'gemini') return !!import.meta.env.GEMINI_API_KEY;
  if (p === 'openai') return !!import.meta.env.OPENAI_API_KEY;
  if (p === 'deepseek') return !!import.meta.env.DEEPSEEK_API_KEY;
  if (p === 'nemotron') return !!import.meta.env.NVIDIA_API_KEY;
  if (p === 'openrouter') return !!import.meta.env.OPENROUTER_API_KEY;
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
