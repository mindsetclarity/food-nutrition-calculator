export interface ParsedMealItem {
  id: string;
  rawText: string;
  foodName: string;
  quantity: number | null;
  unit: string | null;
  preparation: string | null;
  usdaSearchQuery: string;
  confidence: number;
  needsReview: boolean;
  notes: string[];
  warnings: string[];
}

export interface ParsedMealResponse {
  items: ParsedMealItem[];
  overallConfidence: number;
  needsClarification: boolean;
  clarifyingQuestions: string[];
  warnings: string[];
}

export interface ParseMealApiRequest {
  text: string;
  mode?: "meal";
  maxItems?: number;
}

export interface ParseMealApiResponse {
  ok: boolean;
  provider: string;
  model: string | null;
  input: {
    textLength: number;
    mode: string;
  };
  parsed: ParsedMealResponse;
  warnings: string[];
  message: string | null;
}
