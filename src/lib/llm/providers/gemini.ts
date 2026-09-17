import type { LLMProvider, LLMRequest, LLMResponse } from '../types';
import { getLLMModel, getLLMBaseUrl, getLLMTimeoutMs } from '../config';
import { LLM_ERRORS } from '../errors';

export const geminiProvider: LLMProvider = {
  name: 'gemini',
  isConfigured: () => !!import.meta.env.GEMINI_API_KEY,
  generate: async (request: LLMRequest): Promise<LLMResponse> => {
    if (!import.meta.env.GEMINI_API_KEY) {
      return {
        ok: false, provider: 'gemini', model: getLLMModel('gemini'), text: '', warnings: [],
        error: { code: LLM_ERRORS.NOT_CONFIGURED, message: "Gemini API key is missing", retryable: false }
      };
    }

    const model = request.model || getLLMModel('gemini');
    const baseUrl = getLLMBaseUrl('gemini');
    const url = `${baseUrl}/models/${model}:generateContent?key=${import.meta.env.GEMINI_API_KEY}`;
    
    const systemMessage = request.messages.find(m => m.role === 'system');
    const userMessages = request.messages.filter(m => m.role !== 'system').map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const body: any = { contents: userMessages };
    if (systemMessage) {
      body.systemInstruction = { parts: [{ text: systemMessage.content }] };
    }
    
    if (request.responseFormat === 'json') {
      body.generationConfig = { responseMimeType: "application/json" };
    }

    // Timer spans the body read as well as the headers (see openaiCompatible.ts).
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), request.timeoutMs || getLLMTimeoutMs());

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal
      });

      if (!res.ok) {
        return {
          ok: false, provider: 'gemini', model, text: '', warnings: [],
          error: { code: LLM_ERRORS.FAILED, message: `Provider API error: ${res.status}`, retryable: true }
        };
      }

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const finishReason = data.candidates?.[0]?.finishReason;
      
      const warnings = [];
      if (finishReason === 'SAFETY') warnings.push('Response was blocked due to safety settings.');
      
      return { ok: true, provider: 'gemini', model, text, warnings };

    } catch (err: any) {
      if (err.name === 'AbortError') {
        return { ok: false, provider: 'gemini', model, text: '', warnings: [], error: { code: LLM_ERRORS.TIMEOUT, message: "Request timed out", retryable: true } };
      }
      return { ok: false, provider: 'gemini', model, text: '', warnings: [], error: { code: LLM_ERRORS.FAILED, message: "Network or fetch error", retryable: true } };
    } finally {
      clearTimeout(timeoutId);
    }
  }
};
