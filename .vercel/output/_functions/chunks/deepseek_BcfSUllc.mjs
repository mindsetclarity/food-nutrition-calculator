function getLLMProviderName() {
  const provider = "gemini"?.toLowerCase();
  if (provider === "gemini") return "gemini";
  if (provider === "openai") return "openai";
  if (provider === "deepseek") return "deepseek";
  return "mock";
}
function getLLMModel(provider) {
  const p = provider || getLLMProviderName();
  if (p === "gemini") return "gemini-2.5-flash";
  if (p === "openai") return "gpt-4o-mini";
  if (p === "deepseek") return "deepseek-chat";
  return "gemini-2.5-flash";
}
function getLLMTimeoutMs() {
  return Number(undefined                              ) || 2e4;
}
function isLLMConfigured(provider) {
  const p = provider || getLLMProviderName();
  if (p === "mock") return true;
  if (p === "gemini") return false;
  if (p === "openai") return false;
  if (p === "deepseek") return false                                ;
  return false;
}
function getLLMConfigSafe() {
  const provider = getLLMProviderName();
  return {
    provider,
    configured: isLLMConfigured(provider),
    model: getLLMModel(provider),
    timeoutMs: getLLMTimeoutMs()
  };
}

const mockProvider = {
  name: "mock",
  isConfigured: () => true,
  generate: async (request) => {
    await new Promise((r) => setTimeout(r, 300));
    let text = "Mock response.";
    if (request.task === "meal_parse") {
      text = JSON.stringify({
        items: [
          {
            rawText: "mock item",
            foodName: "mock food",
            quantity: 1,
            unit: "serving",
            preparation: "raw",
            usdaSearchQuery: "mock food",
            confidence: 0.9,
            notes: []
          }
        ],
        overallConfidence: 0.9,
        needsClarification: false,
        clarifyingQuestions: [],
        warnings: ["Mock LLM provider is active. No real model was called."]
      });
    }
    return {
      ok: true,
      provider: "mock",
      model: "mock-food-parser",
      text,
      warnings: ["Mock LLM provider is active. No real model was called."]
    };
  }
};

const LLM_ERRORS = {
  NOT_CONFIGURED: "LLM_PROVIDER_NOT_CONFIGURED"};

const geminiProvider = {
  name: "gemini",
  isConfigured: () => false,
  generate: async (request) => {
    {
      return {
        ok: false,
        provider: "gemini",
        model: getLLMModel("gemini"),
        text: "",
        warnings: [],
        error: { code: LLM_ERRORS.NOT_CONFIGURED, message: "Gemini API key is missing", retryable: false }
      };
    }
  }
};

const openaiProvider = {
  name: "openai",
  isConfigured: () => false,
  generate: async (request) => {
    {
      return {
        ok: false,
        provider: "openai",
        model: getLLMModel("openai"),
        text: "",
        warnings: [],
        error: { code: LLM_ERRORS.NOT_CONFIGURED, message: "OpenAI API key is missing", retryable: false }
      };
    }
  }
};

const deepseekProvider = {
  name: "deepseek",
  isConfigured: () => false                                ,
  generate: async (request) => {
    {
      return {
        ok: false,
        provider: "deepseek",
        model: getLLMModel("deepseek"),
        text: "",
        warnings: [],
        error: { code: LLM_ERRORS.NOT_CONFIGURED, message: "DeepSeek API key is missing", retryable: false }
      };
    }
  }
};

export { getLLMConfigSafe as a, getLLMProviderName as b, deepseekProvider as d, geminiProvider as g, mockProvider as m, openaiProvider as o };
