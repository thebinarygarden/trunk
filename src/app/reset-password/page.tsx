import { AuthCard } from '@/components/auth/auth_card';
import { ResetPasswordForm } from '@/components/auth/password_reset_forms';
import { getI18n } from '@/lib/i18n';

// Better Auth sends users here with ?token=... (or ?error=INVALID_TOKEN).
export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
    const { token } = await searchParams;
    const { t } = await getI18n();
    return (
        <AuthCard title={t.auth.reset.title}>
            <ResetPasswordForm token={token} t={t.auth} />
        </AuthCard>
    );
}
