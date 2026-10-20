import { cookies } from 'next/headers';
import { LocaleToggleButton } from '@binarygarden/flora/navigation';
import { getI18n, isLocale, LOCALE_COOKIE, locales } from '@/lib/i18n';

// Each language is named in itself, so it reads the same in every locale.
const names = { en: 'english', es: 'español' };

async function setLocale(locale: string) {
  'use server';
  if (!isLocale(locale)) return;
  // Setting a cookie in a server action re-renders the page in the new locale.
  (await cookies()).set(LOCALE_COOKIE, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });
}

export async function LocaleToggle({ size }: { size?: 'sm' | 'md' }) {
  const { locale, t } = await getI18n();
  return (
    <LocaleToggleButton
      locales={locales.map((value) => ({ value, label: names[value] }))}
      value={locale}
      onChange={setLocale}
      label={t.language}
      size={size}
    />
  );
}
