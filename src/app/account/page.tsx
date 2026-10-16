import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { CopyableText } from '@binarygarden/flora/ui';
import { AuthCard } from '@/components/auth/auth_card';
import { Passkeys, SignOutButton } from '@/components/auth/account_actions';
import { adminUserIds, auth } from '@/lib/auth';

export default async function AccountPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/sign-in');
  const { user } = session;

  return (
    <AuthCard title={`hi, ${user.name}`}>
      <div className="col" style={{ gap: 'var(--space-6)' }}>
        <section className="col" style={{ gap: 'var(--space-3)' }}>
          <p className="auth-note">{user.email}</p>
          <CopyableText label="user id" value={user.id} />
        </section>
        <Passkeys />
        {adminUserIds.includes(user.id) && (
          <Link href="/admin/clients" className="auth-note">
            manage oauth clients
          </Link>
        )}
        <SignOutButton />
      </div>
    </AuthCard>
  );
}
