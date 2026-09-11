import { Quote } from "lucide-react";
import { testimonials } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  return (
    <section id="khach-hang" className="relative bg-forest py-24 dark:bg-forest-dark sm:py-32">
      <div className="container-rio">
        <Reveal className="max-w-xl">
          <span className="eyebrow !text-gold">{testimonials.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-cream sm:text-4xl">
            {testimonials.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.items.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <div className="glass flex h-full flex-col rounded-4xl p-7">
                <Quote size={26} className="text-gold/70" />
                <p className="mt-4 flex-1 text-[14.5px] leading-relaxed text-cream/85">
                  “{t.quote}”
                </p>
                <div className="mt-6 border-t border-cream/10 pt-4">
                  <p className="font-display text-sm font-bold text-cream">{t.name}</p>
                  <p className="mt-0.5 text-xs text-cream/55">{t.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
