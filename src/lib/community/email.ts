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
