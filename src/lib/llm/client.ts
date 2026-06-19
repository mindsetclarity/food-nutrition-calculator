import type { LLMProvider, LLMRequest, LLMResponse } from './types';
import { getLLMProviderName } from './config';
import { mockProvider } from './providers/mock';
import { geminiProvider } from './providers/gemini';
import { openaiProvider } from './providers/openai';
import { deepseekProvider } from './providers/deepseek';
import { safeParseJSON } from './json';

export function getLLMProvider(): LLMProvider {
  const providerName = getLLMProviderName();
  
  if (providerName === 'gemini') return geminiProvider;
  if (providerName === 'openai') return openaiProvider;
  if (providerName === 'deepseek') return deepseekProvider;
  
  return mockProvider;
}

export async function generateWithLLM(request: LLMRequest): Promise<LLMResponse> {
  const provider = getLLMProvider();
  
  if (!provider.isConfigured()) {
    const res = await mockProvider.generate(request);
    res.warnings.push(`Provider ${provider.name} is not configured. Falling back to mock.`);
    return res;
  }
  
  return provider.generate(request);
}

export async function generateJSONWithLLM(request: LLMRequest): Promise<LLMResponse> {
  const req: LLMRequest = { ...request, responseFormat: 'json' };
  const res = await generateWithLLM(req);
  
  if (res.ok && res.text) {
    const parseResult = safeParseJSON(res.text);
    if (parseResult.data) {
      res.json = parseResult.data;
    } else {
      res.warnings.push(`JSON parse failed: ${parseResult.error}`);
    }
  }
  
  return res;
}
