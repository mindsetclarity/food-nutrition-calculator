import { s as siteConfig } from './siteConfig_Bc-3p4QP.mjs';

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

export { buildWebPageSchema as a, buildSoftwareApplicationSchema as b, buildWebSiteSchema as c, buildOrganizationSchema as d };
