'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Button, Input } from '@binarygarden/flora/form';
import { authClient } from '@/lib/auth-client';

export function ForgotPasswordForm() {
  const [sentTo, setSentTo] = useState('');
  const [error, setError] = useState('');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get('email'));
    const { error } = await authClient.requestPasswordReset({
      email,
      redirectTo: '/reset-password',
    });
    if (error) setError(error.message ?? 'something went wrong.');
    else setSentTo(email);
  }

  if (sentTo)
    return (
      <p className="auth-note">
        if an account exists for <b>{sentTo}</b>, a reset link is on its way.
      </p>
    );

  return (
    <form onSubmit={onSubmit} className="auth-form">
      <Input
        label="email"
        name="email"
        type="email"
        autoComplete="email"
        required
      />
      {error && <p className="auth-error">{error}</p>}
      <Button type="submit" className="full">
        send reset link
      </Button>
    </form>
  );
}

export function ResetPasswordForm({ token }: { token?: string }) {
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newPassword = String(
      new FormData(event.currentTarget).get('password')
    );
    const { error } = await authClient.resetPassword({ newPassword, token });
    if (error) setError(error.message ?? 'something went wrong.');
    else setDone(true);
  }

  if (!token) {
    return (
      <p className="auth-note">
        this link is invalid or has expired.{' '}
        <Link href="/forgot-password">request a new one</Link>.
      </p>
    );
  }

  if (done) {
    return (
      <p className="auth-note">
        password updated. <Link href="/sign-in">sign in</Link>.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="auth-form">
      <Input
        label="new password"
        name="password"
        type="password"
        autoComplete="new-password"
        minLength={8}
        hint="at least 8 characters"
        required
      />
      {error && <p className="auth-error">{error}</p>}
      <Button type="submit" className="full">
        set password
      </Button>
    </form>
  );
}
