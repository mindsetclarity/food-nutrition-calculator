import { m as mockProvider, g as geminiProvider, o as openaiProvider, d as deepseekProvider, a as getLLMConfigSafe } from './deepseek_BcfSUllc.mjs';

const GET = async () => {
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
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
