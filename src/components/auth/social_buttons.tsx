'use client';
import { Button } from '@binarygarden/flora/form';
import { authClient } from '@/lib/auth-client';
import type { SocialProvider } from '@/lib/auth';

const labels: Record<SocialProvider, string> = { apple: 'Apple', google: 'Google', github: 'GitHub' };

export function SocialButtons({ providers }: { providers: SocialProvider[] }) {
    if (!providers.length) return null;
    return (
        <div className="flex flex-col gap-2">
            {providers.map((provider) => (
                <Button
                    key={provider}
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                        authClient.signIn.social({ provider, callbackURL: '/account', errorCallbackURL: '/sign-in' })
                    }
                >
                    Continue with {labels[provider]}
                </Button>
            ))}
        </div>
    );
}
