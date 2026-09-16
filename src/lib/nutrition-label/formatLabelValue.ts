export function formatCalories(value: number | null | undefined): string {
  if (value === null || value === undefined) return "—";
  return Math.round(value).toString();
}

export function formatGramValue(value: number | null | undefined): string {
  if (value === null || value === undefined) return "—";
  return Number.isInteger(value) ? value.toString() : value.toFixed(1);
}

export function formatMilligramValue(value: number | null | undefined): string {
  if (value === null || value === undefined) return "—";
  return Math.round(value).toString();
}

export function formatMicrogramValue(value: number | null | undefined): string {
  if (value === null || value === undefined) return "—";
  return Number.isInteger(value) ? value.toString() : value.toFixed(1);
}

export function formatNutritionAmount(value: number | null | undefined, unit: string): string {
  if (value === null || value === undefined) return "—";
  let formatted = "";
  if (unit === "g") formatted = formatGramValue(value);
  else if (unit === "mg") formatted = formatMilligramValue(value);
  else if (unit === "mcg") formatted = formatMicrogramValue(value);
  else formatted = Math.round(value).toString();
  
  return `${formatted}${unit}`;
}

export function formatServingLabel(label?: string): string {
  return label || "1 serving";
}

export function formatUnavailable(): string {
  return "—";
}
