// Safe in client components: no server imports. See flora/docs/I18N.md.

/** Fills `{name}` placeholders: format('hi, {name}', { name }) */
export const format = (s: string, vars: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));

/** A Better Auth error in the reader's language, by its code (passkey errors may have none). */
export const errorText = (
  errors: Record<string, string>,
  error: object,
  fallback: string
) => ('code' in error && errors[String(error.code)]) || fallback;
