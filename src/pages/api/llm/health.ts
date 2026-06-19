import type { APIRoute } from 'astro';
import { getLLMConfigSafe } from '../../../lib/llm/config';
import { mockProvider, geminiProvider, openaiProvider, deepseekProvider } from '../../../lib/llm/providers';

export const GET: APIRoute = async () => {
  const config = getLLMConfigSafe();
  
  const response = {
    ok: true,
    provider: config.provider,
    configured: config.configured,
    model: config.model,
    availableProviders: [
      { name: mockProvider.name, configured: mockProvider.isConfigured() },
      { name: geminiProvider.name, configured: geminiProvider.isConfigured() },
      { name: openaiProvider.name, configured: openaiProvider.isConfigured() },
      { name: deepseekProvider.name, configured: deepseekProvider.isConfigured() }
    ],
    message: "LLM provider layer is configured safely."
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
