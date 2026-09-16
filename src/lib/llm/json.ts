export function extractJSONFromText(text: string): string {
  if (!text) return '';
  const jsonStart = text.indexOf('{');
  const jsonArrayStart = text.indexOf('[');
  const start = jsonStart !== -1 && (jsonArrayStart === -1 || jsonStart < jsonArrayStart) ? jsonStart : jsonArrayStart;
  if (start === -1) return '';
  
  const jsonEnd = text.lastIndexOf('}');
  const jsonArrayEnd = text.lastIndexOf(']');
  const end = jsonEnd !== -1 && (jsonArrayEnd === -1 || jsonEnd > jsonArrayEnd) ? jsonEnd : jsonArrayEnd;
  
  if (end === -1 || end < start) return '';
  
  return text.substring(start, end + 1);
}

export function tryRepairCommonJSONIssues(text: string): string {
  return text.replace(/,\s*([}\]])/g, '$1');
}

export function safeParseJSON(text: string): { data?: unknown; error?: string } {
  try {
    const extracted = extractJSONFromText(text);
    if (!extracted) return { error: "No JSON found in text" };
    return { data: JSON.parse(extracted) };
  } catch (e) {
    try {
      const repaired = tryRepairCommonJSONIssues(extractJSONFromText(text));
      return { data: JSON.parse(repaired) };
    } catch (e2: any) {
      return { error: `JSON parse failed: ${e2.message}` };
    }
  }
}

export function ensureObject(value: unknown): Record<string, unknown> {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {};
}

export function ensureArray(value: unknown): unknown[] {
  if (Array.isArray(value)) {
    return value;
  }
  return [];
}

export function parseLLMJsonResponse(response: { text: string }): { data?: unknown, error?: string } {
  return safeParseJSON(response.text);
}
