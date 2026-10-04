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
      setError(error.message ?? 'something went wrong.');
    }
  }

  return (
    <div className="col" style={{ gap: 'var(--space-2)' }}>
      {error && <p className="auth-error">{error}</p>}
      <Button className="full" loading={pending} onClick={() => respond(true)}>
        allow
      </Button>
      <Button
        variant="secondary"
        className="full"
        disabled={pending}
        onClick={() => respond(false)}
      >
        deny
      </Button>
    </div>
  );
}
