import type { ParsedMealItem, ParsedMealResponse } from './types';

export function basicFallbackParse(text: string): ParsedMealResponse {
  const items: ParsedMealItem[] = [];
  
  const rawSegments = text.split(/,|\band\b|\n/i).map(s => s.trim()).filter(s => s.length > 1);

  for (let i = 0; i < rawSegments.length; i++) {
    const segment = rawSegments[i];
    
    let quantity: number | null = 1;
    let unit: string | null = 'serving';
    let foodName = segment;
    
    const match = segment.match(/^([\d.]+)\s*([a-zA-Z]+)?\s+(.*)/);
    if (match) {
      const q = parseFloat(match[1]);
      if (!isNaN(q)) {
        quantity = q;
        if (match[2]) {
          const possibleUnit = match[2].toLowerCase();
          const knownUnits = ['g', 'gram', 'grams', 'oz', 'ounce', 'ounces', 'lb', 'pound', 'pounds', 'cup', 'cups', 'tbsp', 'tablespoon', 'tablespoons', 'tsp', 'teaspoon', 'teaspoons', 'serving', 'servings', 'slice', 'slices', 'piece', 'pieces', 'scoop', 'scoops'];
          if (knownUnits.includes(possibleUnit)) {
            unit = possibleUnit;
            foodName = match[3];
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
