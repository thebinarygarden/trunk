import { connection } from 'next/server';
import { AuthCard } from '@/components/auth/auth_card';
import { SignUpForm } from '@/components/auth/sign_up_form';
import { enabledSocialProviders } from '@/lib/auth';

export default async function SignUpPage() {
    await connection(); // providers come from runtime env, not the build
    return (
        <AuthCard title="Create your account">
            <SignUpForm socialProviders={enabledSocialProviders} />
        </AuthCard>
    );
}
