import { MessageCircle, Share2, Send } from "lucide-react";
import { footerContent, site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative bg-forest-dark pt-20 text-cream/80">
      <div className="container-rio">
        <div className="grid gap-12 pb-14 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <a href="#" className="flex items-center gap-2 font-display text-xl font-extrabold text-cream">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-leaf text-sm">
                R
              </span>
              {site.name}
            </a>
            <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-cream/60">
              {footerContent.about}
            </p>
            <div className="mt-6 flex gap-3">
              {[MessageCircle, Share2, Send].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Theo dõi RIO trên mạng xã hội"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 transition-colors hover:bg-cream/10"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerContent.columns.map((col) => (
              <div key={col.title}>
                <h4 className="font-display text-sm font-bold text-cream">{col.title}</h4>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-[13px] text-cream/60 hover:text-cream">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-cream/10 py-6">
          <p className="text-center text-[11.5px] leading-relaxed text-cream/45">
            {footerContent.legal}
          </p>
          <p className="mt-2 text-center text-[11.5px] text-cream/40">
            © {new Date().getFullYear()} {site.name}. Bảo lưu mọi quyền.
          </p>
        </div>
      </div>
    </footer>
  );
}
