'use client';
import { useActionState } from 'react';
import { Button, Input, Checkbox } from '@binarygarden/flora/form';
import { Badge, CopyableText } from '@binarygarden/flora/ui';
import {
  createClient,
  type CreateClientState,
} from '@/app/admin/clients/actions';
import type { Dict } from '@/lib/i18n';

export function CreateClientForm({ t }: { t: Dict }) {
  const [state, action, pending] = useActionState<CreateClientState, FormData>(
    createClient,
    {}
  );

  return (
    <form action={action} className="auth-form">
      <h2 className="auth-title" style={{ margin: 0 }}>
        {t.admin.register}
      </h2>
      <Input label={t.admin.appName} name="name" placeholder="flora" required />
      <Input
        label={t.admin.redirectUris}
        name="redirectUris"
        placeholder="https://flora.app/api/auth/callback/binarygarden"
        hint={t.admin.spaceSeparated}
        required
      />
      <Checkbox
        name="firstParty"
        defaultChecked
        label={t.admin.firstParty}
        description={t.admin.firstPartyNote}
      />
      <Checkbox
        name="publicClient"
        label={t.admin.publicClient}
        description={t.admin.publicClientNote}
      />
      {state.error && <p className="auth-error">{state.error}</p>}
      {state.clientId && (
        <div className="col" style={{ gap: 'var(--space-3)' }}>
          {state.clientSecret && (
            <Badge tone="warn" dot>
              {t.admin.copySecret}
            </Badge>
          )}
          <CopyableText
            label={t.admin.clientId}
            value={state.clientId}
            labels={t.flora.copy}
          />
          {state.clientSecret && (
            <CopyableText
              label={t.admin.clientSecret}
              value={state.clientSecret}
              labels={t.flora.copy}
            />
          )}
        </div>
      )}
      <Button type="submit" loading={pending} className="full">
        {t.admin.create}
      </Button>
    </form>
  );
}
