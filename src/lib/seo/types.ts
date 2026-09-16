// src/lib/seo/types.ts

export interface SeoMetadata {
  title: string;
  description: string;
  canonicalPath?: string;
  noindex?: boolean;
  keywords?: string;
}

export interface OpenGraphMetadata {
  title?: string;
  description?: string;
  type?: string;
  image?: string;
}

export interface TwitterMetadata {
  card?: string;
  title?: string;
  description?: string;
  image?: string;
}

export interface JsonLdSchema {
  "@context": "https://schema.org";
  "@type": string;
  [key: string]: any;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface PageSeoInput {
  title?: string;
  description?: string;
  canonicalPath?: string;
  noindex?: boolean;
  ogType?: string;
  ogImage?: string;
  keywords?: string;
}
