import type { Metadata } from 'next';
import { TortaPage } from '@/products/torta/torta-page';

export const metadata: Metadata = { title: 'torta' };

export default function Page() {
  return <TortaPage />;
}
