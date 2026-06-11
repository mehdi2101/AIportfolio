import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import FadeIn, { FadeInItem } from '@/components/FadeIn';
import SectionHeading from '@/components/SectionHeading';
import SkillTag from '@/components/SkillTag';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Mehdi Assadi — UX Designer in Chicago, originally from Mysore, India. Open to full-time UX and Product Design roles.',
};

const skillGroups = [
  {
    group: 'Research',
    skills: ['User Interviews', 'Usability Testing', 'Competitive Analysis', 'Journey Mapping'],
  },
  {
    group: 'Design',
    skills: ['Wireframing', 'Prototyping', 'Design Systems', 'Interaction Design'],
  },
  {
    group: 'Tools',
    skills: ['Figma', 'FigJam', 'Maze', 'Notion', 'Framer'],
  },
];

// REPLACE: fill in your real roles, companies, and impact lines.
const experience = [
  {
    company: '[Company Name]',
    role: '[Role]',
    period: '[Year – Year]',
    impact: 'One-line description of impact.',
  },
  {
    company: '[Company Name]',
    role: '[Role]',
    period: '[Year – Year]',
    impact: 'One-line description of impact.',
  },
  {
    company: '[Company Name]',
    role: '[Role]',
    period: '[Year – Year]',
    impact: 'One-line description of impact.',
  },
  {
    company: '[Company Name]',
    role: '[Role]',
    period: '[Year – Year]',
    impact: 'One-line description of impact.',
  },
];

// REPLACE: swap with your actual warm-toned portrait photos
const photos = [
  { src: 'https://picsum.photos/seed/mehdi-about-1/900/1200', alt: 'Mehdi Assadi portrait' },
  { src: 'https://picsum.photos/seed/mehdi-about-2/900/1200', alt: 'Mehdi exploring Chicago' },
  { src: 'https://picsum.photos/seed/mehdi-about-3/900/1200', alt: 'Mehdi at work, sketching' },
];

export default function AboutPage() {
  return (
    <>
      <section className="container-site pb-24 pt-36 md:pt-44">
        <div className="grid gap-16 lg:grid-cols-[5fr_7fr]">
          {/* Photo grid */}
          <FadeIn stagger className="grid grid-cols-2 gap-4 self-start">
            <FadeInItem className="col-span-2">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <Image
                  src={photos[0].src}
                  alt={photos[0].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                  className="object-cover"
                />
              </div>
            </FadeInItem>
            {photos.slice(1).map((photo) => (
              <FadeInItem key={photo.src}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 20vw"
                    className="object-cover"
                  />
                </div>
              </FadeInItem>
            ))}
          </FadeIn>

          {/* Bio */}
          <div>
            <SectionHeading
              as="h1"
              text="Hey, I'm Mehdi."
              className="font-display text-5xl italic md:text-7xl"
            />
            <FadeIn delay={0.1} className="mt-8 space-y-6 text-lg leading-relaxed text-muted">
              <p className="text-cream">
                A UX Designer based in Chicago, originally from Mysore, India.
              </p>
              <p>
                I design products that feel effortless to use — which usually means spending a
                lot of time understanding why they don&apos;t. My process lives at the
                intersection of UX strategy, user research, and interface design. I connect
                what people actually do with what products should do.
              </p>
              <p>
                Outside of work: aimless drives, coffee I probably overthought, new cuisines,
                and quietly redesigning every bad menu I encounter. I&apos;m also always up for
                a pickleball game.
              </p>
              <p>
                That curiosity carries directly into how I work. I notice small details. I ask
                annoying questions. I stay with problems until they stop feeling complicated.
              </p>
              <p className="text-cream">
                Currently open to full-time roles in UX Design and Product Design — in Chicago
                or remote.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <a
                href={`mailto:${site.email}`}
                className="group mt-10 inline-flex items-center gap-2 text-accent transition-colors hover:text-accent-hover"
              >
                Say hello — {site.email}
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="border-y bg-surface" aria-labelledby="skills-heading">
        <div className="container-site py-24 md:py-32">
          <p className="label mb-4">Toolkit</p>
          <SectionHeading
            text="What I bring to the table."
            className="font-display text-4xl italic md:text-5xl"
          />
          <span id="skills-heading" className="sr-only">
            Skills
          </span>
          <div className="mt-14 space-y-10">
            {skillGroups.map(({ group, skills }) => (
              <div key={group} className="grid gap-4 md:grid-cols-[10rem_1fr]">
                <h3 className="label pt-2.5">{group}</h3>
                <ul className="flex flex-wrap gap-3">
                  {skills.map((skill, i) => (
                    <SkillTag key={skill} label={skill} index={i} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience timeline */}
      <section className="container-site py-24 md:py-32" aria-labelledby="experience-heading">
        <p className="label mb-4">Experience</p>
        <SectionHeading
          text="Where I've made things better."
          className="font-display text-4xl italic md:text-5xl"
        />
        <span id="experience-heading" className="sr-only">
          Experience
        </span>
        <FadeIn className="mt-14 max-w-3xl">
          <ol className="relative space-y-12 border-l pl-8">
            {experience.map((entry, i) => (
              <li key={i} className="relative">
                <span
                  className="absolute -left-[37px] top-2 h-2 w-2 rounded-full bg-accent"
                  aria-hidden="true"
                />
                <h3 className="font-display text-2xl text-cream">
                  {entry.company}{' '}
                  <span className="text-muted">
                    · {entry.role} · {entry.period}
                  </span>
                </h3>
                <p className="mt-2 text-muted">{entry.impact}</p>
              </li>
            ))}
          </ol>
        </FadeIn>
        <FadeIn delay={0.1}>
          <Link
            href="/projects"
            className="group mt-16 inline-flex items-center gap-2 text-accent transition-colors hover:text-accent-hover"
          >
            See the work itself
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </FadeIn>
      </section>
    </>
  );
}
