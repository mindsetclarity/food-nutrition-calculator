const GET = async ({ site }) => {
  const robotsTxt = `
User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${site ? site.origin : "https://foodnutritioncalculator.com"}/sitemap.xml
`.trim();
  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
