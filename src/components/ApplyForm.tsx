"use client";

import { useActionState, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { submitApplication, type ApplyFormState } from "@/app/apply/actions";

const steps = ["Personal", "Education", "Focus", "Review"] as const;

const inputClass =
  "w-full rounded-lg border border-line bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-ink";
const labelClass = "block text-xs font-bold uppercase tracking-wide text-ink-soft mb-1.5";

const initialState: ApplyFormState = { ok: false };

export function ApplyForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    fullName: "",
    email: "",
    phone: "",
    state: "",
    education: "",
    experience: "",
    focusArea: "",
    motivation: "",
  });
  const [state, formAction, pending] = useActionState(submitApplication, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  function update<K extends keyof typeof data>(key: K, value: string) {
    setData((d) => ({ ...d, [key]: value }));
  }

  if (state.ok && state.id) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-line bg-card p-10 text-center"
      >
        <div className="text-xs uppercase tracking-wider font-bold text-saffron-deep mb-3">
          Application Submitted
        </div>
        <h2 className="display text-3xl font-medium mb-4">Thank you, {data.fullName.split(" ")[0]}.</h2>
        <p className="text-ink-soft mb-6 max-w-md mx-auto">
          Your application has been received. Save your reference ID to track its status.
        </p>
        <div className="inline-block rounded-lg bg-paper-dim px-6 py-3 font-mono text-lg font-bold mb-8">
          {state.id}
        </div>
        <div>
          <Link
            href={`/apply/track?id=${state.id}`}
            className="rounded-full bg-ink text-paper px-7 py-3.5 text-sm font-bold transition-colors hover:bg-saffron-deep"
          >
            Track Your Application →
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      <div className="flex gap-2 mb-10">
        {steps.map((s, i) => (
          <div key={s} className="flex-1">
            <div
              className={`h-1 rounded-full transition-colors duration-500 ${
                i <= step ? "bg-ink" : "bg-line"
              }`}
            />
            <div className="text-[11px] mt-1.5 font-semibold text-ink-soft">{s}</div>
          </div>
        ))}
      </div>

      <form action={formAction} ref={formRef}>
        <input type="hidden" name="fullName" value={data.fullName} />
        <input type="hidden" name="email" value={data.email} />
        <input type="hidden" name="phone" value={data.phone} />
        <input type="hidden" name="state" value={data.state} />
        <input type="hidden" name="education" value={data.education} />
        <input type="hidden" name="experience" value={data.experience} />
        <input type="hidden" name="focusArea" value={data.focusArea} />
        <input type="hidden" name="motivation" value={data.motivation} />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {step === 0 && (
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor="f-fullName">Full Name *</label>
                  <input
                    id="f-fullName"
                    className={inputClass}
                    value={data.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="f-email">Email *</label>
                  <input
                    id="f-email"
                    type="email"
                    className={inputClass}
                    value={data.email}
                    onChange={(e) => update("email", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="f-phone">Phone</label>
                  <input
                    id="f-phone"
                    className={inputClass}
                    value={data.phone}
                    onChange={(e) => update("phone", e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor="f-state">State *</label>
                  <input
                    id="f-state"
                    className={inputClass}
                    value={data.state}
                    onChange={(e) => update("state", e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-5">
                <div>
                  <label className={labelClass} htmlFor="f-education">Education</label>
                  <textarea
                    id="f-education"
                    className={inputClass}
                    rows={3}
                    value={data.education}
                    onChange={(e) => update("education", e.target.value)}
                    placeholder="Degree, institution, year"
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="f-experience">Experience</label>
                  <textarea
                    id="f-experience"
                    className={inputClass}
                    rows={3}
                    value={data.experience}
                    onChange={(e) => update("experience", e.target.value)}
                    placeholder="Relevant work, internships or volunteering"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-5">
                <div>
                  <label className={labelClass} htmlFor="f-focusArea">Focus Area</label>
                  <input
                    id="f-focusArea"
                    className={inputClass}
                    value={data.focusArea}
                    onChange={(e) => update("focusArea", e.target.value)}
                    placeholder="e.g. Public Health, Urban Governance"
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="f-motivation">Motivation *</label>
                  <textarea
                    id="f-motivation"
                    className={inputClass}
                    rows={5}
                    value={data.motivation}
                    onChange={(e) => update("motivation", e.target.value)}
                    placeholder="Why do you want to join MP LEAD?"
                    required
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="rounded-xl border border-line p-6 grid gap-3 text-sm">
                <Row label="Name" value={data.fullName} />
                <Row label="Email" value={data.email} />
                <Row label="State" value={data.state} />
                <Row label="Focus Area" value={data.focusArea || "—"} />
                <Row label="Motivation" value={data.motivation} />
                {state.error && (
                  <p className="text-red text-sm font-semibold pt-2">{state.error}</p>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-10">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="rounded-full border border-line px-6 py-3 text-sm font-bold disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
          >
            Back
          </button>
          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
              className="rounded-full bg-ink text-paper px-7 py-3 text-sm font-bold transition-colors hover:bg-saffron-deep cursor-pointer"
            >
              Continue →
            </button>
          ) : (
            <button
              type="button"
              disabled={pending}
              onClick={() => formRef.current?.requestSubmit()}
              className="rounded-full bg-ink text-paper px-7 py-3 text-sm font-bold transition-colors hover:bg-saffron-deep disabled:opacity-50 cursor-pointer"
            >
              {pending ? "Submitting…" : "Submit Application"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-line pb-2.5 last:border-0">
      <span className="text-ink-soft font-semibold shrink-0">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}
