"use client";

import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { ageGate, legal } from "@/lib/content";

export function AgeGate() {
  const [status, setStatus] = useState<"checking" | "gate" | "denied" | "ok">("checking");

  useEffect(() => {
    const verified = sessionStorage.getItem("rio-age-verified");
    setStatus(verified === "yes" ? "ok" : "gate");
  }, []);

  if (status === "checking" || status === "ok") return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-forest-dark/95 p-6 backdrop-blur-md">
      <div className="w-full max-w-sm rounded-4xl bg-cream p-8 text-center shadow-glass-dark dark:bg-forest-light">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-leaf/15 text-leaf-dark dark:text-gold">
          <ShieldCheck size={26} />
        </div>

        {status === "gate" && (
          <>
            <h2 className="mt-5 font-display text-lg font-bold text-forest dark:text-cream">
              {ageGate.title}
            </h2>
            <p className="mt-3 text-[13.5px] leading-relaxed text-ink/70 dark:text-cream/70">
              {ageGate.body}
            </p>
            <div className="mt-7 flex flex-col gap-3">
              <button
                onClick={() => {
                  sessionStorage.setItem("rio-age-verified", "yes");
                  setStatus("ok");
                }}
                className="btn-primary w-full justify-center"
              >
                {ageGate.confirm}
              </button>
              <button
                onClick={() => setStatus("denied")}
                className="btn-ghost w-full justify-center"
              >
                {ageGate.deny}
              </button>
            </div>
            <p className="mt-5 text-[11px] leading-relaxed text-ink/45 dark:text-cream/45">
              {legal.pregnancyWarning}
            </p>
          </>
        )}

        {status === "denied" && (
          <>
            <h2 className="mt-5 font-display text-lg font-bold text-forest dark:text-cream">
              Không thể tiếp tục
            </h2>
            <p className="mt-3 text-[13.5px] leading-relaxed text-ink/70 dark:text-cream/70">
              {ageGate.denyMessage}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
