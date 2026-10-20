import type { ReactNode } from 'react';
import { headers } from 'next/headers';
import { SplitButton } from '@binarygarden/flora/form';
import {
  IconApple,
  IconLinux,
  IconWindows,
} from '@binarygarden/flora/icons';
import { format } from '@/lib/format';
import type { Dict } from '@/lib/i18n';
import { detectDesktopOs, type DesktopOs } from '@/lib/platform';

export type DesktopPlatform = keyof Dict['product']['platforms'];

const platforms: { id: DesktopPlatform; os: DesktopOs; icon: ReactNode }[] = [
  { id: 'macArm', os: 'mac', icon: <IconApple size={14} /> },
  { id: 'macIntel', os: 'mac', icon: <IconApple size={14} /> },
  { id: 'windows', os: 'windows', icon: <IconWindows size={14} /> },
  { id: 'linux', os: 'linux', icon: <IconLinux size={14} /> },
];

/**
 * The download button for a desktop app. Its face downloads the build for the
 * visitor's OS (Apple silicon on a Mac, since a browser can't reliably tell it
 * from Intel); the caret lists every platform, with the visitor's highlighted
 * (underlined). Phones and unknown systems get a plain "download" that opens `releases`.
 */
export async function DesktopDownloads({
  links,
  releases,
  t,
}: {
  links: Record<DesktopPlatform, string>;
  /** the page listing every download */
  releases: string;
  t: Dict['product'];
}) {
  const os = detectDesktopOs((await headers()).get('user-agent'));
  const primary = os && platforms.find((p) => p.os === os)!;

  return (
    <SplitButton
      size="lg"
      href={primary ? links[primary.id] : releases}
      iconLeft={primary?.icon}
      items={platforms.map((p) => ({
        label: t.platforms[p.id],
        href: links[p.id],
        icon: p.icon,
        highlighted: p.os === os,
      }))}
      labels={{ more: t.moreDownloads }}
    >
      {primary
        ? format(t.downloadFor, { os: t.platforms[primary.id] })
        : t.download}
    </SplitButton>
  );
}
