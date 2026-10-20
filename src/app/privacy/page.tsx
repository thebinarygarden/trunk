import type { Metadata } from 'next';
import Link from 'next/link';
import { IconArrow } from '@binarygarden/flora/icons';
import { LocaleToggle } from '@/components/locale-toggle';
import { getI18n } from '@/lib/i18n';
import { PrivacyContent as En } from './content.en';
import { PrivacyContent as Es } from './content.es';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: t.legal.privacy };
}

// Keep both languages in step with what src/lib/auth.ts actually stores and who
// it talks to. English is the binding version.
export default async function PrivacyPage() {
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
