import { env } from 'cloudflare:workers';
import { redeemCode } from '../../../lib/community/referral';
import { referralEndpoint, methodNotAllowed } from '../../../lib/community/referralApi';

export const prerender = false;

export const POST = referralEndpoint((code) => redeemCode(env.DB, code));
export const ALL = methodNotAllowed;
