import { cookies, headers } from 'next/headers';
import en from '@/i18n/en.json';
import es from '@/i18n/es.json';

// The convention every garden app follows is in flora/docs/I18N.md.

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export type Dict = typeof en;

// Typed against English, so a key missing from es.json fails the build.
const dictionaries: Record<Locale, Dict> = { en, es };

export const LOCALE_COOKIE = 'locale';

export const isLocale = (value: unknown): value is Locale =>
  locales.includes(value as Locale);

/** The first supported language in a list like Accept-Language's. */
const matchLocale = (candidates: string[]): Locale =>
  candidates
    .map((c) => c.trim().slice(0, 2).toLowerCase())
    .find(isLocale) ?? 'en';

const fromAcceptLanguage = (header: string | null) =>
  matchLocale((header ?? '').split(',').map((part) => part.split(';')[0]));

/** The reader's locale and dictionary: the cookie, else the browser's language. */
export async function getI18n() {
  const saved = (await cookies()).get(LOCALE_COOKIE)?.value;
  const locale = isLocale(saved)
    ? saved
    : fromAcceptLanguage((await headers()).get('accept-language'));
  return { locale, t: dictionaries[locale] };
}

/**
 * For Better Auth callbacks, which get the raw request (or none, when called
 * from the server API). Falls back to English.
 */
export function dictionaryFor(request?: Request) {
  if (!request) return dictionaries.en;
  const saved = request.headers
    .get('cookie')
    ?.match(new RegExp(`(?:^|;\\s*)${LOCALE_COOKIE}=(\\w+)`))?.[1];
  const locale = isLocale(saved)
    ? saved
    : fromAcceptLanguage(request.headers.get('accept-language'));
  return dictionaries[locale];
}
