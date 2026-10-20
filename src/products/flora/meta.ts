import { IconFlora } from '@binarygarden/flora/icons';
import type { Product } from '@/products/types';

// no hue: flora is binary garden's own, so it stays monochrome
export const flora: Product = {
  slug: 'flora',
  name: 'flora',
  skills: ['TypeScript', 'React', 'CSS'],
  isLive: true,
  logo: IconFlora,
};
