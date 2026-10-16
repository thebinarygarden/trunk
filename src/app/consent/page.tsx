import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { AuthCard } from '@/components/auth/auth_card';
import { ConsentButtons } from '@/components/auth/consent_buttons';
import { auth } from '@/lib/auth';

const scopeDescriptions: Record<string, string> = {
  openid: 'confirm who you are',
  profile: 'see your name and profile picture',
  email: 'see your email address',
  offline_access: 'stay signed in without asking again',
};

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
  const appName = client.client_name ?? 'an application';

  return (
    <AuthCard title={`allow ${appName}?`}>
      <div className="col">
        <p className="auth-note">
          {appName} wants to use your binary garden account to:
        </p>
        <ul className="scopes">
          {scope?.split(' ').map((s) => (
            <li key={s}>{scopeDescriptions[s] ?? s}</li>
          ))}
        </ul>
        <p className="auth-note">signed in as {session.user.email}</p>
        <ConsentButtons />
      </div>
    </AuthCard>
  );
}
