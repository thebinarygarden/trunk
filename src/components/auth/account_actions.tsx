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
    if (result?.error) setError(result.error.message ?? 'could not add passkey.');
    else refetch();
  }

  async function remove(id: string) {
    await authClient.passkey.deletePasskey({ id });
    refetch();
  }

  return (
    <section className="col" style={{ gap: 'var(--space-3)' }}>
      <h2 className="auth-title" style={{ margin: 0 }}>
        passkeys
      </h2>
      {passkeys?.length ? (
        <ul className="auth-list">
          {passkeys.map((key) => (
            <li key={key.id}>
              <span>
                {key.name ?? 'passkey'} ·{' '}
                {new Date(key.createdAt).toLocaleDateString()}
              </span>
              <Button
                variant="danger"
                size="sm"
                onClick={() => remove(key.id)}
              >
                remove
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="auth-note">
          sign in with face id, touch id, or a security key.
        </p>
      )}
      {error && <p className="auth-error">{error}</p>}
      <Button variant="secondary" className="full" onClick={add}>
        add a passkey
      </Button>
    </section>
  );
}

export function SignOutButton() {
  const router = useRouter();
  return (
    <Button
      variant="secondary"
      className="full"
      onClick={() =>
        authClient.signOut({
          fetchOptions: { onSuccess: () => router.push('/') },
        })
      }
    >
      sign out
    </Button>
  );
}
