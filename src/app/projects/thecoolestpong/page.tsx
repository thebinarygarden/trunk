import type { Metadata } from 'next';
import { ProductEmbed } from '@/components/product/product-embed';

export const metadata: Metadata = { title: 'the coolest pong' };

export default function Page() {
  return (
    <ProductEmbed
      title="the coolest pong"
      src="https://thecoolestpong-q6jviphbza-uc.a.run.app"
    />
  );
}
