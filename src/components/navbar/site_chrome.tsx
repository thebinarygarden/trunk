import { SiteHeader } from '@binarygarden/flora/navigation';
import { BGFooter } from '@binarygarden/flora/bg';
import { ThemeToggleButton } from '@binarygarden/flora/theme';
import { Button, IconButton } from '@binarygarden/flora/form';
import {
  IconAccount,
  IconBGLogo,
  IconGithub,
} from '@binarygarden/flora/icons';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const LINKS = [
  { label: 'projects', href: '#projects' },
  { label: 'flora', href: 'https://bgflora.app' },
];

const FOOTER_LINKS = [
  { label: 'projects', href: '#projects' },
  { label: 'flora', href: 'https://bgflora.app' },
  { label: 'github', href: 'https://github.com/thebinarygarden' },
  { label: 'privacy', href: '/privacy' },
  { label: 'terms', href: '/terms' },
];

/** `revealAfter`: a selector; the bar stays hidden until it scrolls away. */
/** The account icon: your account when signed in, sign in when not. */
export async function AccountButton() {
  const session = await auth.api.getSession({ headers: await headers() });
  return (
    <IconButton
      label={session ? 'account' : 'sign in'}
      href={session ? '/account' : '/sign-in'}
    >
      <IconAccount size={18} />
    </IconButton>
  );
}

export async function SiteChrome({ revealAfter }: { revealAfter?: string }) {
  return (
    <SiteHeader
      brand={
        <>
          <IconBGLogo size={24} />
          <span className="fl-header-brand-name">binary garden</span>
        </>
      }
      links={LINKS}
      revealAfter={revealAfter}
      actions={
        <>
          <ThemeToggleButton />
          <Button
            variant="secondary"
            size="sm"
            href="https://github.com/thebinarygarden"
            iconLeft={<IconGithub size={14} />}
          >
            github
          </Button>
          <AccountButton />
        </>
      }
    />
  );
}

export function SiteFoot() {
  return (
    <BGFooter
      brand={<IconBGLogo size={28} />}
      links={FOOTER_LINKS}
      legal="© 2026 binary garden · mit"
    />
  );
}
