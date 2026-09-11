"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { process } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.4"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="quy-trinh" className="relative py-24 sm:py-32">
      <div className="container-rio">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">{process.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-forest dark:text-cream sm:text-4xl">
            {process.title}
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-ink/70 dark:text-cream/70">
            {process.intro}
          </p>
        </Reveal>

        <div ref={ref} className="relative mt-16 pl-9 sm:pl-12">
          <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-forest/10 dark:bg-cream/10 sm:left-[10px]" />
          <motion.div
            style={{ scaleY: progress }}
            className="absolute left-[7px] top-2 bottom-2 w-[2px] origin-top bg-leaf sm:left-[10px]"
          />

          <div className="space-y-12">
            {process.steps.map((step, i) => (
              <Reveal key={step.day} delay={i * 0.06} className="relative">
                <span className="absolute -left-9 top-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-leaf bg-cream dark:bg-forest-dark sm:-left-12" />
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-5">
                  <span className="font-display text-sm font-bold uppercase tracking-wide text-leaf-dark dark:text-gold">
                    {step.day}
                  </span>
                  <h3 className="font-display text-lg font-bold text-forest dark:text-cream">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-ink/70 dark:text-cream/65">
                  {step.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
