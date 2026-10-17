'use client';
import { useActionState } from 'react';
import { Button, Input, Checkbox } from '@binarygarden/flora/form';
import { Badge, CopyableText } from '@binarygarden/flora/ui';
import {
  createClient,
  type CreateClientState,
} from '@/app/admin/clients/actions';

export function CreateClientForm() {
  const [state, action, pending] = useActionState<CreateClientState, FormData>(
    createClient,
    {}
  );

  return (
    <form action={action} className="auth-form">
      <h2 className="auth-title" style={{ margin: 0 }}>
        register an app
      </h2>
      <Input label="app name" name="name" placeholder="flora" required />
      <Input
        label="redirect uris"
        name="redirectUris"
        placeholder="https://flora.app/api/auth/callback/binarygarden"
        hint="space-separated"
        required
      />
      <Checkbox
        name="firstParty"
        defaultChecked
        label="first-party binary garden app"
        description="skips the consent screen"
      />
      <Checkbox
        name="publicClient"
        label="public client (desktop or mobile app)"
        description="no secret; pkce required. loopback redirect ports may vary"
      />
      {state.error && <p className="auth-error">{state.error}</p>}
      {state.clientId && (
        <div className="col" style={{ gap: 'var(--space-3)' }}>
          {state.clientSecret && (
            <Badge tone="warn" dot>
              copy the secret now — it is not shown again
            </Badge>
          )}
          <CopyableText label="client id" value={state.clientId} />
          {state.clientSecret && (
            <CopyableText label="client secret" value={state.clientSecret} />
          )}
        </div>
      )}
      <Button type="submit" loading={pending} className="full">
        create client
      </Button>
    </form>
  );
}
