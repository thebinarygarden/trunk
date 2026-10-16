import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { jwt } from 'better-auth/plugins';
import { oauthProvider } from '@better-auth/oauth-provider';
import { passkey } from '@better-auth/passkey';
import { Pool } from 'pg';
import { appleClientSecret } from '@/lib/apple';
import { sendEmail } from '@/lib/email';

const env = process.env;
const baseURL = env.BETTER_AUTH_URL ?? 'http://localhost:3000';

// Users allowed to manage OAuth clients. Find your id on /account after signing up.
export const adminUserIds = (env.ADMIN_USER_IDS ?? '').split(',').map((id) => id.trim()).filter(Boolean);

// A provider is enabled only when its credentials are present, so local dev works with any subset.
const socialProviders = {
    ...(env.APPLE_CLIENT_ID
        ? {
              apple: {
                  clientId: env.APPLE_CLIENT_ID,
                  clientSecret: appleClientSecret({
                      clientId: env.APPLE_CLIENT_ID,
                      teamId: env.APPLE_TEAM_ID!,
                      keyId: env.APPLE_KEY_ID!,
                      privateKey: env.APPLE_PRIVATE_KEY!,
                  }),
              },
          }
        : {}),
    ...(env.GOOGLE_CLIENT_ID
        ? { google: { clientId: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET! } }
        : {}),
    ...(env.GITHUB_CLIENT_ID
        ? { github: { clientId: env.GITHUB_CLIENT_ID, clientSecret: env.GITHUB_CLIENT_SECRET! } }
        : {}),
};

export type SocialProvider = keyof typeof socialProviders;
export const enabledSocialProviders = Object.keys(socialProviders) as SocialProvider[];

export const auth = betterAuth({
    appName: 'Binary Garden',
    baseURL,
    database: new Pool({ connectionString: env.DATABASE_URL }),
    trustedOrigins: ['https://appleid.apple.com'],
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        sendResetPassword: async ({ user, url }) => {
            sendEmail(user.email, 'Reset your Binary Garden password', `Reset your password: ${url}`);
        },
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url }) => {
            sendEmail(user.email, 'Verify your Binary Garden email', `Verify your email: ${url}`);
        },
    },
    socialProviders,
    // The jwt plugin's /token mints JWTs straight from a session cookie; other apps
    // must go through the OAuth flow (/oauth2/token) instead.
    disabledPaths: ['/token'],
    plugins: [
        passkey({ rpID: new URL(baseURL).hostname, rpName: 'Binary Garden', origin: baseURL }),
        // ES256 over the EdDSA default: every JWT library verifies it, which matters
        // for backend services that will check our tokens. (It also avoids Node's
        // experimental-Ed25519 warning.)
        jwt({ jwks: { keyPairConfig: { alg: 'ES256' } } }),
        oauthProvider({
            loginPage: '/sign-in',
            consentPage: '/consent',
            // Without this hook any signed-in user could register OAuth clients.
            clientPrivileges: ({ user }) => !!user && adminUserIds.includes(user.id),
        }),
        nextCookies(), // must stay last
    ],
});
