// Hand-written notes for compare pages. A pair is indexed only when it has a note here
// (see isIndexedComparePair). Keys are pair slugs with food slugs in alphabetical order;
// chooseA is about the first food in the slug, chooseB the second.
// Numbers quoted must match the page's own data (per 100 g / default serving).
export interface CompareNote {
  summary: string;
  body: string[];
  chooseA: string;
  chooseB: string;
}

export const COMPARE_NOTES: Record<string, CompareNote> = {
};
