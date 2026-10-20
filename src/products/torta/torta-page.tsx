import { Button } from '@binarygarden/flora/form';
import { Card } from '@binarygarden/flora/ui';
import { IconGithub } from '@binarygarden/flora/icons';
import { DesktopDownloads } from '@/components/product/desktop-downloads';
import { ProductPage, ProductSection } from '@/components/product/product-page';
import { getI18n, type Locale } from '@/lib/i18n';
import { torta } from '@/products/torta/meta';
import en from '@/products/torta/copy.en.json';
import es from '@/products/torta/copy.es.json';

// Typed against English, so a key missing from copy.es.json fails the build.
const copy: Record<Locale, typeof en> = { en, es };

const repo = 'https://github.com/thebinarygarden/torta';

// The release workflow names every installer the same way each release, so
// /latest/download always points at the newest one.
const download = (file: string) => `${repo}/releases/latest/download/${file}`;
const links = {
  macArm: download('torta-mac-arm64.dmg'),
  macIntel: download('torta-mac-x64.dmg'),
  windows: download('torta-windows.exe'),
  linux: download('torta-linux.AppImage'),
};

export async function TortaPage() {
  const { locale, t } = await getI18n();
  const c = copy[locale];
  return (
    <ProductPage
      product={torta}
      title={c.title}
      actions={
        <>
          <DesktopDownloads
            links={links}
            releases={`${repo}/releases/latest`}
            t={t.product}
          />
          <Button
            size="lg"
            variant="secondary"
            href={repo}
            iconLeft={<IconGithub size={16} />}
          >
            {t.product.source}
          </Button>
        </>
      }
    >
      <ProductSection title={c.features.title}>
        <div className="feature-grid">
          {c.features.items.map((f) => (
            <Card key={f.title} title={f.title} description={f.body} />
          ))}
        </div>
      </ProductSection>
    </ProductPage>
  );
}
