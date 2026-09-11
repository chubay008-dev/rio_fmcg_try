import Image from "next/image";
import { intro } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

export function Intro() {
  return (
    <section id="gioi-thieu" className="relative py-24 sm:py-32">
      <div className="container-rio grid items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <span className="eyebrow">{intro.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-forest dark:text-cream sm:text-4xl">
            {intro.title}
          </h2>
          <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-ink/75 dark:text-cream/70">
            {intro.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <blockquote className="mt-8 rounded-3xl border-l-4 border-leaf bg-leaf/5 p-6 dark:bg-leaf/10">
            <p className="font-display text-lg font-semibold leading-snug text-forest dark:text-cream">
              “{intro.highlight.quote}”
            </p>
            <cite className="mt-3 block text-xs font-medium not-italic text-ink/50 dark:text-cream/50">
              — {intro.highlight.role}
            </cite>
          </blockquote>
        </Reveal>

        <Reveal delay={0.15} className="relative flex items-center justify-center">
          <div className="absolute h-64 w-64 rounded-full bg-gold/25 blur-3xl" aria-hidden="true" />
          <div className="glass relative flex w-full max-w-sm flex-col items-center rounded-4xl p-10 shadow-glass">
            <Image
              src="/products/rio-dau-vodka.jpg"
              alt="Chai RIO Dâu & Vodka"
              width={220}
              height={365}
              className="h-64 w-auto drop-shadow-xl"
            />
            <div className="mt-6 grid w-full grid-cols-2 gap-4 text-center">
              <div className="rounded-2xl bg-white/60 p-4 dark:bg-white/5">
                <p className="font-display text-xl font-extrabold text-forest dark:text-gold">275ml</p>
                <p className="mt-1 text-[11px] text-ink/60 dark:text-cream/60">Mỗi chai</p>
              </div>
              <div className="rounded-2xl bg-white/60 p-4 dark:bg-white/5">
                <p className="font-display text-xl font-extrabold text-forest dark:text-gold">6 vị</p>
                <p className="mt-1 text-[11px] text-ink/60 dark:text-cream/60">Trái cây lên men</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
