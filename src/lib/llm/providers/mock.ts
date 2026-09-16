import type { LLMProvider, LLMRequest, LLMResponse } from '../types';

export const mockProvider: LLMProvider = {
  name: 'mock',
  isConfigured: () => true,
  generate: async (request: LLMRequest): Promise<LLMResponse> => {
    // Delay slightly to simulate network
    await new Promise(r => setTimeout(r, 300));
    
    let text = "Mock response.";
    
    if (request.task === 'meal_parse') {
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
      provider: 'mock',
      model: 'mock-food-parser',
      text,
      warnings: ["Mock LLM provider is active. No real model was called."]
    };
  }
};
