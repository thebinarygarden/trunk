'use client';

import { useState } from 'react';
import { ProductTile } from '@binarygarden/flora/marketing';
import { ProductScope } from '@binarygarden/flora/theme';
import { Dialog } from '@binarygarden/flora/overlay';
import { Button } from '@binarygarden/flora/form';
import { Badge, Tag } from '@binarygarden/flora/ui';
import { IconGithub, IconLinkOut } from '@binarygarden/flora/icons';
import type ProjectCard from '@/components/content/project_card';

/** the video id of a real youtube embed, or null for a placeholder url */
const youtubeId = (videoLink: string) =>
  videoLink.match(/\/embed\/([\w-]{6,})/)?.[1] ?? null;

/** hqdefault exists for every video; the tile's splash crops its letterbox */
const thumbnail = (videoLink: string) => {
  const id = youtubeId(videoLink);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : undefined;
};

export function ProjectGrid({ projects }: { projects: ProjectCard[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const current = projects.find((p) => p.projectName === open);

  return (
    <>
      <div className="tile-grid">
        {projects.map((p) => (
          <ProductTile
            key={p.projectName}
            name={p.projectName.toLowerCase()}
            tagline={p.projectSkills.join(' · ').toLowerCase()}
            hue={p.hue}
            glyph={p.projectName.slice(0, 2).toLowerCase()}
            image={thumbnail(p.videoLink)}
            meta={p.isLive ? 'live' : 'in progress'}
            onClick={() => setOpen(p.projectName)}
          />
        ))}
      </div>

      {current && (
        // The sheet lives inside the project's scope, so every flora component
        // in it takes that project's hue while the page behind stays monochrome.
        <ProductScope hue={current.hue}>
          <Dialog
            open
            width={640}
            onClose={() => setOpen(null)}
            footer={
              <>
                <Button variant="ghost" onClick={() => setOpen(null)}>
                  close
                </Button>
                <Button
                  variant="secondary"
                  href={current.repoLink}
                  iconLeft={<IconGithub size={14} />}
                >
                  source
                </Button>
                {current.isLive && (
                  <Button
                    href={current.liveLink}
                    iconRight={<IconLinkOut size={14} />}
                  >
                    play {current.projectName.toLowerCase()}
                  </Button>
                )}
              </>
            }
          >
            <div className="col">
              {youtubeId(current.videoLink) && (
                <div className="sheet-video">
                  <iframe
                    src={current.videoLink}
                    title={current.projectName}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              <div className="row">
                <h2
                  style={{
                    font: 'var(--type-h2)',
                    letterSpacing: 'var(--tracking-heading)',
                    margin: 0,
                  }}
                >
                  {current.projectName.toLowerCase()}
                </h2>
                <Badge tone={current.isLive ? 'ok' : 'warn'} dot>
                  {current.isLive ? 'live' : 'in progress'}
                </Badge>
              </div>

              {/* projects.yaml is repo-controlled and carries <b>/<br/> markup */}
              <p
                className="sheet-desc"
                dangerouslySetInnerHTML={{ __html: current.projectDescription }}
              />

              <div className="row">
                {current.projectSkills.map((s) => (
                  <Tag key={s}>{s.toLowerCase()}</Tag>
                ))}
              </div>
            </div>
          </Dialog>
        </ProductScope>
      )}
    </>
  );
}
