export async function verifyTurnstile(secret: string, token: string, ip: string | null): Promise<boolean> {
  if (!secret) return import.meta.env.DEV; // R3: dev-only bypass; prod with no secret rejects
  if (!token) return false;
  const body = new FormData();
  body.set('secret', secret);
  body.set('response', token);
  if (ip) body.set('remoteip', ip);
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
    return ((await res.json()) as { success?: boolean }).success === true;
  } catch {
    return false;
  }
}
