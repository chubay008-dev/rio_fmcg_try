import { Droplets, Leaf, Palette, Backpack } from "lucide-react";
import { whyRio } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

const icons = [Droplets, Leaf, Palette, Backpack];

export function WhyRio() {
  return (
    <section id="vi-sao-chon-rio" className="relative bg-forest py-24 dark:bg-forest-dark sm:py-32">
      <div className="container-rio">
        <Reveal className="max-w-xl">
          <span className="eyebrow !text-gold">{whyRio.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-cream sm:text-4xl">
            {whyRio.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyRio.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="glass h-full rounded-4xl p-7 transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold/90 text-forest">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-cream">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-cream/70">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
