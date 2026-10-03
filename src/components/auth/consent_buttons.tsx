'use client';
import { useState } from 'react';
import { Button } from '@binarygarden/flora/form';
import { authClient } from '@/lib/auth-client';

// The auth client follows the redirect back to the requesting app on success.
export function ConsentButtons() {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState('');

    async function respond(accept: boolean) {
        setPending(true);
        const { error } = await authClient.oauth2.consent({ accept });
        if (error) {
            setPending(false);
            setError(error.message ?? 'Something went wrong.');
        }
    }

    return (
        <div className="flex flex-col gap-2">
            {error && <p className="text-sm text-(--error)">{error}</p>}
            <Button className="w-full" disabled={pending} onClick={() => respond(true)}>
                Allow
            </Button>
            <Button variant="outline" className="w-full" disabled={pending} onClick={() => respond(false)}>
                Deny
            </Button>
        </div>
    );
}
