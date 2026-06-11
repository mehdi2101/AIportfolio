import { site } from '@/lib/site';

// Critical hire-signal element: tells recruiters immediately that you're
// available, without them having to scroll or guess.
// Availability month lives in lib/site.ts → `availableFrom`.
const TICKER_TEXT = `✦ Open to full-time roles · UX Design · Product Design · Chicago & Remote · Available ${site.availableFrom}`;

export default function HireTicker() {
  const repeated = Array.from({ length: 4 });
  return (
    <aside
      className="overflow-hidden border-y bg-surface py-3"
      style={{ borderColor: 'var(--border)' }}
      aria-label={TICKER_TEXT}
    >
      <div className="flex w-max animate-marquee" aria-hidden="true">
        {/* Content rendered twice so the loop is seamless */}
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0">
            {repeated.map((_, i) => (
              <span
                key={i}
                className="whitespace-nowrap px-6 text-sm tracking-wide text-accent"
              >
                {TICKER_TEXT}
              </span>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
}
