import { connection } from 'next/server';
import { AuthCard } from '@/components/auth/auth_card';
import { SignInForm } from '@/components/auth/sign_in_form';
import { enabledSocialProviders } from '@/lib/auth';

export default async function SignInPage() {
    await connection(); // providers come from runtime env, not the build
    return (
        <AuthCard title="Sign in">
            <SignInForm socialProviders={enabledSocialProviders} />
        </AuthCard>
    );
}
