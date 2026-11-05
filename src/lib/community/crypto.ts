// Web Crypto only, so it runs unchanged on Cloudflare Workers and Node.

// 100000 is the Workers maximum. Must be measured against Free-plan CPU limits at launch;
// lower stepwise (not below 50000) if p50 CPU per login is too high.
const PBKDF2_ITERATIONS = 100000;

const enc = new TextEncoder();
const b64 = (b: Uint8Array) => btoa(String.fromCharCode(...b));
const unb64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

async function derive(pw: string, salt: Uint8Array, iterations: number): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey('raw', enc.encode(pw), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations }, key, 256);
  return new Uint8Array(bits);
}

export async function hashPassword(pw: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return `pbkdf2$${PBKDF2_ITERATIONS}$${b64(salt)}$${b64(await derive(pw, salt, PBKDF2_ITERATIONS))}`;
}

export async function verifyPassword(pw: string, stored: string): Promise<boolean> {
  const [scheme, iter, salt, hash] = stored.split('$');
  const iterations = Number(iter);
  if (scheme !== 'pbkdf2' || !Number.isInteger(iterations) || iterations < 1 || !salt || !hash) return false;
  try {
    return safeEqual(b64(await derive(pw, unb64(salt), iterations)), hash);
  } catch {
    return false;
  }
}

export function randomToken(): string {
  return b64(crypto.getRandomValues(new Uint8Array(32))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export async function sha256Hex(s: string): Promise<string> {
  const d = new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(s)));
  return [...d].map((x) => x.toString(16).padStart(2, '0')).join('');
}

export function safeEqual(a: string, b: string): boolean {
  const x = enc.encode(a);
  const y = enc.encode(b);
  let diff = x.length ^ y.length;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ (y[i] ?? 0);
  return diff === 0;
}

const ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ'; // 31 chars

export function generateReferralCode(): string {
  let out = '';
  // Rejection sampling: accept bytes < 248 (31 * 8) so each char is equally likely.
  while (out.length < 8) {
    for (const b of crypto.getRandomValues(new Uint8Array(16))) {
      if (b < 248 && out.length < 8) out += ALPHABET[b % 31];
    }
  }
  return `BSK-${out}`;
}
