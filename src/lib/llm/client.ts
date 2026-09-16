import type { LLMProvider, LLMRequest, LLMResponse } from './types';
import { getLLMProviderName, getLLMModel } from './config';
import { LLM_ERRORS } from './errors';
import { mockProvider } from './providers/mock';
import { geminiProvider } from './providers/gemini';
import { openaiProvider } from './providers/openai';
import { deepseekProvider } from './providers/deepseek';
import { nemotronProvider } from './providers/nemotron';
import { safeParseJSON } from './json';

/** The single provider registry. Adding a provider means adding it here only. */
export const allProviders: LLMProvider[] = [
  mockProvider,
  geminiProvider,
  openaiProvider,
  deepseekProvider,
  nemotronProvider
];

export function getLLMProvider(): LLMProvider {
  const providerName = getLLMProviderName();
  return allProviders.find((p) => p.name === providerName) ?? mockProvider;
}

export async function generateWithLLM(request: LLMRequest): Promise<LLMResponse> {
  const provider = getLLMProvider();
  
  // A missing key is a failure, not a cue to substitute the mock: the mock answers
  // ok:true with a fabricated "mock food" item, which callers cannot tell apart
  // from a real parse and would show to users.
  if (!provider.isConfigured()) {
    return {
      ok: false, provider: provider.name, model: getLLMModel(provider.name), text: '', warnings: [],
      error: { code: LLM_ERRORS.NOT_CONFIGURED, message: `Provider ${provider.name} is not configured.`, retryable: false }
    };
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
