import Link from 'next/link';
import { Card } from '@binarygarden/flora/ui';
import { IconArrow } from '@binarygarden/flora/icons';

/**
 * The shell every auth-adjacent page composes through: a centered flora Card
 * with a way back to the trunk. Bespoke to trunk — it is a composition of
 * flora parts, not a component flora should own, unless another product ever
 * hosts its own auth pages.
 */
export function AuthCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="auth-main">
      <Card padding="lg" className="auth-card">
        <Link href="/" className="auth-back">
          <IconArrow orientation="left" size={14} />
          back to binary garden
        </Link>
        <h1 className="auth-title">{title}</h1>
        {children}
      </Card>
    </main>
  );
}
