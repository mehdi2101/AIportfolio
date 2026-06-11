'use client';

import { motion } from 'framer-motion';
import type { ElementType } from 'react';

interface AnimatedTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** Delay before the first word appears, in seconds */
  delay?: number;
  /** Gap between each word, in seconds */
  stagger?: number;
}

// Word-by-word reveal used for the hero headline: each word slides up from
// behind a clip line with a staggered delay.
export default function AnimatedText({
  text,
  as: Tag = 'h1',
  className = '',
  delay = 0,
  stagger = 0.06,
}: AnimatedTextProps) {
  const words = text.split(' ');

  return (
    <Tag className={className} data-animate>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span
            key={i}
            className={`inline-block overflow-hidden pb-[0.12em] align-bottom${
              i < words.length - 1 ? ' mr-[0.28em]' : ''
            }`}
          >
            <motion.span
              className="inline-block"
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{
                delay: delay + i * stagger,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
