import { createPrivateKey, sign } from 'node:crypto';

const SIX_MONTHS_MINUS_A_FEW_DAYS = 180 * 24 * 60 * 60;

// Apple's OAuth client secret is an ES256 JWT signed with your .p8 key, and Apple
// rejects any that expire more than ~6 months out. Minting it at boot (every deploy
// or new instance) means it never has to be rotated by hand.
export function appleClientSecret(opts: { clientId: string; teamId: string; keyId: string; privateKey: string }) {
    const now = Math.floor(Date.now() / 1000);
    const encode = (part: object) => Buffer.from(JSON.stringify(part)).toString('base64url');
    const header = encode({ alg: 'ES256', kid: opts.keyId });
    const payload = encode({
        iss: opts.teamId,
        sub: opts.clientId,
        aud: 'https://appleid.apple.com',
        iat: now,
        exp: now + SIX_MONTHS_MINUS_A_FEW_DAYS,
    });
    const key = createPrivateKey(opts.privateKey.replace(/\\n/g, '\n'));
    const signature = sign('sha256', Buffer.from(`${header}.${payload}`), { key, dsaEncoding: 'ieee-p1363' });
    return `${header}.${payload}.${signature.toString('base64url')}`;
}
