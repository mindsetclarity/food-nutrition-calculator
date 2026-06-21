import type { EngineWarning } from './warnings';

export type SourceProvider = "usda" | "local" | "curated" | "llm_parse" | "estimated" | "unknown";

export type SourceQuality = "primary" | "fallback" | "estimated" | "partial" | "unknown";

export interface SourceSummary {
  primarySource: SourceProvider;
  sourcesUsed: SourceProvider[];
  hasUsda: boolean;
  hasLocal: boolean;
  hasEstimated: boolean;
  hasLlmParsed: boolean;
  hasPartialData: boolean;
  labels: string[];
  warnings: EngineWarning[];
}

export interface SourceAttribution {
  source: SourceProvider;
  label: string;
  quality: SourceQuality;
  description?: string;
  isEstimated?: boolean;
  isPrimary?: boolean;
  isFallback?: boolean;
}

export const SourceRule = {
  USDA_LOCAL_TRUTH: "USDA/local data can provide nutrition values.",
  LLM_PARSE_EXPLANATION: "LLM parse source can only explain parsing assistance.",
  LLM_NO_VERIFIED_NUTRITION: "LLM parse source must never mark nutrition values as verified."
};
