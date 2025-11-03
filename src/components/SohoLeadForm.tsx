"use client";

import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

type ActionState = { ok: boolean; error?: string | null };

type Props = {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  brand: string; // "#4f008c"
  cta: string; // "#ff375e"
  success: string; // green
  listedServices: string[];
  plans: string[]; // ["Starter","Growth","Pro"]
};

function SubmitButton({ cta }: { cta: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold focus:outline-none focus:ring-2"
      style={{
        backgroundColor: cta,
        color: "#fff",
        opacity: pending ? 0.8 : 1,
      }}
    >
      {pending ? "Submitting…" : "Request a callback"}
    </button>
  );
}

export default function SohoLeadForm({
  action,
  brand,
  cta,
  success,
  listedServices,
  plans,
}: Props) {
  const initialState = useMemo<ActionState>(
    () => ({ ok: false, error: null }),
    []
  );
  const [state, formAction] = useActionState(action, initialState);
  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState<string>("");
  const planSelectRef = useRef<HTMLSelectElement>(null);

  // Initialize from localStorage on mount
  useEffect(() => {
    try {
      setPlan(localStorage.getItem("selectedPlan") || "");
    } catch {
      setPlan("");
    }
  }, []);

  // Listen for plan selection events from the plan cards
  useEffect(() => {
    function onPlanSelect(e: Event) {
      const detail = (e as CustomEvent).detail as { plan?: string };
      if (detail?.plan) setPlan(detail.plan);
    }
    window.addEventListener("plan:select", onPlanSelect as EventListener);
    return () =>
      window.removeEventListener("plan:select", onPlanSelect as EventListener);
  }, []);

  // Keep localStorage in sync if user changes the select manually
  useEffect(() => {
    try {
      if (plan) localStorage.setItem("selectedPlan", plan);
      else localStorage.removeItem("selectedPlan");
    } catch {}
  }, [plan]);

  // Open success modal when server action reports ok
  useEffect(() => {
    if (state.ok) setOpen(true);
  }, [state.ok]);

  function closeModal() {
    setOpen(false);
  }

  return (
    <>
      {/* IMPORTANT: no method/encType here because action is a function (Server Action) */}
      <form
        id="lead-form"
        className="mt-6 grid gap-3 sm:max-w-md"
        action={formAction}
      >
        {/* Honeypot (avoid autofill collisions) */}
        <div aria-hidden className="hidden">
          <input
            id="hp_trap"
            name="hp_trap"
            tabIndex={-1}
            autoComplete="off"
            inputMode="none"
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", opacity: 0 }}
          />
        </div>

        {/* PLAN PICKER — always present, user can change anytime */}
        <label
          htmlFor="plan"
          className="text-sm font-medium"
          style={{ color: "#fff" }}
        >
          Plan
        </label>
        <div className="flex items-center gap-2">
          <select
            ref={planSelectRef}
            id="plan"
            name="plan"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            className="rounded-xl border-0 px-4 py-3 focus:outline-none focus:ring-2"
            style={{
              backgroundColor: "#fff",
              color: "#000",
              boxShadow: "inset 0 0 0 1px #ffffff4d",
            }}
          >
            <option value="">Select a plan…</option>
            {plans.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          {/* Quick action to open the select */}
          {/* <button
            type="button"
            onClick={() => planSelectRef.current?.focus()}
            className="rounded-lg px-3 py-2"
            style={{ backgroundColor: cta, color: "#fff" }}
            aria-label="Change plan"
            title="Change plan"
          >
            Change
          </button> */}
        </div>
        <p className="text-xs" style={{ color: "#f5d9ff" }}>
          {plan
            ? `Selected: ${plan}`
            : "Tip: choose a plan above, or click one of the plan cards."}
        </p>

        {/* CONTACT DETAILS */}
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

        {/* SERVICES */}
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
        </fieldset>

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

        <SubmitButton cta={cta} />
        {state.error && (
          <p className="mt-2 text-sm" style={{ color: "#ffe0e6" }}>
            {state.error}
          </p>
        )}
        <p className="text-xs mt-1" style={{ color: "#f5d9ff" }}>
          By submitting, you agree to be contacted about business services.
        </p>
      </form>

      {/* Success Modal */}
      {open && (
        <>
          <div
            aria-hidden
            className="fixed inset-0 z-40"
            style={{ background: "rgba(79, 0, 140, 0.35)" }}
            onClick={closeModal}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
              <div
                style={{ backgroundColor: brand, color: "#fff" }}
                className="px-5 py-3"
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
                    onClick={closeModal}
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
