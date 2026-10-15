import { createEmailToken } from './tokens';

const FROM = 'Food Nutrition Calculator <community@foodnutritioncalculator.com>';

/** Sends via Resend. With no API key: logs the email and succeeds in dev, fails in prod. */
export async function sendEmail(
  apiKey: string | undefined,
  msg: { to: string; subject: string; text: string },
): Promise<boolean> {
  if (!apiKey) {
    if (!import.meta.env?.DEV) return false;
    console.log(`[dev email] to=${msg.to} subject=${msg.subject}\n${msg.text}`);
    return true;
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM, ...msg }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Creates a verify token and emails the link. Shared by signup and "resend". */
export async function sendVerifyEmail(
  db: D1Database,
  user: { id: number; email: string },
  origin: string,
  apiKey: string | undefined,
): Promise<boolean> {
  const link = `${origin}/verify-email?token=${await createEmailToken(db, user.id, 'verify')}`;
  return sendEmail(apiKey, {
    to: user.email,
    subject: 'Verify your email',
    text: `Welcome to the Food Nutrition Calculator community.\n\nVerify your email: ${link}\n\nThis link works for 24 hours.`,
  });
}
