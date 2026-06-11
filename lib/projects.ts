import data from '@/data/projects.json';

export type ProjectType = 'Mobile' | 'Web' | 'Dashboard';

export interface ProcessStep {
  step: string;
  body: string;
  image: string;
}

export interface Project {
  slug: string;
  title: string;
  type: ProjectType;
  year: string;
  role: string;
  nda: boolean;
  oneLiner: string;
  thumbnail: string;
  heroImage: string;
  overview: string;
  problem: string;
  myRole: string;
  process: ProcessStep[];
  outcome: string;
}

export const projects = data.projects as Project[];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  previous: Project;
  next: Project;
} {
  const index = projects.findIndex((p) => p.slug === slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return { previous, next };
}
