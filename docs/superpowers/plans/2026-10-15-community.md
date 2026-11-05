# Community Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a public `/community` (Diet, Exercise, Physique / Progress, Website feedback) with Google + email sign-in, posts/replies/upvotes/reports/photos, a private "Message the owner" box, an owner admin page, and a unique single-use Bhaskar referral code per member with verify/redeem endpoints for the Bhaskar app.

**Architecture:** Server-rendered Astro pages on the existing Cloudflare Worker. All data in one D1 database (`DB`), photos in one R2 bucket (`PHOTOS`). Business logic lives in `src/lib/community/*` as plain functions that take a `D1Database` as their first argument, so they are tested in Node against an in-memory `node:sqlite` shim. Pages are thin: read `env` from `cloudflare:workers`, call lib functions, render. Forms are plain HTML `POST`s handled in page frontmatter; the only client JS is photo resizing and Turnstile.

**Tech Stack:** Astro 7 (`output: 'server'`), `@astrojs/cloudflare` 14, Tailwind 4, Cloudflare D1 / R2 / Workers Rate Limiting / Turnstile, Resend HTTP API, Web Crypto. No new npm dependencies.

**Spec:** `docs/superpowers/specs/2026-10-15-community-design.md`

## Global Constraints

- No new npm dependencies. Web Crypto for hashing/tokens; `fetch` for Google, Resend, Turnstile.
- Must run on Cloudflare Workers **Free**: sessions in D1 (not KV); no per-request work beyond one PBKDF2 hash.
- Minimum age **18+**: required checkbox on both signup paths; account is not created without it.
- Public pages show **username only**; never email or real name (Google name/picture are not stored).
- Referral code format: `BSK-` + 8 chars from `23456789ABCDEFGHJKMNPQRSTUVWXYZ`, from `crypto.getRandomValues`.
- Referral codes are **single use**; redeem is atomic; deleted accounts' codes are **revoked**, not deleted.
- Topics (slug → label): `diet` → Diet, `exercise` → Exercise, `physique` → Physique / Progress, `feedback` → Website feedback. `feedback` topic pages are `noindex`.
- Post URL: `/community/<topic>/<id>-<slug>`; no trailing slashes (`trailingSlash: 'never'`).
- Photos: max **4** per post, **5 MB** each, JPEG/PNG/WebP (checked by magic bytes). Photos from accounts < **7 days** old wait for owner approval; photo posts require verified email or Google login.
- Rate limits: **5 posts/hour**, **30 replies/hour** per user; no links (`http://`, `https://`, `www.`) in posts/replies from accounts < **24 hours** old.
- Owner/admin = the account whose verified email equals `ADMIN_EMAIL` (`mindsetclarityofficial@gmail.com`).
- "Not medical advice" disclaimer on every `/community*` page.
- Posts go live instantly; reports flag items for the owner; banned users can read but not write, and their content is hidden.
- Reuse `SiteLayout`, `PageHeader`, `ui/Button`, the design tokens in `DESIGN.md`, and `escapeHtml` where HTML is built by string.
- Tests follow the repo style: `node --experimental-strip-types scripts/test-*.mjs`, `node:assert/strict`, registered in `package.json`.

## Review Focus

1. **A second redeem of the same code at the same moment** → exactly one `{ok:true}`. Test in Task 6 (`redeem twice concurrently`).
2. **Email signup with an address that already has a Google account (or the reverse)** → no duplicate user; Google login links to the existing email account only if Google says the email is verified, and email signup with a taken email fails with "account exists". Tests in Tasks 3 and 5.
3. **Banned or deleted user's session cookie still in the browser** → treated as signed out for writes; banned can't post. Test in Task 3 (`session of banned user cannot write`) and Task 11.
4. **Cross-site form POST** (another site auto-submits to `/community/new`) → rejected by Origin check. Test in Task 3 (`origin check`).
5. **Upload a non-image renamed `.jpg`, or a 6 MB image** → rejected with a message, nothing written to R2. Test in Task 9.

