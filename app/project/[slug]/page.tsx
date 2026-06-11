import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CaseStudyLayout from '@/components/CaseStudyLayout';
import { getAdjacentProjects, getProject, projects } from '@/lib/projects';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.oneLiner,
    openGraph: {
      title: project.title,
      description: project.oneLiner,
      images: [{ url: project.heroImage, width: 2000, height: 1200 }],
    },
  };
}

export default function CaseStudyPage({ params }: PageProps) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(params.slug);

  return <CaseStudyLayout project={project} previous={previous} next={next} />;
}
