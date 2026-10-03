import Link from 'next/link';
import { Card } from '@binarygarden/flora/ui';
import { IconArrow } from '@binarygarden/flora/icons';

export function AuthCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <main className="min-h-screen flex items-center justify-center p-4 text-(--on-background)">
            <Card variant="outlined" padding="large" className="w-full max-w-md">
                <Link
                    href="/"
                    className="mb-4 inline-flex items-center gap-1.5 text-sm text-(--on-surface) hover:text-(--primary)"
                >
                    <IconArrow orientation="left" size={14} />
                    Back to Binary Garden
                </Link>
                <h1 className="mb-6 text-2xl font-bold">{title}</h1>
                {children}
            </Card>
        </main>
    );
}
