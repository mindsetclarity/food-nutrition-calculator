const POST = async ({ request }) => {
  try {
    const { query } = await request.json();
    if (!query) {
      return new Response(JSON.stringify({ error: "No query provided" }), { status: 400 });
    }
    const provider = "gemini";
    const geminiKey = "";
    if (provider === "gemini" && geminiKey) ;
    return new Response(JSON.stringify({ error: "LLM API key missing" }), { status: 500 });
  } catch (err) {
    console.error("LLM Estimate Error:", err);
    return new Response(JSON.stringify({ error: "Failed to estimate" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
