'use client';

import { motion } from 'framer-motion';

// Skill tags pop in with a small scale animation (0.8 → 1.0), staggered by
// their index within the group.
export default function SkillTag({ label, index = 0 }: { label: string; index?: number }) {
  return (
    <motion.li
      data-animate
      className="rounded-full border bg-surface px-4 py-2 text-sm text-cream"
      style={{ borderColor: 'var(--border)' }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {label}
    </motion.li>
  );
}
