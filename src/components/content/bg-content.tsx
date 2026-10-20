import { ProductTile } from '@binarygarden/flora/marketing';
import { products } from '@/products';
import { getI18n } from '@/lib/i18n';

export default async function BGContent() {
  const { t } = await getI18n();
  return (
    <section id="projects" className="section">
      <div className="section-head">
        <h2>{t.home.projects}</h2>
      </div>
      <div className="tile-grid">
        {products.map(({ logo: Logo, ...p }) => (
          <ProductTile
            key={p.slug}
            name={p.name}
            tagline={p.skills.join(' · ').toLowerCase()}
            hue={p.hue}
            // the video if there is one, else the icon, else two letters
            video={p.video}
            glyph={Logo ? <Logo size={80} /> : p.name.slice(0, 2)}
            meta={p.isLive ? t.home.live : t.home.inProgress}
            href={`/projects/${p.slug}`}
          />
        ))}
      </div>
    </section>
  );
}
