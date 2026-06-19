export type LearnArticleCategory = 
  | 'Calories'
  | 'Macros'
  | 'Recipes'
  | 'Food Labels'
  | 'Serving Sizes'
  | 'USDA Data'
  | 'Meal Planning Basics'
  | 'Food Comparison';

export interface LearnArticleToolCta {
  label: string;
  href: string;
}

export interface LearnArticleCallout {
  tone: 'info' | 'warning' | 'trust';
  title: string;
  body: string;
}

export interface LearnArticleSection {
  id: string;
  heading: string;
  body: string[];
  bullets?: string[];
  callout?: LearnArticleCallout;
  toolCta?: LearnArticleToolCta;
}

export interface LearnArticleFAQ {
  question: string;
  answer: string;
}

export interface LearnArticle {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: LearnArticleCategory;
  tags: string[];
  readingTimeMinutes: number;
  updatedAt: string;
  featured?: boolean;
  relatedTool?: LearnArticleToolCta;
  heroSummary: string;
  keyTakeaway: string;
  sections: LearnArticleSection[];
  faqs?: LearnArticleFAQ[];
  relatedSlugs?: string[];
  seoTitle: string;
  seoDescription: string;
}
