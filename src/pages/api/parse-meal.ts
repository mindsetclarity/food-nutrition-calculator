import type { APIRoute } from 'astro';
import { validateParseMealRequest } from '../../lib/meal-parser/validation';
import { basicFallbackParse } from '../../lib/meal-parser/basicParser';
import { normalizeParsedMeal } from '../../lib/meal-parser/normalizeParsedMeal';
import { inputLimits } from '../../lib/safety/inputLimits';
import { generateJSONWithLLM } from '../../lib/llm/client';
import { buildMealParseSystemPrompt, buildMealParseUserPrompt } from '../../lib/llm/prompts';
import type { ParseMealApiResponse } from '../../lib/meal-parser/types';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const validation = validateParseMealRequest(body);

    if (!validation.isValid || !validation.sanitizedText) {
      const errRes: ParseMealApiResponse = {
        ok: false,
        provider: "none",
        model: null,
        input: { textLength: 0, mode: "meal" },
        parsed: { items: [], overallConfidence: 0, needsClarification: true, clarifyingQuestions: [], warnings: [] },
        warnings: [],
        message: validation.error || "Invalid request."
      };
      return new Response(JSON.stringify(errRes), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    if (validation.sanitizedText.length > inputLimits.parseMealMaxChars) {
      const errRes: ParseMealApiResponse = {
        ok: false,
        provider: "none",
        model: null,
        input: { textLength: validation.sanitizedText.length, mode: "meal" },
        parsed: { items: [], overallConfidence: 0, needsClarification: true, clarifyingQuestions: [], warnings: [] },
        warnings: [],
        message: `Input is too long. Please limit to ${inputLimits.parseMealMaxChars} characters.`
      };
      return new Response(JSON.stringify(errRes), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const mode = body.mode === 'recipe' ? 'recipe' : 'meal';

    const llmRequest = {
      task: "meal_parse" as const,
      messages: [
        { role: "system" as const, content: buildMealParseSystemPrompt() },
        { role: "user" as const, content: buildMealParseUserPrompt(validation.sanitizedText) }
      ],
      responseFormat: "json" as const
    };

    const llmRes = await generateJSONWithLLM(llmRequest);
    
    let parsedData: any = null;
    let providerName = llmRes.provider;
    let modelName = llmRes.model;
    let warnings = [...llmRes.warnings];

    // The mock is the default when LLM_PROVIDER is unset, and its output is a
    // placeholder rather than a parse of the user's text - use the deterministic
    // parser instead of showing "mock food".
    if (llmRes.ok && llmRes.json && llmRes.provider !== 'mock') {
      parsedData = normalizeParsedMeal(llmRes.json);
    } else {
      providerName = "basic";
      warnings.push("LLM unavailable or failed to parse. Using basic fallback.");
      parsedData = basicFallbackParse(validation.sanitizedText);
    }

    const response: ParseMealApiResponse = {
      ok: true,
      provider: providerName,
      model: modelName,
      input: {
        textLength: validation.sanitizedText.length,
        mode
      },
      parsed: parsedData,
      warnings,
      message: null
    };

    return new Response(JSON.stringify(response), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error: any) {
    console.error("Parse Meal API Error:", error);
    const errRes: ParseMealApiResponse = {
      ok: false,
      provider: "none",
      model: null,
      input: { textLength: 0, mode: "meal" },
      parsed: { items: [], overallConfidence: 0, needsClarification: true, clarifyingQuestions: [], warnings: [] },
      warnings: [],
      message: "An internal server error occurred while parsing."
    };
    return new Response(JSON.stringify(errRes), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
