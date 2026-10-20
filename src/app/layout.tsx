import type { Metadata } from 'next';
import { Hanken_Grotesk } from 'next/font/google';
import './globals.css';
import { ScriptPreloadTheme } from '@binarygarden/flora/theme';
import { getI18n } from '@/lib/i18n';

// Self-hosted by next/font, so there is no render-blocking request to Google
// and no flash of the fallback stack. flora only names the family.
const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-hanken',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'binary garden',
  description: 'simul sumus plus',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { locale } = await getI18n();
  return (
    <html
      lang={locale}
      className={hanken.variable}
      // Next 16 leaves smooth scrolling on during route changes unless told
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <ScriptPreloadTheme />
      </head>
      <body>{children}</body>
    </html>
  );
}
