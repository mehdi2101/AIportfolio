'use client';

import { useState, type FormEvent } from 'react';
import { site } from '@/lib/site';

// Formspree-powered contact form. Set NEXT_PUBLIC_FORMSPREE_ID in your env
// (see README.md → "Connect the contact form"). Until it's configured, the
// form falls back to opening the visitor's mail client — contact friction
// stays at zero either way. Because the <form action> points directly at
// Formspree, the form also works with JavaScript disabled.
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  const action = FORMSPREE_ID ? `https://formspree.io/f/${FORMSPREE_ID}` : undefined;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    const data = new FormData(form);

    if (!action) {
      // No Formspree ID configured → mailto fallback
      e.preventDefault();
      const subject = encodeURIComponent(`Portfolio inquiry from ${data.get('name')}`);
      const body = encodeURIComponent(`${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      return;
    }

    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div
        className="rounded-lg border bg-surface p-10 text-center"
        role="status"
      >
        <p className="font-display text-3xl italic text-cream">Message sent.</p>
        <p className="mt-3 text-muted">
          Thanks for reaching out — I&apos;ll get back to you within a day or two.
        </p>
      </div>
    );
  }

  return (
    <form action={action} method="POST" onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="label mb-2 block">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full rounded-md border bg-surface px-4 py-3.5 text-cream placeholder:text-muted focus:border-[var(--accent)] focus:outline-none"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="label mb-2 block">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-md border bg-surface px-4 py-3.5 text-cream placeholder:text-muted focus:border-[var(--accent)] focus:outline-none"
            placeholder="you@company.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="label mb-2 block">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full resize-y rounded-md border bg-surface px-4 py-3.5 text-cream placeholder:text-muted focus:border-[var(--accent)] focus:outline-none"
          placeholder="A role, a project, or just a good design conversation…"
        />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn-primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </button>
        {status === 'error' && (
          <p className="text-sm text-red-400" role="alert">
            Something went wrong — email me directly at{' '}
            <a href={`mailto:${site.email}`} className="underline">
              {site.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
