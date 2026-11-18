import data from './project-showcase.json';
export type ShowcaseProject = {
  id: string; name: string; short?: string; repo: string | null;
  area: string[]; tech: string[]; desc: string; detail: string;
  demo?: string; image?: string; caption?: string; path: string; art?: string;
  featureDescription?: string; platform?: string;
};
export const showcaseProjects: ShowcaseProject[] = data;
export const featuredProjects = showcaseProjects.filter(project => project.platform);
export const projectRepository = (project: ShowcaseProject) => project.repo ? `https://github.com/MEMOMG8/${project.repo}` : undefined;
