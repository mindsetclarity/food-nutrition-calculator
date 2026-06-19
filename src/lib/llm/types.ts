export type LLMProviderName = "mock" | "gemini" | "openai" | "deepseek";

export type LLMTask = "meal_parse" | "recipe_parse" | "food_query_suggestions" | "generic";

export interface LLMMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface LLMRequest {
  task: LLMTask;
  messages: LLMMessage[];
  model?: string;
  temperature?: number;
  maxOutputTokens?: number;
  responseFormat?: "text" | "json";
  timeoutMs?: number;
}

export interface LLMResponse {
  ok: boolean;
  provider: LLMProviderName;
  model: string;
  text: string;
  json?: unknown;
  usage?: {
    inputTokens?: number;
    outputTokens?: number;
    totalTokens?: number;
  };
  warnings: string[];
  error?: {
    code: string;
    message: string;
    retryable: boolean;
  };
}

export interface LLMProvider {
  name: LLMProviderName;
  isConfigured(): boolean;
  generate(request: LLMRequest): Promise<LLMResponse>;
}
