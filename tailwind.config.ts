import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--bg-primary)',
        surface: 'var(--bg-surface)',
        cream: 'var(--text-primary)',
        muted: 'var(--text-secondary)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
      },
      borderColor: {
        DEFAULT: 'var(--border)',
        subtle: 'var(--border)',
      },
      boxShadow: {
        glow: '0 0 40px var(--glow)',
        'glow-lg': '0 8px 60px var(--glow)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      letterSpacing: {
        label: '0.1em',
      },
      maxWidth: {
        site: '76rem',
      },
    },
  },
  plugins: [],
};

export default config;
