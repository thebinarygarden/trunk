import Link from 'next/link';
import { Card } from '@binarygarden/flora/ui';
import { IconArrow } from '@binarygarden/flora/icons';
import { LocaleToggle } from '@/components/locale-toggle';
import { getI18n } from '@/lib/i18n';

/**
 * The shell every auth-adjacent page composes through: a centered flora Card
 * with a way back to the trunk. Bespoke to trunk — it is a composition of
 * flora parts, not a component flora should own, unless another product ever
 * hosts its own auth pages.
 */
export async function AuthCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const { t } = await getI18n();
  return (
    <main className="auth-main">
      <Card padding="lg" className="auth-card">
        <div className="auth-top">
          <Link href="/" className="auth-back">
            <IconArrow orientation="left" size={14} />
            {t.auth.back}
          </Link>
          <LocaleToggle size="sm" />
        </div>
        <h1 className="auth-title">{title}</h1>
        {children}
      </Card>
    </main>
  );
}
