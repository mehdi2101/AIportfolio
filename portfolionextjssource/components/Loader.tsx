'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { site } from '@/lib/site';

// Minimal first-visit loading screen. Uses sessionStorage so it only ever
// plays once per browsing session.
export default function Loader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('visited')) return;
    sessionStorage.setItem('visited', '1');
    setShow(true);
    document.documentElement.style.overflow = 'hidden';
    const t = setTimeout(() => {
      setShow(false);
      document.documentElement.style.overflow = '';
    }, 1600);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[300] flex items-center justify-center bg-ink"
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeOut' } }}
          aria-hidden="true"
        >
          <motion.p
            className="font-display text-3xl italic text-cream md:text-5xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0.4] }}
            transition={{ duration: 1.6, times: [0, 0.3, 0.8, 1] }}
          >
            {site.name}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
