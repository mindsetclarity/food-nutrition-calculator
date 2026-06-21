import { IngredientLine } from './recipeTypes';

export function normalizeIngredientWhitespace(line: string): string {
  return line.replace(/\s+/g, ' ').trim();
}

export function removeRecipeStepPunctuation(line: string): string {
  // Remove leading bullets or dashes or numbers
  let cleaned = line.replace(/^[\*\-\•\>]+\s*/, '');
  cleaned = cleaned.replace(/^\d+\.\s*/, '');
  return cleaned;
}

export function normalizeIngredientFractions(line: string): string {
  // Convert standard fractions like 1/2 to something parser can read or keep as is if parser handles it.
  // Phase 5 parser handles 1/2, 1 1/2 etc. So we might just replace unicode fractions here if needed.
  return line
    .replace(/½/g, '1/2')
    .replace(/⅓/g, '1/3')
    .replace(/⅔/g, '2/3')
    .replace(/¼/g, '1/4')
    .replace(/¾/g, '3/4')
    .replace(/⅕/g, '1/5')
    .replace(/⅖/g, '2/5')
    .replace(/⅗/g, '3/5')
    .replace(/⅘/g, '4/5')
    .replace(/⅙/g, '1/6')
    .replace(/⅚/g, '5/6')
    .replace(/⅛/g, '1/8')
    .replace(/⅜/g, '3/8')
    .replace(/⅝/g, '5/8')
    .replace(/⅞/g, '7/8');
}

export function removeIngredientComments(line: string): string {
  // Remove things in parentheses that might just be comments e.g. "(optional)", "(chopped)"
  // But wait, the prompt says: "1 tbsp peanut butter (optional)" → "1 tbsp peanut butter optional"
  // So let's just strip the parentheses themselves, but keep the text
  return line.replace(/[()]/g, '');
}

export function detectEmptyOrInstructionLine(line: string): boolean {
  if (!line.trim()) return true;
  const lower = line.toLowerCase();
  const stepWords = ['preheat', 'bake', 'stir', 'cook', 'mix', 'combine', 'serve', 'whisk', 'blend', 'heat', 'pour'];
  const firstWord = lower.split(' ')[0];
  if (stepWords.includes(firstWord)) return true;
  return false;
}

export function cleanIngredientLine(originalText: string, lineNumber: number): IngredientLine {
  let cleaned = normalizeIngredientFractions(originalText);
  cleaned = removeIngredientComments(cleaned);
  cleaned = removeRecipeStepPunctuation(cleaned);
  cleaned = normalizeIngredientWhitespace(cleaned);

  const isEmpty = detectEmptyOrInstructionLine(cleaned);

  return {
    lineNumber,
    originalText,
    cleanedText: cleaned,
    isEmpty,
    warnings: []
  };
}
