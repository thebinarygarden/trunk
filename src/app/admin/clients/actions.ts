'use server';
import { refresh } from 'next/cache';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

export type CreateClientState = { clientId?: string; clientSecret?: string; error?: string };

// Admin-only: the OAuth provider's clientPrivileges hook rejects anyone not in ADMIN_USER_IDS.
export async function createClient(_prev: CreateClientState, form: FormData): Promise<CreateClientState> {
    try {
        const client = await auth.api.adminCreateOAuthClient({
            headers: await headers(),
            body: {
                client_name: String(form.get('name')),
                redirect_uris: String(form.get('redirectUris')).split(/\s+/).filter(Boolean),
                skip_consent: form.get('firstParty') === 'on',
            },
        });
        refresh();
        return { clientId: client.client_id, clientSecret: client.client_secret };
    } catch (error) {
        return { error: error instanceof Error ? error.message : 'Could not create client.' };
    }
}
