import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { CopyableText } from '@binarygarden/flora/ui';
import { AuthCard } from '@/components/auth/auth-card';
import { Passkeys, SignOutButton } from '@/components/auth/account-actions';
import { adminUserIds, auth } from '@/lib/auth';
import { format } from '@/lib/format';
import { getI18n } from '@/lib/i18n';

export default async function AccountPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/sign-in');
  const { user } = session;
  const { t } = await getI18n();

  return (
    <AuthCard title={format(t.auth.account.hi, { name: user.name })}>
      <div className="col" style={{ gap: 'var(--space-6)' }}>
        <section className="col" style={{ gap: 'var(--space-3)' }}>
          <p className="auth-note">{user.email}</p>
          <CopyableText
            label={t.auth.account.userId}
            value={user.id}
            labels={t.flora.copy}
          />
        </section>
        <Passkeys t={t.auth} />
        {adminUserIds.includes(user.id) && (
          <Link href="/admin/clients" className="auth-note">
            {t.auth.account.manageClients}
          </Link>
        )}
        <SignOutButton t={t.auth} />
      </div>
    </AuthCard>
  );
}
