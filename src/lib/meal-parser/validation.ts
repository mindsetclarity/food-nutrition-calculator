import { sanitizeUserMealText } from '../llm/safety';

export function validateParseMealRequest(body: any): { isValid: boolean, error?: string, sanitizedText?: string } {
  if (!body || typeof body !== 'object') {
    return { isValid: false, error: "Invalid request body." };
  }

  if (typeof body.text !== 'string') {
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
