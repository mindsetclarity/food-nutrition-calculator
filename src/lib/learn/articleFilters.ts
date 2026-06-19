import type { LearnArticle, LearnArticleCategory } from './types';

export function filterArticlesByCategory(articles: LearnArticle[], category: string | null): LearnArticle[] {
  if (!category || category === 'All') return articles;
  return articles.filter(a => a.category === category);
}

export function sortArticlesForLearnHub(articles: LearnArticle[]): LearnArticle[] {
  return [...articles].sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}
