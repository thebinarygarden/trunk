export default interface ProjectCard {
  projectName: string;
  projectDescription: string;
  projectSkills: string[];
  videoLink: string;
  repoLink: string;
  liveLink: string;
  isLive: boolean;
  /** oklch hue 0–360 — the project's one colour on the trunk */
  hue: number;
}
