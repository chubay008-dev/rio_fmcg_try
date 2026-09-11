import { CheckCircle2, ShieldAlert } from "lucide-react";
import { benefits } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

export function Benefits() {
  return (
    <section id="loi-ich" className="relative py-24 sm:py-32">
      <div className="container-rio grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal>
          <span className="eyebrow">{benefits.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-forest dark:text-cream sm:text-4xl">
            {benefits.title}
          </h2>
          <div className="mt-8 flex gap-3 rounded-3xl border border-amber/30 bg-amber/5 p-5">
            <ShieldAlert size={18} className="mt-0.5 shrink-0 text-amber" />
            <p className="text-[12.5px] leading-relaxed text-ink/70 dark:text-cream/70">
              {benefits.disclaimer}
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {benefits.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="flex h-full gap-4 rounded-4xl border border-forest/8 bg-white/70 p-6 dark:border-cream/10 dark:bg-white/5">
                <CheckCircle2 size={20} className="mt-1 shrink-0 text-leaf" />
                <div>
                  <h3 className="font-display text-[15px] font-bold text-forest dark:text-cream">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink/70 dark:text-cream/65">
                    {item.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
