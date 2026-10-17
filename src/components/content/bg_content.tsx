import { load } from 'js-yaml';
import fs from 'fs';
import ProjectCard from '@/components/content/project';
import { ProjectGrid } from '@/components/content/project_grid';
import { getI18n, type Locale } from '@/lib/i18n';

type ProjectEntry = Omit<ProjectCard, 'projectDescription'> & {
  projectDescription: Record<Locale, string>;
};

export default async function BGContent() {
  const { locale, t } = await getI18n();
  const projects = (
    load(fs.readFileSync('./projects.yaml', 'utf8')) as ProjectEntry[]
  ).map((p) => ({ ...p, projectDescription: p.projectDescription[locale] }));

  return (
    <section id="projects" className="section">
      <div className="section-head">
        <h2>{t.home.projects}</h2>
      </div>
      <ProjectGrid projects={projects} t={t.home} />
    </section>
  );
}
