// app/soho/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

// ---------- SEO ----------
export const metadata: Metadata = {
  title: "SOHO Solutions | stc (Revamp Demo)",
  description:
    "Smart telecom bundles and digital tools tailored for Small Office / Home Office customers.",
  alternates: { canonical: "/soho" },
  openGraph: {
    title: "SOHO Solutions | stc (Revamp Demo)",
    description:
      "Smart telecom bundles and digital tools tailored for Small Office / Home Office customers.",
    url: "https://www.example.com/soho",
    siteName: "stc (revamp demo)",
    images: [{ url: "/soho/og.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
};

// ---------- Data (swap to CMS/API later) ----------
const plans = [
  {
    name: "Starter",
    price: "119",
    period: "/month",
    tagline: "For solo founders",
    features: [
      "Up to 200 Mbps fiber or 5G",
      "1 business line + eSIM",
      "Wi-Fi 6 router included",
      "Self-serve portal access",
    ],
    cta: "Get Starter",
    popular: false,
  },
  {
    name: "Growth",
    price: "199",
    period: "/month",
    tagline: "Most popular for micro-teams",
    features: [
      "Up to 500 Mbps fiber or 5G",
      "3 business lines + shared data",
      "Static IP add-on ready",
      "Priority support (8×5)",
    ],
    cta: "Choose Growth",
    popular: true,
  },
  {
    name: "Pro",
    price: "299",
    period: "/month",
    tagline: "Advanced connectivity",
    features: [
      "Up to 1 Gbps fiber",
      "5 business lines + add-ons",
      "Managed router + guest Wi-Fi",
      "Priority support (24×7)",
    ],
    cta: "Go Pro",
    popular: false,
  },
];

const benefits = [
  {
    title: "Simple bundles",
    desc: "One bill for lines, data and devices—scale up as you grow.",
    icon: "briefcase",
  },
  {
    title: "Fast install",
    desc: "Fiber or 5G setup with guided onboarding in days, not weeks.",
    icon: "bolt",
  },
  {
    title: "Business-grade support",
    desc: "Priority routes and expert help when it matters most.",
    icon: "lifebuoy",
  },
  {
    title: "Self-serve portal",
    desc: "Manage users, SIMs, add-ons and invoices from a single place.",
    icon: "settings",
  },
];

// ---------- Icons ----------
function Icon({
  name,
  className = "w-6 h-6",
}: {
  name: string;
  className?: string;
}) {
  const common = "stroke-current";
  switch (name) {
    case "briefcase":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={`${className} ${common}`}
          aria-hidden
        >
          <path d="M9 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" strokeWidth="1.6" />
          <rect x="3" y="6" width="18" height="14" rx="2" strokeWidth="1.6" />
          <path d="M3 12h18" strokeWidth="1.6" />
        </svg>
      );
    case "bolt":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={`${className} ${common}`}
          aria-hidden
        >
          <path d="M13 2L3 14h7l-1 8 11-12h-7V2z" strokeWidth="1.6" />
        </svg>
      );
    case "lifebuoy":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={`${className} ${common}`}
          aria-hidden
        >
          <circle cx="12" cy="12" r="4" strokeWidth="1.6" />
          <circle cx="12" cy="12" r="9" strokeWidth="1.6" />
          <path
            d="M7.8 7.8 4.2 4.2M16.2 7.8l3.6-3.6M7.8 16.2l-3.6 3.6M16.2 16.2l3.6 3.6"
            strokeWidth="1.6"
          />
        </svg>
      );
    case "settings":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={`${className} ${common}`}
          aria-hidden
        >
          <path
            d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
            strokeWidth="1.6"
          />
          <path
            d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 0 1-1.4 3.4h-.4a1 1 0 0 0-1 .7l-.1.2a2 2 0 0 1-3.8 0l-.1-.2a1 1 0 0 0-1-.7h-.3a2 2 0 0 1-1.5-3.4l.1-.1a1 1 0 0 0 .2-1.1l-.2-.3a2 2 0 0 1 1-3.1l.3-.1a1 1 0 0 0 .7-1l-.1-.3a2 2 0 0 1 3.8 0l.1.3a1 1 0 0 0 .7 1l.3.1a2 2 0 0 1 1 3.1l-.2.3z"
            strokeWidth="1.6"
          />
        </svg>
      );
    default:
      return null;
  }
}

// ---------- Server Action (handles the form) ----------
async function submitLead(formData: FormData) {
  "use server";

  const name = String(formData.get("name") || "");
  const phone = String(formData.get("phone") || "");
  const email = String(formData.get("email") || "");

  // TODO: Add validation + persistence (Firestore/DB) or send to CRM/email.
  // Example:
  // await db.insert('leads', { name, phone, email, source: 'soho' });

  // For the demo, just redirect with a flag
  redirect("/soho?submitted=1");
}

