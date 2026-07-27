"use client";

import { useCallback, useRef, useState } from "react";
import { Check, Upload, X } from "lucide-react";
import { BracketButton } from "@/components/bracket-button";

const COMMISSION_MEDIUMS = [
  {
    id: "miniature",
    name: "Traditional Miniature",
    note: "Fine-brush, heritage detail",
  },
  { id: "oil", name: "Oil on Canvas", note: "Layered, textural pigment" },
  { id: "watercolor", name: "Watercolor", note: "Translucent, on fine paper" },
  { id: "tile", name: "Tile Work", note: "Hand-painted, kiln-fired" },
  { id: "other", name: "Other", note: "Tell us what you have in mind" },
];

const STEPS = ["Medium", "References", "Vision", "Contact"];

type FormState = {
  medium: string;
  files: string[];
  brief: string;
  dimensions: string;
  name: string;
  email: string;
  phone: string;
  agreed: boolean;
};

const EMPTY: FormState = {
  medium: "",
  files: [],
  brief: "",
  dimensions: "",
  name: "",
  email: "",
  phone: "",
  agreed: false,
};

export function CommissionIntake() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [dragging, setDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((fileList: FileList | null) => {
    if (!fileList) return;
    const names = Array.from(fileList).map((f) => f.name);
    setForm((prev) => ({ ...prev, files: [...prev.files, ...names] }));
  }, []);

  const canAdvance = () => {
    if (step === 0) return form.medium !== "";
    if (step === 2) return form.brief.trim() !== "" && form.dimensions.trim() !== "";
    if (step === 3)
      return (
        form.name.trim() !== "" &&
        form.email.trim() !== "" &&
        form.agreed
      );
    return true;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setToast(true);
    setTimeout(() => setToast(false), 6000);
  };

  const reset = () => {
    setForm(EMPTY);
    setStep(0);
    setSubmitted(false);
  };

  const fieldClass =
    "w-full border border-matte bg-background px-4 py-3 font-sans text-sm text-charcoal outline-none transition-colors placeholder:text-charcoal/40 focus:border-bronze";

  return (
    <div className="mx-auto max-w-3xl">
      {submitted ? (
        <div className="border border-matte bg-stone p-10 text-center sm:p-14">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-bronze/50 text-bronze-deep">
            <Check className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <h3 className="mt-6 font-heading text-2xl italic text-charcoal">
            Your commission brief is with us.
          </h3>
          <p className="mx-auto mt-3 max-w-md font-sans text-sm leading-relaxed text-charcoal/70">
            A studio specialist will review your references and reach out within
            two business days to confirm scope, timeline, and the 50% deposit to
            begin.
          </p>
          <div className="mt-8 flex justify-center">
            <BracketButton variant="outline" onClick={reset}>
              Start Another Brief
            </BracketButton>
          </div>
        </div>
      ) : (
        <div className="border border-matte bg-stone/60 p-6 sm:p-10">
          {/* Progress indicator */}
          <ol className="mb-10 flex items-center gap-2 sm:gap-4">
            {STEPS.map((label, i) => {
              const active = i === step;
              const done = i < step;
              return (
                <li key={label} className="flex flex-1 items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center border font-sans text-xs transition-colors ${
                        active
                          ? "border-charcoal bg-charcoal text-linen"
                          : done
                            ? "border-bronze bg-bronze text-linen"
                            : "border-matte text-charcoal/40"
                      }`}
                    >
                      {done ? <Check className="h-3.5 w-3.5" strokeWidth={2} /> : i + 1}
                    </span>
                    <span
                      className={`hidden font-sans text-[0.68rem] uppercase tracking-editorial sm:inline ${
                        active ? "text-charcoal" : "text-charcoal/40"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <span
                      className={`h-px flex-1 ${done ? "bg-bronze" : "bg-matte"}`}
                    />
                  )}
                </li>
              );
            })}
          </ol>

          {/* Step 1 — Medium */}
          {step === 0 && (
            <div>
              <h3 className="font-heading text-2xl italic text-charcoal">
                What medium are you drawn to?
              </h3>
              <p className="mt-2 font-sans text-sm text-charcoal/60">
                Choose the discipline closest to your vision — we&apos;ll refine
                the details together.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {COMMISSION_MEDIUMS.map((m) => {
                  const selected = form.medium === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, medium: m.id }))}
                      className={`border p-4 text-left transition-colors duration-200 ${
                        selected
                          ? "border-charcoal bg-charcoal text-linen"
                          : "border-matte bg-background text-charcoal hover:border-bronze"
                      }`}
                    >
                      <span className="block font-heading text-lg italic">
                        {m.name}
                      </span>
                      <span
                        className={`mt-0.5 block font-sans text-xs ${
                          selected ? "text-linen/70" : "text-charcoal/50"
                        }`}
                      >
                        {m.note}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2 — References */}
          {step === 1 && (
            <div>
              <h3 className="font-heading text-2xl italic text-charcoal">
                Share your references.
              </h3>
              <p className="mt-2 font-sans text-sm text-charcoal/60">
                Inspiration images, photos of the subject, or a shot of the room
                where the piece will live. Optional, but it helps.
              </p>

              <div
                role="button"
                tabIndex={0}
                onClick={() => inputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  addFiles(e.dataTransfer.files);
                }}
                className={`mt-6 flex cursor-pointer flex-col items-center justify-center border border-dashed px-6 py-12 text-center transition-colors ${
                  dragging
                    ? "border-bronze bg-bronze/5"
                    : "border-matte bg-background hover:border-bronze/60"
                }`}
              >
                <Upload className="h-6 w-6 text-bronze-deep" strokeWidth={1.25} />
                <p className="mt-3 font-sans text-sm text-charcoal">
                  Drag &amp; drop reference images here
                </p>
                <p className="mt-1 font-sans text-xs text-charcoal/50">
                  or click to browse — JPG, PNG, PDF
                </p>
                <input
                  ref={inputRef}
                  type="file"
                  multiple
                  accept="image/*,application/pdf"
                  className="hidden"
                  onChange={(e) => addFiles(e.target.files)}
                />
              </div>

              {form.files.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {form.files.map((file, i) => (
                    <li
                      key={`${file}-${i}`}
                      className="flex items-center justify-between border border-matte bg-background px-4 py-2.5 font-sans text-xs text-charcoal"
                    >
                      <span className="truncate">{file}</span>
                      <button
                        type="button"
                        aria-label={`Remove ${file}`}
                        onClick={() =>
                          setForm((p) => ({
                            ...p,
                            files: p.files.filter((_, idx) => idx !== i),
                          }))
                        }
                        className="ml-3 shrink-0 text-charcoal/50 transition-colors hover:text-rust"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Step 3 — Vision */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-heading text-2xl italic text-charcoal">
                  Describe the piece.
                </h3>
                <p className="mt-2 font-sans text-sm text-charcoal/60">
                  Mood, subject, palette, where it will hang — anything that
                  shapes the work.
                </p>
              </div>

              <div>
                <label className="mb-2 block font-sans text-[0.68rem] uppercase tracking-editorial text-charcoal/50">
                  Vision &amp; instructions
                </label>
                <textarea
                  value={form.brief}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, brief: e.target.value }))
                  }
                  rows={5}
                  placeholder="I'd love a muted, atmospheric landscape in warm earth tones for our entryway…"
                  className={`${fieldClass} resize-none`}
                />
              </div>

              <div>
                <label className="mb-2 block font-sans text-[0.68rem] uppercase tracking-editorial text-charcoal/50">
                  Target dimensions
                </label>
                <input
                  type="text"
                  value={form.dimensions}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, dimensions: e.target.value }))
                  }
                  placeholder='e.g. 24" x 36", or 3 ft x 4 ft'
                  className={fieldClass}
                />
              </div>
            </div>
          )}

          {/* Step 4 — Contact & Terms */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-heading text-2xl italic text-charcoal">
                  Where can we reach you?
                </h3>
                <p className="mt-2 font-sans text-sm text-charcoal/60">
                  We&apos;ll confirm scope and deposit before any work begins.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-2 block font-sans text-[0.68rem] uppercase tracking-editorial text-charcoal/50">
                    Full name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className="mb-2 block font-sans text-[0.68rem] uppercase tracking-editorial text-charcoal/50">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className="mb-2 block font-sans text-[0.68rem] uppercase tracking-editorial text-charcoal/50">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    className={fieldClass}
                  />
                </div>
              </div>

              <label className="flex cursor-pointer items-start gap-3 border border-matte bg-background p-4">
                <input
                  type="checkbox"
                  checked={form.agreed}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, agreed: e.target.checked }))
                  }
                  className="mt-0.5 h-4 w-4 shrink-0 accent-charcoal"
                />
                <span className="font-sans text-xs leading-relaxed text-charcoal/80">
                  I agree to the 50% upfront non-refundable deposit and 1–2
                  revision cycles based on project scale.
                </span>
              </label>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-between border-t border-matte pt-6">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="font-sans text-xs uppercase tracking-editorial text-charcoal/60 transition-colors hover:text-charcoal disabled:cursor-not-allowed disabled:opacity-30"
            >
              Back
            </button>

            {step < STEPS.length - 1 ? (
              <BracketButton
                variant="solid"
                onClick={() => canAdvance() && setStep((s) => s + 1)}
                disabled={!canAdvance()}
                className="disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue
              </BracketButton>
            ) : (
              <BracketButton
                variant="solid"
                onClick={() => canAdvance() && handleSubmit()}
                disabled={!canAdvance()}
                className="disabled:cursor-not-allowed disabled:opacity-40"
              >
                Submit Commission Brief
              </BracketButton>
            )}
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 border border-charcoal bg-charcoal px-6 py-4 text-linen shadow-[0_20px_40px_-20px_rgba(43,38,35,0.6)]"
        >
          <p className="font-sans text-xs uppercase tracking-editorial">
            Commission brief submitted
          </p>
          <p className="mt-1 font-sans text-[0.7rem] text-linen/70">
            We&apos;ll be in touch within two business days.
          </p>
        </div>
      )}
    </div>
  );
}
