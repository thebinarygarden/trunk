'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@binarygarden/flora/form';
import { authClient } from '@/lib/auth-client';
import { TextField } from '@/components/auth/text_field';

export function ForgotPasswordForm() {
    const [sentTo, setSentTo] = useState('');
    const [error, setError] = useState('');

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const email = String(new FormData(event.currentTarget).get('email'));
        const { error } = await authClient.requestPasswordReset({ email, redirectTo: '/reset-password' });
        if (error) setError(error.message ?? 'Something went wrong.');
        else setSentTo(email);
    }

    if (sentTo) return <p>If an account exists for <b>{sentTo}</b>, we sent a link to reset its password.</p>;

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <TextField label="Email" name="email" type="email" autoComplete="email" required />
            {error && <p className="text-sm text-(--error)">{error}</p>}
            <Button type="submit" className="w-full">
                Send reset link
            </Button>
        </form>
    );
}

export function ResetPasswordForm({ token }: { token?: string }) {
    const [done, setDone] = useState(false);
    const [error, setError] = useState('');

    if (!token) {
        return (
            <p>
                This reset link is invalid or has expired.{' '}
                <Link href="/forgot-password" className="text-(--link)">
                    Request a new one
                </Link>
                .
            </p>
        );
    }

    if (done) {
        return (
            <p>
                Your password was updated.{' '}
                <Link href="/sign-in" className="text-(--link)">
                    Sign in
                </Link>
                .
            </p>
        );
    }

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const newPassword = String(new FormData(event.currentTarget).get('password'));
        const { error } = await authClient.resetPassword({ newPassword, token });
        if (error) setError(error.message ?? 'Something went wrong.');
        else setDone(true);
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <TextField label="New password" name="password" type="password" autoComplete="new-password" minLength={8} required />
            {error && <p className="text-sm text-(--error)">{error}</p>}
            <Button type="submit" className="w-full">
                Set password
            </Button>
        </form>
    );
}
