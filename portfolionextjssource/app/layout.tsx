import type { Metadata, Viewport } from 'next';
import { Inter, DM_Serif_Display } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Cursor from '@/components/Cursor';
import Loader from '@/components/Loader';
import SmoothScroll from '@/components/SmoothScroll';
import { site } from '@/lib/site';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — UX Designer in Chicago`,
    template: `%s · ${site.name}`,
  },
  description:
    'UX / Experience Designer in Chicago. I start with the problem, not the pixels — designing cross-platform products until they feel obvious. Open to full-time roles.',
  openGraph: {
    title: `${site.name} — UX Designer in Chicago`,
    description:
      'UX / Experience Designer in Chicago. Open to full-time UX and Product Design roles.',
    url: site.url,
    siteName: site.name,
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0e0e0e',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`}>
      <head>
        {/* Progressive enhancement flag: without JS, animated elements stay visible (see globals.css) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body className="bg-ink font-sans text-cream">
        <Loader />
        <Cursor />
        <SmoothScroll>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
