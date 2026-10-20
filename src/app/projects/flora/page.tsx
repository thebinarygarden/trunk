import type { Metadata } from 'next';
import { FloraPage } from '@/products/flora/flora-page';

export const metadata: Metadata = { title: 'flora' };

export default function Page() {
  return <FloraPage />;
}
