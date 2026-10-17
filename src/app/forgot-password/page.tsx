import { AuthCard } from '@/components/auth/auth_card';
import { ForgotPasswordForm } from '@/components/auth/password_reset_forms';
import { getI18n } from '@/lib/i18n';

export default async function ForgotPasswordPage() {
    const { t } = await getI18n();
    return (
        <AuthCard title={t.auth.forgot.title}>
            <ForgotPasswordForm t={t.auth} />
        </AuthCard>
    );
}
