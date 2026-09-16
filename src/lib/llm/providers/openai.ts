import { createOpenAICompatibleProvider } from './openaiCompatible';

export const openaiProvider = createOpenAICompatibleProvider({
  name: 'openai',
  getApiKey: () => import.meta.env.OPENAI_API_KEY,
  missingKeyMessage: 'OpenAI API key is missing'
});
