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

// Public form of a request path. Prerendered pages are built as foods/x.html
// (build.format 'file'), so at build time Astro.url.pathname is "/foods/x.html",
// while the page is served at /foods/x.
export function cleanPathname(pathname: string): string {
  let path = pathname.replace(/(\/index)?\.html$/, '') || '/';
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  return path;
}

export function buildCanonicalUrl(pathname: string): string {
  const url = new URL(pathname, siteConfig.siteUrl);
  return `${url.origin}${cleanPathname(url.pathname)}`;
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
