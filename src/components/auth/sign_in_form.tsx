'use client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@binarygarden/flora/form';
import { authClient } from '@/lib/auth-client';
import { SocialButtons } from '@/components/auth/social_buttons';
import { TextField } from '@/components/auth/text_field';
import type { SocialProvider } from '@/lib/auth';

// A sign-in that continues an OAuth flow returns { redirect, url } and the auth
// client navigates there itself.
const isRedirecting = (data: unknown) => !!data && typeof data === 'object' && 'redirect' in data && !!data.redirect;

export function SignInForm({ socialProviders }: { socialProviders: SocialProvider[] }) {
    const router = useRouter();
    const search = useSearchParams();
    const [error, setError] = useState(search.has('error') ? 'Sign-in failed. Please try again.' : '');
    const [pending, setPending] = useState(false);

    // Offer saved passkeys in the email field's autofill.
    useEffect(() => {
        if (typeof PublicKeyCredential === 'undefined') return;
        void PublicKeyCredential.isConditionalMediationAvailable?.().then(async (available) => {
            if (!available) return;
            const { data, error } = await authClient.signIn.passkey({ autoFill: true });
            if (!error && !isRedirecting(data)) router.push('/account');
        });
    }, [router]);

    async function signInWithPasskey() {
        const { data, error } = await authClient.signIn.passkey();
        if (error) setError(error.message ?? 'Passkey sign-in failed.');
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
            setError(error.message ?? 'Sign-in failed.');
        }
    }

    // Keep the (signed) OAuth query when moving to sign-up so the flow can still resume.
    const query = search.size ? `?${search}` : '';

    return (
        <div className="flex flex-col gap-4">
            <SocialButtons providers={socialProviders} />
            <Button variant="outline" className="w-full" onClick={signInWithPasskey}>
                Sign in with a passkey
            </Button>
            <p className="text-center text-sm text-(--on-surface)">or</p>
            <form onSubmit={onSubmit} className="flex flex-col gap-3">
                <TextField label="Email" name="email" type="email" autoComplete="username webauthn" required />
                <TextField label="Password" name="password" type="password" autoComplete="current-password" required />
                {error && <p className="text-sm text-(--error)">{error}</p>}
                <Button type="submit" disabled={pending} className="w-full">
                    Sign in
                </Button>
            </form>
            <div className="flex justify-between text-sm">
                <Link href={`/sign-up${query}`} className="text-(--link)">
                    Create an account
                </Link>
                <Link href="/forgot-password" className="text-(--link)">
                    Forgot password?
                </Link>
            </div>
        </div>
    );
}
