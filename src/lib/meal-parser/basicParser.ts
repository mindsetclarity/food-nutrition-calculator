import type { ParsedMealItem, ParsedMealResponse } from './types';

const WORD_QUANTITIES: Record<string, number> = {
  a: 1, an: 1, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, half: 0.5
};

/** "2", "1.5", ".5" or "1/2". */
function parseQuantity(raw: string): number {
  const [num, den] = raw.split('/');
  return den === undefined ? parseFloat(num) : parseFloat(num) / parseFloat(den);
}

export function basicFallbackParse(text: string): ParsedMealResponse {
  const items: ParsedMealItem[] = [];
  
  const rawSegments = text.split(/,|\band\b|\n/i).map(s => s.trim()).filter(s => s.length > 1);

  for (let i = 0; i < rawSegments.length; i++) {
    const segment = rawSegments[i];

    // "a banana", "two eggs", "half a cup of rice" -> numeric form, so the
    // article or number word neither ends up in the food name nor in the USDA
    // search query built from it.
    let text = segment;
    const wordQty = text.match(/^(a|an|one|two|three|four|five|six|half)\s+(?:a\s+)?(.+)/i);
    if (wordQty) text = `${WORD_QUANTITIES[wordQty[1].toLowerCase()]} ${wordQty[2]}`;

    let quantity: number | null = 1;
    let unit: string | null = 'serving';
    let foodName = text;

    const match = text.match(/^(\d+\/\d+|\d*\.?\d+)\s*([a-zA-Z]+)?\s+(.*)/);
    if (match) {
      const q = parseQuantity(match[1]);
      if (Number.isFinite(q) && q > 0) { // rejects "1/0" and "0"
        quantity = q;
        if (match[2]) {
          const possibleUnit = match[2].toLowerCase();
          const knownUnits = ['g', 'gram', 'grams', 'oz', 'ounce', 'ounces', 'lb', 'pound', 'pounds', 'cup', 'cups', 'tbsp', 'tablespoon', 'tablespoons', 'tsp', 'teaspoon', 'teaspoons', 'serving', 'servings', 'slice', 'slices', 'piece', 'pieces', 'scoop', 'scoops'];
          if (knownUnits.includes(possibleUnit)) {
            unit = possibleUnit;
            foodName = match[3].replace(/^of\s+/i, ''); // "1 slice of toast"
          } else {
            unit = 'piece'; 
            foodName = match[2] + ' ' + match[3];
          }
        } else {
          foodName = match[3];
          unit = 'piece';
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
