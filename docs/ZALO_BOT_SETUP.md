# Tích hợp Zalo Bot cho website RIO

Tích hợp gồm 2 phần độc lập, có thể bật riêng từng phần:

1. **Nút chat nổi** (`src/components/ZaloChatButton.tsx`) — nút góc dưới bên
   phải, bấm vào mở đúng cuộc chat Zalo thật với bot RIO. Không cần backend.
2. **Auto-reply qua webhook** (`src/app/api/zalo/webhook/route.ts`) — khi có
   người nhắn tin cho bot trên Zalo, backend tự trả lời theo FAQ/thông tin
   RIO (dùng lại nội dung trong `src/lib/content.ts`).

## 1. Chuẩn bị

- Bot đã tạo qua Zalo Bot Creator (`https://zalo.me/s/botcreator/` hoặc
  `bot.zaloplatforms.com`) → đã có **Bot Token**.
- Lấy **link chia sẻ** của bot (mục Share/Chia sẻ trong Bot Creator), dạng
  `https://zalo.me/s/<bot_id>/`.

## 2. Cấu hình biến môi trường

Copy `.env.example` → `.env.local` (chạy local) và set trên Vercel
(Project Settings → Environment Variables) cho production:

```
ZALO_BOT_TOKEN=<bot token thật>
ZALO_BOT_WEBHOOK_SECRET=<tự đặt, ví dụ 1 chuỗi random 20+ ký tự>
NEXT_PUBLIC_ZALO_CHAT_LINK=https://zalo.me/s/<bot_id>/
```

`ZALO_BOT_WEBHOOK_SECRET` do bạn tự nghĩ ra (không lấy từ Zalo) — dùng để
Zalo đính kèm lại trong header `X-Bot-Api-Secret-Token` mỗi lần gọi webhook,
giúp webhook route xác minh request thật sự đến từ Zalo.

## 3. Deploy trước, đăng ký webhook sau

Webhook cần một URL public đã deploy (Vercel) — nên deploy code này trước,
rồi mới đăng ký webhook trỏ về `https://<domain-vercel-cua-ban>/api/zalo/webhook`.

Đăng ký webhook bằng 1 lệnh `curl` (chạy 1 lần, từ máy cá nhân, không cần
thêm code/route riêng để tránh lộ endpoint quản trị):

```bash
curl -X POST "https://bot-api.zapps.me/bot<BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://<domain-vercel-cua-ban>/api/zalo/webhook",
    "secret_token": "<ZALO_BOT_WEBHOOK_SECRET-vua-set-o-tren>"
  }'
```

Kiểm tra webhook đã đăng ký đúng chưa:

```bash
curl "https://bot-api.zapps.me/bot<BOT_TOKEN>/getWebhookInfo"
```

## 4. Test thử

- Mở link `NEXT_PUBLIC_ZALO_CHAT_LINK` trên điện thoại (có Zalo), gửi thử
  "chào", "mua ở đâu", "nồng độ cồn bao nhiêu", "hotline" — bot phải tự trả
  lời tương ứng theo `src/lib/zaloAutoReply.ts`.
- Mở `https://<domain>/api/zalo/webhook` bằng trình duyệt (GET) — phải thấy
  `{"ok":true,"message":"RIO Zalo Bot webhook đang hoạt động."}`, xác nhận
  route đã deploy đúng.
- Xem log lỗi (nếu có) trong Vercel → Project → Logs, hoặc `console.error`
  đã thêm sẵn trong `route.ts`.

## 5. Chỉnh nội dung auto-reply

Toàn bộ câu trả lời nằm trong `src/lib/zaloAutoReply.ts`:
- FAQ hiển thị trên web (`src/lib/content.ts` → `faq.items`) tự động được
  bot dùng lại — sửa 1 chỗ, đồng bộ cả web và Zalo.
- Thêm rule mới (từ khoá + câu trả lời) bằng cách thêm phần tử vào mảng
  `extraRules`.

## Giới hạn hiện tại

- Đây là auto-reply theo từ khoá (rule-based), **không phải AI/NLP** — phù
  hợp cho FAQ cố định, không phù hợp câu hỏi phức tạp/đàm phán giá theo case.
- Nếu về sau muốn bot "thông minh" hơn (hiểu câu hỏi tự do), có thể thay
  `getAutoReply()` bằng 1 lệnh gọi tới Anthropic API — cấu trúc code hiện tại
  (route nhận update → sinh reply → sendMessage) không cần đổi.
