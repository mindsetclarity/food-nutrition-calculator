import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return new Response(JSON.stringify({ error: "Content-Type must be application/json" }), { status: 400 });
    }

    const body = await request.json();

    // Spam protection: honeypot
    if (body.companyWebsite) {
      // Pretend success
      return new Response(JSON.stringify({ data: "success" }), { status: 200 });
    }

    // Validation
    const { feedbackType, message, email, name, pageTool, rating, contactPermission, currentUrl, userAgent } = body;

    if (!feedbackType || !message || message.length < 10 || message.length > 3000) {
      return new Response(JSON.stringify({ error: "Invalid feedback input." }), { status: 400 });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailPattern.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email address." }), { status: 400 });
    }

    // Check configuration
    const RESEND_API_KEY = import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY;
    const FEEDBACK_TO_EMAIL = import.meta.env.FEEDBACK_TO_EMAIL || process.env.FEEDBACK_TO_EMAIL || "mindsetclarityofficial@gmail.com";
    const FEEDBACK_FROM_EMAIL = import.meta.env.FEEDBACK_FROM_EMAIL || process.env.FEEDBACK_FROM_EMAIL || "no-reply@foodnutritioncalculator.com";

    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: "Feedback email provider is not configured yet." }), { 
        status: 503, 
        headers: { "Content-Type": "application/json" } 
      });
    }

    // Send email via Resend
    const htmlMessage = `
      <h2>New Feedback: ${feedbackType}</h2>
      <p><strong>Name:</strong> ${name || "Not provided"}</p>
      <p><strong>Email:</strong> ${email || "Not provided"}</p>
      <p><strong>Page/Tool:</strong> ${pageTool || "Not provided"}</p>
      <p><strong>Rating:</strong> ${rating || "Not provided"}</p>
      <p><strong>Contact Permission:</strong> ${contactPermission ? "Yes" : "No"}</p>
      <hr />
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, "<br>")}</p>
      <hr />
      <p><small>URL: ${currentUrl}</small></p>
      <p><small>User Agent: ${userAgent}</small></p>
    `;

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Food Nutrition Calculator <${FEEDBACK_FROM_EMAIL}>`,
        to: [FEEDBACK_TO_EMAIL],
        subject: `New Feedback: ${feedbackType}`,
        html: htmlMessage,
      }),
    });

    if (!resendRes.ok) {
      // Do not expose full provider error
      return new Response(JSON.stringify({ error: "We couldn’t send your feedback right now. Please try again." }), { status: 500 });
    }

    return new Response(JSON.stringify({ data: "success" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
