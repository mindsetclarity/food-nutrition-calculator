const RESERVED = new Set(['admin', 'owner', 'bhaskar']);

/** Returns an error message, or null when the username is acceptable. */
export function validateUsername(name: string): string | null {
  if (!/^[A-Za-z0-9_]{3,20}$/.test(name)) return 'Username must be 3-20 letters, numbers or underscores.';
  if (RESERVED.has(name.toLowerCase())) return 'That username is not available.';
  return null;
}
