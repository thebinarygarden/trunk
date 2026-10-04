'use client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, Input } from '@binarygarden/flora/form';
import { authClient } from '@/lib/auth-client';
import { SocialButtons } from '@/components/auth/social_buttons';
import type { SocialProvider } from '@/lib/auth';

// A sign-in that continues an OAuth flow returns { redirect, url } and the auth
// client navigates there itself.
const isRedirecting = (data: unknown) =>
  !!data && typeof data === 'object' && 'redirect' in data && !!data.redirect;

export function SignInForm({
  socialProviders,
}: {
  socialProviders: SocialProvider[];
}) {
  const router = useRouter();
  const search = useSearchParams();
  const [error, setError] = useState(
    search.has('error') ? 'sign-in failed. try again.' : ''
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
    if (error) setError(error.message ?? 'passkey sign-in failed.');
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
      setError(error.message ?? 'sign-in failed.');
    }
  }

  // Keep the (signed) OAuth query when moving to sign-up so the flow can resume.
  const query = search.size ? `?${search}` : '';

  return (
    <div className="auth-form">
      <SocialButtons providers={socialProviders} />
      <Button variant="secondary" className="full" onClick={signInWithPasskey}>
        use a passkey
      </Button>
      <div className="auth-divider">or</div>
      <form onSubmit={onSubmit} className="auth-form">
        <Input
          label="email"
          name="email"
          type="email"
          autoComplete="username webauthn"
          required
        />
        <Input
          label="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
        {error && <p className="auth-error">{error}</p>}
        <Button type="submit" loading={pending} className="full">
          sign in
        </Button>
      </form>
      <div className="auth-foot">
        <Link href={`/sign-up${query}`}>create an account</Link>
        <Link href="/forgot-password">forgot password?</Link>
      </div>
    </div>
  );
}
