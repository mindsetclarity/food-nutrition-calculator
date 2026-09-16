export function formatMealCalories(value: number | null | undefined): string {
  if (value === null || value === undefined) return '—';
  return Math.round(value).toString();
}

export function formatMealMacro(value: number | null | undefined): string {
  if (value === null || value === undefined) return '—';
  if (value >= 100) return Math.round(value).toString();
  return Number(value).toFixed(1).replace(/\.0$/, '');
}

export function formatMealSodium(value: number | null | undefined): string {
  if (value === null || value === undefined) return '—';
  return Math.round(value).toString();
}

export function formatMealQuantity(quantity: number, unit: string): string {
  const q = Number.isInteger(quantity) ? quantity.toString() : Number(quantity).toFixed(2).replace(/\.?0+$/, '');
  return `${q} ${unit}`;
}

export function formatMealSectionLabel(sectionId: string): string {
  return sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
}