---

## File Structure

```
migrations/0001_community.sql          schema (D1 migrations dir)
wrangler.json                          + d1_databases DB, r2_buckets PHOTOS, ratelimits
src/env.d.ts                           App.Locals { user }
src/middleware.ts                      + session load, Origin check
src/lib/community/
  db.ts            types: User, Post, Reply, Topic; TOPICS const
  crypto.ts        hashPassword, verifyPassword, randomToken, sha256Hex, generateReferralCode, safeEqual
  users.ts         createEmailUser, findOrCreateGoogleUser, getUserById, setUsername, verifyEmail, banUser, deleteUser
  sessions.ts      createSession, getSessionUser, deleteSession, sessionCookie
  tokens.ts        createEmailToken, consumeEmailToken  (verify + reset)
  email.ts         sendEmail (Resend), verifyEmailBody, resetEmailBody
  turnstile.ts     verifyTurnstile
  google.ts        googleAuthUrl, exchangeGoogleCode
  referral.ts      issueReferralCode, getReferralForUser, verifyCode, redeemCode
  validate.ts      validatePost, validateReply, validateUsername, slugify, containsLink
  posts.ts         createPost, listPosts, getPost, createReply, listReplies, toggleVote, deletePost, deleteReply, countRecent
  reports.ts       reportItem, listOpenReports, resolveReport
  photos.ts        sniffImageType, savePhotos, listPendingPhotos, approvePhoto, rejectPhoto
  feedback.ts      sendFeedback, listFeedbackForUser, listAllFeedback, replyToFeedback
src/components/community/
  Disclaimer.astro, PostCard.astro, ReplyList.astro, AuthForm.astro, PhotoInput.astro
src/pages/
  login.astro, signup.astro, logout.ts, forgot-password.astro, reset-password.astro, verify-email.ts
  auth/google.ts, auth/google/callback.ts
  account.astro, welcome.astro (pick username after Google signup)
  community/index.astro, community/[topic]/index.astro, community/[topic]/[post].astro, community/new.astro
  community/photo/[key].ts      (serve R2 photo)
  admin.astro
  api/referral/verify.ts, api/referral/redeem.ts
scripts/lib/test-env.mjs                .ts resolve hook + createTestDb() D1 shim over node:sqlite
scripts/test-community-*.mjs           one per lib area
```

---

### Task 1: Database foundation and test shim

**Files:**
- Create: `migrations/0001_community.sql`, `scripts/lib/test-env.mjs`, `src/lib/community/db.ts`, `scripts/test-community-schema.mjs`
- Modify: `wrangler.json`, `package.json`

**Interfaces:**
- Produces: `createTestDb(): Promise<D1Database-like>` (supports `prepare(sql).bind(...).first<T>() / all<T>() / run()` and `batch([...])`, with `run()` returning `{ meta: { changes } }`), and loads every `migrations/*.sql` in order.
- Produces: `TOPICS: readonly { slug: 'diet'|'exercise'|'physique'|'feedback'; label: string; indexable: boolean }[]`, `type TopicSlug`, row types `User`, `Post`, `Reply`.

