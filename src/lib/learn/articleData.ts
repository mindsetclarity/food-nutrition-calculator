import { LEARN_ARTICLES } from '../../data/learnArticles';
import type { LearnArticle, LearnArticleCategory } from './types';

export function getAllLearnArticles(): LearnArticle[] {
  return [...LEARN_ARTICLES].sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

// Seasonal guides shown first on the homepage and Learn hub; change these with the season.
const HIGHLIGHT_FIRST = ['christmas-dinner-calories', 'new-year-weight-loss-plan'];

/** Seasonal guides first, then the newest articles, so new content is linked from the top pages. */
export function getHighlightedLearnArticles(limit: number): LearnArticle[] {
  const all = getAllLearnArticles();
  const first = HIGHLIGHT_FIRST.map(s => all.find(a => a.slug === s)).filter((a): a is LearnArticle => !!a);
  return [...first, ...all.filter(a => !HIGHLIGHT_FIRST.includes(a.slug))].slice(0, limit);
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
