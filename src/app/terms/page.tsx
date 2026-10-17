import type { Metadata } from 'next';
import Link from 'next/link';
import { IconArrow } from '@binarygarden/flora/icons';
import { LocaleToggle } from '@/components/locale_toggle';
import { getI18n } from '@/lib/i18n';
import { TermsContent as En } from './content.en';
import { TermsContent as Es } from './content.es';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: t.legal.terms };
}

// English is the binding version; keep the translation in step with it.
export default async function TermsPage() {
  const { locale, t } = await getI18n();
  return (
    <main className="legal">
      <div className="auth-top">
        <Link href="/" className="auth-back">
          <IconArrow orientation="left" size={14} />
          {t.auth.back}
        </Link>
        <LocaleToggle size="sm" />
      </div>
      {locale === 'es' ? <Es /> : <En />}
    </main>
  );
}
