import { SiteHeader } from '@binarygarden/flora/navigation';
import { BGFooter } from '@binarygarden/flora/bg';
import { ThemeToggleButton } from '@binarygarden/flora/theme';
import { Button } from '@binarygarden/flora/form';
import { IconBGLogo, IconGithub } from '@binarygarden/flora/icons';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const LINKS = [
  { label: 'projects', href: '#projects' },
  { label: 'flora', href: 'https://bgflora.app' },
  { label: 'github', href: 'https://github.com/thebinarygarden' },
];

const FOOTER_LINKS = [
  { label: 'projects', href: '#projects' },
  { label: 'flora', href: 'https://bgflora.app' },
  { label: 'github', href: 'https://github.com/thebinarygarden' },
  { label: 'account', href: '/account' },
];

export async function SiteChrome() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <SiteHeader
      brand={
        <>
          <IconBGLogo size={24} />
          <span className="fl-header-brand-name">binary garden</span>
        </>
      }
      links={LINKS}
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
          <Button size="sm" href={session ? '/account' : '/sign-in'}>
            {session ? 'account' : 'sign in'}
          </Button>
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
