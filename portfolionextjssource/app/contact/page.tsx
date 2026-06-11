import type { Metadata } from 'next';
import AvailabilityBadge from '@/components/AvailabilityBadge';
import ContactForm from '@/components/ContactForm';
import FadeIn from '@/components/FadeIn';
import SectionHeading from '@/components/SectionHeading';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Mehdi Assadi — UX Designer in Chicago, open to full-time roles, freelance projects, and good conversations about design.',
};

export default function ContactPage() {
  return (
    <section className="container-site pb-24 pt-36 md:pb-32 md:pt-44">
      <div className="grid gap-16 lg:grid-cols-[6fr_6fr]">
        <div>
          <AvailabilityBadge />
          <SectionHeading
            as="h1"
            text="Let's Talk."
            className="mt-8 font-display text-6xl italic md:text-8xl"
          />
          <FadeIn delay={0.1}>
            <p className="mt-6 max-w-md text-muted md:text-lg">
              Open to full-time roles, freelance projects, and good conversations about
              design.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <dl className="mt-12 space-y-6">
              <div>
                <dt className="label">Email</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${site.email}`}
                    className="text-lg text-cream transition-colors hover:text-accent"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label">LinkedIn</dt>
                <dd className="mt-1">
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-cream transition-colors hover:text-accent"
                  >
                    linkedin.com/in/mehdiassadi
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label">Location</dt>
                <dd className="mt-1 text-lg text-cream">{site.location}</dd>
              </div>
            </dl>
          </FadeIn>
        </div>

        <FadeIn delay={0.15} className="self-start rounded-lg border p-8 md:p-10">
          <ContactForm />
        </FadeIn>
      </div>
    </section>
  );
}
