'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SectionHeadingProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}

// Character-by-character reveal on scroll entry, driven by GSAP ScrollTrigger.
// Words are wrapped in non-breaking spans so lines never split mid-word.
export default function SectionHeading({
  text,
  as: Tag = 'h2',
  className = '',
}: SectionHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const chars = el.querySelectorAll<HTMLElement>('[data-char]');
    const tween = gsap.fromTo(
      chars,
      { opacity: 0, yPercent: 60 },
      {
        opacity: 1,
        yPercent: 0,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.018,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [text]);

  return (
    <Tag ref={ref} className={className} data-animate>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(' ').map((word, wi, arr) => (
          <span key={wi} className="inline-block whitespace-nowrap">
            {word.split('').map((char, ci) => (
              <span key={ci} data-char className="inline-block will-change-transform">
                {char}
              </span>
            ))}
            {wi < arr.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        ))}
      </span>
    </Tag>
  );
}
