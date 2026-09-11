"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

// Link chia sẻ của bot, lấy trong Zalo Bot Creator (mục "Chia sẻ" / "Share link"),
// dạng https://zalo.me/s/<bot_id>/ — cấu hình qua biến môi trường để dễ đổi
// mà không cần sửa code hay build lại.
const ZALO_CHAT_LINK =
  process.env.NEXT_PUBLIC_ZALO_CHAT_LINK || "https://zalo.me/s/botcreator/";

export function ZaloChatButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="glass w-[240px] rounded-3xl p-4 text-left shadow-glass dark:shadow-glass-dark"
          >
            <p className="text-sm font-semibold text-forest dark:text-cream">
              Chat với RIO qua Zalo
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-ink/65 dark:text-cream/65">
              Hỏi nhanh về sản phẩm, đại lý hoặc đặt hàng sỉ — đội ngũ RIO phản
              hồi trong giờ làm việc.
            </p>
            <a
              href={ZALO_CHAT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-3 inline-flex w-full items-center justify-center text-[13px]"
            >
              Mở chat Zalo
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Đóng khung chat Zalo" : "Mở khung chat Zalo"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-leaf text-cream shadow-glass transition-transform hover:scale-105 dark:bg-gold dark:text-forest"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
