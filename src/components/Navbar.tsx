"use client";

import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { nav, site } from "@/lib/content";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header
      className={`fixed inset-x-0 top-7 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container-rio">
        <div
          className={`flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-300 ${
            scrolled ? "glass shadow-glass dark:shadow-glass-dark" : ""
          }`}
        >
          <a href="#" className="flex items-center gap-2 font-display text-xl font-extrabold tracking-tight text-forest dark:text-cream">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest text-sm text-cream dark:bg-leaf">
              R
            </span>
            {site.name}
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3.5 py-2 text-[13.5px] font-medium text-ink/75 transition-colors hover:bg-forest/5 hover:text-forest dark:text-cream/70 dark:hover:bg-cream/10 dark:hover:text-cream"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDark((d) => !d)}
              aria-label={dark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-forest/15 text-forest transition-colors hover:bg-forest/5 dark:border-cream/20 dark:text-cream dark:hover:bg-cream/10"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a href="#lien-he" className="btn-primary hidden sm:inline-flex">
              Liên hệ đặt hàng
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Mở menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-forest/15 text-forest lg:hidden dark:border-cream/20 dark:text-cream"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="glass mt-2 rounded-3xl p-4 shadow-glass lg:hidden">
            <nav className="flex flex-col gap-1">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-ink/80 hover:bg-forest/5 dark:text-cream/80 dark:hover:bg-cream/10"
                >
                  {item.label}
                </a>
              ))}
              <a href="#lien-he" onClick={() => setOpen(false)} className="btn-primary mt-2">
                Liên hệ đặt hàng
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
