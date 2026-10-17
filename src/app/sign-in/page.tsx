import { connection } from 'next/server';
import { AuthCard } from '@/components/auth/auth_card';
import { SignInForm } from '@/components/auth/sign_in_form';
import { enabledSocialProviders } from '@/lib/auth';
import { getI18n } from '@/lib/i18n';

export default async function SignInPage() {
  await connection(); // providers come from runtime env, not the build
  const { t } = await getI18n();
  return (
    <AuthCard title={t.auth.signIn.title}>
      <SignInForm socialProviders={enabledSocialProviders} t={t.auth} />
    </AuthCard>
  );
}
