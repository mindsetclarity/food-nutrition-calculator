import type { LearnArticle } from './types';

export interface TocItem {
  id: string;
  label: string;
}

export function buildTableOfContents(article: LearnArticle): TocItem[] {
  const items: TocItem[] = [];
  
  article.sections.forEach(section => {
    if (section.heading) {
      items.push({
        id: section.id,
        label: section.heading
      });
    }
  });

  if (article.faqs && article.faqs.length > 0) {
    items.push({ id: 'faq', label: 'Frequently Asked Questions' });
  }

  return items;
}

export function slugifyHeading(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}
