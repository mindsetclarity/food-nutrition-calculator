import { createOpenAICompatibleProvider } from './openaiCompatible';

/**
 * NVIDIA NIM (Nemotron). Two behaviours differ from the other OpenAI-compatible hosts:
 *
 * 1. Reasoning is toggled by a system message, not a parameter. We send
 *    "detailed thinking off" so the model answers directly - reasoning traces
 *    arrive as <think> blocks that corrupt structured output.
 * 2. Thinking-off pairs with temperature 0, which is what we want for parsing
 *    food and recipe text deterministically.
 *
 * response_format is left off because NIM support varies per hosted model;
 * safeParseJSON already extracts JSON from surrounding prose.
 */
export const nemotronProvider = createOpenAICompatibleProvider({
  name: 'nemotron',
  getApiKey: () => import.meta.env.NVIDIA_API_KEY,
  missingKeyMessage: 'NVIDIA API key is missing',
  defaultTemperature: 0,
  systemPrefix: 'detailed thinking off',
  supportsJsonResponseFormat: false
});
