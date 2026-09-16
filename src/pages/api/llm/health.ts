import type { APIRoute } from 'astro';
import { getLLMConfigSafe } from '../../../lib/llm/config';
import { allProviders } from '../../../lib/llm/client';

export const GET: APIRoute = async () => {
  const config = getLLMConfigSafe();

  const response = {
    ok: true,
    provider: config.provider,
    configured: config.configured,
    model: config.model,
    availableProviders: allProviders.map((p) => ({
      name: p.name,
      configured: p.isConfigured()
    })),
    message: "LLM provider layer is configured safely."
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