// ---------- Page ----------
export default function SohoPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const submitted = searchParams?.submitted === "1";

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-200 via-fuchsia-200 to-rose-200" />
        <div className="mx-auto max-w-7xl px-6 py-20 lg:flex lg:items-center lg:gap-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-fuchsia-700 ring-1 ring-fuchsia-300">
              New • SOHO bundles now with 5G
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Connectivity that grows with your{" "}
              <span className="text-fuchsia-700">small business</span>
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              Simple, flexible internet and mobile bundles—built for
              freelancers, home offices and micro-teams.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#plans"
                className="rounded-2xl bg-fuchsia-700 px-5 py-3 text-white shadow hover:bg-fuchsia-800 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
              >
                View plans
              </a>
              <a
                href="#contact"
                className="rounded-2xl px-5 py-3 ring-1 ring-gray-300 hover:bg-white/60"
              >
                Talk to sales
              </a>
            </div>
          </div>

          <div className="relative mt-10 h-64 w-full max-w-xl self-end rounded-3xl bg-white/70 p-4 shadow-lg lg:mt-0">
            <Image
              src="/soho/Soho.png"
              alt="SOHO dashboard preview"
              fill
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover rounded-2xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section
        className="mx-auto max-w-7xl px-6 py-14"
        aria-labelledby="benefits-heading"
      >
        <h2 id="benefits-heading" className="text-2xl font-bold">
          Why choose our SOHO bundles
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="rounded-3xl border border-gray-200 p-6 shadow-sm"
            >
              <Icon name={b.icon} className="h-7 w-7 text-fuchsia-700" />
              <h3 className="mt-4 text-lg font-semibold">{b.title}</h3>
              <p className="mt-1 text-gray-600">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Plans */}
      <section
        id="plans"
        className="mx-auto max-w-7xl px-6 py-14"
        aria-labelledby="plans-heading"
      >
        <h2 id="plans-heading" className="text-2xl font-bold">
          Plans that fit your business
        </h2>
        <p className="mt-2 text-gray-600">
          All plans include business lines, high-speed internet and self-serve
          portal access.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((p) => (
            <article
              key={p.name}
              className={`relative rounded-3xl border p-6 shadow-sm ${
                p.popular
                  ? "border-fuchsia-300 ring-2 ring-fuchsia-200"
                  : "border-gray-200"
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-6 rounded-full bg-fuchsia-700 px-3 py-1 text-xs font-semibold text-white shadow">
                  Most popular
                </span>
              )}
              <header className="mb-4">
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p className="text-sm text-gray-600">{p.tagline}</p>
              </header>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">{p.price}</span>
                <span className="text-sm text-gray-600">{p.period}</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span
                      aria-hidden
                      className="mt-1 inline-block h-2 w-2 rounded-full bg-fuchsia-700"
                    ></span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <a
                  href="#contact"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-gray-900 px-4 py-3 text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                >
                  {p.cta}
                </a>
              </div>
              <p className="mt-3 text-xs text-gray-500">
                Prices in SAR. VAT may apply. Terms subject to change.
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section
        className="mx-auto max-w-7xl px-6 py-14"
        aria-labelledby="how-heading"
      >
        <h2 id="how-heading" className="text-2xl font-bold">
          Get connected in 3 steps
        </h2>
        <ol className="mt-6 grid gap-6 sm:grid-cols-3">
          {[
            {
              title: "Check availability",
              desc: "Tell us your location to see fiber/5G options and speeds.",
            },
            {
              title: "Pick your bundle",
              desc: "Select lines, add-ons and commitment terms that fit your team.",
            },
            {
              title: "Install & go",
              desc: "We deliver your router/SIMs and activate your service.",
            },
          ].map((s, i) => (
            <li
              key={s.title}
              className="rounded-3xl border border-gray-200 p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-content-center rounded-full bg-fuchsia-700 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="text-lg font-semibold">{s.title}</h3>
              </div>
              <p className="mt-2 text-gray-600">{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="relative mx-auto max-w-7xl px-6 pb-24">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-fuchsia-700 to-violet-700">
          <div className="grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Let’s tailor a SOHO bundle for you
              </h2>
              <p className="mt-2 text-fuchsia-100">
                Leave your details and our business team will reach out.
              </p>

              {submitted ? (
                <div className="mt-6 rounded-xl bg-white/10 p-4 text-white">
                  <p className="font-semibold">
                    Thanks! We’ll contact you soon.
                  </p>
                  <p className="text-sm text-fuchsia-100">
                    Your request has been received.
                  </p>
                </div>
              ) : (
                <form
                  className="mt-6 grid gap-3 sm:max-w-md"
                  action={submitLead}
                >
                  <label className="sr-only" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    placeholder="Name"
                    required
                    className="rounded-xl border-0 px-4 py-3 text-fuchsia-100 ring-1 ring-white/30 placeholder:fuchsia-100 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <label className="sr-only text-white" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    required
                    className="rounded-xl border-0 px-4 py-3 text-fuchsia-100 ring-1 ring-white/30 placeholder:fuchsia-100 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <label className="sr-only" htmlFor="email">
                    Work email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Work email"
                    required
                    className="rounded-xl border-0 px-4 py-3 text-fuchsia-100 ring-1 ring-white/30 placeholder:fuchsia-100 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button className="mt-2 inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 font-semibold text-fuchsia-700 hover:bg-fuchsia-50 focus:outline-none focus:ring-2 focus:ring-white">
                    Request a callback
                  </button>
                  <p className="text-xs text-fuchsia-100">
                    By submitting, you agree to be contacted about business
                    services.
                  </p>
                </form>
              )}
            </div>

            <div className="relative h-64 w-full lg:h-80">
              <Image
                src="/soho/hero-dashboard.png"
                alt="Business team call"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProductCollection",
            name: "SOHO Bundles",
            description:
              "Internet + mobile bundles for small office and home office customers.",
            url: "https://www.example.com/soho",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "SOHO Plans",
              itemListElement: plans.map((p) => ({
                "@type": "Offer",
                name: p.name,
                price: p.price,
                priceCurrency: "SAR",
                category: "TelecommunicationsService",
              })),
            },
          }),
        }}
      />
    </main>
  );
}
