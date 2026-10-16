'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button, Input } from '@binarygarden/flora/form';
import { authClient } from '@/lib/auth-client';
import { SocialButtons } from '@/components/auth/social_buttons';
import type { SocialProvider } from '@/lib/auth';

export function SignUpForm({
  socialProviders,
}: {
  socialProviders: SocialProvider[];
}) {
  const search = useSearchParams();
  const [error, setError] = useState('');
  const [sentTo, setSentTo] = useState('');
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email'));
    setPending(true);
    const { error } = await authClient.signUp.email({
      name: String(form.get('name')),
      email,
      password: String(form.get('password')),
      callbackURL: '/account',
    });
    setPending(false);
    if (error) setError(error.message ?? 'sign-up failed.');
    else setSentTo(email);
  }

  if (sentTo) {
    return (
      <p className="auth-note">
        sent a verification link to <b>{sentTo}</b>. open it to finish.
      </p>
    );
  }

  return (
    <div className="auth-form">
      <SocialButtons providers={socialProviders} />
      {socialProviders.length > 0 && <div className="auth-divider">or</div>}
      <form onSubmit={onSubmit} className="auth-form">
        <Input label="name" name="name" autoComplete="name" required />
        <Input
          label="email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <Input
          label="password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          hint="at least 8 characters"
          required
        />
        {error && <p className="auth-error">{error}</p>}
        <Button type="submit" loading={pending} className="full">
          create account
        </Button>
      </form>
      <Link href={`/sign-in${search.size ? `?${search}` : ''}`}>
        already have an account? sign in
      </Link>
    </div>
  );
}
