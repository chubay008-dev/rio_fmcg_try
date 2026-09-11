import { ArrowUpRight } from "lucide-react";
import { news } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

export function News() {
  return (
    <section id="tin-tuc" className="relative py-24 sm:py-32">
      <div className="container-rio">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <span className="eyebrow">{news.eyebrow}</span>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-forest dark:text-cream sm:text-4xl">
              {news.title}
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {news.items.map((n, i) => (
            <Reveal key={n.title} delay={i * 0.08}>
              <article className="group flex h-full flex-col rounded-4xl border border-forest/8 bg-white/70 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-glass dark:border-cream/10 dark:bg-white/5">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-leaf/10 px-3 py-1 text-[11px] font-semibold text-leaf-dark dark:bg-gold/10 dark:text-gold">
                    {n.tag}
                  </span>
                  <span className="text-xs text-ink/45 dark:text-cream/45">{n.date}</span>
                </div>
                <h3 className="mt-4 font-display text-[15.5px] font-bold leading-snug text-forest dark:text-cream">
                  {n.title}
                </h3>
                <p className="mt-3 flex-1 text-[13px] leading-relaxed text-ink/65 dark:text-cream/60">
                  {n.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-[13px] font-semibold text-leaf-dark transition-transform group-hover:translate-x-1 dark:text-gold">
                  Đọc tiếp <ArrowUpRight size={14} />
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
