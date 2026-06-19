import type { LLMProvider, LLMRequest, LLMResponse } from '../types';
import { getLLMModel, getLLMBaseUrl, getLLMTimeoutMs } from '../config';
import { LLM_ERRORS } from '../errors';

export const openaiProvider: LLMProvider = {
  name: 'openai',
  isConfigured: () => !!import.meta.env.OPENAI_API_KEY,
  generate: async (request: LLMRequest): Promise<LLMResponse> => {
    if (!import.meta.env.OPENAI_API_KEY) {
      return {
        ok: false, provider: 'openai', model: getLLMModel('openai'), text: '', warnings: [],
        error: { code: LLM_ERRORS.NOT_CONFIGURED, message: "OpenAI API key is missing", retryable: false }
      };
    }

    const model = request.model || getLLMModel('openai');
    const baseUrl = getLLMBaseUrl('openai');
    const url = `${baseUrl}/chat/completions`;
    
    const body: any = {
      model,
      messages: request.messages,
      temperature: request.temperature || 0.7
    };
    
    if (request.responseFormat === 'json') {
      body.response_format = { type: "json_object" };
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), request.timeoutMs || getLLMTimeoutMs());

      const res = await fetch(url, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify(body),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        return {
          ok: false, provider: 'openai', model, text: '', warnings: [],
          error: { code: LLM_ERRORS.FAILED, message: `Provider API error: ${res.status}`, retryable: true }
        };
      }

      const data = await res.json();
      const text = data.choices?.[0]?.message?.content || '';
      
      return { ok: true, provider: 'openai', model, text, warnings: [] };

    } catch (err: any) {
      if (err.name === 'AbortError') {
        return { ok: false, provider: 'openai', model, text: '', warnings: [], error: { code: LLM_ERRORS.TIMEOUT, message: "Request timed out", retryable: true } };
      }
      return { ok: false, provider: 'openai', model, text: '', warnings: [], error: { code: LLM_ERRORS.FAILED, message: "Network or fetch error", retryable: true } };
    }
  }
};
