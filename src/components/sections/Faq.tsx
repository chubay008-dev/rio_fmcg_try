"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faq } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-cream-soft py-24 dark:bg-forest/40 sm:py-32">
      <div className="container-rio max-w-3xl">
        <Reveal className="text-center">
          <span className="eyebrow">{faq.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-forest dark:text-cream sm:text-4xl">
            {faq.title}
          </h2>
        </Reveal>

        <div className="mt-12 space-y-3">
          {faq.items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={item.q} delay={i * 0.05}>
                <div className="overflow-hidden rounded-3xl border border-forest/10 bg-white/70 dark:border-cream/10 dark:bg-white/5">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-[15px] font-semibold text-forest dark:text-cream">
                      {item.q}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-leaf-dark transition-transform duration-300 dark:text-gold ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden px-6">
                      <p className="pb-6 text-[13.5px] leading-relaxed text-ink/70 dark:text-cream/65">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
