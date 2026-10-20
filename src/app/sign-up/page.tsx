import { connection } from 'next/server';
import { AuthCard } from '@/components/auth/auth-card';
import { SignUpForm } from '@/components/auth/sign-up-form';
import { enabledSocialProviders } from '@/lib/auth';
import { getI18n } from '@/lib/i18n';

export default async function SignUpPage() {
    await connection(); // providers come from runtime env, not the build
    const { t } = await getI18n();
    return (
        <AuthCard title={t.auth.signUp.title}>
            <SignUpForm socialProviders={enabledSocialProviders} t={t.auth} />
        </AuthCard>
    );
}
