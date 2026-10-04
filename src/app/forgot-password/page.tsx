import { AuthCard } from '@/components/auth/auth_card';
import { ForgotPasswordForm } from '@/components/auth/password_reset_forms';

export default function ForgotPasswordPage() {
    return (
        <AuthCard title="reset your password">
            <ForgotPasswordForm />
        </AuthCard>
    );
}
