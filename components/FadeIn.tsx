'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const parent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export const fadeChild: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** When true, direct children using <FadeInItem> stagger in sequence */
  stagger?: boolean;
}

// Scroll-triggered section reveal: opacity 0→1, y 30→0, once per page view.
export default function FadeIn({ children, className, delay = 0, stagger = false }: FadeInProps) {
  if (stagger) {
    return (
      <motion.div
        className={className}
        data-animate
        variants={parent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      data-animate
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function FadeInItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={fadeChild}>
      {children}
    </motion.div>
  );
}
