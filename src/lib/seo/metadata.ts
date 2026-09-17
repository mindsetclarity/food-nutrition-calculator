// src/lib/seo/metadata.ts

import { siteConfig } from './siteConfig';
import type { SeoMetadata, OpenGraphMetadata, TwitterMetadata, PageSeoInput } from './types';

export function buildTitle(title?: string): string {
  if (!title) return siteConfig.defaultTitle;
  if (title.includes('|')) return title;
  return `${title} | ${siteConfig.siteName}`;
}

export function buildMetaDescription(description?: string): string {
  return description || siteConfig.defaultDescription;
}

export function buildCanonicalUrl(pathname: string): string {
  const url = new URL(pathname, siteConfig.siteUrl);
  let path = url.pathname;
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  return `${url.origin}${path}`;
}

export function buildOpenGraphMetadata(input: PageSeoInput): OpenGraphMetadata {
  return {
    title: buildTitle(input.title),
    description: buildMetaDescription(input.description),
    type: input.ogType || "website",
    image: new URL(input.ogImage || siteConfig.defaultOgImage, siteConfig.siteUrl).href,
  };
}

export function buildTwitterMetadata(input: PageSeoInput): TwitterMetadata {
  return {
    card: siteConfig.twitterCard,
    title: buildTitle(input.title),
    description: buildMetaDescription(input.description),
    image: new URL(input.ogImage || siteConfig.defaultOgImage, siteConfig.siteUrl).href,
  };
}

export function buildSeoMetadata(input: PageSeoInput): SeoMetadata {
  return {
    title: buildTitle(input.title),
    description: buildMetaDescription(input.description),
    canonicalPath: input.canonicalPath,
    noindex: input.noindex || false,
    keywords: input.keywords || siteConfig.defaultKeywords,
  };
}

export function getDefaultSeo(): PageSeoInput {
  return {
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    canonicalPath: "/",
    ogImage: siteConfig.defaultOgImage,
    keywords: siteConfig.defaultKeywords,
  };
}
