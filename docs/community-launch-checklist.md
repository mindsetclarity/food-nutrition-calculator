# Community launch checklist (owner actions, in order)

Nothing here has been run for you. All commands run from the repo root. Never commit secrets.

1. **Create Cloudflare resources**
   - `npx wrangler d1 create fnc-community` and paste the printed `database_id` into `wrangler.json` (replacing `00000000-0000-0000-0000-000000000000`).
   - `npx wrangler r2 bucket create fnc-community-photos`.
2. **Apply the schema:** `npx wrangler d1 migrations apply fnc-community --remote` (changes production; the schema in `migrations/`).
3. **Turnstile:** Cloudflare dashboard > Turnstile > add a widget for `foodnutritioncalculator.com`, `www.foodnutritioncalculator.com` and `localhost`. Keep the site key and secret.
4. **Resend:** create an account and API key; add the sending domain and publish the SPF and DKIM DNS records Resend shows; wait until the domain says Verified.
5. **Google sign-in:** Google Cloud Console > APIs & Services > Credentials > OAuth client (Web application). Authorized redirect URIs:
   - `https://foodnutritioncalculator.com/auth/google/callback`
   - `http://localhost:4321/auth/google/callback`
   - Note: `www.` redirects to the apex domain, so only the apex URL is needed. Add the `www` URL too if www ever serves directly.
6. **Set Worker secrets** (all are read from `env`; they are not in `wrangler.json`, so use secrets for all, public ones included):
   ```
   npx wrangler secret put TURNSTILE_SECRET
   npx wrangler secret put TURNSTILE_SITE_KEY
   npx wrangler secret put RESEND_API_KEY
   npx wrangler secret put GOOGLE_CLIENT_ID
   npx wrangler secret put GOOGLE_CLIENT_SECRET
   npx wrangler secret put BHASKAR_API_SECRET   # long random string
   npx wrangler secret put ADMIN_EMAIL          # mindsetclarityofficial@gmail.com
   ```
   (`TURNSTILE_SITE_KEY`, `GOOGLE_CLIENT_ID` and `ADMIN_EMAIL` may instead go under `"vars"` in `wrangler.json`; secrets work the same for the code.) Local copies go in `.dev.vars`. See `docs/environment-variables.md`.
7. **Bhaskar app:** give the app team `BHASKAR_API_SECRET` and the API docs (the "Bhaskar API" section of `docs/environment-variables.md`).
8. **Deploy** with your normal deploy command.
9. **Measure sign-in CPU:** sign in about 20 times on the live site, then check Worker CPU time in the Cloudflare dashboard (Workers > foodnutritioncalculator-com > Metrics). If p50 is above 10 ms, lower `PBKDF2_ITERATIONS` in `src/lib/community/crypto.ts` (minimum 50000; existing hashes keep working because each stores its own iteration count). If it is still too slow, consider Google-only signups.
10. **Admin account:** sign up with `mindsetclarityofficial@gmail.com`, verify the email, then open `/admin`.
11. **Legal wording:** read the community sections added to `/privacy` and `/terms` and approve or edit them.
12. **Sitemap:** open `/sitemap.xml` and confirm community URLs appear after the first posts; resubmit it in Search Console.
