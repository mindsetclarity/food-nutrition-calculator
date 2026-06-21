import type { LLMParseInput, LLMValidatedParseOutput } from './llmTypes';
import { buildLLMParsingPrompt } from './llmPrompt';
import { validateLLMParseOutput } from './llmSchema';
import { enforceLLMNutritionBoundary, redactSensitiveProviderError } from './llmSafety';
import { isTextSafeForLLMParsing, sanitizeLLMInputText, clampLLMMaxItems, shouldUseLLMParser } from './llmGuards';
import { createWarning } from '../warnings';
import type { EngineResult } from '../index';
import { createRequestDeduper, MemoryCache } from '../performance';

const llmParserDeduper = createRequestDeduper<EngineResult<LLMValidatedParseOutput>>();

// A minimal safe mock provider adapter. 
// In a real implementation with LangChain/Vercel AI, this would wrap them.
async function callProviderAdapter(prompt: string, text: string, timeoutMs: number): Promise<any> {
  const provider = process.env.LLM_PROVIDER || 'mock';
  
  if (provider === 'mock') {
    // Return a structured JSON mock to verify the schema validation
    return {
      items: [
        {
          originalText: text,
          foodName: text,
          quantity: 1,
          confidence: "medium",
          needsReview: true
        }
      ]
    };
  }

  // If there was a real provider setup, it would go here and respect timeoutMs.
  // For safety, if not 'mock', we throw to force fallback.
  throw new Error("No configured LLM provider found.");
}

export async function parseFoodTextWithLLM(input: LLMParseInput): Promise<EngineResult<LLMValidatedParseOutput>> {
  try {
    if (!shouldUseLLMParser(input)) {
      const fallback = createLLMFallbackResult(input, "LLM disabled or not allowed for mode");
      return { ok: true, data: fallback, warnings: fallback.warnings, confidence: fallback.confidence };
    }

    if (!isTextSafeForLLMParsing(input.text)) {
      const fallback = createLLMFallbackResult(input, "Text unsafe or empty");
      return { ok: true, data: fallback, warnings: fallback.warnings, confidence: fallback.confidence };
    }

    const safeText = sanitizeLLMInputText(input.text);
    const maxItems = clampLLMMaxItems(input.maxItems);
    const prompt = buildLLMParsingPrompt(input.mode);
    const isMeal = input.mode === "meal";

    const dedupeKey = MemoryCache.makeCacheKey([safeText, input.mode, maxItems]);

    return llmParserDeduper.dedupeRequest(dedupeKey, async () => {
      let rawResponse: any;
      try {
        // 10s safe timeout
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("LLM_TIMEOUT")), 10000));
        rawResponse = await Promise.race([
          callProviderAdapter(prompt, safeText, 10000),
          timeoutPromise
        ]);
      } catch (err: any) {
        const safeErrorMsg = redactSensitiveProviderError(err);
        const fallback = createLLMFallbackResult(input, safeErrorMsg);
        // We return OK but with fallback data, because parser shouldn't crash the engine
        return { ok: true, data: fallback, warnings: fallback.warnings, confidence: fallback.confidence };
      }

      // Attempt to parse JSON if string
      let parsedObj = rawResponse;
      if (typeof rawResponse === 'string') {
        try {
          const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
          const jsonStr = jsonMatch ? jsonMatch[0] : rawResponse;
          parsedObj = JSON.parse(jsonStr);
        } catch (e) {
          const fallback = createLLMFallbackResult(input, "LLM_BAD_JSON");
          fallback.warnings.push(createWarning("LLM_BAD_JSON" as any, "AI returned unclear parsing, so please review these ingredients.", "warning"));
          return { ok: true, data: fallback, warnings: fallback.warnings, confidence: fallback.confidence };
        }
      }

      const { safeOutput, warnings: safetyWarnings } = enforceLLMNutritionBoundary(parsedObj);
      const validatedOutput = validateLLMParseOutput(safeOutput, isMeal, maxItems);

      validatedOutput.warnings.push(...safetyWarnings);

      return {
        ok: true,
        data: validatedOutput,
        warnings: validatedOutput.warnings,
        confidence: validatedOutput.confidence
      };
    });

  } catch (error: any) {
    const fallback = createLLMFallbackResult(input, "LLM_PARSE_FAILED");
    return { ok: true, data: fallback, warnings: fallback.warnings, confidence: fallback.confidence };
  }
}
