import { Hero } from '@binarygarden/flora/marketing';
import { Button } from '@binarygarden/flora/form';
import { IconArrow, IconGithub } from '@binarygarden/flora/icons';
import BGContent from '@/components/content/bg_content';
import { SiteChrome, SiteFoot } from '@/components/navbar/site_chrome';

export default function Home() {
  return (
    <>
      <SiteChrome />
      <main>
        <Hero
          eyebrow="binary garden"
          title={
            <>
              open source, <em>for the people.</em>
            </>
          }
          subtitle="a community of technical creatives building free software that shares one design language."
          actions={
            <>
              <Button
                size="lg"
                href="#projects"
                iconRight={<IconArrow orientation="down" size={16} />}
              >
                explore the garden
              </Button>
              <Button
                size="lg"
                variant="ghost"
                href="https://github.com/thebinarygarden"
                iconLeft={<IconGithub size={16} />}
              >
                contribute
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
