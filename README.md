# Mehdi Assadi — Portfolio

A production-ready personal portfolio for a UX/Experience Designer in Chicago. Built with Next.js 14 (App Router), Tailwind CSS, Framer Motion, GSAP, Lenis smooth scroll, and a lightweight React Three Fiber hero accent.

The site is conversion-first: availability ticker above the fold, resume one click away in the nav, problem-first case studies, and zero-friction contact (mailto links in the footer of every page).

## 1. Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Production build: `npm run build && npm start`.

## 2. Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmehdi2101%2Fportfolio)

Or manually: push to GitHub → [vercel.com/new](https://vercel.com/new) → import the repo → deploy. No special configuration needed; defaults work. Add the `NEXT_PUBLIC_FORMSPREE_ID` environment variable in Vercel project settings (see §4).

## 3. Image swap guide

All images are currently `picsum.photos` placeholders (seeded so they stay consistent between builds). Every placeholder is marked with a `REPLACE:` comment in code. Drop real files into `public/images/` and update the paths listed below. Keep the same aspect ratios to avoid layout shift.

| Slot | Location in code | Recommended size | Aspect | Usage |
| --- | --- | --- | --- | --- |
| Project thumbnails (×4) | `data/projects.json` → `thumbnail` | 1280×720 | 16:9 | Project cards on home + projects pages |
| Case study heroes (×4) | `data/projects.json` → `heroImage` | 2000×1200 | 5:3 | Full-width 60vh hero on each case study |
| Process images (×5 per project) | `data/projects.json` → `process[].image` | 1600×1000 | 16:10 | Research/wireframe/prototype artifacts |
| Home about-teaser portrait | `app/page.tsx` | 1000×1250 | 4:5 | Split-layout photo next to the about copy |
| About page photos (×3) | `app/about/page.tsx` → `photos` | 900×1200 | 3:4 | Warm-toned portrait grid, left column |

After swapping to local files (e.g. `/images/metra-thumb.jpg`), you can remove the `picsum.photos` entry from `remotePatterns` in `next.config.mjs`.

Also replace **`public/resume.pdf`** — the current file is a labeled placeholder. The nav, hero, and footer all link to it.

## 4. Connect the contact form (Formspree)

1. Create a free account at [formspree.io](https://formspree.io) and add a new form.
2. Copy the form ID (the part after `/f/` in your form's endpoint, e.g. `mqkrabcd`).
3. Create `.env.local` in the project root:

   ```bash
   NEXT_PUBLIC_FORMSPREE_ID=mqkrabcd
   ```

4. Add the same variable in Vercel → Project → Settings → Environment Variables, then redeploy.

Until the ID is set, the form gracefully falls back to opening the visitor's email client with the message pre-filled — no submission is ever lost.

(If you'd rather use Resend, swap the `fetch` call in `components/ContactForm.tsx` for a Next.js route handler that calls Resend's API — the form markup doesn't need to change.)

## 5. Update availability status

All hire-signal copy reads from one place: **`lib/site.ts`**.

- `availableFrom` — the month shown in the homepage ticker (`Available June 2026`). Update it whenever your situation changes.
- `email`, `linkedin`, `instagram`, `resumeUrl` — used in the nav, footer, about, and contact pages.

The green "● Available for Work" badge lives in `components/AvailabilityBadge.tsx`; remove it from `app/contact/page.tsx` if you stop looking.

## 6. Insert real metrics into case studies

All case study copy lives in **`data/projects.json`**. Search the file for:

- `[REPLACE WITH REAL METRIC]` — marks every sentence where a quantified result belongs.
- `[X]` / `[Y]` — placeholder numbers (percentages, participant counts, tap counts).
- `[QUARTER/YEAR]` — release timing.

Recruiters skim the **Overview** and **Outcome** sections first — prioritize real numbers there. Also fill in the experience timeline placeholders (`[Company Name]`, `[Role]`, `[Year – Year]`) in `app/about/page.tsx`.

### Activate testimonials

`components/Testimonials.tsx` ships hidden. When you have 2 real quotes, set `SHOW_TESTIMONIALS = true` and replace the placeholder names/quotes. Don't activate it with fake quotes.

## Project structure

```
app/
  layout.tsx            Nav + Footer + cursor + loader + Lenis smooth scroll
  template.tsx          Page-transition wrapper (cross-fade + upward slide)
  page.tsx              Home: hero, hire ticker, work, about teaser, contact
  about/page.tsx        Bio, skills, experience timeline
  projects/page.tsx     Filterable project index
  project/[slug]/       Case study template (statically generated)
  contact/page.tsx      Form + direct links + availability badge
components/             Nav, Footer, ProjectCard, CaseStudyLayout, Cursor,
                        HireTicker, SkillTag, AnimatedText, Loader, …
data/projects.json      All project content — edit case studies here
lib/site.ts             Name, email, links, availability — edit once, used everywhere
public/resume.pdf       ← replace with your real resume
styles/globals.css      Color tokens, grain overlay, base styles
```

## Accessibility & performance notes

- Content renders server-side and stays visible without JavaScript (animations are progressive enhancement via an `html.js` class).
- All animations respect `prefers-reduced-motion`.
- The custom cursor is desktop-only; the WebGL hero accent is lazy-loaded and skipped on mobile.
- All images have explicit dimensions/aspect-ratio containers — zero layout shift.
