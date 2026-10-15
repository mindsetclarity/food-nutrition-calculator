import { generateReferralCode } from './crypto';

type Db = D1Database;
export type RedeemResult = { ok: true } | { ok: false; reason: 'used' | 'invalid' | 'revoked' };

export async function getReferralForUser(db: Db, userId: number): Promise<{ code: string; redeemedAt: number | null } | null> {
  const row = await db
    .prepare('SELECT code, redeemed_at FROM referral_codes WHERE user_id = ?')
    .bind(userId)
    .first<{ code: string; redeemed_at: number | null }>();
  return row ? { code: row.code, redeemedAt: row.redeemed_at } : null;
}

/** Gives the user a code (idempotent). Retries code collisions up to 5 times, then throws. */
export async function issueReferralCode(db: Db, userId: number): Promise<string> {
  for (let i = 0; i < 5; i++) {
    const code = generateReferralCode();
    try {
      await db.prepare('INSERT INTO referral_codes (code, user_id, created_at) VALUES (?, ?, ?)').bind(code, userId, Date.now()).run();
      return code;
    } catch (e) {
      if (!/UNIQUE/i.test(String(e))) throw e;
      const existing = await getReferralForUser(db, userId);
      if (existing) return existing.code; // user_id clash: already has one
    }
  }
  throw new Error('could not issue a referral code');
}

/** Trim + uppercase; null for non-strings and anything too long to be a code. */
function normalise(code: unknown): string | null {
  if (typeof code !== 'string' || code.length > 32) return null;
  return code.trim().toUpperCase();
}

export async function verifyCode(db: Db, code: unknown): Promise<{ valid: boolean; memberSince?: string }> {
  const c = normalise(code);
  if (!c) return { valid: false };
  const row = await db
    .prepare('SELECT created_at FROM referral_codes WHERE code = ? AND revoked_at IS NULL')
    .bind(c)
    .first<{ created_at: number }>();
  return row ? { valid: true, memberSince: new Date(row.created_at).toISOString().slice(0, 10) } : { valid: false };
}

/** Atomic: one UPDATE decides the winner; the SELECT only picks the failure reason. */
export async function redeemCode(db: Db, code: unknown, now = Date.now()): Promise<RedeemResult> {
  const c = normalise(code);
  if (!c) return { ok: false, reason: 'invalid' };
  const r = await db
    .prepare('UPDATE referral_codes SET redeemed_at = ? WHERE code = ? AND redeemed_at IS NULL AND revoked_at IS NULL')
    .bind(now, c)
    .run();
  if (r.meta.changes) return { ok: true };
  const row = await db
    .prepare('SELECT redeemed_at, revoked_at FROM referral_codes WHERE code = ?')
    .bind(c)
    .first<{ redeemed_at: number | null; revoked_at: number | null }>();
  if (!row) return { ok: false, reason: 'invalid' };
  return { ok: false, reason: row.revoked_at ? 'revoked' : 'used' };
}
