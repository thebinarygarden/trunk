'use server';
import { refresh } from 'next/cache';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

export type CreateClientState = { clientId?: string; clientSecret?: string; error?: string };

// Admin-only: the OAuth provider's clientPrivileges hook rejects anyone not in ADMIN_USER_IDS.
export async function createClient(_prev: CreateClientState, form: FormData): Promise<CreateClientState> {
    try {
        // A public client (desktop/mobile app) cannot keep a secret, so it gets none and
        // must use PKCE; the provider then ignores the port on loopback redirect uris.
        const publicClient = form.get('publicClient') === 'on';
        const client = await auth.api.adminCreateOAuthClient({
            headers: await headers(),
            body: {
                client_name: String(form.get('name')),
                redirect_uris: String(form.get('redirectUris')).split(/\s+/).filter(Boolean),
                skip_consent: form.get('firstParty') === 'on',
                ...(publicClient
                    ? { token_endpoint_auth_method: 'none', require_pkce: true, application_type: 'native' }
                    : {}),
            },
        });
        refresh();
        return { clientId: client.client_id, clientSecret: client.client_secret };
    } catch (error) {
        return { error: error instanceof Error ? error.message : 'Could not create client.' };
    }
}
