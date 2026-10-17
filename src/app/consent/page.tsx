import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { AuthCard } from '@/components/auth/auth_card';
import { ConsentButtons } from '@/components/auth/consent_buttons';
import { auth } from '@/lib/auth';
import { format } from '@/lib/format';
import { getI18n } from '@/lib/i18n';

// The OAuth provider sends signed-in users here with ?client_id=...&scope=... when an
// app that isn't marked first-party (skip_consent) asks for access.
export default async function ConsentPage({
  searchParams,
}: {
  searchParams: Promise<{ client_id?: string; scope?: string }>;
}) {
  const { client_id, scope } = await searchParams;
  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });
  if (!session || !client_id) redirect('/sign-in');

  const client = await auth.api.getOAuthClientPublic({
    query: { client_id },
    headers: requestHeaders,
  });
  const { t } = await getI18n();
  const scopes: Record<string, string> = t.auth.consent.scopes;
  const appName = client.client_name ?? t.auth.consent.anApp;

  return (
    <AuthCard title={format(t.auth.consent.title, { app: appName })}>
      <div className="col">
        <p className="auth-note">
          {format(t.auth.consent.wants, { app: appName })}
        </p>
        <ul className="scopes">
          {scope?.split(' ').map((s) => (
            <li key={s}>{scopes[s] ?? s}</li>
          ))}
        </ul>
        <p className="auth-note">
          {format(t.auth.consent.signedInAs, { email: session.user.email })}
        </p>
        <ConsentButtons t={t.auth} />
      </div>
    </AuthCard>
  );
}
