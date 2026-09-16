import { i as inputLimits } from './inputLimits_CEbVSqQy.mjs';
import { m as mockProvider, g as geminiProvider, o as openaiProvider, d as deepseekProvider, b as getLLMProviderName } from './deepseek_BcfSUllc.mjs';

const NUTRITION_TRUTH_BOUNDARY = `
LLM output is advisory parsing assistance only. It must not be treated as verified nutrition data. USDA FoodData Central remains the primary nutrition source. The local database is fallback. The deterministic nutrition engine owns calories, macros, and totals.
`;
function sanitizeUserMealText(input) {
  return input.trim().substring(0, 1e3);
}
function createNutritionTruthBoundarySystemPrompt() {
  return `
SAFETY BOUNDARY:
${NUTRITION_TRUTH_BOUNDARY}

Do not invent final nutrition values.
Express uncertainty where appropriate.
Never claim medical accuracy.
Focus on extracting food names, portions, preparation clues, and suggesting USDA search queries.
`;
}

function validateParseMealRequest(body) {
  if (!body || typeof body !== "object") {
    return { isValid: false, error: "Invalid request body." };
  }
  if (typeof body.text !== "string") {
    return { isValid: false, error: "Enter a meal description to parse." };
  }
  const text = body.text.trim();
  if (text.length < 2) {
    return { isValid: false, error: "Enter a meal description to parse." };
  }
  if (text.length > 1500) {
    return { isValid: false, error: "Meal description is too long. Try a shorter description." };
  }
  const sanitizedText = sanitizeUserMealText(text);
  return { isValid: true, sanitizedText };
}

function basicFallbackParse(text) {
  const items = [];
  const rawSegments = text.split(/,|\band\b|\n/i).map((s) => s.trim()).filter((s) => s.length > 1);
  for (let i = 0; i < rawSegments.length; i++) {
    const segment = rawSegments[i];
    let quantity = 1;
    let unit = "serving";
    let foodName = segment;
    const match = segment.match(/^([\d.]+)\s*([a-zA-Z]+)?\s+(.*)/);
    if (match) {
      const q = parseFloat(match[1]);
      if (!isNaN(q)) {
        quantity = q;
        if (match[2]) {
          const possibleUnit = match[2].toLowerCase();
          const knownUnits = ["g", "gram", "grams", "oz", "ounce", "ounces", "lb", "pound", "pounds", "cup", "cups", "tbsp", "tablespoon", "tablespoons", "tsp", "teaspoon", "teaspoons", "serving", "servings", "slice", "slices", "piece", "pieces", "scoop", "scoops"];
          if (knownUnits.includes(possibleUnit)) {
            unit = possibleUnit;
            foodName = match[3];
          } else {
            unit = "piece";
            foodName = match[2] + " " + match[3];
          }
        } else {
          foodName = match[3];
          unit = "piece";
        }
      }
    }
    items.push({
      id: `fallback-${Date.now()}-${i}`,
      rawText: segment,
      foodName: foodName.trim(),
      quantity,
      unit,
      preparation: null,
      usdaSearchQuery: foodName.trim(),
      confidence: 0.5,
      needsReview: true,
      notes: [],
      warnings: ["Parsed with basic fallback. Please review."]
    });
  }
  return {
    items,
    overallConfidence: 0.5,
    needsClarification: false,
    clarifyingQuestions: [],
    warnings: ["Using basic parser fallback. Review the results before adding."]
  };
}

function normalizeParsedMeal(data) {
  const response = {
    items: [],
    overallConfidence: 0,
    needsClarification: false,
    clarifyingQuestions: [],
    warnings: []
  };
  if (!data || typeof data !== "object") {
    response.warnings.push("Invalid parsed data structure.");
    return response;
  }
  response.overallConfidence = typeof data.overallConfidence === "number" ? Math.max(0, Math.min(1, data.overallConfidence)) : 0.8;
  response.needsClarification = !!data.needsClarification;
  if (Array.isArray(data.clarifyingQuestions)) {
    response.clarifyingQuestions = data.clarifyingQuestions.map(String);
  }
  if (Array.isArray(data.warnings)) {
    response.warnings = data.warnings.map(String);
  }
  if (Array.isArray(data.items)) {
    data.items.forEach((item, index) => {
      if (index >= 12) return;
      let qty = typeof item.quantity === "number" ? item.quantity : parseFloat(item.quantity);
      if (isNaN(qty) || qty <= 0) qty = null;
      const foodName = item.foodName ? String(item.foodName).trim() : "";
      const needsReview = !!item.needsReview || qty === null || !item.unit || !foodName;
      const normalizedItem = {
        id: `parsed-${Date.now()}-${index}`,
        rawText: item.rawText ? String(item.rawText) : foodName,
        foodName,
        quantity: qty,
        unit: item.unit ? String(item.unit).toLowerCase() : null,
        preparation: item.preparation ? String(item.preparation) : null,
        usdaSearchQuery: item.usdaSearchQuery ? String(item.usdaSearchQuery) : foodName,
        confidence: typeof item.confidence === "number" ? Math.max(0, Math.min(1, item.confidence)) : 0.8,
        needsReview,
        notes: Array.isArray(item.notes) ? item.notes.map(String) : [],
        warnings: Array.isArray(item.warnings) ? item.warnings.map(String) : []
      };
      if (!normalizedItem.foodName) {
        normalizedItem.warnings.push("Food name missing. Please edit.");
      }
      response.items.push(normalizedItem);
    });
    if (data.items.length > 12) {
      response.warnings.push(`Limited to 12 items. Dropped ${data.items.length - 12} items.`);
    }
  } else {
    response.warnings.push("No items array found in parsed response.");
  }
  return response;
}

