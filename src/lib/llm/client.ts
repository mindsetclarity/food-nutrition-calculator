import type { LLMProvider, LLMRequest, LLMResponse } from './types';
import { getLLMProviderName, getLLMModel, getLLMTimeoutMs } from './config';
import { LLM_ERRORS } from './errors';
import { mockProvider } from './providers/mock';
import { geminiProvider } from './providers/gemini';
import { openaiProvider } from './providers/openai';
import { deepseekProvider } from './providers/deepseek';
import { nemotronProvider } from './providers/nemotron';
import { openrouterProvider } from './providers/openrouter';
import { safeParseJSON } from './json';

/** The single provider registry. Adding a provider means adding it here only. */
export const allProviders: LLMProvider[] = [
  mockProvider,
  geminiProvider,
  openaiProvider,
  deepseekProvider,
  nemotronProvider,
  openrouterProvider
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

// A successful parse took 3-5s on the free Nemotron route; below this a retry cannot finish.
const MIN_RETRY_MS = 3000;

export async function generateJSONWithLLM(request: LLMRequest): Promise<LLMResponse> {
  const req: LLMRequest = { ...request, responseFormat: 'json' };
  // One time budget covers both attempts, so a retry cannot double the user's wait.
  const deadline = Date.now() + (request.timeoutMs || getLLMTimeoutMs());

  const attempt = async (timeoutMs: number): Promise<LLMResponse> => {
    const res = await generateWithLLM({ ...req, timeoutMs });
    if (res.ok && res.text) {
      const parseResult = safeParseJSON(res.text);
      if (parseResult.data) res.json = parseResult.data;
      else res.warnings.push(`JSON parse failed: ${parseResult.error}`);
    }
    return res;
  };

  // Free OpenRouter routes intermittently answer 200 with empty content or prose
  // instead of JSON (1 in 4 meal parses when tested). That is a transient miss,
  // not an answer, so retry once. Real failures (!ok) are not retried.
  const first = await attempt(deadline - Date.now());
  if (!first.ok || first.json !== undefined) return first;

  const remaining = deadline - Date.now();
  if (remaining < MIN_RETRY_MS) {
    first.warnings.push('No time left to retry a response with no usable JSON.');
    return first;
  }

  const second = await attempt(remaining);
  second.warnings.unshift(...first.warnings, 'Retried after a response with no usable JSON.');
  return second;
}
