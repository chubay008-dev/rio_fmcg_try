import Image from "next/image";
import { ImageOff, Sparkles } from "lucide-react";
import { productsLight } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

export function ProductsLight() {
  return (
    <section id="rio-light" className="relative py-24 sm:py-32">
      <div className="container-rio">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">
            <Sparkles size={14} className="inline -mt-0.5 mr-1" />
            {productsLight.eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-forest dark:text-cream sm:text-4xl">
            {productsLight.title}
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-ink/70 dark:text-cream/70">
            {productsLight.intro}
          </p>
          <p className="mt-3 text-[13px] font-medium text-ink/55 dark:text-cream/55">
            {productsLight.note}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productsLight.items.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <div className="group flex h-full flex-col overflow-hidden rounded-4xl bg-white shadow-glass transition-transform duration-300 hover:-translate-y-1.5 dark:bg-forest-light/40">
                <div
                  className={`relative flex h-64 items-center justify-center bg-gradient-to-br ${p.color} overflow-hidden`}
                >
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={`Lon ${p.name}`}
                      width={420}
                      height={630}
                      className="h-full w-auto object-contain drop-shadow-xl transition-transform duration-500 group-hover:-translate-y-1.5"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-white/85">
                      <ImageOff size={26} />
                      <span className="text-[11px] font-medium">Ảnh đang cập nhật</span>
                    </div>
                  )}
                  <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-forest">
                    {p.note}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-base font-bold text-forest dark:text-cream">
                    {p.name}
                  </h3>
                  <p className="mt-2 flex-1 text-[13px] leading-relaxed text-ink/70 dark:text-cream/65">
                    {p.desc}
                  </p>
                  <a
                    href="#lien-he"
                    className="mt-4 inline-flex text-[13px] font-semibold text-leaf-dark hover:text-forest dark:text-gold dark:hover:text-cream"
                  >
                    Đặt mua →
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
