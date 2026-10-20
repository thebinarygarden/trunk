import type { ComponentType } from 'react';

export interface Product {
  /** its page is /projects/<slug> */
  slug: string;
  name: string;
  /** oklch hue 0–360 — the product's one colour on the trunk. Omit it for a
   *  binary garden product of its own, which stays monochrome. */
  hue?: number;
  skills: string[];
  isLive: boolean;
  /** a looping clip; when set, it opens the page and fills the tile instead of the logo */
  video?: string;
  /** the product's icon, from flora */
  logo?: ComponentType<{ size?: number }>;
}
