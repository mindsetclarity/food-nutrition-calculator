import { env } from 'cloudflare:workers';
import { verifyCode } from '../../../lib/community/referral';
import { referralEndpoint, methodNotAllowed } from '../../../lib/community/referralApi';

export const prerender = false;

export const POST = referralEndpoint((code) => verifyCode(env.DB, code));
export const ALL = methodNotAllowed;
