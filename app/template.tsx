'use client';

import { motion } from 'framer-motion';

// Re-mounts on every route change, giving each page a cross-fade + upward
// slide entrance so navigation never feels like a hard cut.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      data-animate
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