Schema (tables and the columns later tasks rely on):
- `users(id INTEGER PK, email TEXT UNIQUE COLLATE NOCASE, email_verified INTEGER, password_hash TEXT NULL, google_sub TEXT UNIQUE NULL, username TEXT UNIQUE COLLATE NOCASE NULL, is_banned INTEGER DEFAULT 0, created_at INTEGER)` — times are unix ms.
- `sessions(token_hash TEXT PK, user_id, expires_at)`
- `email_tokens(token_hash TEXT PK, user_id, purpose TEXT CHECK(purpose IN ('verify','reset')), expires_at)`
- `referral_codes(code TEXT PK, user_id NULL UNIQUE, created_at, redeemed_at NULL, revoked_at NULL)`
- `posts(id INTEGER PK, user_id, topic TEXT, title, body, slug, score INTEGER DEFAULT 0, created_at, deleted_at NULL)` + index `(topic, created_at)`
- `replies(id PK, post_id, user_id, body, created_at, deleted_at NULL)`
- `votes(user_id, post_id, PRIMARY KEY(user_id, post_id))`
- `photos(key TEXT PK, post_id, user_id, status TEXT CHECK(status IN ('pending','live','rejected')), created_at)`
- `reports(id PK, reporter_id, post_id NULL, reply_id NULL, reason, created_at, resolved_at NULL)`
- `feedback(id PK, user_id, message, owner_reply NULL, created_at, replied_at NULL)`

- [ ] **Step 1:** Write `scripts/test-community-schema.mjs`: `createTestDb()`, insert a user, assert duplicate email in different case throws (`UNIQUE`), assert a referral code row can be inserted with `user_id` NULL, assert `TOPICS.map(t=>t.slug)` deep-equals `['diet','exercise','physique','feedback']` and only `feedback` has `indexable: false`.
- [ ] **Step 2:** Run `node --experimental-strip-types scripts/test-community-schema.mjs` → FAIL (module not found).
- [ ] **Step 3:** Write the migration, `db.ts`, and `test-env.mjs` (move the `registerHooks` resolve hook from `scripts/test-usda-normalize.mjs` into it; the shim wraps `DatabaseSync(':memory:')`).
- [ ] **Step 4:** Run the test → PASS.
- [ ] **Step 5:** Add bindings to `wrangler.json`: `d1_databases: [{ binding: "DB", database_name: "fnc-community", database_id: "<from owner>", migrations_dir: "migrations" }]`, `r2_buckets: [{ binding: "PHOTOS", bucket_name: "fnc-community-photos" }]`, `ratelimits: [{ name: "AUTH_LIMITER", namespace_id: "1001", simple: { limit: 10, period: 60 } }, { name: "REFERRAL_LIMITER", namespace_id: "1002", simple: { limit: 60, period: 60 } }]`. **Ask the owner** to run `npx wrangler d1 create fnc-community` and `npx wrangler r2 bucket create fnc-community-photos` (creates real resources on their account) and paste the database id. Then `npx wrangler d1 migrations apply fnc-community --local` → "✅ applied".
- [ ] **Step 6:** Add `"test:community": "node --experimental-strip-types scripts/test-community-schema.mjs"` to `package.json` (later tasks append with `&&`). Commit `feat(community): schema, bindings and D1 test shim`.

### Task 2: Crypto helpers

**Files:** Create `src/lib/community/crypto.ts`, `scripts/test-community-crypto.mjs`

**Interfaces — Produces:**
- `hashPassword(pw: string): Promise<string>` → `pbkdf2$<iterations>$<saltB64>$<hashB64>` (PBKDF2-SHA256, 16-byte salt, iterations = `PBKDF2_ITERATIONS` const, start at 100000 — the Workers max).
- `verifyPassword(pw: string, stored: string): Promise<boolean>` (reads iterations from the stored string).
- `randomToken(): string` (32 random bytes, base64url), `sha256Hex(s: string): Promise<string>`, `safeEqual(a: string, b: string): boolean` (constant time).
- `generateReferralCode(): string`.

