import { SiteNav } from '@/components/site-chrome';

/**
 * Another site shown full screen under the garden's header, for older work
 * that has no product page. The header is the way back.
 */
export function ProductEmbed({ title, src }: { title: string; src: string }) {
  return (
    <>
      <SiteNav />
      <main className="product-embed">
        <iframe
          src={src}
          title={title}
          allow="autoplay; fullscreen; gamepad"
          allowFullScreen
        />
      </main>
    </>
  );
}
