'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@binarygarden/flora/form';
import { authClient } from '@/lib/auth-client';
import { errorText } from '@/lib/format';
import type { Dict } from '@/lib/i18n';

export function Passkeys({ t }: { t: Dict['auth'] }) {
  const { data: passkeys, refetch } = authClient.useListPasskeys();
  const [error, setError] = useState('');

  async function add() {
    const result = await authClient.passkey.addPasskey();
    if (result?.error)
      setError(errorText(t.errors, result.error, t.account.addFailed));
    else refetch();
  }

  async function remove(id: string) {
    await authClient.passkey.deletePasskey({ id });
    refetch();
  }

  return (
    <section className="col" style={{ gap: 'var(--space-3)' }}>
      <h2 className="auth-title" style={{ margin: 0 }}>
        {t.account.passkeys}
      </h2>
      {passkeys?.length ? (
        <ul className="auth-list">
          {passkeys.map((key) => (
            <li key={key.id}>
              <span>
                {key.name ?? t.account.passkey} ·{' '}
                {new Date(key.createdAt).toLocaleDateString()}
              </span>
              <Button
                variant="danger"
                size="sm"
                onClick={() => remove(key.id)}
              >
                {t.account.remove}
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="auth-note">
          {t.account.noPasskeys}
        </p>
      )}
      {error && <p className="auth-error">{error}</p>}
      <Button variant="secondary" className="full" onClick={add}>
        {t.account.addPasskey}
      </Button>
    </section>
  );
}

export function SignOutButton({ t }: { t: Dict['auth'] }) {
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
      {t.account.signOut}
    </Button>
  );
}
