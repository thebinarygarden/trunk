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
        <AuthCard title={`Hi, ${user.name}`}>
            <div className="flex flex-col gap-6">
                <section className="flex flex-col gap-1 text-sm">
                    <span>{user.email}</span>
                    <CopyableText label="User ID" value={user.id} />
                </section>
                <Passkeys />
                {adminUserIds.includes(user.id) && (
                    <Link href="/admin/clients" className="text-(--link)">
                        Manage OAuth clients
                    </Link>
                )}
                <SignOutButton />
            </div>
        </AuthCard>
    );
}
