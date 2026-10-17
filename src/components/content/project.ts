export default interface ProjectCard {
  projectName: string;
  /** html; projects.yaml holds one per locale and the page picks one */
  projectDescription: string;
  projectSkills: string[];
  videoLink: string;
  repoLink: string;
  liveLink: string;
  isLive: boolean;
  /** oklch hue 0–360 — the project's one colour on the trunk */
  hue: number;
}
