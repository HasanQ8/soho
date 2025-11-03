// app/soho/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

// ---------- SEO ----------
export const metadata: Metadata = {
  title: "SOHO Solutions | stc – Small Office / Home Office (Revamp)",
  description:
    "Request SOHO services like Fiber Link, Business Professional, Maktabi, Toll-free 800, UAN 9200, DIA and more. Fast install, simple bundles, priority support.",
  alternates: { canonical: "/soho" },
  openGraph: {
    title: "SOHO Solutions | stc – Small Office / Home Office (Revamp)",
    description:
      "Request SOHO services—Fiber Link, Business Professional, Maktabi, DIA and more—with fast install and priority support.",
    url: "https://www.example.com/soho",
    siteName: "stc (revamp)",
    images: [{ url: "/soho/Soho.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
};

// ---------- Settings (colors) ----------
const BRAND = "#4f008c"; // main stc color
const CTA = "#ff375e"; // buttons color

// ---------- Data (swap to CMS/API later) ----------
const listedServicesList = [
  {
    title: "Fiber Link",
    description:
      "Business fixed fiber internet for dependable, high-speed connectivity with bundled communication features tailored to small offices.",
  },
  {
    title: "Business Professional",
    description:
      "Mobile postpaid packages for businesses—unlimited team calling, data options, device discounts, and flexible plans to boost productivity.",
  },
  {
    title: "Maktabi packages",
    description:
      "Wireless fixed (often 5G) office internet designed for SOHO sites—great when fiber isn’t available; quick install and simple monthly plans.",
  },
  {
    title: "Universal Access Number 9200 (UAN)",
    description:
      "A single national number that intelligently routes calls—distribute/forward by time or busy status, set limits, and record calls.",
  },
  {
    title: "Toll free service 800",
    description:
      "Let customers reach you free of charge via 800 numbers—ideal for sales and service lines across sectors and government entities.",
  },
  {
    title: "Dedicated Internet Access (DIA)",
    description:
      "Symmetric, dedicated internet with guaranteed quality and stable speeds over fiber or microwave—plus optional managed add-on services.",
  },
  {
    title: "Maktabi 5G (Mazaya Platform)",
    description:
      "Maktabi variant using 5G for office internet—fast wireless fixed access where fiber isn’t present, typically with straightforward setup.",
  },
  {
    title: "Sunmi POS with 5GB SIM",
    description:
      "Bundle that pairs a Sunmi POS device with a 5GB business SIM—available on 12/24-month contracts for a streamlined retail setup.",
  },
];

const listedServices = [
  "Fiber Link",
  "Business Professional",
  "Maktabi packages",
  "Universal Access Number 9200",
  "Toll free service 800",
  "Dedicated Internet Access (DIA)",
  "Maktabi 5G (Mazaya Platform)",
  "Sunmi POS with 5GB SIM",
];

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
    desc: "One bill for lines, data and devices—scale as you grow.",
    icon: "briefcase",
  },
  {
    title: "Fast install",
    desc: "Fiber or 5G setup—onboarded in days, not weeks.",
    icon: "bolt",
  },
  {
    title: "Priority support",
    desc: "Business-grade routes and expert help.",
    icon: "lifebuoy",
  },
  {
    title: "Self-serve portal",
    desc: "Manage users, SIMs, add-ons and invoices in one place.",
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

  // Honeypot (should be empty). If bots fill it, we silently drop.
  if (String(formData.get("company_website") || "").trim() !== "") {
    redirect("/soho?submitted=1");
  }

  const name = String(formData.get("name") || "");
  const phone = String(formData.get("phone") || "");
  const email = String(formData.get("email") || "");
  const services = formData.getAll("services").map(String); // checkboxes
  const other = String(formData.get("other") || "");
  const notes = String(formData.get("notes") || "");

  // TODO: validate & persist (DB/CRM) or email. You can also add reCAPTCHA v3 verification here.

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
    <main className="min-h-screen bg-white text-black">
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Brand gradient (non-white → use white text inside) */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `linear-gradient(135deg, ${BRAND}1A, ${BRAND}33)`, // light brand tint
          }}
        />
        <div className="mx-auto max-w-7xl px-6 py-20 lg:flex lg:items-center lg:gap-12">
          <div className="max-w-2xl">
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1"
              style={{
                backgroundColor: "#ffffffb3",
                color: BRAND,
                borderColor: `${BRAND}66`,
              }}
            >
              SOHO • Small Office / Home Office
            </span>
            <h1
              className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl"
              style={{ color: "#000" }}
            >
              Connectivity that grows with your{" "}
              <span style={{ color: BRAND }}>small business</span>
            </h1>
            <p className="mt-4 text-lg" style={{ color: "#111" }}>
              Simple bundles and business-grade internet, with fast installation
              and priority support.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#services"
                className="rounded-2xl px-5 py-3 shadow focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: BRAND,
                  color: "#fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,.15)",
                }}
              >
                Choose services
              </a>
              <a
                href="#contact"
                className="rounded-2xl px-5 py-3 ring-1 focus:outline-none focus:ring-2"
                style={{ color: "#000", borderColor: "#d1d5db" }}
              >
                Talk to sales
              </a>
            </div>
          </div>

          <div
            className="relative mt-10 h-64 w-full max-w-xl self-end rounded-3xl p-4 shadow-lg lg:mt-0"
            style={{ backgroundColor: "#ffffffb3" }}
          >
            <Image
              src="/soho/hero-dashboard.png"
              alt="SOHO dashboard preview"
              fill
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover rounded-2xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* BENEFITS (white background → black text) */}
      <section
        className="mx-auto max-w-7xl px-6 py-14"
        aria-labelledby="benefits-heading"
      >
        <h2
          id="benefits-heading"
          className="text-2xl font-bold"
          style={{ color: "#000" }}
        >
          Why choose our SOHO bundles
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="rounded-3xl border p-6 shadow-sm"
              style={{
                borderColor: "#e5e7eb",
                backgroundColor: "#fff",
                color: "#000",
              }}
            >
              <Icon name={b.icon} className="h-7 w-7" />
              <h3 className="mt-4 text-lg font-semibold">{b.title}</h3>
              <p className="mt-1" style={{ color: "#374151" }}>
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES PREVIEW (informational list; white background) */}
      <section
        id="services"
        className="mx-auto max-w-7xl px-6 py-14"
        aria-labelledby="services-heading"
      >
        <h2
          id="services-heading"
          className="text-2xl font-bold"
          style={{ color: "#000" }}
        >
          Popular SOHO services
        </h2>
        <p className="mt-2" style={{ color: "#374151" }}>
          Select the services you need in the form below—we’ll tailor the bundle
          for you.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {listedServicesList.map((s) => (
            <li
              key={s.title}
              className="rounded-xl border p-4 text-sm"
              style={{
                borderColor: "#e5e7eb",
                backgroundColor: "#fff",
                color: "#000",
              }}
            >
              <span className="font-medium">{s.title}</span>
              <span className="block" style={{ color: "#6b7280" }}>
                {s.description}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* PLANS (white background) */}
      <section
        id="plans"
        className="mx-auto max-w-7xl px-6 py-14"
        aria-labelledby="plans-heading"
      >
        <h2
          id="plans-heading"
          className="text-2xl font-bold"
          style={{ color: "#000" }}
        >
          Plans that fit your business
        </h2>
        <p className="mt-2" style={{ color: "#374151" }}>
          All plans include business lines, high-speed internet and self-serve
          portal access.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((p) => (
            <article
              key={p.name}
              className="relative rounded-3xl border p-6 shadow-sm"
              style={{
                borderColor: p.popular ? `${BRAND}4D` : "#e5e7eb",
                boxShadow: p.popular ? `0 0 0 2px ${BRAND}33` : undefined,
                backgroundColor: "#fff",
                color: "#000",
              }}
            >
              {p.popular && (
                <span
                  className="absolute -top-3 left-6 rounded-full px-3 py-1 text-xs font-semibold shadow"
                  style={{ backgroundColor: BRAND, color: "#fff" }}
                >
                  Most popular
                </span>
              )}
              <header className="mb-4">
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p style={{ color: "#6b7280" }}>{p.tagline}</p>
              </header>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">{p.price}</span>
                <span style={{ color: "#6b7280" }}>{p.period}</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span
                      aria-hidden
                      className="mt-1 inline-block h-2 w-2 rounded-full"
                      style={{ backgroundColor: BRAND }}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <a
                  href="#contact"
                  className="inline-flex w-full items-center justify-center rounded-xl px-4 py-3 focus:outline-none focus:ring-2"
                  style={{ backgroundColor: CTA, color: "#fff" }}
                >
                  {p.cta}
                </a>
              </div>
              <p className="mt-3 text-xs" style={{ color: "#6b7280" }}>
                Prices in SAR. VAT may apply. Terms subject to change.
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* CONTACT (colored background → white text) */}
      <section id="contact" className="relative mx-auto max-w-7xl px-6 pb-24">
        <div
          className="overflow-hidden rounded-3xl"
          style={{
            backgroundImage: `linear-gradient(135deg, ${BRAND}, ${BRAND})`,
          }}
        >
          <div className="grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: "#fff" }}>
                Request SOHO services for your business
              </h2>
              <p className="mt-2" style={{ color: "#f5d9ff" }}>
                Tell us what you need. We’ll tailor the right bundle and contact
                you shortly.
              </p>

              {/* Submission feedback */}
              {submitted ? (
                <div
                  className="mt-6 rounded-xl p-4"
                  style={{ backgroundColor: "#ffffff1a", color: "#fff" }}
                >
                  <p className="font-semibold">
                    Thanks! We’ve received your request.
                  </p>
                  <p style={{ color: "#f5d9ff" }} className="text-sm">
                    Our team will reach out soon.
                  </p>
                </div>
              ) : (
                <form
                  className="mt-6 grid gap-3 sm:max-w-md"
                  action={submitLead}
                >
                  {/* Honeypot (hidden) */}
                  <div aria-hidden className="hidden">
                    <label htmlFor="company_website">Company Website</label>
                    <input id="company_website" name="company_website" />
                  </div>

                  {/* Inputs: white bg → black text for readability (WCAG AA) */}
                  <label className="sr-only" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    placeholder="Full name"
                    required
                    className="rounded-xl border-0 px-4 py-3 placeholder-gray-600 focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: "#fff",
                      color: "#000",
                      boxShadow: `inset 0 0 0 1px ${"#ffffff4d"}`,
                    }}
                  />

                  <label className="sr-only" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    required
                    className="rounded-xl border-0 px-4 py-3 placeholder-gray-600 focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: "#fff",
                      color: "#000",
                      boxShadow: `inset 0 0 0 1px ${"#ffffff4d"}`,
                    }}
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
                    className="rounded-xl border-0 px-4 py-3 placeholder-gray-600 focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: "#fff",
                      color: "#000",
                      boxShadow: `inset 0 0 0 1px ${"#ffffff4d"}`,
                    }}
                  />

                  {/* Services group (accessible fieldset/legend) */}
                  <fieldset
                    className="mt-2 rounded-xl p-3"
                    style={{ border: "1px solid #ffffff4d" }}
                  >
                    <legend className="px-1 text-sm" style={{ color: "#fff" }}>
                      Which services are you interested in?
                    </legend>
                    <div className="mt-2 grid gap-2">
                      {listedServices.map((s) => (
                        <label
                          key={s}
                          className="flex gap-2 items-start"
                          style={{ color: "#fff" }}
                        >
                          <input
                            type="checkbox"
                            name="services"
                            value={s}
                            className="mt-1 h-4 w-4"
                            // Native checkbox → works without JS; visible against dark bg
                            style={{ accentColor: CTA }} // modern browsers
                          />
                          <span>{s}</span>
                        </label>
                      ))}
                    </div>
                    <div className="mt-3">
                      <label
                        htmlFor="other"
                        className="block text-sm"
                        style={{ color: "#fff" }}
                      >
                        Other services
                      </label>
                      <input
                        id="other"
                        name="other"
                        placeholder="Please specify (optional)"
                        className="mt-1 w-full rounded-lg border-0 px-3 py-2 placeholder-gray-700 focus:outline-none focus:ring-2"
                        style={{
                          backgroundColor: "#fff",
                          color: "#000",
                          boxShadow: `inset 0 0 0 1px ${"#ffffff4d"}`,
                        }}
                      />
                    </div>
                  </fieldset>

                  <label htmlFor="notes" className="sr-only">
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    placeholder="Tell us about your setup or timeline (optional)"
                    className="rounded-xl border-0 px-4 py-3 placeholder-gray-600 focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: "#fff",
                      color: "#000",
                      boxShadow: `inset 0 0 0 1px ${"#ffffff4d"}`,
                    }}
                    rows={3}
                  />

                  <button
                    className="mt-2 inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold focus:outline-none focus:ring-2"
                    style={{ backgroundColor: CTA, color: "#fff" }}
                  >
                    Request a callback
                  </button>
                  <p className="text-xs" style={{ color: "#f5d9ff" }}>
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

      {/* JSON-LD */}
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
