export default function AvailabilityBadge() {
  return (
    <span
      className="inline-flex items-center gap-2.5 rounded-full border bg-surface px-4 py-2 text-sm text-cream"
      style={{ borderColor: 'var(--border)' }}
    >
      <span className="h-2 w-2 animate-pulse-dot rounded-full bg-green-400" aria-hidden="true" />
      Available for Work
    </span>
  );
}
