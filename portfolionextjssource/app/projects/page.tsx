import type { Metadata } from 'next';
import FadeIn from '@/components/FadeIn';
import SectionHeading from '@/components/SectionHeading';
import ProjectsGrid from '@/components/ProjectsGrid';
import { projects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Selected UX and product design work by Mehdi Assadi — mobile, web, and dashboard case studies that start with the problem.',
};

export default function ProjectsPage() {
  return (
    <section className="container-site pb-24 pt-36 md:pb-32 md:pt-44">
      <p className="label mb-4">Portfolio</p>
      <SectionHeading
        as="h1"
        text="My Work"
        className="font-display text-5xl italic md:text-7xl"
      />
      <FadeIn delay={0.1}>
        <p className="mt-6 max-w-2xl text-muted md:text-lg">
          A selection of projects showing how I take ideas from ambiguity to polished
          experience.
        </p>
      </FadeIn>
      <div className="mt-14">
        <ProjectsGrid projects={projects} />
      </div>
    </section>
  );
}
