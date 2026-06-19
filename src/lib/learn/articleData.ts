import { LEARN_ARTICLES } from '../../data/learnArticles';
import type { LearnArticle, LearnArticleCategory } from './types';

export function getAllLearnArticles(): LearnArticle[] {
  return [...LEARN_ARTICLES].sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

export function getFeaturedLearnArticles(): LearnArticle[] {
  return getAllLearnArticles().filter(a => a.featured);
}

export function getLearnArticleBySlug(slug: string): LearnArticle | undefined {
  return LEARN_ARTICLES.find(a => a.slug === slug);
}

export function getLearnArticlesByCategory(category: LearnArticleCategory): LearnArticle[] {
  return getAllLearnArticles().filter(a => a.category === category);
}

export function getRelatedArticles(article: LearnArticle, limit: number = 3): LearnArticle[] {
  if (!article.relatedSlugs || article.relatedSlugs.length === 0) {
    // Fallback to same category if no explicit related slugs
    return getLearnArticlesByCategory(article.category)
      .filter(a => a.id !== article.id)
      .slice(0, limit);
  }

  const related = article.relatedSlugs
    .map(slug => getLearnArticleBySlug(slug))
    .filter((a): a is LearnArticle => a !== undefined);

  return related.slice(0, limit);
}

export function getLearnCategories(): LearnArticleCategory[] {
  const categories = new Set<LearnArticleCategory>();
  LEARN_ARTICLES.forEach(a => categories.add(a.category));
  return Array.from(categories).sort();
}

export function getArticleCountByCategory(): Record<string, number> {
  const counts: Record<string, number> = {};
  LEARN_ARTICLES.forEach(a => {
    counts[a.category] = (counts[a.category] || 0) + 1;
  });
  return counts;
}
