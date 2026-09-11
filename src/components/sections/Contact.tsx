"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { contact, site } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="lien-he" className="relative py-24 sm:py-32">
      <div className="container-rio grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <span className="eyebrow">{contact.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-forest dark:text-cream sm:text-4xl">
            {contact.title}
          </h2>
          <p className="mt-4 text-[14px] text-ink/65 dark:text-cream/65">{contact.formNote}</p>

          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-leaf/10 text-leaf-dark dark:bg-gold/10 dark:text-gold">
                <Phone size={17} />
              </span>
              <div>
                <p className="text-xs text-ink/50 dark:text-cream/50">Hotline</p>
                <p className="font-medium text-forest dark:text-cream">{site.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-leaf/10 text-leaf-dark dark:bg-gold/10 dark:text-gold">
                <Mail size={17} />
              </span>
              <div>
                <p className="text-xs text-ink/50 dark:text-cream/50">Email</p>
                <p className="font-medium text-forest dark:text-cream">{site.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-leaf/10 text-leaf-dark dark:bg-gold/10 dark:text-gold">
                <MapPin size={17} />
              </span>
              <div>
                <p className="text-xs text-ink/50 dark:text-cream/50">Văn phòng</p>
                <p className="font-medium text-forest dark:text-cream">{site.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-leaf/10 text-leaf-dark dark:bg-gold/10 dark:text-gold">
                <Clock size={17} />
              </span>
              <div>
                <p className="text-xs text-ink/50 dark:text-cream/50">Giờ làm việc</p>
                <p className="font-medium text-forest dark:text-cream">{site.hours}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="glass rounded-4xl p-8 shadow-glass"
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-leaf/15 text-leaf-dark">
                  <Send size={22} />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-forest dark:text-cream">
                  Đã gửi thành công
                </h3>
                <p className="mt-2 max-w-xs text-sm text-ink/60 dark:text-cream/60">
                  Cảm ơn bạn đã liên hệ. Đội ngũ RIO sẽ phản hồi trong vòng 1 ngày làm việc.
                </p>
              </div>
            ) : (
              <div className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-xs font-medium text-ink/60 dark:text-cream/60">Họ và tên</span>
                    <input
                      required
                      type="text"
                      placeholder="Nguyễn Văn A"
                      className="mt-1.5 w-full rounded-2xl border border-forest/15 bg-white/70 px-4 py-3 text-sm outline-none transition-colors focus:border-leaf dark:border-cream/15 dark:bg-white/5 dark:text-cream"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-medium text-ink/60 dark:text-cream/60">Số điện thoại</span>
                    <input
                      required
                      type="tel"
                      placeholder="09xx xxx xxx"
                      className="mt-1.5 w-full rounded-2xl border border-forest/15 bg-white/70 px-4 py-3 text-sm outline-none transition-colors focus:border-leaf dark:border-cream/15 dark:bg-white/5 dark:text-cream"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="text-xs font-medium text-ink/60 dark:text-cream/60">Email</span>
                  <input
                    required
                    type="email"
                    placeholder="ban@congty.com"
                    className="mt-1.5 w-full rounded-2xl border border-forest/15 bg-white/70 px-4 py-3 text-sm outline-none transition-colors focus:border-leaf dark:border-cream/15 dark:bg-white/5 dark:text-cream"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-ink/60 dark:text-cream/60">Nội dung</span>
                  <textarea
                    required
                    rows={4}
                    placeholder="Bạn muốn hợp tác phân phối, đặt hàng sỉ hay góp ý về sản phẩm?"
                    className="mt-1.5 w-full resize-none rounded-2xl border border-forest/15 bg-white/70 px-4 py-3 text-sm outline-none transition-colors focus:border-leaf dark:border-cream/15 dark:bg-white/5 dark:text-cream"
                  />
                </label>
                <button type="submit" className="btn-primary mt-1 w-full sm:w-fit">
                  Gửi liên hệ <Send size={15} />
                </button>
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
