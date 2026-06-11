'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import type { Project, ProjectType } from '@/lib/projects';

const FILTERS = ['All', 'Mobile', 'Web', 'Dashboard'] as const;
type Filter = (typeof FILTERS)[number];

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>('All');

  const visible =
    filter === 'All' ? projects : projects.filter((p) => p.type === (filter as ProjectType));

  return (
    <div>
      {/* Filter tabs */}
      <div role="tablist" aria-label="Filter projects by type" className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f)}
              className={`relative rounded-full px-5 py-2.5 text-sm transition-colors duration-300 ${
                active ? 'text-ink' : 'text-muted hover:text-cream'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{f}</span>
            </button>
          );
        })}
      </div>

      {/* Filtered grid with layout animation */}
      <motion.div layout className="mt-12 grid gap-8 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={project} showYear />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
