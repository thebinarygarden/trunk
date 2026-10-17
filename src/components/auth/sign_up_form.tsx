'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button, Input } from '@binarygarden/flora/form';
import { authClient } from '@/lib/auth-client';
import { SocialButtons } from '@/components/auth/social_buttons';
import type { SocialProvider } from '@/lib/auth';
import { errorText } from '@/lib/format';
import type { Dict } from '@/lib/i18n';

export function SignUpForm({
  socialProviders,
  t,
}: {
  socialProviders: SocialProvider[];
  t: Dict['auth'];
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
    if (error) setError(errorText(t.errors, error, t.signUp.failed));
    else setSentTo(email);
  }

  if (sentTo) {
    const [before, after] = t.signUp.sent.split('{email}');
    return (
      <p className="auth-note">
        {before}
        <b>{sentTo}</b>
        {after}
      </p>
    );
  }

  return (
    <div className="auth-form">
      <SocialButtons providers={socialProviders} t={t} />
      {socialProviders.length > 0 && <div className="auth-divider">{t.or}</div>}
      <form onSubmit={onSubmit} className="auth-form">
        <Input label={t.name} name="name" autoComplete="name" required />
        <Input
          label={t.email}
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <Input
          label={t.password}
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          hint={t.passwordHint}
          required
        />
        {error && <p className="auth-error">{error}</p>}
        <Button type="submit" loading={pending} className="full">
          {t.signUp.submit}
        </Button>
      </form>
      <Link href={`/sign-in${search.size ? `?${search}` : ''}`}>
        {t.signUp.haveAccount}
      </Link>
    </div>
  );
}
