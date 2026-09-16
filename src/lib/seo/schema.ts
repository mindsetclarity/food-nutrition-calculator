// src/lib/seo/schema.ts

import { siteConfig } from './siteConfig';
import type { JsonLdSchema, BreadcrumbItem } from './types';

export function buildWebSiteSchema(): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.siteName,
    "url": siteConfig.siteUrl,
  };
}

export function buildOrganizationSchema(): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.siteName,
    "url": siteConfig.siteUrl,
  };
}

export function buildWebPageSchema(input: { name: string; description: string; url: string }): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": input.name,
    "description": input.description,
    "url": input.url,
    "isPartOf": {
      "@id": `${siteConfig.siteUrl}/#website`
    }
  };
}

export function buildBreadcrumbListSchema(items: BreadcrumbItem[]): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href.startsWith('http') ? item.href : `${siteConfig.siteUrl}${item.href}`
    }))
  };
}

export function buildSoftwareApplicationSchema(input: { name: string; description: string; url: string }): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": input.name,
    "description": input.description,
    "url": input.url,
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };
}

export function buildArticleSchema(input: { headline: string; description: string; datePublished?: string; dateModified?: string }): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": input.headline,
    "description": input.description,
    ...(input.datePublished && { "datePublished": input.datePublished }),
    ...(input.dateModified && { "dateModified": input.dateModified }),
    "author": {
      "@type": "Organization",
      "name": siteConfig.siteName,
      "url": siteConfig.siteUrl
    }
  };
}

export function buildFAQPageSchema(faqs: { question: string; answer: string }[]): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
