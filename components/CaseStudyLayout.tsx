'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import FadeIn from '@/components/FadeIn';
import SectionHeading from '@/components/SectionHeading';
import type { Project } from '@/lib/projects';

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'The Problem' },
  { id: 'role', label: 'My Role' },
  { id: 'process', label: 'Process' },
  { id: 'outcome', label: 'Outcome' },
];

interface CaseStudyLayoutProps {
  project: Project;
  previous: Project;
  next: Project;
}

export default function CaseStudyLayout({ project, previous, next }: CaseStudyLayoutProps) {
  const [activeSection, setActiveSection] = useState('overview');

  // Scroll-spy: highlight the section currently in view in the sticky side nav
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <article>
      {/* Hero image — full width, 60vh */}
      <div className="relative h-[60vh] w-full">
        {/* REPLACE: swap with your actual case study hero image */}
        <Image
          src={project.heroImage}
          alt={`${project.title} hero image`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-[rgba(14,14,14,0.4)]" />
      </div>

      {/* Title + tags */}
      <header className="container-site -mt-24 relative pb-16">
        <SectionHeading
          as="h1"
          text={project.title}
          className="font-display text-5xl italic md:text-7xl"
        />
        <FadeIn delay={0.1}>
          <ul className="mt-6 flex flex-wrap items-center gap-3" aria-label="Project details">
            {[project.type, project.year, project.role, ...(project.nda ? ['NDA Project'] : [])].map(
              (tag) => (
                <li key={tag} className="label rounded-full border px-3 py-1.5">
                  {tag}
                </li>
              ),
            )}
          </ul>
        </FadeIn>
      </header>

      <div className="container-site grid gap-16 pb-24 lg:grid-cols-[12rem_1fr]">
        {/* Sticky side nav (desktop) with scroll-spy */}
        <nav className="sticky top-28 hidden self-start lg:block" aria-label="Case study sections">
          <ul className="space-y-3 border-l">
            {sections.map(({ id, label }) => {
              const active = activeSection === id;
              return (
                <li key={id} className="relative">
                  {active && (
                    <motion.span
                      layoutId="case-study-spy"
                      className="absolute -left-px top-0 h-full w-px bg-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    />
                  )}
                  <a
                    href={`#${id}`}
                    className={`block pl-5 text-sm transition-colors duration-300 ${
                      active ? 'text-accent' : 'text-muted hover:text-cream'
                    }`}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Body */}
        <div className="max-w-3xl space-y-20">
          <FadeIn>
            <section id="overview" className="scroll-mt-32" aria-labelledby="overview-h">
              <h2 id="overview-h" className="label mb-4">
                Overview
              </h2>
              <p className="text-lg leading-relaxed text-cream md:text-xl">{project.overview}</p>
            </section>
          </FadeIn>

          <FadeIn>
            <section id="problem" className="scroll-mt-32" aria-labelledby="problem-h">
              <h2 id="problem-h" className="label mb-4">
                The Problem
              </h2>
              <p className="leading-relaxed text-muted md:text-lg">{project.problem}</p>
            </section>
          </FadeIn>

          <FadeIn>
            <section id="role" className="scroll-mt-32" aria-labelledby="role-h">
              <h2 id="role-h" className="label mb-4">
                My Role
              </h2>
              <p className="leading-relaxed text-muted md:text-lg">{project.myRole}</p>
            </section>
          </FadeIn>

          <section id="process" className="scroll-mt-32" aria-labelledby="process-h">
            <h2 id="process-h" className="label mb-10">
              Process
            </h2>
            <ol className="space-y-16">
              {project.process.map((step, i) => (
                <li key={step.step}>
                  <FadeIn>
                    <h3 className="font-display text-2xl text-cream md:text-3xl">
                      <span className="mr-3 text-accent" aria-hidden="true">
                        →
                      </span>
                      {step.step}
                    </h3>
                    <p className="mt-4 leading-relaxed text-muted md:text-lg">{step.body}</p>
                    <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-lg border">
                      {/* REPLACE: swap with your actual process artifact (research notes, wireframes, prototypes…) */}
                      <Image
                        src={step.image}
                        alt={`${project.title} — ${step.step} artifact`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover"
                      />
                    </div>
                  </FadeIn>
                </li>
              ))}
            </ol>
          </section>

          <FadeIn>
            <section id="outcome" className="scroll-mt-32" aria-labelledby="outcome-h">
              <h2 id="outcome-h" className="label mb-4">
                Outcome
              </h2>
              <p className="text-lg leading-relaxed text-cream md:text-xl">{project.outcome}</p>
            </section>
          </FadeIn>

          {/* Per-section CTA: keep momentum toward contact */}
          <FadeIn>
            <div className="rounded-lg border bg-surface p-8 md:p-10">
              <p className="font-display text-2xl italic text-cream md:text-3xl">
                Want the full walkthrough of this project?
              </p>
              <p className="mt-3 text-muted">
                I&apos;m happy to go deeper on process, trade-offs, and what I&apos;d do
                differently.
              </p>
              <Link href="/contact" className="btn-primary mt-7">
                Get In Touch
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Previous / next navigation */}
      <nav className="border-t" aria-label="More projects">
        <div className="container-site grid md:grid-cols-2">
          <Link
            href={`/project/${previous.slug}`}
            className="group border-b py-12 pr-8 transition-colors hover:bg-surface md:border-b-0 md:border-r"
          >
            <span className="label">← Previous Project</span>
            <p className="mt-3 font-display text-3xl italic text-cream transition-colors group-hover:text-accent">
              {previous.title}
            </p>
          </Link>
          <Link
            href={`/project/${next.slug}`}
            className="group py-12 text-right md:pl-8"
          >
            <span className="label">Next Project →</span>
            <p className="mt-3 font-display text-3xl italic text-cream transition-colors group-hover:text-accent">
              {next.title}
            </p>
          </Link>
        </div>
      </nav>
    </article>
  );
}
