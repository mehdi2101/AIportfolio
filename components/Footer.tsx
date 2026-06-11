import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import SectionHeading from '@/components/SectionHeading';
import { site } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: 'var(--border)' }}>
      {/* Closing CTA section — one clear conversion point on every page */}
      <section className="container-site py-24 text-center md:py-36">
        <SectionHeading
          text="Let's build something worth using."
          className="mx-auto max-w-3xl font-display text-4xl italic leading-tight md:text-6xl"
        />
        <FadeIn delay={0.15}>
          <p className="mx-auto mt-6 max-w-xl text-muted md:text-lg">
            Open to full-time UX/Product Design roles. Let&apos;s talk.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Get In Touch
            </Link>
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              View Resume
            </a>
          </div>
        </FadeIn>
      </section>

      {/* Footer bar */}
      <div className="border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="container-site flex flex-col items-center justify-between gap-4 py-8 text-sm text-muted md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. Designed &amp; built in Chicago.
          </p>
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${site.email}`}
              className="transition-colors hover:text-accent"
            >
              {site.email}
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              LinkedIn
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
