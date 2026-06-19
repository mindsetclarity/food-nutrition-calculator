import { g as getFoodById, a as getUsdaFoodDetails, n as normalizeUsdaFoodDetails } from './normalize_N8hntlCn.mjs';

const GET = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const fdcIdStr = url.searchParams.get("fdcId");
    const idStr = url.searchParams.get("id");
    const sourceStr = url.searchParams.get("source");
    if (!fdcIdStr && !idStr) {
      return new Response(JSON.stringify({
        ok: false,
        food: null,
        fallbackUsed: false,
        message: "Food details could not be loaded."
      }), { status: 400, headers: { "Content-Type": "application/json" } });
    }
    if (sourceStr === "local" || idStr && idStr.startsWith("local_")) {
      const localId = idStr || "";
      const food = getFoodById(localId);
      if (food) {
        return new Response(JSON.stringify({
          ok: true,
          food,
          fallbackUsed: false,
          message: null
        }), { status: 200, headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=300, s-maxage=3600" } });
      }
    }
    if (fdcIdStr) {
      const fdcId = parseInt(fdcIdStr, 10);
      if (!isNaN(fdcId)) {
        let usdaRes;
        try {
          usdaRes = await getUsdaFoodDetails(fdcId);
        } catch (e) {
          usdaRes = { ok: false, data: null };
        }
        if (usdaRes.ok && usdaRes.data) {
          return new Response(JSON.stringify({
            ok: true,
            food: normalizeUsdaFoodDetails(usdaRes.data),
            fallbackUsed: false,
            message: null
          }), { status: 200, headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=300, s-maxage=3600" } });
        }
      }
    }
    if (idStr) {
      const food = getFoodById(idStr);
      if (food) {
        return new Response(JSON.stringify({
          ok: true,
          food,
          fallbackUsed: true,
          message: "USDA details unavailable, falling back to local."
        }), { status: 200, headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=300, s-maxage=3600" } });
      }
    }
    return new Response(JSON.stringify({
      ok: false,
      food: null,
      fallbackUsed: false,
      message: "Food details could not be found."
    }), { status: 404, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Safe Details API Error:", error instanceof Error ? error.message : "Unknown error");
    return new Response(JSON.stringify({
      ok: false,
      food: null,
      fallbackUsed: false,
      message: "An internal server error occurred while fetching food details."
    }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
