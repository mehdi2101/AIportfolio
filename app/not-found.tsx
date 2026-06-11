import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container-site flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <p className="label mb-4">404</p>
      <h1 className="font-display text-5xl italic md:text-7xl">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-6 max-w-md text-muted">
        Probably a broken link — which, frankly, offends me as a UX designer.
      </p>
      <Link href="/" className="btn-primary mt-10">
        Back Home
      </Link>
    </section>
  );
}
