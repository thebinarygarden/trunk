'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@binarygarden/flora/form';
import { authClient } from '@/lib/auth-client';
import { SocialButtons } from '@/components/auth/social_buttons';
import { TextField } from '@/components/auth/text_field';
import type { SocialProvider } from '@/lib/auth';

export function SignUpForm({ socialProviders }: { socialProviders: SocialProvider[] }) {
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
        if (error) setError(error.message ?? 'Sign-up failed.');
        else setSentTo(email);
    }

    if (sentTo) {
        return (
            <p>
                We sent a verification link to <b>{sentTo}</b>. Open it to finish creating your account.
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <SocialButtons providers={socialProviders} />
            <p className="text-center text-sm text-(--on-surface)">or</p>
            <form onSubmit={onSubmit} className="flex flex-col gap-3">
                <TextField label="Name" name="name" autoComplete="name" required />
                <TextField label="Email" name="email" type="email" autoComplete="email" required />
                <TextField label="Password" name="password" type="password" autoComplete="new-password" minLength={8} required />
                {error && <p className="text-sm text-(--error)">{error}</p>}
                <Button type="submit" disabled={pending} className="w-full">
                    Create account
                </Button>
            </form>
            <Link href={`/sign-in${search.size ? `?${search}` : ''}`} className="text-sm text-(--link)">
                Already have an account? Sign in
            </Link>
        </div>
    );
}
