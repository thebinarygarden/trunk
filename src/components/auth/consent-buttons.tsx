'use client';
import { useState } from 'react';
import { Button } from '@binarygarden/flora/form';
import { authClient } from '@/lib/auth-client';
import { errorText } from '@/lib/format';
import type { Dict } from '@/lib/i18n';

// The auth client follows the redirect back to the requesting app on success.
export function ConsentButtons({ t }: { t: Dict['auth'] }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  async function respond(accept: boolean) {
    setPending(true);
    const { error } = await authClient.oauth2.consent({ accept });
    if (error) {
      setPending(false);
      setError(errorText(t.errors, error, t.errors.generic));
    }
  }

  return (
    <div className="col" style={{ gap: 'var(--space-2)' }}>
      {error && <p className="auth-error">{error}</p>}
      <Button className="full" loading={pending} onClick={() => respond(true)}>
        {t.consent.allow}
      </Button>
      <Button
        variant="secondary"
        className="full"
        disabled={pending}
        onClick={() => respond(false)}
      >
        {t.consent.deny}
      </Button>
    </div>
  );
}
