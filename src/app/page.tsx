import { BGLanding } from '@binarygarden/flora/bg';
import { Button } from '@binarygarden/flora/form';
import { ThemeToggleButton } from '@binarygarden/flora/theme';
import { IconArrow, IconBGLogo, IconGithub } from '@binarygarden/flora/icons';
import BGContent from '@/components/content/bg_content';
import {
  AccountButton,
  SiteChrome,
  SiteFoot,
} from '@/components/navbar/site_chrome';
import { AnchorScroll } from '@/components/navbar/anchor_scroll';

export default function Home() {
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
              open source, <em>for humans.</em>
            </>
          }
          subtitle="home to every binary garden product. free, open source, made with love."
          actions={
            <>
              <Button
                size="lg"
                href="#projects"
                iconRight={<IconArrow orientation="down" size={16} />}
              >
                explore
              </Button>
              <Button
                size="lg"
                variant="ghost"
                href="https://github.com/thebinarygarden"
                iconLeft={<IconGithub size={16} />}
              >
                contribute
              </Button>
              <ThemeToggleButton />
            </>
          }
        />
        <BGContent />
      </main>
      <SiteFoot />
      <AnchorScroll />
    </>
  );
}
