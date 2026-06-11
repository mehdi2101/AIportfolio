'use client';

import Image from 'next/image';
import Link from 'next/link';
import Magnetic from '@/components/Magnetic';
import type { Project } from '@/lib/projects';

interface ProjectCardProps {
  project: Project;
  /** Used for next/image priority on above-the-fold cards */
  priority?: boolean;
  /** Show the year alongside the type tag (projects index) */
  showYear?: boolean;
}

export default function ProjectCard({ project, priority = false, showYear = false }: ProjectCardProps) {
  return (
    <Magnetic>
      <Link
        href={`/project/${project.slug}`}
        className="group block overflow-hidden rounded-lg border bg-surface transition-all duration-500 hover:scale-[1.02] hover:border-[var(--accent)] hover:shadow-glow-lg"
        style={{ borderColor: 'var(--border)' }}
        aria-label={`${project.title} — view case study`}
      >
        <div className="relative aspect-video overflow-hidden">
          {/* REPLACE: swap with your actual case study screenshot */}
          <Image
            src={project.thumbnail}
            alt={`${project.title} — ${project.type} design preview`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Hover overlay: problem statement + CTA */}
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[rgba(14,14,14,0.92)] via-[rgba(14,14,14,0.4)] to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <p className="mb-2 max-w-md text-sm leading-relaxed text-cream">
              {project.oneLiner}
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-accent">
              View Case Study
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between px-6 py-5">
          <h3 className="font-display text-xl text-cream transition-colors duration-300 group-hover:text-accent md:text-2xl">
            {project.title}
          </h3>
          <div className="flex items-center gap-3">
            {showYear && <span className="text-sm text-muted">{project.year}</span>}
            <span className="label rounded-full border px-3 py-1.5" style={{ borderColor: 'var(--border)' }}>
              {project.type}
            </span>
          </div>
        </div>
      </Link>
    </Magnetic>
  );
}
