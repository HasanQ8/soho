// components/ContactForm.tsx
"use client";

import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const form = e.currentTarget;
      const data = {
        name: (form.elements.namedItem("name") as HTMLInputElement)?.value,
        phone: (form.elements.namedItem("phone") as HTMLInputElement)?.value,
        email: (form.elements.namedItem("email") as HTMLInputElement)?.value,
      };
      // TODO: send to your API route
      // await fetch('/api/soho-lead', { method: 'POST', body: JSON.stringify(data) });

      alert("Thanks! We’ll contact you soon."); // placeholder UX
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="mt-6 grid gap-3 sm:max-w-md" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="name">
        Name
      </label>
      <input
        id="name"
        name="name"
        placeholder="Name"
        className="rounded-xl border-0 px-4 py-3 text-gray-900 ring-1 ring-white/30 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
      />
      <label className="sr-only" htmlFor="phone">
        Phone
      </label>
      <input
        id="phone"
        name="phone"
        placeholder="Phone"
        className="rounded-xl border-0 px-4 py-3 text-gray-900 ring-1 ring-white/30 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
      />
      <label className="sr-only" htmlFor="email">
        Work email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Work email"
        className="rounded-xl border-0 px-4 py-3 text-gray-900 ring-1 ring-white/30 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
      />
      <button
        disabled={loading}
        className="mt-2 inline-flex items-center justify-center rounded-xl bg:white bg-white px-5 py-3 font-semibold text-fuchsia-700 hover:bg-fuchsia-50 focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-60"
      >
        {loading ? "Submitting…" : "Request a callback"}
      </button>
      <p className="text-xs text-fuchsia-100">
        By submitting, you agree to be contacted about business services.
      </p>
    </form>
  );
}
