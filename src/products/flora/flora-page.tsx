import { Button } from '@binarygarden/flora/form';
import { IconGithub, IconLinkOut } from '@binarygarden/flora/icons';
import { ProductPage } from '@/components/product/product-page';
import { getI18n, type Locale } from '@/lib/i18n';
import { flora } from '@/products/flora/meta';
import en from '@/products/flora/copy.en.json';
import es from '@/products/flora/copy.es.json';

// Typed against English, so a key missing from copy.es.json fails the build.
const copy: Record<Locale, typeof en> = { en, es };

// bgflora.app already shows everything, so this page only points there.
export async function FloraPage() {
  const { locale, t } = await getI18n();
  const c = copy[locale];
  return (
    <ProductPage
      product={flora}
      title={c.title}
      subtitle={c.subtitle}
      actions={
        <>
          <Button
            size="lg"
            href="https://bgflora.app"
            iconRight={<IconLinkOut size={16} />}
          >
            {c.open}
          </Button>
          <Button
            size="lg"
            variant="secondary"
            href="https://github.com/thebinarygarden/flora"
            iconLeft={<IconGithub size={16} />}
          >
            {t.product.source}
          </Button>
        </>
      }
    />
  );
}
