import type { LLMParseInput } from './llmTypes';

export function isLLMProviderConfigured(): boolean {
  // In a real env, check import.meta.env or process.env
  // For safety and SSR compat, we assume true if LLM_PROVIDER is set
  // This engine runs server-side. 
  // Due to Astro/Vite env, we check process.env or just allow the adapter to figure it out
  const provider = process.env.LLM_PROVIDER || 'mock';
  return provider.length > 0;
}

export function isLLMEnabled(): boolean {
  return isLLMProviderConfigured();
}

export function shouldUseLLMParser(input: LLMParseInput): boolean {
  if (!isLLMEnabled()) return false;
  if (input.mode === "recipe" && input.allowRecipeParsing !== false) return true;
  if (input.mode === "meal" && input.allowMealParsing !== false) return true;
  return false;
}

export function clampLLMInputLength(text: string, maxLen: number = 8000): string {
  if (!text) return "";
  return text.slice(0, maxLen);
}

export function clampLLMMaxItems(maxItems?: number): number {
  if (!maxItems || maxItems <= 0) return 50;
  return Math.min(maxItems, 100);
}

export function sanitizeLLMInputText(text: string): string {
  return clampLLMInputLength(text.trim());
}

export function isTextSafeForLLMParsing(text: string): boolean {
  const sanitized = sanitizeLLMInputText(text);
  return sanitized.length > 0 && sanitized.length <= 8000;
}

export function isLikelyRecipeText(text: string): boolean {
  // Basic heuristic: contains numbers and newlines
  const lines = text.split('\n').filter(l => l.trim().length > 0);
  if (lines.length > 1 && /\d/.test(text)) return true;
  return false;
}

export function isLikelyMealText(text: string): boolean {
  const lines = text.split('\n').filter(l => l.trim().length > 0);
  // Natural language sentence with foods
  if (lines.length === 1 && text.length > 20 && !text.includes('\n')) return true;
  return false;
}
