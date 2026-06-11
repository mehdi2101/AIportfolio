import Image from 'next/image';
import Link from 'next/link';
import Hero from '@/components/Hero';
import HireTicker from '@/components/HireTicker';
import ProjectCard from '@/components/ProjectCard';
import SectionHeading from '@/components/SectionHeading';
import FadeIn, { FadeInItem } from '@/components/FadeIn';
import Testimonials from '@/components/Testimonials';
import { projects } from '@/lib/projects';
import { site } from '@/lib/site';

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Hire-signal bar — availability visible without scrolling past hero */}
      <HireTicker />

      {/* Selected Work */}
      <section id="work" className="container-site scroll-mt-24 py-24 md:py-32" aria-labelledby="work-heading">
        <p className="label mb-4">Selected Work</p>
        <SectionHeading
          text="Problems I've untangled recently."
          className="max-w-3xl font-display text-4xl italic md:text-5xl"
        />
        <span id="work-heading" className="sr-only">
          Selected Work
        </span>
        <FadeIn stagger className="mt-14 grid gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <FadeInItem key={project.slug}>
              <ProjectCard project={project} priority={i < 2} />
            </FadeInItem>
          ))}
        </FadeIn>
      </section>

      {/* About teaser */}
      <section className="border-y bg-surface" aria-labelledby="about-teaser-heading">
        <div className="container-site grid items-center gap-12 py-24 md:grid-cols-2 md:py-32">
          <FadeIn>
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
              {/* REPLACE: swap with your actual portrait photo */}
              <Image
                src="https://picsum.photos/seed/mehdi-portrait/1000/1250"
                alt="Portrait of Mehdi Assadi"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="label mb-4">About Me</p>
            <h2 id="about-teaser-heading" className="font-display text-3xl italic leading-snug md:text-4xl">
              I&apos;m Mehdi — an Experience Designer who turns complexity into calm, usable
              products.
            </h2>
            <p className="mt-6 text-muted md:text-lg">
              I work across UX strategy, research, and UI, and I&apos;m always iterating until
              it clicks.
            </p>
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-6 border-t pt-8">
              <div>
                <dt className="label">Experience</dt>
                <dd className="mt-1 font-display text-2xl text-accent">5+ Years</dd>
              </div>
              <div>
                <dt className="label">Projects</dt>
                <dd className="mt-1 font-display text-2xl text-accent">20+</dd>
              </div>
              <div>
                <dt className="label">Based In</dt>
                <dd className="mt-1 font-display text-2xl text-accent">Chicago, IL</dd>
              </div>
            </dl>
            <Link
              href="/about"
              className="group mt-10 inline-flex items-center gap-2 text-accent transition-colors hover:text-accent-hover"
            >
              More About Me
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Social proof — hidden until real testimonials exist (see components/Testimonials.tsx) */}
      <Testimonials />

      {/* Zero-friction contact: email is one click from the home page */}
      <section className="container-site py-24 text-center md:py-28">
        <FadeIn>
          <p className="label mb-4">No forms, no friction</p>
          <a
            href={`mailto:${site.email}`}
            className="font-display text-2xl italic text-cream underline decoration-[var(--accent)] decoration-1 underline-offset-8 transition-colors hover:text-accent md:text-4xl"
          >
            {site.email}
          </a>
        </FadeIn>
      </section>
    </>
  );
}