- [ ] **Step 1:** Test: hash then verify true; wrong password false; two hashes of same password differ; `generateReferralCode()` matches `/^BSK-[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{8}$/` for 1000 samples; `randomToken()` 43 chars; `safeEqual('a','a')` true, `('a','b')` and `('a','ab')` false.
- [ ] **Step 2:** Run → FAIL. **Step 3:** Implement. **Step 4:** Run → PASS.
- [ ] **Step 5:** Measure CPU on real Workers (the Workers clock doesn't advance during compute, so timing in code is useless): after Task 3 ships login, sign in ~20 times on production and read CPU time per request in the Cloudflare dashboard's Worker metrics. If p50 CPU > 10 ms, lower iterations stepwise (no lower than 50000); if it still exceeds, **stop and tell the owner** (spec fallback: Google-only signups). Record the chosen value in a comment on `PBKDF2_ITERATIONS`. Remove the temporary route.
- [ ] **Step 6:** Register test, commit `feat(community): password hashing, tokens, referral code generator`.

### Task 3: Email/password accounts, sessions, middleware

**Files:** Create `users.ts`, `sessions.ts`, `turnstile.ts`, `src/env.d.ts`, `src/components/community/AuthForm.astro`, `src/pages/signup.astro`, `src/pages/login.astro`, `src/pages/logout.ts`, `scripts/test-community-auth.mjs`. Modify `src/middleware.ts`.

**Interfaces — Produces:**
- `createEmailUser(db, { email, password, username, ageConfirmed }): Promise<{ ok: true; user: User } | { ok: false; error: 'exists' | 'age' | 'username_taken' | 'invalid' }>` — calls `issueReferralCode` (Task 6) — until then leave a `// Task 6` call site; Task 6 wires it.
- `getUserById(db, id)`, `findUserByEmail(db, email)`, `banUser(db, id)`.
- `validateUsername(name): string | null` lives in `validate.ts` (3–20 chars `[A-Za-z0-9_]`, not `admin`/`owner`/`bhaskar`).
- `createSession(db, userId): Promise<string>` (returns raw token; stores `sha256Hex(token)`, 30-day expiry), `getSessionUser(db, token): Promise<User | null>` (null if expired), `deleteSession(db, token)`, `sessionCookie(token: string | null): string` (`fnc_session`, `HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=2592000`, or expiry for null).
- `verifyTurnstile(secret: string, token: string, ip: string | null): Promise<boolean>`.
- `App.Locals.user: User | null`; middleware sets it for every request that has the cookie.
- `canWrite(user: User | null): boolean` — false if null or banned (in `users.ts`).

- [ ] **Step 1:** Tests (shim DB): signup creates user + returns ok; same email different case → `exists`; `ageConfirmed:false` → `age` and no row written; `getSessionUser` returns user for fresh token, null after `expires_at` passes (inject `now` param: `getSessionUser(db, token, now = Date.now())`); `session of banned user cannot write`: `canWrite(bannedUser) === false`; `origin check`: export `isSameOriginPost(request: Request, siteOrigin: string): boolean` from `sessions.ts` and assert POST with `Origin: https://evil.example` is false, same origin true, GET always true.
- [ ] **Step 2:** Run → FAIL. **Step 3:** Implement libs. **Step 4:** Run → PASS.
- [ ] **Step 5:** Middleware: before `next()`, reject non-GET/HEAD requests that fail `isSameOriginPost` with 403 — except paths under `/api/referral/` (server-to-server, Bearer-auth). Load `locals.user` from cookie via `env.DB`.
- [ ] **Step 6:** Pages: `/signup` (email, password ≥ 10 chars, username, 18+ checkbox labelled "I am 18 or older", Turnstile widget) → on success create session, send verify email (Task 4 wires sending; leave call), redirect `/account`. `/login` (email+password, `AUTH_LIMITER.limit({ key: ip })` before verifying; generic "Email or password is wrong"). `/logout` POST clears session. Both pages `noindex`. Env vars: `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET`.
- [ ] **Step 7:** Manual check with `npm run dev`: sign up, see `/account` (stub page saying "Signed in as <username>"), log out, log in. Commit `feat(community): email sign-up, login and sessions`.

### Task 4: Email verification and password reset (Resend)

**Files:** Create `tokens.ts`, `email.ts`, `src/pages/verify-email.ts`, `src/pages/forgot-password.astro`, `src/pages/reset-password.astro`, `scripts/test-community-tokens.mjs`.

**Interfaces — Produces:**
- `createEmailToken(db, userId, purpose: 'verify'|'reset'): Promise<string>` (verify: 24h, reset: 1h; stores hash).
- `consumeEmailToken(db, token, purpose, now?): Promise<number | null>` → user id; deletes the token (single use).
- `sendEmail(apiKey, { to, subject, text }): Promise<boolean>` → `POST https://api.resend.com/emails`, from `Food Nutrition Calculator <community@foodnutritioncalculator.com>`.
- `verifyEmail(db, userId)`; `setPassword(db, userId, pw)` (also deletes all that user's sessions).

- [ ] **Step 1:** Tests: token consumes once (second call null); wrong purpose null; expired null; `setPassword` invalidates existing sessions.
- [ ] **Step 2–4:** FAIL → implement → PASS.
- [ ] **Step 5:** Wire signup to send the verify link `/verify-email?token=…`. Forgot-password always shows "If that email has an account, we sent a link" (no account enumeration) and is behind `AUTH_LIMITER`. Env var `RESEND_API_KEY`. Tell the owner to add Resend's DNS records for the domain.
- [ ] **Step 6:** Commit `feat(community): email verification and password reset`.

### Task 5: Google sign-in

**Files:** Create `google.ts`, `src/pages/auth/google.ts`, `src/pages/auth/google/callback.ts`, `src/pages/welcome.astro`, `scripts/test-community-google.mjs`.

**Interfaces — Produces:**
- `googleAuthUrl(clientId, redirectUri, state): string` (scope `openid email`).
- `exchangeGoogleCode(code, clientId, secret, redirectUri): Promise<{ sub: string; email: string; emailVerified: boolean } | null>` — POST to `https://oauth2.googleapis.com/token`, decode the `id_token` payload (it came straight from Google over TLS, so signature verification is not required for this flow).
- `findOrCreateGoogleUser(db, { sub, email, emailVerified }): Promise<{ ok: true; user: User; isNew: boolean } | { ok: false; error: 'email_in_use' }>`: match by `google_sub`; else if an email user exists → link `google_sub` to it only when `emailVerified`, otherwise `email_in_use`; else create new user with `email_verified=1`, `username NULL`.

- [ ] **Step 1:** Tests: new sub creates user with null username; same sub returns same user; verified Google email matching an email-signup user links (one row total); unverified Google email matching an existing user → `{ ok: false, error: 'email_in_use' }` and no row changes.
- [ ] **Step 2–4:** FAIL → implement → PASS.
- [ ] **Step 5:** `/auth/google` sets a `fnc_oauth_state` cookie (random, 10 min) and redirects; callback checks state. New users (`username NULL`) go to `/welcome` to choose a username and tick the 18+ box; until both are done `canWrite` is false (extend `canWrite` to require `username`). Env vars `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`; tell the owner the redirect URI `https://foodnutritioncalculator.com/auth/google/callback` (+ `http://localhost:4321/auth/google/callback`) to add in Google Cloud Console.
- [ ] **Step 6:** Add "Continue with Google" to `AuthForm`. Commit `feat(community): Google sign-in`.

### Task 6: Referral codes, account page, Bhaskar API

**Files:** Create `referral.ts`, `src/pages/api/referral/verify.ts`, `src/pages/api/referral/redeem.ts`, `scripts/test-community-referral.mjs`. Modify `users.ts` (call `issueReferralCode` on create), `src/pages/account.astro`.

**Interfaces — Produces:**
- `issueReferralCode(db, userId): Promise<string>` (retry on collision, max 5).
- `getReferralForUser(db, userId): Promise<{ code: string; redeemedAt: number | null } | null>`.
- `verifyCode(db, code): Promise<{ valid: boolean; memberSince?: string }>` (ISO date of code creation; valid = exists, not revoked).
- `redeemCode(db, code, now?): Promise<{ ok: true } | { ok: false; reason: 'used' | 'invalid' | 'revoked' }>` — single `UPDATE referral_codes SET redeemed_at=? WHERE code=? AND redeemed_at IS NULL AND revoked_at IS NULL`; if `changes===0`, read the row to choose the reason.

- [ ] **Step 1:** Tests: every new user (email and Google) gets exactly one code; `verifyCode` on unknown → `{valid:false}`; redeem → ok, second → `used`; `redeem twice concurrently`: `Promise.all([redeemCode(db,c), redeemCode(db,c)])` → exactly one ok; revoked → `revoked`; lowercase input is upper-cased and trimmed before lookup.
- [ ] **Step 2–4:** FAIL → implement → PASS.
- [ ] **Step 5:** Endpoints: `POST` only; `Authorization: Bearer` compared with `safeEqual` to `BHASKAR_API_SECRET` → 401 otherwise; `REFERRAL_LIMITER.limit({ key: ip })` → 429; JSON body `{ code }`; responses exactly as in the spec. `export const prerender = false`.
- [ ] **Step 6:** `/account` (signed-in only, `noindex`): username, email-verified state with "resend verification" button, the Bhaskar code in a copyable box with "Redeemed on <date>" when used, and a short line on how to use it in Bhaskar (link to the existing Bhaskar ad/app link used on the homepage).
- [ ] **Step 7:** Add a section to `docs/environment-variables.md` for every new env var, and a "Bhaskar API" section documenting both endpoints with curl examples. Commit `feat(community): Bhaskar referral codes and verify/redeem API`.

### Task 7: Topics, posts and replies (text)

**Files:** Create `validate.ts` (extend), `posts.ts`, `Disclaimer.astro`, `PostCard.astro`, `ReplyList.astro`, `community/index.astro`, `community/[topic]/index.astro`, `community/[topic]/[post].astro`, `community/new.astro`, `scripts/test-community-posts.mjs`.

**Interfaces — Produces:**
- `validatePost({ topic, title, body }, user, now?): { ok: true; value } | { ok: false; error: string }` — title 5–120 chars, body 20–5000, topic in `TOPICS`, `containsLink(text)` rejected when account < 24h.
- `validateReply(body, user, now?)` — 2–2000 chars, same link rule.
- `slugify(title): string` — lowercase ASCII, hyphens, max 60 chars, `'post'` if empty.
- `countRecent(db, table: 'posts'|'replies', userId, sinceMs): Promise<number>`.
- `createPost(db, user, input): Promise<{ ok: true; id: number; url: string } | { ok: false; error: string }>` (enforces `canWrite` + 5/hour).
- `listPosts(db, topic, { sort: 'new'|'top', page }): Promise<PostSummary[]>` (20 per page; excludes deleted and banned authors; `PostSummary` = id, url, title, username, score, replyCount, createdAt, firstPhotoKey|null).
- `getPost(db, id)`, `createReply(db, user, postId, body)` (30/hour), `listReplies(db, postId)`.

- [ ] **Step 1:** Tests: 6th post in an hour rejected; link from 1-hour-old account rejected, from 2-day-old accepted; banned author's posts absent from `listPosts`; deleted post absent; `slugify('Lost 8kg in 3 months — my plan!')` === `'lost-8kg-in-3-months-my-plan'`; `top` sort orders by score then newest.
- [ ] **Step 2–4:** FAIL → implement → PASS.
- [ ] **Step 5:** Pages. `/community`: intro, four topic cards with latest 3 posts each, "Start a post" and "Message the owner" buttons, sign-in prompt for visitors. Topic page: list + New/Top toggle + pagination; `noindex` when `topic.indexable` is false. Post page: 404 if slug or topic mismatch → 301 to canonical URL; body rendered as text with `white-space: pre-wrap` (no Markdown, no HTML); replies; reply form for `canWrite` users. `/community/new`: topic select, title, body, Turnstile. `Disclaimer` ("Community tips are shared by members and are not medical advice. Talk to a doctor or registered dietitian before major diet or exercise changes.") on every `/community*` page. Add `{ name: 'Community', href: '/community' }` to `Header.astro` nav.
- [ ] **Step 6:** Manual check in `npm run dev`: create post in each topic, reply, view as signed-out. Commit `feat(community): topics, posts and replies`.

### Task 8: Upvotes and reports

**Files:** Create `reports.ts`, `scripts/test-community-votes.mjs`. Modify `posts.ts` (`toggleVote`), post page, `PostCard.astro`.

**Interfaces — Produces:**
- `toggleVote(db, userId, postId): Promise<{ voted: boolean; score: number }>` (insert-or-delete in `votes`, keep `posts.score` in sync in one `batch`).
- `reportItem(db, reporterId, { postId?: number; replyId?: number; reason: string })` (one open report per reporter per item), `listOpenReports(db)`, `resolveReport(db, id)`.

- [ ] **Step 1:** Tests: vote → score 1, again → 0; two users → 2; can't vote while banned; duplicate report by same user doesn't create a second row.
- [ ] **Step 2–4:** FAIL → implement → PASS.
- [ ] **Step 5:** Upvote and "Report" buttons as small POST forms on post page (and upvote count on cards). Report reasons: Spam, Harmful advice, Inappropriate photo, Other. Commit `feat(community): upvotes and reports`.

### Task 9: Photos

**Files:** Create `photos.ts`, `PhotoInput.astro`, `community/photo/[key].ts`, `scripts/test-community-photos.mjs`. Modify `community/new.astro`, `posts.ts` (`createPost` accepts `files: File[]`), post page, `PostCard.astro`.

**Interfaces — Produces:**
- `sniffImageType(bytes: Uint8Array): 'image/jpeg'|'image/png'|'image/webp'|null` (magic bytes).
- `validatePhotos(files: {size:number; bytes:Uint8Array}[], user, now?): { ok: true; types: string[] } | { ok: false; error: string }` — ≤4, ≤5 MB each, sniffed type required, user must have `email_verified` (Google users always are).
- `photoStatusFor(user, now?): 'pending'|'live'` — pending if account < 7 days.
- `savePhotos(db, bucket: R2Bucket, postId, user, files)` — key `p/<postId>/<randomToken>`; writes R2 then rows.
- `listPostPhotos(db, postId, viewer: User|null)` — live photos, plus pending ones only for author/admin.
- `listPendingPhotos(db)`, `approvePhoto(db, key)`, `rejectPhoto(db, bucket, key)` (deletes object).

- [ ] **Step 1:** Tests: PNG/JPEG/WebP headers recognised; `%PDF` bytes renamed jpg → null; 6 MB → error and `savePhotos` not called (validate before any write); 5 photos → error; unverified email user → error; 3-day-old account → `pending`, 8-day-old → `live`.
- [ ] **Step 2–4:** FAIL → implement (use a fake bucket object in tests: `{ put, delete }` recording calls) → PASS.
- [ ] **Step 5:** `PhotoInput.astro`: `<input type="file" accept="image/jpeg,image/png,image/webp" multiple>` + inline script that resizes each to max 1600px long edge, re-encodes as JPEG 0.85 via canvas, and replaces the input's files (`DataTransfer`) before submit; form `enctype="multipart/form-data"`. Server re-validates regardless. Photo route streams from R2 with `Cache-Control: public, max-age=31536000, immutable`, 404 unless live (or viewer is author/admin). Pending photos show "Waiting for approval" to the author. Commit `feat(community): photo uploads with new-account approval`.

### Task 10: Private feedback to the owner

**Files:** Create `feedback.ts`, `scripts/test-community-feedback.mjs`. Modify `account.astro`, `community/index.astro`.

**Interfaces — Produces:**
- `sendFeedback(db, user, message)` (10–3000 chars, 5 per day per user), `listFeedbackForUser(db, userId)`, `listAllFeedback(db, { unrepliedFirst: true })`, `replyToFeedback(db, id, reply)`.

- [ ] **Step 1:** Tests: user sees only their own feedback; reply appears with `replied_at`; 6th message in a day rejected.
- [ ] **Step 2–4:** FAIL → implement → PASS.
- [ ] **Step 5:** "Message the owner" form on `/account` (and linked from `/community`), listing past messages with owner replies below each. Commit `feat(community): private feedback to the owner`.

### Task 11: Admin page

**Files:** Create `src/pages/admin.astro`, `scripts/test-community-admin.mjs`. Modify `users.ts` (`isAdmin`), `posts.ts` (`deletePost`, `deleteReply` — soft delete, also used by authors).

**Interfaces — Produces:**
- `isAdmin(user, adminEmail): boolean` — `email_verified` and case-insensitive match.
- `deletePost(db, bucket, postId, actor: User, adminEmail)` — allowed for author or admin; deletes post's photos from R2.
- `deleteReply(db, replyId, actor, adminEmail)`.

- [ ] **Step 1:** Tests: unverified account with admin email is not admin; non-author non-admin delete refused; author delete works; banned user's existing session: `canWrite` false and their posts disappear from `listPosts`.
- [ ] **Step 2–4:** FAIL → implement → PASS.
- [ ] **Step 5:** `/admin` (404 for non-admins, `noindex`) with tabs: **Reports** (item preview, delete item, ban author, dismiss), **Photo queue** (approve/reject), **Feedback** (unreplied first, reply box), **Users** (search by username/email, ban/unban). Env var `ADMIN_EMAIL`. Commit `feat(community): owner admin page`.

### Task 12: Account deletion, SEO, legal pages, launch

**Files:** Modify `users.ts` (`deleteUser`), `account.astro`, `src/pages/sitemap.xml.ts`, `src/pages/privacy.astro`, `src/pages/terms.astro`, `docs/environment-variables.md`. Create `scripts/test-community-delete.mjs`.

**Interfaces — Produces:**
- `deleteUser(db, bucket, userId)` — deletes sessions, tokens, votes (recomputes scores), soft-deletes posts/replies, deletes photos from R2, sets referral code `revoked_at` and `user_id = NULL`, then deletes the user row.

- [ ] **Step 1:** Tests: after delete, `verifyCode` → invalid-by-revoked and `redeemCode` → `revoked`; their posts gone from lists; the email can sign up again and gets a new code.
- [ ] **Step 2–4:** FAIL → implement → PASS.
- [ ] **Step 5:** "Delete my account" on `/account` with a confirm step (type your username). Sitemap: add `/community`, three indexable topic pages, and every live post in indexable topics (query D1). Post pages get `DiscussionForumPosting` JSON-LD via existing `lib/seo/schema.ts` patterns.
- [ ] **Step 6:** Draft privacy/terms additions (accounts, user content and photo licence to display, Google sign-in, Resend, Cloudflare R2/D1, 18+, deletion, reporting). **Stop and show the owner the wording for approval** before merging.
- [ ] **Step 7:** Full run: `npm run test:community`, `npm run build`, `npm run check:links`, `npx wrangler d1 migrations apply fnc-community --remote` (**owner confirms** — changes production). Commit `feat(community): account deletion, sitemap and legal updates`.

---

## Owner actions collected (needed during the build)

1. Create D1 database and R2 bucket (Task 1).
2. Turnstile site + secret keys (Task 3).
3. Resend account, API key, DNS records (Task 4).
4. Google Cloud OAuth client + redirect URIs (Task 5).
5. Choose `BHASKAR_API_SECRET` and give it to the Bhaskar app (Task 6).
6. Approve legal wording; approve production migration and deploy (Task 12).
