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
  'apple-vs-banana': {
    summary: 'An apple is the lighter snack and a banana is the better fuel: a medium apple has about 95 calories and a medium banana about 105, but the banana packs more carbs into a smaller, softer fruit.',
    body: [
      "Per 100 g the gap is bigger than it looks per fruit: 52 kcal for apple against 89 kcal for banana. Apples are mostly water and take a while to chew, so they fill you up for very few calories. That makes them the easier pick if you are snacking between meals while trying to lose weight.",
      "Bananas earn their place around exercise. About 27 g of quick, easy-to-digest carbohydrate in a medium banana is why runners and cyclists eat them before a session, and they are gentle on the stomach. Riper bananas taste sweeter because more of their starch has turned to sugar.",
      "Both give you roughly 3 to 4 g of fiber per fruit. Keep the apple skin on, since much of an apple's fiber sits in and just under the peel.",
    ],
    chooseA: 'you want a crunchy, filling snack with the fewest calories, or something to keep in a bag for days without bruising.',
    chooseB: 'you need fast energy before a workout, want something soft and easy to eat, or are adding sweetness to oats or a smoothie.',
  },
};
