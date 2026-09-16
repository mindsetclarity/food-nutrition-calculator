import { createOpenAICompatibleProvider } from './openaiCompatible';

export const deepseekProvider = createOpenAICompatibleProvider({
  name: 'deepseek',
  getApiKey: () => import.meta.env.DEEPSEEK_API_KEY,
  missingKeyMessage: 'DeepSeek API key is missing'
});
