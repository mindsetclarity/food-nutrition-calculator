import { s as siteConfig } from './siteConfig_IkrsgOX8.mjs';

function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.siteName,
    "url": siteConfig.siteUrl
  };
}
function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.siteName,
    "url": siteConfig.siteUrl
  };
}
function buildWebPageSchema(input) {
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
function buildSoftwareApplicationSchema(input) {
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
function buildFAQPageSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export { buildSoftwareApplicationSchema as a, buildFAQPageSchema as b, buildWebPageSchema as c, buildWebSiteSchema as d, buildOrganizationSchema as e };
