import { load } from 'js-yaml';
import fs from 'fs';
import ProjectCard from '@/components/content/project_card';
import { ProjectGrid } from '@/components/content/project_grid';

export default function BGContent() {
  const projects = load(
    fs.readFileSync('./projects.yaml', 'utf8')
  ) as ProjectCard[];

  return (
    <section id="projects" className="section">
      <div className="section-head">
        <div className="eyebrow">projects</div>
        <h2>one language. every project brings its own color.</h2>
      </div>
      <ProjectGrid projects={projects} />
    </section>
  );
}
