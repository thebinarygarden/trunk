import type { ReactNode } from 'react';
import { Hero } from '@binarygarden/flora/marketing';
import { ProductScope } from '@binarygarden/flora/theme';
import { SiteNav, SiteFoot } from '@/components/site-chrome';
import type { Product } from '@/products/types';

/**
 * The frame every product page shares. Everything inside takes the product's
 * hue; the header and footer stay monochrome. Above the headline is the
 * product's video, or its logo when it has none. The product's own sections
 * go in `children`, usually as `ProductSection`s.
 */
export function ProductPage({
  product,
  title,
  subtitle,
  actions,
  children,
}: {
  product: Product;
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
}) {
  const Logo = product.logo;
  return (
    <>
      <SiteNav />
      <ProductScope hue={product.hue}>
        <main className="product">
          <div className="product-top">
            {product.video ? (
              <div className="product-video">
                <video src={product.video} autoPlay muted loop playsInline />
              </div>
            ) : (
              Logo && (
                <div className="product-logo">
                  <Logo size={136} />
                </div>
              )
            )}
          </div>
          <Hero
            align="center"
            eyebrow={product.name}
            title={title}
            subtitle={subtitle}
            actions={actions}
          />
          {children}
        </main>
      </ProductScope>
      <SiteFoot />
    </>
  );
}

/** A titled section of a product page, laid out like the home page's. */
export function ProductSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="section">
      <div className="section-head">
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}
