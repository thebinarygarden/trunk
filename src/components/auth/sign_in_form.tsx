'use client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, Input } from '@binarygarden/flora/form';
import { authClient } from '@/lib/auth-client';
import { SocialButtons } from '@/components/auth/social_buttons';
import type { SocialProvider } from '@/lib/auth';
import { errorText } from '@/lib/format';
import type { Dict } from '@/lib/i18n';

// A sign-in that continues an OAuth flow returns { redirect, url } and the auth
// client navigates there itself.
const isRedirecting = (data: unknown) =>
  !!data && typeof data === 'object' && 'redirect' in data && !!data.redirect;

export function SignInForm({
  socialProviders,
  t,
}: {
  socialProviders: SocialProvider[];
  t: Dict['auth'];
}) {
  const router = useRouter();
  const search = useSearchParams();
  const [error, setError] = useState(
    search.has('error') ? t.signIn.retry : ''
  );
  const [pending, setPending] = useState(false);

  // Offer saved passkeys in the email field's autofill.
  useEffect(() => {
    if (typeof PublicKeyCredential === 'undefined') return;
    void PublicKeyCredential.isConditionalMediationAvailable?.().then(
      async (available) => {
        if (!available) return;
        const { data, error } = await authClient.signIn.passkey({
          autoFill: true,
        });
        if (!error && !isRedirecting(data)) router.push('/account');
      }
    );
  }, [router]);

  async function signInWithPasskey() {
    const { data, error } = await authClient.signIn.passkey();
    if (error) setError(errorText(t.errors, error, t.signIn.passkeyFailed));
    else if (!isRedirecting(data)) router.push('/account');
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setPending(true);
    const { error } = await authClient.signIn.email({
      email: String(form.get('email')),
      password: String(form.get('password')),
      callbackURL: '/account',
    });
    if (error) {
      setPending(false);
      setError(errorText(t.errors, error, t.signIn.failed));
    }
  }

  // Keep the (signed) OAuth query when moving to sign-up so the flow can resume.
  const query = search.size ? `?${search}` : '';

  return (
    <div className="auth-form">
      <SocialButtons providers={socialProviders} t={t} />
      <Button variant="secondary" className="full" onClick={signInWithPasskey}>
        {t.signIn.passkey}
      </Button>
      <div className="auth-divider">{t.or}</div>
      <form onSubmit={onSubmit} className="auth-form">
        <Input
          label={t.email}
          name="email"
          type="email"
          autoComplete="username webauthn"
          required
        />
        <Input
          label={t.password}
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
        {error && <p className="auth-error">{error}</p>}
        <Button type="submit" loading={pending} className="full">
          {t.signIn.submit}
        </Button>
      </form>
      <div className="auth-foot">
        <Link href={`/sign-up${query}`}>{t.signIn.createAccount}</Link>
        <Link href="/forgot-password">{t.signIn.forgot}</Link>
      </div>
    </div>
  );
}
