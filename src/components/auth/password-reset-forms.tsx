'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Button, Input } from '@binarygarden/flora/form';
import { authClient } from '@/lib/auth-client';
import { errorText } from '@/lib/format';
import type { Dict } from '@/lib/i18n';

export function ForgotPasswordForm({ t }: { t: Dict['auth'] }) {
  const [sentTo, setSentTo] = useState('');
  const [error, setError] = useState('');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get('email'));
    const { error } = await authClient.requestPasswordReset({
      email,
      redirectTo: '/reset-password',
    });
    if (error) setError(errorText(t.errors, error, t.errors.generic));
    else setSentTo(email);
  }

  if (sentTo) {
    const [before, after] = t.forgot.sent.split('{email}');
    return (
      <p className="auth-note">
        {before}
        <b>{sentTo}</b>
        {after}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="auth-form">
      <Input
        label={t.email}
        name="email"
        type="email"
        autoComplete="email"
        required
      />
      {error && <p className="auth-error">{error}</p>}
      <Button type="submit" className="full">
        {t.forgot.submit}
      </Button>
    </form>
  );
}

export function ResetPasswordForm({
  token,
  t,
}: {
  token?: string;
  t: Dict['auth'];
}) {
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newPassword = String(
      new FormData(event.currentTarget).get('password')
    );
    const { error } = await authClient.resetPassword({ newPassword, token });
    if (error) setError(errorText(t.errors, error, t.errors.generic));
    else setDone(true);
  }

  if (!token) {
    return (
      <p className="auth-note">
        {t.reset.invalid}{' '}
        <Link href="/forgot-password">{t.reset.requestNew}</Link>.
      </p>
    );
  }

  if (done) {
    return (
      <p className="auth-note">
        {t.reset.done} <Link href="/sign-in">{t.reset.signIn}</Link>.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="auth-form">
      <Input
        label={t.newPassword}
        name="password"
        type="password"
        autoComplete="new-password"
        minLength={8}
        hint={t.passwordHint}
        required
      />
      {error && <p className="auth-error">{error}</p>}
      <Button type="submit" className="full">
        {t.reset.submit}
      </Button>
    </form>
  );
}
