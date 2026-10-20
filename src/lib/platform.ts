export type DesktopOs = 'mac' | 'windows' | 'linux';

/**
 * The desktop OS a User-Agent names, or null for phones, tablets and anything
 * unrecognised. iPads report themselves as macOS, so they count as a mac here;
 * Android names Linux, so it is checked first.
 */
export function detectDesktopOs(userAgent: string | null): DesktopOs | null {
  const ua = userAgent ?? '';
  if (/android|iphone|ipod|mobile/i.test(ua)) return null;
  if (/windows/i.test(ua)) return 'windows';
  if (/macintosh|mac os x/i.test(ua)) return 'mac';
  if (/linux|x11/i.test(ua)) return 'linux';
  return null;
}
