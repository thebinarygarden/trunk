import { AuthCard } from '@/components/auth/auth-card';
import { ForgotPasswordForm } from '@/components/auth/password-reset-forms';
import { getI18n } from '@/lib/i18n';

export default async function ForgotPasswordPage() {
    const { t } = await getI18n();
    return (
        <AuthCard title={t.auth.forgot.title}>
            <ForgotPasswordForm t={t.auth} />
        </AuthCard>
    );
}
