import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { AuthCard } from '@/components/auth/auth_card';
import { ConsentButtons } from '@/components/auth/consent_buttons';
import { auth } from '@/lib/auth';

const scopeDescriptions: Record<string, string> = {
    openid: 'Confirm who you are',
    profile: 'See your name and profile picture',
    email: 'See your email address',
    offline_access: 'Stay signed in without asking again',
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

    const client = await auth.api.getOAuthClientPublic({ query: { client_id }, headers: requestHeaders });
    const appName = client.client_name ?? 'An application';

    return (
        <AuthCard title={`Allow ${appName}?`}>
            <p className="mb-2">{appName} wants to use your Binary Garden account to:</p>
            <ul className="mb-4 list-disc pl-5">
                {scope?.split(' ').map((s) => <li key={s}>{scopeDescriptions[s] ?? s}</li>)}
            </ul>
            <p className="mb-4 text-sm text-(--on-surface)">Signed in as {session.user.email}</p>
            <ConsentButtons />
        </AuthCard>
    );
}
