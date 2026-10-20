import { BGLanding } from '@binarygarden/flora/bg';
import { Button } from '@binarygarden/flora/form';
import { IconArrow, IconBGLogo, IconGithub } from '@binarygarden/flora/icons';
import BGContent from '@/components/content/bg-content';
import { getI18n } from '@/lib/i18n';
import { SiteActions, SiteNav, SiteFoot } from '@/components/site-chrome';

export default async function Home() {
  const { t } = await getI18n();
  return (
    <>
      {/* the hero carries the nav, so the bar waits until it has gone; the
          small controls sit in the hero's corner until the bar brings them */}
      <SiteNav overLanding />
      <main>
        <BGLanding
          corner={<SiteActions />}
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
            </>
          }
        />
        <BGContent />
      </main>
      <SiteFoot />
    </>
  );
}
