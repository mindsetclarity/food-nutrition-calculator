# Environment Variables

| Variable Name | Required / Optional | Server / Client | Purpose | Example Placeholder | Notes |
|---|---|---|---|---|---|
| `USDA_API_KEY` | Required | Server | USDA FoodData Central API search | `your_usda_api_key_here` | Get this from `fdc.nal.usda.gov` |
| `LLM_PROVIDER` | Optional | Server | Chooses which LLM provider to use | `mock` | Defaults to `mock` if not set. |
| `LLM_TIMEOUT_MS`| Optional | Server | Time to wait for parser | `15000` | |
| `GEMINI_API_KEY`| Optional | Server | Gemini parsing model | `your_gemini_api_key_here` | |
| `OPENAI_API_KEY`| Optional | Server | OpenAI parsing model | `your_openai_api_key_here` | |
| `DEEPSEEK_API_KEY`| Optional | Server | Deepseek parsing model | `your_deepseek_api_key_here` | |

**Security Note:** Never commit actual API keys to GitHub. Use `.env.local` for local development.

## Community variables

Set as Worker secrets (`wrangler secret put NAME`) in production; use `.dev.vars` (gitignored) locally. All are server-side.

| Variable Name | Required / Optional | Purpose | Notes |
|---|---|---|---|
| `TURNSTILE_SITE_KEY` | Required in prod | Cloudflare Turnstile widget key on signup and posting | Public key. Unset in dev = no widget. |
| `TURNSTILE_SECRET` | Required in prod | Verifies Turnstile tokens | Unset in dev skips verification; unset in prod rejects. |
| `RESEND_API_KEY` | Required in prod | Sends verification and reset emails via Resend | Unset in dev logs the email to the console. |
| `GOOGLE_CLIENT_ID` | Optional | Google sign-in | Unset hides the Google button. |
| `GOOGLE_CLIENT_SECRET` | Optional | Google sign-in token exchange | Required if `GOOGLE_CLIENT_ID` is set. |
| `BHASKAR_API_SECRET` | Required for the Bhaskar API | Bearer secret the Bhaskar backend sends to `/api/referral/*` | Long random string. Unset = every request gets 401. Store only on Bhaskar's server, never in the app/APK. |
| `ADMIN_EMAIL` | Required in prod | Owner account for `/admin`: the verified account with this email (`mindsetclarityofficial@gmail.com`) | Plain var or secret. Unset = nobody is admin and `/admin` returns 404. |

## Bhaskar API

Both endpoints are `POST` only, take a JSON body `{ "code": "BSK-XXXXXXXX" }`, and require
`Authorization: Bearer <BHASKAR_API_SECRET>`. Codes are trimmed and upper-cased before lookup.
Responses are `application/json` with `Cache-Control: no-store`.

- **`Content-Type: application/json` is required.** Astro's `checkOrigin` CSRF guard answers `403`
  to any cross-site POST without it (form-like content types), before our code runs.
- **Keep `BHASKAR_API_SECRET` on Bhaskar's server only.** Call these endpoints from the Bhaskar
  backend, never from inside the app/APK: anything shipped in the app can be extracted.
- **Rate limit: 60 requests per minute per IP**, shared by both endpoints. All calls from a single
  Bhaskar backend IP share that one budget; ask for a higher limit before batch jobs.

### Verify (read-only)

```bash
curl -X POST https://foodnutritioncalculator.com/api/referral/verify \
  -H "Authorization: Bearer $BHASKAR_API_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"code":"BSK-7KQ4M9TX"}'
```

- `200 {"valid":true,"memberSince":"2026-10-15"}` code exists and is not revoked (a used code is still valid)
- `200 {"valid":false}` unknown or revoked

### Redeem (single use, atomic)

```bash
curl -X POST https://foodnutritioncalculator.com/api/referral/redeem \
  -H "Authorization: Bearer $BHASKAR_API_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"code":"BSK-7KQ4M9TX"}'
```

- `200 {"ok":true}` first redemption
- `200 {"ok":false,"reason":"used"}` already redeemed
- `200 {"ok":false,"reason":"invalid"}` unknown code
- `200 {"ok":false,"reason":"revoked"}` the member deleted their account

### Errors (both endpoints)

- `401 {"error":"unauthorized"}` missing or wrong secret (also when `BHASKAR_API_SECRET` is unset)
- `429 {"error":"rate_limited"}` too many requests from this IP
- `400 {"error":"bad_request"}` body is not a JSON object
- `405 {"error":"method_not_allowed"}` any method other than POST