function extractJSONFromText(text) {
  if (!text) return "";
  const jsonStart = text.indexOf("{");
  const jsonArrayStart = text.indexOf("[");
  const start = jsonStart !== -1 && (jsonArrayStart === -1 || jsonStart < jsonArrayStart) ? jsonStart : jsonArrayStart;
  if (start === -1) return "";
  const jsonEnd = text.lastIndexOf("}");
  const jsonArrayEnd = text.lastIndexOf("]");
  const end = jsonEnd !== -1 && (jsonArrayEnd === -1 || jsonEnd > jsonArrayEnd) ? jsonEnd : jsonArrayEnd;
  if (end === -1 || end < start) return "";
  return text.substring(start, end + 1);
}
function tryRepairCommonJSONIssues(text) {
  return text.replace(/,\s*([}\]])/g, "$1");
}
function safeParseJSON(text) {
  try {
    const extracted = extractJSONFromText(text);
    if (!extracted) return { error: "No JSON found in text" };
    return { data: JSON.parse(extracted) };
  } catch (e) {
    try {
      const repaired = tryRepairCommonJSONIssues(extractJSONFromText(text));
      return { data: JSON.parse(repaired) };
    } catch (e2) {
      return { error: `JSON parse failed: ${e2.message}` };
    }
  }
}

function getLLMProvider() {
  const providerName = getLLMProviderName();
  if (providerName === "gemini") return geminiProvider;
  if (providerName === "openai") return openaiProvider;
  if (providerName === "deepseek") return deepseekProvider;
  return mockProvider;
}
async function generateWithLLM(request) {
  const provider = getLLMProvider();
  if (!provider.isConfigured()) {
    const res = await mockProvider.generate(request);
    res.warnings.push(`Provider ${provider.name} is not configured. Falling back to mock.`);
    return res;
  }
  return provider.generate(request);
}
async function generateJSONWithLLM(request) {
  const req = { ...request, responseFormat: "json" };
  const res = await generateWithLLM(req);
  if (res.ok && res.text) {
    const parseResult = safeParseJSON(res.text);
    if (parseResult.data) {
      res.json = parseResult.data;
    } else {
      res.warnings.push(`JSON parse failed: ${parseResult.error}`);
    }
  }
  return res;
}

function buildMealParseSystemPrompt() {
  return `
You are a meal parsing assistant. Your task is to extract structured information from natural language descriptions of meals.
Return structured JSON only.
Identify candidate foods.
Identify quantities and units when present.
Identify preparation clues.
Suggest USDA search queries.
Do not calculate final nutrition.
Do not invent calories or macros.
Mark uncertainty. Ask for clarification only when necessary.
Respect the USDA-first hierarchy.

${createNutritionTruthBoundarySystemPrompt()}
  `.trim();
}
function buildMealParseUserPrompt(input) {
  return `Parse the following meal description into structured JSON:

${input}`;
}

const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const validation = validateParseMealRequest(body);
    if (!validation.isValid || !validation.sanitizedText) {
      const errRes = {
        ok: false,
        provider: "none",
        model: null,
        input: { textLength: 0, mode: "meal" },
        parsed: { items: [], overallConfidence: 0, needsClarification: true, clarifyingQuestions: [], warnings: [] },
        warnings: [],
        message: validation.error || "Invalid request."
      };
      return new Response(JSON.stringify(errRes), { status: 400, headers: { "Content-Type": "application/json" } });
    }
    if (validation.sanitizedText.length > inputLimits.parseMealMaxChars) {
      const errRes = {
        ok: false,
        provider: "none",
        model: null,
        input: { textLength: validation.sanitizedText.length, mode: "meal" },
        parsed: { items: [], overallConfidence: 0, needsClarification: true, clarifyingQuestions: [], warnings: [] },
        warnings: [],
        message: `Input is too long. Please limit to ${inputLimits.parseMealMaxChars} characters.`
      };
      return new Response(JSON.stringify(errRes), { status: 400, headers: { "Content-Type": "application/json" } });
    }
    const mode = body.mode === "recipe" ? "recipe" : "meal";
    const llmRequest = {
      task: "meal_parse",
      messages: [
        { role: "system", content: buildMealParseSystemPrompt() },
        { role: "user", content: buildMealParseUserPrompt(validation.sanitizedText) }
      ],
      responseFormat: "json"
    };
    const llmRes = await generateJSONWithLLM(llmRequest);
    let parsedData = null;
    let providerName = llmRes.provider;
    let modelName = llmRes.model;
    let warnings = [...llmRes.warnings];
    if (llmRes.ok && llmRes.json) {
      parsedData = normalizeParsedMeal(llmRes.json);
    } else {
      providerName = "basic";
      warnings.push("LLM unavailable or failed to parse. Using basic fallback.");
      parsedData = basicFallbackParse(validation.sanitizedText);
    }
    const response = {
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
    return new Response(JSON.stringify(response), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Parse Meal API Error:", error);
    const errRes = {
      ok: false,
      provider: "none",
      model: null,
      input: { textLength: 0, mode: "meal" },
      parsed: { items: [], overallConfidence: 0, needsClarification: true, clarifyingQuestions: [], warnings: [] },
      warnings: [],
      message: "An internal server error occurred while parsing."
    };
    return new Response(JSON.stringify(errRes), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
