'use client';
import { Button } from '@binarygarden/flora/form';
import { IconGithub } from '@binarygarden/flora/icons';
import { authClient } from '@/lib/auth-client';
import type { SocialProvider } from '@/lib/auth';
import { format } from '@/lib/format';
import type { Dict } from '@/lib/i18n';

const labels: Record<SocialProvider, string> = {
  apple: 'apple',
  google: 'google',
  github: 'github',
};

// flora only ships a github mark; google and apple stay text-only until it has
// provider icons. That is the one thing keeping this component out of flora.
const icons: Partial<Record<SocialProvider, React.ReactNode>> = {
  github: <IconGithub size={16} />,
};

export function SocialButtons({
  providers,
  t,
}: {
  providers: SocialProvider[];
  t: Dict['auth'];
}) {
  if (!providers.length) return null;
  return (
    <div className="col" style={{ gap: 'var(--space-2)' }}>
      {providers.map((provider) => (
        <Button
          key={provider}
          variant="secondary"
          className="full"
          iconLeft={icons[provider]}
          onClick={() =>
            authClient.signIn.social({
              provider,
              callbackURL: '/account',
              errorCallbackURL: '/sign-in',
            })
          }
        >
          {format(t.continueWith, { provider: labels[provider] })}
        </Button>
      ))}
    </div>
  );
}
