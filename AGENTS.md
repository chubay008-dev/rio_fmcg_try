# OpenHands Working Instructions

## Scope

- Áp dụng cho toàn bộ repository RIO website.
- Ưu tiên thay đổi nhỏ, có chủ đích; đây là website marketing Next.js với một webhook Zalo.

## Project facts

- Stack: Next.js 14 App Router, TypeScript strict, React 18, Tailwind CSS, Framer Motion.
- Commands: `npm install`, `npm run dev`, `npm run build`, `npm run lint`.
- Kiểm tra tĩnh bổ sung: `npx tsc --noEmit`.
- Hiện chưa có test runner; không tự thêm test framework khi chưa có yêu cầu rõ ràng.
- Không có backend/database riêng; chỉ một API route `/api/zalo/webhook` và nội dung static trong `src/lib/content.ts`.
- Security headers đã cấu hình trong `next.config.mjs`; giữ `poweredByHeader: false`.
- Zalo client có timeout 10 giây cho API calls.

## Editing rules

- Cập nhật nội dung sản phẩm, liên hệ, FAQ, pháp lý và domain trong `src/lib/content.ts` thay vì hard-code trong component.
- Đừng import `src/lib/zalo.ts` từ Client Component vì nó đọc `ZALO_BOT_TOKEN` server-side.
- Nếu sửa `getAutoReply`, giữ cơ chế reuse FAQ và fallback liên hệ từ `site`.
- Nếu sửa webhook, giữ nguyên hành vi trả 200 sau lỗi gửi để tránh retry Zalo lặp lại, trừ khi yêu cầu thay đổi rõ ràng.
- Không bật/commit secret. `ZALO_BOT_WEBHOOK_SECRET` bắt buộc phải cấu hình ở production; thiếu nó sẽ tắt kiểm tra webhook.
- `ZALO_BOT_WEBHOOK_SECRET` là bắt buộc ở production; không khôi phục hoặc thêm hành vi fail-open khi secret thiếu.

## UI và content safety

- Không bỏ AgeGate, LegalBar, cảnh báo 18+, mang thai/cho con bú hoặc lái xe.
- Không tuyên bố lợi ích sức khỏe cho sản phẩm có cồn.
- Đừng đổi domain, ABV, số điện thoại hay thông tin pháp lý nếu không có yêu cầu và dữ liệu chính thức.

## Validation

- Chạy `npm run lint` và `npx tsc --noEmit` trước khi bàn giao.
- Nếu thêm/touch code, chạy `npm run build` khi thay đổi route, layout, metadata hoặc cấu hình Next.js.
- `ZALO_BOT_WEBHOOK_SECRET` là bắt buộc ở production; không khôi phục hoặc thêm hành vi fail-open khi secret thiếu.
- Không cần thêm test nếu chỉ sửa văn bản; khi sửa logic auto-reply hoặc webhook, nên mô tả test thủ công hoặc đề xuất test mà không đổi hành vi.

## Git hygiene

- Không commit `.env.local`, secret, token Zalo hay bản build `.next`.
- Không tạo branch, commit hay push trừ khi được yêu cầu.
