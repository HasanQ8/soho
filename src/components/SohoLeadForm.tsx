"use client";

import * as React from "react";

type Props = {
  brand: string; // "#4f008c"
  cta: string; // "#ff375e"
  success: string; // "#16a34a"
  listedServices: string[];
  plans: string[];
  industries: string[]; // ["Content creators", "Construction", "Saloons"]
};

export default function SohoLeadForm({
  brand,
  cta,
  success,
  listedServices,
  plans,
  industries,
}: Props) {
  const [pending, setPending] = React.useState(false);
  const [ok, setOk] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [selectedPlan, setSelectedPlan] = React.useState("");
  const [selectedIndustries, setSelectedIndustries] = React.useState<
    Set<string>
  >(new Set());

  const [aptOpen, setAptOpen] = React.useState(false);
  const [aptDate, setAptDate] = React.useState("");
  const [aptTime, setAptTime] = React.useState("");

  const hourSlots = React.useMemo(
    () => [
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
    ],
    []
  );

  // Prefill from plan cards + auto-tick industry from industry cards
  React.useEffect(() => {
    try {
      const cached = localStorage.getItem("selectedPlan") || "";
      if (cached) setSelectedPlan(cached);
    } catch {}
    const onPlan = (ev: any) => setSelectedPlan(ev?.detail?.plan ?? "");
    const onIndustry = (ev: any) => {
      const title = ev?.detail?.title as string;
      if (!title) return;
      setSelectedIndustries((prev) => new Set(prev).add(title));
    };
    window.addEventListener("plan:select" as any, onPlan);
    window.addEventListener("industry:select" as any, onIndustry);
    return () => {
      window.removeEventListener("plan:select" as any, onPlan);
      window.removeEventListener("industry:select" as any, onIndustry);
    };
  }, []);

  const toggleIndustry = (ind: string) =>
    setSelectedIndustries((prev) => {
      const next = new Set(prev);
      next.has(ind) ? next.delete(ind) : next.add(ind);
      return next;
    });

  // Simple client-side checks
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

  // Reset everything to original state
  function resetAll(formEl: HTMLFormElement) {
    try {
      formEl.reset();
    } catch {}
    setSelectedPlan("");
    setSelectedIndustries(new Set());
    setAptDate("");
    setAptTime("");
    try {
      localStorage.removeItem("selectedPlan");
    } catch {}
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // keep it client-side
    setError(null);
    setOk(false);
    setPending(true);

    const form = e.currentTarget;
    const fd = new FormData(form);

    // mirror controlled UI into form data (for future backend use)
    fd.set("plan", selectedPlan);
    selectedIndustries.forEach((ind) => fd.append("industries", ind));
    if (aptDate) fd.set("appointmentDate", aptDate);
    if (aptTime) fd.set("appointmentTime", aptTime);

    // honeypot
    if ((fd.get("hp_trap") as string)?.trim()) {
      setPending(false);
      setOk(true);
      resetAll(form);
      return;
    }

    // validate locally
    const err = validate(fd);
    if (err) {
      setPending(false);
      setError(err);
      return;
    }

    // success — no server, just show the popup and reset UI
    setPending(false);
    setOk(true);
    resetAll(form);
  }

  return (
    <>
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
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Services */}
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
                  style={{ accentColor: cta }}
                />
                <span>{s}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Industries */}
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
                key={ind}
                className="flex gap-2 items-start"
                style={{ color: "#fff" }}
              >
                <input
                  type="checkbox"
                  name="industries"
                  value={ind}
                  checked={selectedIndustries.has(ind)}
                  onChange={() => toggleIndustry(ind)}
                  className="mt-1 h-4 w-4"
                  style={{ accentColor: cta }}
                />
                <span>{ind}</span>
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
            <button
              type="button"
              onClick={() => setAptOpen(true)}
              className="rounded-full px-3 py-1 text-sm ring-1"
              style={{ color: "#fff", borderColor: "#ffffff66" }}
            >
              Change
            </button>
          </div>
        )}

        {/* ⬆️ Appointment FIRST */}
        <button
          type="button"
          onClick={() => setAptOpen(true)}
          className="mt-2 inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold ring-1 focus:outline-none focus:ring-2"
          style={{ color: "#fff", borderColor: "#ffffff66" }}
        >
          Book an appointment
        </button>

        {/* ⬇️ Then Submit */}
        <button
          type="submit"
          disabled={pending}
          className="mt-2 inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold focus:outline-none focus:ring-2 disabled:opacity-70"
          style={{ backgroundColor: cta, color: "#fff" }}
        >
          {pending ? "Submitting…" : "Request a callback"}
        </button>

        <p className="text-xs" style={{ color: "#f5d9ff" }}>
          By submitting, you agree to be contacted about business services.
        </p>

        {/* Hidden mirrors for appointment, for future backend use */}
        <input type="hidden" name="appointmentDate" value={aptDate} />
        <input type="hidden" name="appointmentTime" value={aptTime} />
      </form>

      {/* Appointment Modal */}
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
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
              <div
                className="px-5 py-3"
                style={{ backgroundColor: brand, color: "#fff" }}
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
                            backgroundColor: active ? brand : "#fff",
                            color: active ? "#fff" : "#000",
                            borderColor: active ? brand : "#d1d5db",
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
                    style={{ backgroundColor: cta, color: "#fff" }}
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

      {/* Success Popup */}
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
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
              <div
                className="px-5 py-3"
                style={{ backgroundColor: brand, color: "#fff" }}
              >
                <h3 id="success-title" className="text-base font-semibold">
                  Request received
                </h3>
              </div>
              <div className="px-5 py-4" style={{ color: "#000" }}>
                <div className="flex items-center gap-3">
                  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
                    <circle cx="12" cy="12" r="10" fill={success} />
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
                    style={{ backgroundColor: cta, color: "#fff" }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
