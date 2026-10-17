import { BGLanding } from '@binarygarden/flora/bg';
import { Button } from '@binarygarden/flora/form';
import { ThemeToggleButton } from '@binarygarden/flora/theme';
import { IconArrow, IconBGLogo, IconGithub } from '@binarygarden/flora/icons';
import BGContent from '@/components/content/bg_content';
import { LocaleToggle } from '@/components/locale_toggle';
import { getI18n } from '@/lib/i18n';
import {
  AccountButton,
  SiteChrome,
  SiteFoot,
} from '@/components/site_chrome';

export default async function Home() {
  const { t } = await getI18n();
  return (
    <>
      {/* the hero carries the nav, so the bar waits until its buttons leave */}
      <SiteChrome revealAfter=".fl-hero-actions" />
      <main>
        {/* while the header is hidden, the account icon waits where the
            header will put it: top right */}
        <div className="hero-corner">
          <AccountButton />
        </div>
        <BGLanding
          eyebrowMark={<IconBGLogo size={6} />}
          eyebrow="binary garden"
          title={
            <>
                simul sumus plus
            </>
          }
          subtitle={t.home.subtitle}
          background={
            <video
              className="landing-video"
              src="/landing-animation-temporary.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
          }
          actions={
            <>
              <Button
                size="lg"
                href="#projects"
                iconRight={<IconArrow orientation="down" size={16} />}
              >
                {t.home.explore}
              </Button>
              <Button
                size="lg"
                variant="ghost"
                href="https://github.com/thebinarygarden"
                iconLeft={<IconGithub size={16} />}
              >
                {t.home.contribute}
              </Button>
              <LocaleToggle />
              <ThemeToggleButton labels={t.flora.theme} />
            </>
          }
        />
        <BGContent />
      </main>
      <SiteFoot />
    </>
  );
}
