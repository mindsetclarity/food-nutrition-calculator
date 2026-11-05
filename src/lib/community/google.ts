import type { User } from './db';
import { findUserByEmail, issueCodeOrRollback } from './users';

type Db = D1Database;
export type GoogleProfile = { sub: string; email: string; emailVerified: boolean };
export type GoogleUserResult =
  | { ok: true; user: User; isNew: boolean }
  | { ok: false; error: 'email_in_use' | 'email_unverified' | 'age' };

export function googleAuthUrl(clientId: string, redirectUri: string, state: string): string {
  const q = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email',
    state,
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${q}`;
}

/** The fnc_oauth_state cookie holds `<random>` or `<random>:1` (18+ box ticked). */
export function parseOauthState(value: string | undefined): { state: string; age: boolean } {
  const [state = '', flag] = (value ?? '').split(':');
  return { state, age: flag === '1' };
}

/**
 * The id_token comes straight from Google's token endpoint over TLS, so its signature is not
 * verified; aud and iss are still checked.
 */
export async function exchangeGoogleCode(
  code: string,
  clientId: string,
  secret: string,
  redirectUri: string,
  fetchFn: typeof fetch = fetch,
): Promise<GoogleProfile | null> {
  try {
    const res = await fetchFn('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: secret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });
    if (!res.ok) return null;
    const idToken = ((await res.json()) as { id_token?: string }).id_token;
    const payload = JSON.parse(atob((idToken?.split('.')[1] ?? '').replace(/-/g, '+').replace(/_/g, '/')));
    if (payload.aud !== clientId) return null;
    if (payload.iss !== 'https://accounts.google.com' && payload.iss !== 'accounts.google.com') return null;
    if (typeof payload.sub !== 'string' || typeof payload.email !== 'string' || !payload.sub || !payload.email) return null;
    return {
      sub: payload.sub,
      email: payload.email,
      emailVerified: payload.email_verified === true || payload.email_verified === 'true',
    };
  } catch {
    return null;
  }
}

async function findUserBySub(db: Db, sub: string): Promise<User | null> {
  return db.prepare('SELECT * FROM users WHERE google_sub = ?').bind(sub).first<User>();
}

/** Existing users (by sub, or by Google-verified email) sign in freely; creating one needs the 18+ tick. */
export async function findOrCreateGoogleUser(
  db: Db,
  input: GoogleProfile & { ageConfirmed: boolean },
): Promise<GoogleUserResult> {
  const bySub = await findUserBySub(db, input.sub);
  if (bySub) return { ok: true, user: bySub, isNew: false };

  // Unverified Google emails are refused outright (reverse pre-hijack): no row may be created or linked.
  if (!input.emailVerified) return { ok: false, error: 'email_unverified' };

  const byEmail = await findUserByEmail(db, input.email);
  if (byEmail) {
    if (byEmail.google_sub) return { ok: false, error: 'email_in_use' };
    // If the email was never verified, whoever set its password may not own it: drop password and sessions.
    const stmts = [
      db
        .prepare(
          'UPDATE users SET google_sub = ?, email_verified = 1, password_hash = CASE WHEN email_verified = 1 THEN password_hash ELSE NULL END WHERE id = ?',
        )
        .bind(input.sub, byEmail.id),
    ];
    if (!byEmail.email_verified) stmts.push(db.prepare('DELETE FROM sessions WHERE user_id = ?').bind(byEmail.id));
    await db.batch(stmts);
    return { ok: true, user: (await findUserBySub(db, input.sub))!, isNew: false };
  }

  if (!input.ageConfirmed) return { ok: false, error: 'age' };
  try {
    await db
      .prepare('INSERT INTO users (email, email_verified, google_sub, created_at) VALUES (?, ?, ?, ?)')
      .bind(input.email.trim(), input.emailVerified ? 1 : 0, input.sub, Date.now())
      .run();
  } catch (e) {
    if (!/UNIQUE/i.test(String(e))) throw e;
    const raced = await findUserBySub(db, input.sub);
    return raced ? { ok: true, user: raced, isNew: false } : { ok: false, error: 'email_in_use' };
  }
  const user = (await findUserBySub(db, input.sub))!;
  await issueCodeOrRollback(db, user.id);
  return { ok: true, user, isNew: true };
}

/** Production uses the configured site URL; only DEV trusts the request origin (so localhost works). */
export function googleRedirectUri(site: URL | undefined, requestOrigin: string, dev: boolean): string {
  return `${dev || !site ? requestOrigin : site.origin}/auth/google/callback`;
}

export const OAUTH_STATE_COOKIE = 'fnc_oauth_state';
export function oauthStateCookie(value: string | null): string {
  return `${OAUTH_STATE_COOKIE}=${value ?? ''}; HttpOnly; Secure; SameSite=Lax; Path=/auth; Max-Age=${value ? 600 : 0}`;
}
