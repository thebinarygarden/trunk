import { SiteHeader } from '@binarygarden/flora/navigation';
import { BGFooter } from '@binarygarden/flora/bg';
import { ThemeToggleButton } from '@binarygarden/flora/theme';
import { IconButton } from '@binarygarden/flora/form';
import { IconAccount, IconBGLogo } from '@binarygarden/flora/icons';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { getI18n, type Dict } from '@/lib/i18n';
import { LocaleToggle } from '@/components/locale-toggle';

const links = (t: Dict) => [
  { label: t.nav.projects, href: '/#projects' },
  { label: t.nav.flora, href: 'https://bgflora.app' },
];

const footerLinks = (t: Dict) => [
  ...links(t),
  { label: t.nav.github, href: 'https://github.com/thebinarygarden' },
  { label: t.nav.privacy, href: '/privacy' },
  { label: t.nav.terms, href: '/terms' },
];

/** The account icon: your account when signed in, sign in when not. */
async function AccountButton() {
  const session = await auth.api.getSession({ headers: await headers() });
  const { t } = await getI18n();
  return (
    <IconButton
      label={session ? t.nav.account : t.nav.signIn}
      href={session ? '/account' : '/sign-in'}
    >
      <IconAccount size={18} />
    </IconButton>
  );
}

/** The small controls: in the header, and in the landing's corner. */
export async function SiteActions() {
  const { t } = await getI18n();
  return (
    <>
      <LocaleToggle />
      <ThemeToggleButton labels={t.flora.theme} />
      <AccountButton />
    </>
  );
}

/** `overLanding`: the page opens with a BGLanding; the bar waits until it has gone. */
export async function SiteNav({ overLanding }: { overLanding?: boolean }) {
  const { t } = await getI18n();
  return (
    <SiteHeader
      brand={
        <>
          <IconBGLogo size={24} />
          <span className="fl-header-brand-name">binary garden</span>
        </>
      }
      links={links(t)}
      overLanding={overLanding}
      labels={t.flora.header}
      actions={<SiteActions />}
    />
  );
}

export async function SiteFoot() {
  const { t } = await getI18n();
  return (
    <BGFooter
      brand={<IconBGLogo size={28} />}
      links={footerLinks(t)}
      legal={t.nav.legal}
    />
  );
}
