'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@binarygarden/flora/form';
import { authClient } from '@/lib/auth-client';

export function Passkeys() {
    const { data: passkeys, refetch } = authClient.useListPasskeys();
    const [error, setError] = useState('');

    async function add() {
        const result = await authClient.passkey.addPasskey();
        if (result?.error) setError(result.error.message ?? 'Could not add passkey.');
        else refetch();
    }

    async function remove(id: string) {
        await authClient.passkey.deletePasskey({ id });
        refetch();
    }

    return (
        <section className="flex flex-col gap-2">
            <h2 className="font-bold">Passkeys</h2>
            {passkeys?.length ? (
                <ul className="flex flex-col gap-1">
                    {passkeys.map((key) => (
                        <li key={key.id} className="flex items-center justify-between text-sm">
                            <span>
                                {key.name ?? 'Passkey'} · added {new Date(key.createdAt).toLocaleDateString()}
                            </span>
                            <button className="text-(--error)" onClick={() => remove(key.id)}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-(--on-surface)">Sign in with Face ID, Touch ID, or a security key.</p>
            )}
            {error && <p className="text-sm text-(--error)">{error}</p>}
            <Button variant="outline" className="w-full" onClick={add}>
                Add a passkey
            </Button>
        </section>
    );
}

export function SignOutButton() {
    const router = useRouter();
    return (
        <Button
            variant="secondary"
            className="w-full"
            onClick={() => authClient.signOut({ fetchOptions: { onSuccess: () => router.push('/') } })}
        >
            Sign out
        </Button>
    );
}
