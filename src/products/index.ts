import type { Product } from '@/products/types';
import { flora } from '@/products/flora/meta';
import { torta } from '@/products/torta/meta';

/** The products on the home page, in order. Each has its own page under /projects. */
export const products: Product[] = [torta, flora];
