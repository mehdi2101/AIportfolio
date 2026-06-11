'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { site } from '@/lib/site';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500"
      style={{
        backgroundColor: scrolled ? 'rgba(14,14,14,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <nav
        className="container-site flex h-16 items-center justify-between md:h-20"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="font-display text-xl italic text-cream transition-colors hover:text-accent"
        >
          Mehdi<span className="text-accent">.</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative py-1 text-sm transition-colors duration-300 ${
                isActive(link.href) ? 'text-cream' : 'text-muted hover:text-cream'
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          ))}
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border px-5 py-2 text-sm text-cream transition-colors duration-300 hover:border-[var(--accent)] hover:text-accent"
            style={{ borderColor: 'var(--border)' }}
          >
            Resume
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="relative z-[70] flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <motion.span
            className="block h-px w-6 bg-cream"
            animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className="block h-px w-6 bg-cream"
            animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
          />
        </button>
      </nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col justify-center bg-ink px-8 md:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          >
            <ul className="space-y-6">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className={`font-display text-5xl italic ${
                      isActive(link.href) ? 'text-accent' : 'text-cream'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + links.length * 0.07, duration: 0.4 }}
              >
                <a
                  href={site.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-5xl italic text-muted"
                >
                  Resume
                </a>
              </motion.li>
            </ul>
            <p className="label mt-16">
              Open to full-time roles · {site.location}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
