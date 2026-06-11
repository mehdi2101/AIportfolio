'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedText from '@/components/AnimatedText';
import { site } from '@/lib/site';

// The WebGL accent is lazy-loaded client-side only so it never blocks first paint.
const HeroCanvas = dynamic(() => import('@/components/HeroCanvas'), {
  ssr: false,
});

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  // Subtle parallax on the hero background — max 15px offset
  const bgY = useTransform(scrollY, [0, 800], [0, 15]);
  const indicatorOpacity = useTransform(scrollY, [0, 120], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden"
    >
      {/* WebGL accent — very low opacity, parallaxed */}
      <motion.div className="absolute inset-0 -z-10" style={{ y: bgY }} aria-hidden="true">
        <div className="hidden h-full w-full md:block">
          <HeroCanvas />
        </div>
      </motion.div>

      <div className="container-site pb-24 pt-32">
        <AnimatedText
          as="h1"
          text="Designing cross-platform products, until it feels obvious."
          className="max-w-5xl font-display text-5xl italic leading-[1.05] md:text-7xl lg:text-[6.5rem]"
          delay={0.2}
        />

        <motion.p
          data-animate
          className="mt-8 max-w-xl text-base text-muted md:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease: 'easeOut' }}
        >
          UX Designer. I start with the problem, not the pixels. Based in Chicago.
        </motion.p>

        {/* Primary CTAs — above the fold on all screen sizes */}
        <motion.div
          data-animate
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6, ease: 'easeOut' }}
        >
          <Link href="/#work" className="btn-primary">
            View My Work
          </Link>
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            Download Resume
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator — fades out after first scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ opacity: indicatorOpacity }}
        aria-hidden="true"
      >
        <motion.div
          className="h-12 w-px bg-gradient-to-b from-transparent via-accent to-transparent"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
