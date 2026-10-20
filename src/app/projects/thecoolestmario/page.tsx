import type { Metadata } from 'next';
import { ProductEmbed } from '@/components/product/product-embed';

export const metadata: Metadata = { title: 'the coolest mario' };

export default function Page() {
  return (
    <ProductEmbed
      title="the coolest mario"
      src="https://thecoolestmario-q6jviphbza-uc.a.run.app"
    />
  );
}
