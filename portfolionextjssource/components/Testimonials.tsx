import FadeIn, { FadeInItem } from '@/components/FadeIn';
import SectionHeading from '@/components/SectionHeading';

/*
 * ACTIVATE THIS SECTION WHEN YOU HAVE REAL TESTIMONIALS:
 * flip SHOW_TESTIMONIALS to true and replace the placeholder quotes below.
 * Social proof from real colleagues meaningfully shortens a recruiter's
 * decision loop — but placeholder quotes are worse than none.
 */
const SHOW_TESTIMONIALS = false;

const testimonials = [
  {
    quote:
      '[Quote here — one or two sentences about working with Mehdi: impact, collaboration, or craft.]',
    name: '[Colleague name]',
    title: '[Title, Company]',
  },
  {
    quote:
      '[Quote here — a second perspective, ideally from a PM, engineer, or manager.]',
    name: '[Colleague name]',
    title: '[Title, Company]',
  },
];

export default function Testimonials() {
  if (!SHOW_TESTIMONIALS) return null;

  return (
    <section className="container-site py-24 md:py-32" aria-labelledby="testimonials-heading">
      <p className="label mb-4">Kind Words</p>
      <SectionHeading
        text="What it's like to work together."
        className="max-w-2xl font-display text-4xl italic md:text-5xl"
      />
      <span id="testimonials-heading" className="sr-only">
        Testimonials
      </span>
      <FadeIn stagger className="mt-14 grid gap-6 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <FadeInItem
            key={i}
            className="rounded-lg border bg-surface p-8"
          >
            <blockquote>
              <p className="text-lg leading-relaxed text-cream">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-6 text-sm text-muted">
                <cite className="not-italic">
                  <span className="text-accent">{t.name}</span> · {t.title}
                </cite>
              </footer>
            </blockquote>
          </FadeInItem>
        ))}
      </FadeIn>
    </section>
  );
}
