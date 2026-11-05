// Hand-written notes for food pages. A food is indexed only when it has a note here
// (see isIndexedFood). Numbers quoted must match the page's own data.
export interface FoodNote {
  body: string[];
}

export const FOOD_NOTES: Record<string, FoodNote> = {
  apple: {
    body: [
      "Apples are one of the most eaten fruits in both the US and the UK, usually raw as a snack, sliced into lunch boxes, or baked into crumbles and pies. A medium apple weighs about 180 g and comes to roughly 95 calories, almost all of it from natural sugar and fiber.",
      "Their main strength is volume: an apple is around 85% water and takes time to chew, so it is filling for very few calories. Eat the skin, because a good share of the fiber is in the peel. Apple juice is a different food: it keeps the sugar but loses most of the fiber, so a glass is far less filling than the whole fruit. Pairing apple slices with a little peanut butter or cheese adds protein and keeps you full for longer.",
    ],
  },
};
