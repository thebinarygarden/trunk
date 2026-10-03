import { AuthCard } from '@/components/auth/auth_card';
import { ResetPasswordForm } from '@/components/auth/password_reset_forms';

// Better Auth sends users here with ?token=... (or ?error=INVALID_TOKEN).
export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
    const { token } = await searchParams;
    return (
        <AuthCard title="Choose a new password">
            <ResetPasswordForm token={token} />
        </AuthCard>
    );
}
