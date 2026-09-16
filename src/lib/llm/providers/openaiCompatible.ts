import type { LLMProvider, LLMProviderName, LLMRequest, LLMResponse } from '../types';
import { getLLMModel, getLLMBaseUrl, getLLMTimeoutMs, getLLMMaxOutputTokens } from '../config';
import { LLM_ERRORS } from '../errors';

export interface OpenAICompatibleOptions {
  name: LLMProviderName;
  getApiKey: () => string | undefined;
  missingKeyMessage: string;
  defaultTemperature?: number;
  /** Prepended as a system message on every request. Nemotron uses this to toggle reasoning. */
  systemPrefix?: string;
  /** Not every OpenAI-compatible host accepts response_format. */
  supportsJsonResponseFormat?: boolean;
}

/**
 * Shared adapter for providers exposing an OpenAI-compatible /chat/completions
 * endpoint (OpenAI, DeepSeek, NVIDIA NIM).
 */
export function createOpenAICompatibleProvider(options: OpenAICompatibleOptions): LLMProvider {
  const {
    name,
    getApiKey,
    missingKeyMessage,
    defaultTemperature = 0.7,
    systemPrefix,
    supportsJsonResponseFormat = true
  } = options;

  const fail = (model: string, code: string, message: string, retryable: boolean): LLMResponse => ({
    ok: false, provider: name, model, text: '', warnings: [],
    error: { code, message, retryable }
  });

  return {
    name,
    isConfigured: () => !!getApiKey(),

    generate: async (request: LLMRequest): Promise<LLMResponse> => {
      const apiKey = getApiKey();
      if (!apiKey) {
        return fail(getLLMModel(name), LLM_ERRORS.NOT_CONFIGURED, missingKeyMessage, false);
      }

      const model = request.model || getLLMModel(name);
      const url = `${getLLMBaseUrl(name)}/chat/completions`;

      const messages = systemPrefix
        ? [{ role: 'system' as const, content: systemPrefix }, ...request.messages]
        : request.messages;

      const body: any = {
        model,
        messages,
        // ?? not || so an explicit temperature of 0 is honoured.
        temperature: request.temperature ?? defaultTemperature,
        max_tokens: request.maxOutputTokens ?? getLLMMaxOutputTokens()
      };

      if (request.responseFormat === 'json' && supportsJsonResponseFormat) {
        body.response_format = { type: 'json_object' };
      }

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), request.timeoutMs || getLLMTimeoutMs());

        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify(body),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!res.ok) {
          // 4xx are caller errors (bad key, bad model) and will not fix themselves.
          const retryable = res.status === 429 || res.status >= 500;
          return fail(model, LLM_ERRORS.FAILED, `Provider API error: ${res.status}`, retryable);
        }

        const data = await res.json();
        const text = data.choices?.[0]?.message?.content || '';

        return {
          ok: true, provider: name, model, text, warnings: [],
          usage: {
            inputTokens: data.usage?.prompt_tokens,
            outputTokens: data.usage?.completion_tokens,
            totalTokens: data.usage?.total_tokens
          }
        };

      } catch (err: any) {
        if (err.name === 'AbortError') {
          return fail(model, LLM_ERRORS.TIMEOUT, 'Request timed out', true);
        }
        return fail(model, LLM_ERRORS.FAILED, 'Network or fetch error', true);
      }
    }
  };
}
