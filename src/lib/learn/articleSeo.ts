import type { LearnArticle } from './types';

export function getLearnHubSeo() {
  return {
    title: 'Learn Food Nutrition | Calories, Macros, Recipes & Food Labels',
    description: 'Learn how calories, macros, serving sizes, recipe nutrition, USDA food data, and Nutrition Facts-style labels work. Beginner-friendly guides for food tracking.'
  };
}

export function getLearnArticleSeo(article: LearnArticle) {
  return {
    title: article.seoTitle || `${article.title} | Food Nutrition Calculator`,
    description: article.seoDescription || article.description
  };
}
