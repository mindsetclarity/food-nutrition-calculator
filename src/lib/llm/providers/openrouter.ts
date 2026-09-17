import { createOpenAICompatibleProvider } from './openaiCompatible';

/**
 * OpenRouter, defaulting to NVIDIA Nemotron 3 Super on the free route (OPENROUTER_MODEL
 * overrides). Free Ultra was failing upstream when tested; free Lightning took 35-40s.
 *
 * Nemotron 3 is a reasoning model. Meal and recipe parsing is extraction, not
 * a problem that benefits from thinking, so reasoning is switched off through
 * OpenRouter's unified `reasoning` field: answers come back faster and without
 * paying for reasoning tokens. (The older Llama-Nemotron models used a
 * "detailed thinking off" system prompt instead; that is the NIM provider.)
 *
 * Temperature 0 because parsing the same text should give the same foods.
 */
export const openrouterProvider = createOpenAICompatibleProvider({
  name: 'openrouter',
  getApiKey: () => import.meta.env.OPENROUTER_API_KEY,
  missingKeyMessage: 'OpenRouter API key is missing',
  defaultTemperature: 0,
  extraBody: { reasoning: { enabled: false } }
});
