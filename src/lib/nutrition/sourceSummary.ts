import type { CalculatedFoodItem, SourceSummary } from './types';

export function createSourceSummary(items: CalculatedFoodItem[]): SourceSummary {
  const summary: SourceSummary = {
    usda: 0,
    local: 0,
    llmEstimate: 0,
    unknown: 0,
    total: items.length,
    label: "",
    hasEstimates: false,
    hasLLMEstimates: false,
    warnings: []
  };

  for (const item of items) {
    if (item.source === 'usda') {
      summary.usda++;
    } else if (item.source === 'local') {
      summary.local++;
      summary.hasEstimates = true;
    } else if (item.source === 'llm_estimate') {
      summary.llmEstimate++;
      summary.hasEstimates = true;
      summary.hasLLMEstimates = true;
    } else {
      summary.unknown++;
      summary.hasEstimates = true;
    }
  }

  const parts = [];
  if (summary.usda > 0) parts.push(`${summary.usda} USDA`);
  if (summary.local > 0) parts.push(`${summary.local} local database`);
  if (summary.llmEstimate > 0) parts.push(`${summary.llmEstimate} AI estimated`);
  if (summary.unknown > 0) parts.push(`${summary.unknown} unknown source`);

  summary.label = parts.length > 0 ? parts.join(', ') : "No data sources";

  if (summary.local > 0) {
    summary.warnings.push("Contains fallback data from local database.");
  }
  if (summary.llmEstimate > 0) {
    summary.warnings.push("Contains AI-estimated nutrition. Not verified by USDA.");
  }
  if (summary.unknown > 0) {
    summary.warnings.push("Contains data from an unknown source.");
  }

  return summary;
}
