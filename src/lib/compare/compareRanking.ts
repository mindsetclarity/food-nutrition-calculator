import type { CompareCell } from './types';

export function rankCellsByNutrient(cells: CompareCell[]): CompareCell[] {
  const validCells = cells.filter(c => c.value !== null);
  
  // Need at least 2 valid values to rank
  if (validCells.length < 2) {
    return cells.map(c => ({ ...c, label: undefined }));
  }

  const values = validCells.map(c => c.value as number);
  const maxVal = Math.max(...values);
  const minVal = Math.min(...values);

  // If all values are the same
  if (maxVal === minVal) {
    return cells.map(c => ({
      ...c,
      label: c.value !== null ? 'Similar' : undefined
    }));
  }

  // Label highest and lowest
  return cells.map(c => {
    let label: CompareCell['label'] = undefined;
    if (c.value !== null) {
      if (c.value === maxVal) label = 'Highest';
      else if (c.value === minVal) label = 'Lowest';
    }
    return { ...c, label };
  });
}
