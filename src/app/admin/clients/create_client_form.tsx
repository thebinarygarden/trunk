'use client';
import { useActionState } from 'react';
import { Button } from '@binarygarden/flora/form';
import { CopyableText } from '@binarygarden/flora/ui';
import { TextField } from '@/components/auth/text_field';
import { createClient, type CreateClientState } from '@/app/admin/clients/actions';

export function CreateClientForm() {
    const [state, action, pending] = useActionState<CreateClientState, FormData>(createClient, {});

    return (
        <form action={action} className="flex flex-col gap-3">
            <h2 className="font-bold">Register an app</h2>
            <TextField label="App name" name="name" placeholder="Flora" required />
            <TextField
                label="Redirect URIs (space-separated)"
                name="redirectUris"
                placeholder="https://flora.app/api/auth/callback/binarygarden"
                required
            />
            <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="firstParty" defaultChecked />
                First-party Binary Garden app (skip the consent screen)
            </label>
            {state.error && <p className="text-sm text-(--error)">{state.error}</p>}
            {state.clientId && (
                <div className="flex flex-col gap-1 text-sm">
                    <p className="text-(--warning)">Copy the secret now; it won&apos;t be shown again.</p>
                    <CopyableText label="Client ID" value={state.clientId} />
                    {state.clientSecret && <CopyableText label="Client secret" value={state.clientSecret} />}
                </div>
            )}
            <Button type="submit" disabled={pending} className="w-full">
                Create client
            </Button>
        </form>
    );
}
