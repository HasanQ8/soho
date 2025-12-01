// app/page.tsx (or src/app/page.tsx)
"use client";

import * as React from "react";
import Image from "next/image";

// ---------- Settings (colors) ----------
const BRAND = "#4f008c"; // stc purple
const CTA = "#ff375e"; // buttons
const SUCCESS = "#16a34a"; // success green

// ---------- Data ----------
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
const listedServices = listedServicesList.map((s) => s.title);

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

// Industry cards + details (More details modal content)
const industries = [
  {
    title: "Architects & Designer",
    tagline: "Stop missing important client calls",
    details: [
      "Unified communication (desk phone + mobile + softphone)",
      "Auto-attendant & smart routing (site/office, time-of-day)",
      "Call logs & lightweight CRM notes for approvals/sign-offs",
      "Project hotlines & hunt groups for active sites",
      "Optional call recording to capture change requests",
    ],
    comingSoon: false,
  },
  {
    title: "Salons & Spas",
    tagline: "Give your clients the premium experience they deserve",
    details: [
      "Online booking with automatic reminders (SMS/WhatsApp)",
      "Loyalty & membership management (points, tiers, vouchers)",
      "POS + payment, with optional cashback promotions",
      "Multi-staff scheduling & no-show reduction tools",
      "Branded booking microsite with Instagram integration",
    ],
    comingSoon: false,
  },
  {
    title: "Content Creators",
    tagline: "Never let your connectivity slow down your creativity",
    details: [],
    comingSoon: true, // “More details” disabled; shows Coming soon
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

// ---------- Page (Client) ----------
export default function Home() {
  // form + UI state
  const [pending, setPending] = React.useState(false);
  const [ok, setOk] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // selections
  const [selectedPlan, setSelectedPlan] = React.useState("");
  const [selectedIndustries, setSelectedIndustries] = React.useState<
    Set<string>
  >(new Set());
  const [selectedServices, setSelectedServices] = React.useState<Set<string>>(
    new Set()
  );

  // appointment
  const [aptOpen, setAptOpen] = React.useState(false);
  const [aptDate, setAptDate] = React.useState("");
  const [aptTime, setAptTime] = React.useState("");

  // industry details modal
  const [industryModalOpen, setIndustryModalOpen] = React.useState<
    string | null
  >(null);

  const hourSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  // helpers
  const toggleIndustry = (ind: string) =>
    setSelectedIndustries((prev) => {
      const next = new Set(prev);
      next.has(ind) ? next.delete(ind) : next.add(ind);
      return next;
    });

  const toggleService = (svc: string) =>
    setSelectedServices((prev) => {
      const next = new Set(prev);
      next.has(svc) ? next.delete(svc) : next.add(svc);
      return next;
    });

  function validate(fd: FormData) {
    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const email = String(fd.get("email") || "").trim();
    if (!name) return "Please enter your full name.";
    if (!phone || phone.replace(/\D/g, "").length < 8)
      return "Please enter a valid phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Please enter a valid work email.";
    return null;
  }

  function resetAll(formEl: HTMLFormElement) {
    try {
      formEl.reset();
    } catch {}
    setSelectedPlan("");
    setSelectedIndustries(new Set());
    setSelectedServices(new Set());
    setAptDate("");
    setAptTime("");
  }

  // click handlers
  function onPlanCardClick(name: string) {
    setSelectedPlan(name);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

  function onIndustryTalk(title: string) {
    setSelectedIndustries((prev) => new Set(prev).add(title));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setOk(false);
    setPending(true);

    const form = e.currentTarget;
    const fd = new FormData(form);

    // mirror client selections into fd (useful if you wire a backend later)
    fd.set("plan", selectedPlan);
    selectedIndustries.forEach((ind) => fd.append("industries", ind));
    selectedServices.forEach((svc) => fd.append("services", svc));
    if (aptDate) fd.set("appointmentDate", aptDate);
    if (aptTime) fd.set("appointmentTime", aptTime);

    const err = validate(fd);
    if (err) {
      setPending(false);
      setError(err);
      return;
    }

    // success (client-side only)
    setPending(false);
    setOk(true);
    resetAll(form);
  }

  return (
    <main className="min-h-screen bg-white text-black">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `linear-gradient(135deg, ${BRAND}1A, ${BRAND}33)`,
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
              src="/soho/Soho1.png"
              alt="SOHO dashboard preview"
              fill
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover rounded-2xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* BENEFITS */}
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

      {/* INDUSTRY PACKAGES */}
      <section
        className="mx-auto max-w-7xl px-6 py-6"
        aria-labelledby="industry-heading"
      >
        <h2
          id="industry-heading"
          className="text-2xl font-bold"
          style={{ color: "#000" }}
        >
          Industry packages
        </h2>
        <p className="mt-2" style={{ color: "#374151" }}>
          Ready-made bundles tailored for popular small-business verticals.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((card) => (
            <article
              key={card.title}
              className="rounded-3xl p-6 shadow-sm flex flex-col"
              style={{
                backgroundColor: "#fff",
                color: "#000",
                border: "1px solid #e5e7eb",
              }}
            >
              <header className="mb-3">
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="mt-1 text-sm" style={{ color: "#6b7280" }}>
                  {card.tagline}
                </p>
              </header>

              <div className="mt-auto flex gap-2">
                {card.comingSoon ? (
                  <button
                    type="button"
                    disabled
                    title="Coming soon"
                    className="rounded-xl px-4 py-2 font-semibold opacity-60 cursor-not-allowed ring-1"
                    style={{
                      color: "#000",
                      borderColor: "#d1d5db",
                      backgroundColor: "transparent",
                    }}
                  >
                    Coming soon
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIndustryModalOpen(card.title)}
                    className="rounded-xl px-4 py-2 ring-1"
                    style={{
                      color: "#4f008c",
                      borderColor: "#d1d5db",
                      backgroundColor: "transparent",
                    }}
                  >
                    More details
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => onIndustryTalk(card.title)}
                  className="rounded-xl px-4 py-2 font-semibold"
                  style={{ backgroundColor: CTA, color: "#fff" }}
                >
                  Talk to sales
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SERVICES — clickable + synced with form */}
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
          Click to select services; your choices will appear pre-checked in the
          form below.
        </p>

        <ul
          className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {listedServicesList.map((s) => {
            const active = selectedServices.has(s.title);
            return (
              <li key={s.title}>
                <button
                  type="button"
                  onClick={() => {
                    toggleService(s.title);
                    // Optional: auto-scroll to contact when selecting
                    // document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  aria-pressed={active}
                  className="w-full rounded-xl border p-4 text-left text-sm transition-shadow"
                  style={{
                    borderColor: active ? BRAND : "#e5e7eb",
                    backgroundColor: "#fff",
                    color: "#000",
                    boxShadow: active ? `0 0 0 3px ${BRAND}33` : "none",
                  }}
                >
                  <span className="font-medium">{s.title}</span>
                  <span className="block mt-1" style={{ color: "#6b7280" }}>
                    {s.description}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {/* PLANS */}
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
          Pick a plan to pre-fill the form, or change it in the form anytime.
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
                <button
                  type="button"
                  onClick={() => onPlanCardClick(p.name)}
                  className="inline-flex w-full items-center justify-center rounded-xl px-4 py-3 focus:outline-none focus:ring-2"
                  style={{ backgroundColor: CTA, color: "#fff" }}
                >
                  {p.cta}
                </button>
              </div>
              <p className="mt-3 text-xs" style={{ color: "#6b7280" }}>
                Prices in SAR. VAT may apply. Terms subject to change.
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* CONTACT */}
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

              <form
                className="mt-6 grid gap-3 sm:max-w-md"
                onSubmit={onSubmit}
                noValidate
              >
                {error && (
                  <div
                    className="rounded-xl p-3"
                    style={{ backgroundColor: "#fff3c4", color: "#7a4d00" }}
                  >
                    {error}
                  </div>
                )}

                {/* Honeypot */}
                <div aria-hidden className="hidden">
                  <label htmlFor="hp_trap">Company Website</label>
                  <input id="hp_trap" name="hp_trap" />
                </div>

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
                    boxShadow: "inset 0 0 0 1px #ffffff4d",
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
                    boxShadow: "inset 0 0 0 1px #ffffff4d",
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
                    boxShadow: "inset 0 0 0 1px #ffffff4d",
                  }}
                />

                {/* Preferred plan */}
                <div>
                  <label
                    htmlFor="plan"
                    className="block text-sm mb-1"
                    style={{ color: "#fff" }}
                  >
                    Preferred plan
                  </label>
                  <select
                    id="plan"
                    name="plan"
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    className="w-full rounded-xl border-0 px-4 py-3 focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: "#fff",
                      color: "#000",
                      boxShadow: "inset 0 0 0 1px #ffffff4d",
                    }}
                  >
                    <option value="">No preference</option>
                    {plans.map((p) => (
                      <option key={p.name} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Services (checkboxes reflect service-card selections) */}
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
                          checked={selectedServices.has(s)}
                          onChange={() => toggleService(s)}
                          className="mt-1 h-4 w-4"
                          style={{ accentColor: CTA }}
                        />
                        <span>{s}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* Industries (Talk to sales auto-ticks) */}
                <fieldset
                  className="mt-2 rounded-xl p-3"
                  style={{ border: "1px solid #ffffff4d" }}
                >
                  <legend className="px-1 text-sm" style={{ color: "#fff" }}>
                    Your industry (select all that apply)
                  </legend>
                  <div className="mt-2 grid gap-2">
                    {industries.map((ind) => (
                      <label
                        key={ind.title}
                        className="flex gap-2 items-start"
                        style={{ color: "#fff" }}
                      >
                        <input
                          type="checkbox"
                          name="industries"
                          value={ind.title}
                          checked={selectedIndustries.has(ind.title)}
                          onChange={() => toggleIndustry(ind.title)}
                          className="mt-1 h-4 w-4"
                          style={{ accentColor: CTA }}
                        />
                        <span>{ind.title}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

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
                      boxShadow: "inset 0 0 0 1px #ffffff4d",
                    }}
                  />
                </div>

                <label htmlFor="notes" className="sr-only">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  placeholder="Tell us about your setup or timeline (optional)"
                  className="rounded-xl border-0 px-4 py-3 placeholder-gray-600 focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: "#fff",
                    color: "#000",
                    boxShadow: "inset 0 0 0 1px #ffffff4d",
                  }}
                />

                {(aptDate || aptTime) && (
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {aptDate && (
                      <span
                        className="rounded-full px-3 py-1 text-sm"
                        style={{
                          backgroundColor: "#ffffff",
                          color: "#000",
                          boxShadow: "inset 0 0 0 1px #e5e7eb",
                        }}
                      >
                        Date: {aptDate}
                      </span>
                    )}
                    {aptTime && (
                      <span
                        className="rounded-full px-3 py-1 text-sm"
                        style={{
                          backgroundColor: "#ffffff",
                          color: "#000",
                          boxShadow: "inset 0 0 0 1px #e5e7eb",
                        }}
                      >
                        Time: {aptTime}
                      </span>
                    )}
                  </div>
                )}

                {/* Appointment FIRST */}
                <button
                  type="button"
                  onClick={() => setAptOpen(true)}
                  className="mt-2 inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold ring-1 focus:outline-none focus:ring-2"
                  style={{ color: "#fff", borderColor: "#ffffff66" }}
                >
                  Book an appointment
                </button>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={pending}
                  className="mt-2 inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold focus:outline-none focus:ring-2 disabled:opacity-70"
                  style={{ backgroundColor: CTA, color: "#fff" }}
                >
                  {pending ? "Submitting…" : "Request a callback"}
                </button>

                <p className="text-xs" style={{ color: "#f5d9ff" }}>
                  By submitting, you agree to be contacted about business
                  services.
                </p>

                {/* Hidden mirrors (future backend) */}
                <input type="hidden" name="appointmentDate" value={aptDate} />
                <input type="hidden" name="appointmentTime" value={aptTime} />
              </form>
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

      {/* INDUSTRY DETAILS MODAL */}
      {industryModalOpen && (
        <>
          <div
            aria-hidden
            className="fixed inset-0 z-[9998]"
            style={{ background: "rgba(79, 0, 140, 0.35)" }}
            onClick={() => setIndustryModalOpen(null)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="industry-modal-title"
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          >
            <div
              className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="px-5 py-3"
                style={{ backgroundColor: BRAND, color: "#fff" }}
              >
                <div className="flex items-center justify-between">
                  <h3
                    id="industry-modal-title"
                    className="text-base font-semibold"
                  >
                    {industryModalOpen}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIndustryModalOpen(null)}
                    className="rounded px-2 py-1 font-semibold"
                    style={{ backgroundColor: "#ffffff22", color: "#fff" }}
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="px-5 py-4" style={{ color: "#000" }}>
                {industries
                  .filter((c) => c.title === industryModalOpen)
                  .map((c) =>
                    c.details.length ? (
                      <ul key={c.title} className="list-disc pl-5 space-y-2">
                        {c.details.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    ) : (
                      <p
                        key={c.title}
                        className="text-sm"
                        style={{ color: "#6b7280" }}
                      >
                        More details will be available soon.
                      </p>
                    )
                  )}
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIndustryModalOpen(null)}
                    className="rounded-xl px-4 py-2 font-semibold"
                    style={{ backgroundColor: CTA, color: "#fff" }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* APPOINTMENT MODAL */}
      {aptOpen && (
        <>
          <div
            aria-hidden
            className="fixed inset-0 z-40"
            style={{ background: "rgba(79, 0, 140, 0.35)" }}
            onClick={() => setAptOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="apt-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="px-5 py-3"
                style={{ backgroundColor: BRAND, color: "#fff" }}
              >
                <div className="flex items-center justify-between">
                  <h3 id="apt-title" className="text-base font-semibold">
                    Book an appointment
                  </h3>
                  <button
                    type="button"
                    onClick={() => setAptOpen(false)}
                    className="rounded px-2 py-1 font-semibold"
                    style={{ backgroundColor: "#ffffff22", color: "#fff" }}
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="px-5 py-4" style={{ color: "#000" }}>
                <label
                  htmlFor="apt-date"
                  className="block text-sm font-medium mb-1"
                >
                  Choose a date
                </label>
                <input
                  id="apt-date"
                  type="date"
                  className="w-full rounded-lg border px-3 py-2"
                  value={aptDate}
                  onChange={(e) => setAptDate(e.target.value)}
                  min={new Date().toISOString().slice(0, 10)}
                />

                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Choose a time</p>
                  <div className="grid grid-cols-3 gap-2">
                    {hourSlots.map((t) => {
                      const active = aptTime === t;
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setAptTime(t)}
                          className="rounded-lg px-3 py-2 text-sm ring-1"
                          style={{
                            backgroundColor: active ? BRAND : "#fff",
                            color: active ? "#fff" : "#000",
                            borderColor: active ? BRAND : "#d1d5db",
                          }}
                          aria-pressed={active}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    className="rounded-xl px-4 py-2 ring-1"
                    style={{ color: "#000", borderColor: "#d1d5db" }}
                    onClick={() => setAptOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="rounded-xl px-4 py-2 font-semibold"
                    style={{ backgroundColor: CTA, color: "#fff" }}
                    onClick={() => aptDate && aptTime && setAptOpen(false)}
                  >
                    Confirm appointment
                  </button>
                </div>

                <p className="mt-3 text-xs" style={{ color: "#6b7280" }}>
                  Your selected appointment will be submitted along with the
                  form.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* SUCCESS POPUP */}
      {ok && (
        <>
          <div
            aria-hidden
            className="fixed inset-0 z-40"
            style={{ background: "rgba(79, 0, 140, 0.35)" }}
            onClick={() => setOk(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="px-5 py-3"
                style={{ backgroundColor: BRAND, color: "#fff" }}
              >
                <h3 id="success-title" className="text-base font-semibold">
                  Request received
                </h3>
              </div>
              <div className="px-5 py-4" style={{ color: "#000" }}>
                <div className="flex items-center gap-3">
                  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
                    <circle cx="12" cy="12" r="10" fill={SUCCESS} />
                    <path
                      d="M7 12.5l3 3 7-7"
                      stroke="#fff"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                  <p className="font-medium">
                    We’ve received your request and will contact you shortly.
                  </p>
                </div>
                <div className="mt-5 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setOk(false)}
                    className="rounded-xl px-4 py-2 font-semibold"
                    style={{ backgroundColor: CTA, color: "#fff" }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
