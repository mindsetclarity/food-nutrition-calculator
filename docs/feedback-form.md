# Feedback Form Documentation

## 1. Feedback Page Route
The feedback page is accessible at `/feedback` (`src/pages/feedback.astro`).
It is also linked in the main desktop navigation and mobile menu.

## 2. Form Fields
- **Name**: Optional string.
- **Email**: Optional, but if provided must be a valid format.
- **Feedback Type**: Required dropdown.
- **Page or Tool**: Optional dropdown.
- **Rating**: Optional 1 to 5 radio buttons.
- **Message**: Required textarea (10-3000 chars).
- **Contact permission**: Optional checkbox.
- **Hidden Metadata**: Current URL and User Agent are sent automatically.

## 3. API Route
The form submits via `POST` to `/api/feedback` (`src/pages/api/feedback.ts`).
It accepts JSON requests and returns safe JSON responses.

## 4. Email Destination
Feedback submissions are sent to: `mindsetclarityofficial@gmail.com`
The FROM address is set via environment variables.

## 5. Required Environment Variables
Add the following to your environment/Vercel/Netlify for emails to work:

```env
FEEDBACK_TO_EMAIL=mindsetclarityofficial@gmail.com
FEEDBACK_FROM_EMAIL=no-reply@foodnutritioncalculator.com
RESEND_API_KEY=your_resend_api_key_here
```

## 6. How to Test Locally
If `RESEND_API_KEY` is not set locally, the form will still validate correctly, but you will receive a 503 response and the UI will show: "Feedback email provider is not configured yet."
To test the full flow, add a Resend test key to `.env.local` (do not commit `.env.local`).

## 7. Spam Protection
A simple honeypot field (`companyWebsite`) is hidden on the form. If bots fill this field, the API will immediately return a HTTP 200 success without sending an actual email.

## 8. Privacy Behavior
- Passwords, private medical details, and payment information are discouraged via the UI note.
- Data is NOT logged permanently to any database in the application.
- No third-party tracking/analytics intercepts the data.
- The email is sent strictly to the configured `FEEDBACK_TO_EMAIL`.

## 9. Deployment Notes
Ensure your hosting platform (e.g. Vercel) has the appropriate environment variables added in the settings.

## 10. Known Limitations
- Heavy file attachments are not supported to reduce storage cost and spam.
- Captchas are currently omitted in favor of the lightweight honeypot to maximize user conversion and accessibility.
