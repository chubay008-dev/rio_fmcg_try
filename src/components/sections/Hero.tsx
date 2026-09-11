"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { heroContent } from "@/lib/content";
import { BubbleField } from "@/components/ui/BubbleField";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-rio-gradient pb-16 pt-32 dark:bg-rio-gradient-dark sm:pb-24 sm:pt-40">
      <div className="absolute inset-0 bg-rio-radial" aria-hidden="true" />
      <BubbleField count={22} />

      <div className="container-rio relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
          >
            <Sparkles size={14} /> {heroContent.eyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 max-w-xl text-4xl font-extrabold leading-[1.12] tracking-tight text-forest dark:text-cream sm:text-5xl lg:text-[3.4rem]"
          >
            {heroContent.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-lg text-[15.5px] leading-relaxed text-ink/75 dark:text-cream/75"
          >
            {heroContent.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a href="#san-pham" className="btn-primary">
              Khám phá sản phẩm <ArrowRight size={16} />
            </a>
            <a href="#quy-trinh" className="btn-ghost">
              Xem quy trình lên men
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-forest/10 pt-8 dark:border-cream/10"
          >
            {heroContent.stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-2xl font-extrabold text-forest dark:text-gold sm:text-3xl">
                  {s.value}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-ink/60 dark:text-cream/60">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <div className="relative mx-auto flex h-[420px] w-full max-w-sm items-center justify-center sm:h-[520px]">
          <div
            className="absolute h-72 w-72 rounded-full bg-leaf/25 blur-3xl dark:bg-leaf/20"
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, x: 30, rotate: 6 }}
            animate={{ opacity: 1, x: 0, rotate: 6 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="absolute right-2 top-10 animate-float sm:right-4"
            style={{ animationDelay: "0.6s" }}
          >
            <Image
              src="/products/rio-lychua-cam-vodka.jpg"
              alt="Chai RIO Lý Chua Đen, Cam & Vodka"
              width={260}
              height={430}
              className="h-[260px] w-auto opacity-90 drop-shadow-xl sm:h-[320px]"
              priority
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative animate-float"
          >
            <Image
              src="/products/rio-dau-vodka.jpg"
              alt="Chai RIO Dâu & Vodka"
              width={330}
              height={550}
              className="h-[340px] w-auto drop-shadow-2xl sm:h-[420px]"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
