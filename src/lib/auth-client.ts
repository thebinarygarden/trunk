import { createAuthClient } from 'better-auth/react';
import { oauthProviderClient } from '@better-auth/oauth-provider/client';
import { passkeyClient } from '@better-auth/passkey/client';

// oauthProviderClient forwards the signed OAuth query on the current URL with every
// sign-in request, so a login that started at another app resumes back to it.
export const authClient = createAuthClient({
    plugins: [passkeyClient(), oauthProviderClient()],
});
