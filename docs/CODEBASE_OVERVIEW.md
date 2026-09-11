# RIO Website — Codebase Overview

> Trạng thái khảo sát: chỉ đọc, dựa trên mã nguồn và tài liệu hiện có tại working tree. Không có tài liệu kiến trúc chính thức ngoài `README.md` và `docs/ZALO_BOT_SETUP.md`.

## Phạm vi và phân loại thông tin

Tài liệu phân biệt:

- **Đã xác nhận:** có thể chỉ ra trong mã nguồn, cấu hình hoặc tài liệu.
- **Suy luận:** khả năng hoạt động được rút ra từ cấu hình/contract, nhưng chưa có kiểm chứng runtime.
- **Chưa biết/thiếu:** không có đủ bằng chứng trong repository.

## 1. Mục đích và domain

**Đã xác nhận**

- Đây là website marketing một trang cho thương hiệu “RIO — nước trái cây lên men”, bao gồm hai dòng sản phẩm: RIO chai 275ml và RIO Light lon.
- Các miền nghiệp vụ hiển thị gồm: giới thiệu thương hiệu, quy trình sản xuất, sản phẩm theo dòng, tin tức, FAQ, liên hệ và hợp tác phân phối.
- Chứa dữ liệu nội dung sản phẩm, thông tin liên hệ, cảnh báo pháp lý và nội dung marketing tập trung tại `src/lib/content.ts`.
- Tích hợp Zalo Bot có trách nhiệm nghiệp vụ hỗ trợ khách hàng bằng auto-reply rule-based dựa trên nội dung web.
- Tuân thủ đồ uống có cồn được xây dựng vào giao diện: xác nhận 18+, thanh cảnh báo pháp lý, cảnh báo mang thai/cho con bú và lái xe.

## 2. Ngăn xếp công nghệ

**Đã xác nhận**

- Ngôn ngữ: TypeScript strict.
- Framework: Next.js 14.2.35, App Router, React 18, React DOM 18.
- UI: Tailwind CSS 3.4, PostCSS, Framer Motion, lucide-react.
- Chất lượng tĩnh: ESLint với `next/core-web-vitals` và `next/typescript`.
- Fonts: Be Vietnam Pro và Inter tự lưu trữ trong `src/fonts`.
- Runtime triển khai mục tiêu: README hướng dẫn Vercel; không có cấu hình Vercel trong repo.

**Suy luận**

- Server API của Next.js được dùng làm backend nhỏ cho webhook Zalo.
- Node.js là runtime bắt buộc cho Next.js, nhưng phiên bản tối thiểu không được khai báo trong `package.json`.

## 3. Cấu trúc kho mã nguồn

```text
.env.example                          # Mẫu biến môi trường Zalo
.eslintrc.json                        # ESLint Next.js
README.md                             # Tài liệu cài đặt, deploy và tuân thủ
docs/ZALO_BOT_SETUP.md                # Hướng dẫn cấu hình Zalo webhook
next.config.mjs                       # Next config trống rỗng tùy chỉnh
package.json / package-lock.json      # NPM dependencies và scripts
postcss.config.mjs / tailwind.config.ts
src/app                               # App Router, layout, trang chính, sitemap, webhook
src/components                        # Shell trang, AgeGate, Zalo button, UI chung
src/components/sections               # 11 section trang marketing
src/components/ui                     # Reveal, BubbleField
src/fonts                             # Font OFL tự lưu trữ
src/lib                               # content, Zalo API client, auto-reply
public/products, public/products-light # 12 ảnh sản phẩm
public/robots.txt
docs/ARCHITECTURE_DIAGRAMS.md         # Sơ đồ kiến trúc, logic, luồng, kết nối
tailwind.config.ts                    # Design tokens và animations
.next                                  # Build output đã có trong working tree
node_modules                           # Dependencies đã cài trong working tree
```

Không có thư mục `src/pages`, Prisma/ORM, migration, tests, `.github/workflows`, Dockerfile hoặc docker-compose trong working tree.

Xem chi tiết sơ đồ tại `docs/ARCHITECTURE_DIAGRAMS.md`.

## 4. Entry points

**Đã xác nhận**

- UI entry: `src/app/layout.tsx` định nghĩa metadata, Schema.org JSON-LD và font; `src/app/page.tsx` render một trang duy nhất.
- Trang chính ghép `AgeGate`, `LegalBar`, `Navbar`, 11 section marketing, `Footer` và `ZaloChatButton`.
- API entry: `POST /api/zalo/webhook` nhận cập nhật Zalo; `GET /api/zalo/webhook` là health check thủ công.
- SEO entry: `src/app/sitemap.ts` sinh sitemap từ domain trong `site.domain`.
- CLI scripts: `npm run dev`, `npm run build`, `npm run start`, `npm run lint`.

## 5. Kiến trúc backend

**Đã xác nhận**

- Không có backend service riêng biệt; backend chỉ là Next.js Route Handler.
- `src/app/api/zalo/webhook/route.ts`:
  - Đọc header `x-bot-api-secret-token`.
  - Gọi `verifyWebhookSecret`.
  - Parse JSON body; trả lỗi 400 nếu không parse được.
  - Nếu có `message.chat.id`, gửi typing action, tính reply qua `getAutoReply`, rồi gửi qua Zalo Bot API.
  - Lỗi gửi phản hồi được `console.error`, sau đó vẫn trả HTTP 200 để tránh retry Zalo.
  - Nếu thiếu `chat.id`, trả `{ ok: true, skipped: true }`.
- `src/lib/zalo.ts` là helper server-side để gọi `sendMessage`, `sendChatAction`, `setWebhook`, `getWebhookInfo`, `deleteWebhook`.
- `src/lib/zaloAutoReply.ts` chứa matching rule-based, normalize tiếng Việt và reuse FAQ trong `content.ts`.

**Suy luận**

- Zalo Bot Platform được mô tả trong tài liệu là tương tự Telegram Bot API và gọi webhook sau khi đăng ký bằng API ngoài.
- Flow triển khai webhook phụ thuộc domain public (ví dụ Vercel) và cấu hình một lần.

**Chưa biết/thiếu**

- Contract đầy đủ của Zalo webhook ngoài kiểu `ZaloBotUpdate` rút gọn.
- SLA, rate limit, idempotency hoặc hành vi retry thực tế của Zalo.

## 6. Kiến trúc frontend

**Đã xác nhận**

- Mô hình Next.js App Router với một trang `/` và một API route.
- Server components: layout, page, các section như Products; client components: `AgeGate`, `Navbar`, `ZaloChatButton`, `Reveal`, một số section tương tác.
- Giao diện một trang gồm các section theo thứ tự: Hero, Intro, WhyRio, Process, Products, ProductsLight, Benefits, Testimonials, News, FAQ, Contact.
- Nội dung trang hoàn toàn là hằng số TypeScript trong `src/lib/content.ts`, không fetch từ CMS.
- Styling bằng Tailwind tokens, CSS tùy chỉnh và Framer Motion.
- Dark mode là trạng thái UI cục bộ trong `Navbar`, không persist.
- `AgeGate` lưu trạng thái xác nhận trong `sessionStorage` với key `rio-age-verified`.
- `Contact` chỉ chặn submit mặc định và chuyển UI sang trạng thái “đã gửi”; không gửi dữ liệu đến backend.
- Fonts tự lưu trữ giúp tránh gọi mạng ngoài cho typography.

**Suy luận**

- Trang chính static/server-rendered; các client component hydrate riêng để hỗ trợ UI tương tác.
- Trạng thái tuổi chỉ dùng cho UX phía trình duyệt, không phải biện pháp kiểm soát server-side.

## 7. Lớp API

**Đã xác nhận**

- Chỉ có một route: `/api/zalo/webhook`.
- `GET` trả `{ ok: true, message: ... }` không xác thực.
- `POST` yêu cầu secret header khi `ZALO_BOT_WEBHOOK_SECRET` được cấu hình.
- Không có `/api/contact`; form liên hệ không dùng API.

**Suy luận**

- Lớp API hiện là integration adapter cho Zalo, không phải REST API nghiệp vụ.

## 8. Cơ sở dữ liệu và persistence

**Đã xác nhận**

- Không có database, ORM, migration hoặc storage SDK trong dependencies và source.
- Không có chức năng ghi dữ liệu người dùng; form liên hệ chỉ đổi state UI.
- Persistence phía client duy nhất: `sessionStorage` cho trạng thái AgeGate.
- Content và sản phẩm được hard-code trong `src/lib/content.ts`.

## 9. Xác thực và phân quyền

**Đã xác nhận**

- Không có đăng nhập, người dùng, role hay authorization.
- Webhook chỉ có một lớp kiểm tra bí mật qua `ZALO_BOT_WEBHOOK_SECRET`.
- `verifyWebhookSecret` bỏ qua kiểm tra khi secret chưa cấu hình.
- Trạng thái xác nhận 18+ chỉ lưu trình duyệt theo session.

**Suy luận**

- Model bảo mật phù hợp với service public marketing; không đủ để bảo vệ tài nguyên nhạy cảm nếu mở rộng.

## 10. Tích hợp bên ngoài

**Đã xác nhận**

- Zalo Bot Platform (`https://bot-api.zapps.me/bot<TOKEN>/<method>`) được gọi bằng `fetch`, `cache: "no-store"`.
- Zalo webhook nhận secret qua header `X-Bot-Api-Secret-Token`.
- Nút chat Zalo mở `NEXT_PUBLIC_ZALO_CHAT_LINK`; nếu không cấu hình, fallback về `https://zalo.me/s/botcreator/`.
- Zalo API trả dữ liệu JSON; client kiểm tra HTTP `res.ok` hoặc payload có `ok === false`.

**Suy luận**

- Tích hợp Zalo là tích hợp quan trọng duy nhất.

**Chưa biết/thiếu**

- Không có xác nhận từ mã nguồn về việc API trả kiểu dữ liệu chuẩn khi lỗi mạng hoặc payload bất thường.

## 11. Background jobs và worker

**Đã xác nhận**

- Không có queue, scheduler, cron, worker hoặc background process trong repo.
- Xử lý webhook là request-scoped và synchronous: typing action, tính reply và gọi Zalo API.

## 12. Cấu hình và biến môi trường

**Đã xác nhận**

- `ZALO_BOT_TOKEN`: secret server-side, bắt buộc khi gửi/truy vấn Zalo Bot API.
- `ZALO_BOT_WEBHOOK_SECRET`: secret server-side dùng xác thực webhook; chưa cấu hình thì webhook từ chối request (fail closed).
- `NEXT_PUBLIC_ZALO_CHAT_LINK`: link chat public; có fallback.
- `.env.example` chứa ba biến trên và ghi rõ không commit giá trị thật.
- `ZALO_BOT_TOKEN` được nối trực tiếp vào URL Zalo API.
- Zalo API call có timeout 10 giây qua `AbortSignal.timeout`.
- Security headers cấu hình trong `next.config.mjs`: CSP nhẹ, `Referrer-Policy`, `X-Content-Type-Options`, `X-Frame-Options: DENY`, `X-DNS-Prefetch-Control`; `poweredByHeader` bị tắt.
- README yêu cầu cập nhật nội dung thương hiệu, liên hệ, domain và nồng độ cồn trong `src/lib/content.ts`.

**Suy luận**

- Triển khai Vercel sẽ inject biến từ project settings; README khuyến khích `.env.local` cho local.

## 13. Docker/container architecture

**Đã xác nhận**

- Không có Dockerfile, docker-compose hoặc cấu hình container.
- README hướng dẫn deploy Vercel theo Next.js mặc định.

**Chưa biết/thiếu**

- Không có thông tin runtime pinning, base image hoặc quy trình container hóa nếu tổ chức muốn tự host.

## 14. CI/CD

**Đã xác nhận**

- Không có `.github/workflows`, GitHub Actions, GitLab CI, cấu hình Vercel hay pipeline file trong working tree.
- Repository chỉ có một commit lịch sử: `7af79a6 first commit`.
- README chỉ mô tả cách đẩy repo và deploy bằng Vercel; đó là quy trình triển khai, chưa chứng minh có pipeline tự động.

## 15. Testing strategy

**Đã xác nhận**

- Không có test runner, config test hay file test trong mã nguồn dự án.
- Không có script `test`.
- Có kiểm tra tĩnh: `npm run lint`; TypeScript `strict` đã bật.
- Kiểm tra thực hiện trong lần khảo sát này (chỉ đọc, không sửa mã): `next lint` sạch và `tsc --noEmit` sạch.

**Suy luận**

- Độ tin cậy runtime hiện phụ thuộc kiểm tra thủ công được mô tả trong `docs/ZALO_BOT_SETUP.md`, chưa được tự động hóa.

## 16. Logging và observability

**Đã xác nhận**

- Không có framework logging, metrics, tracing, APM, alerting hoặc dashboard.
- Zalo webhook dùng một `console.error` khi gửi phản hồi thất bại.
- `GET /api/zalo/webhook` là health check thủ công.
- `src/lib/zalo.ts` không log URL/secret, nhưng ném lỗi kèm tên method và thông báo lỗi Zalo.
- Tài liệu Zalo hướng dẫn xem lỗi bằng log platform Vercel.

**Suy luận**

- Observability phụ thuộc console output của hosting.

## 17. Dependencies chính

**Đã xác nhận**

| Package | Phiên bản | Vai trò |
|---|---:|---|
| `next` | `14.2.35` | Framework web, App Router, API routes |
| `react` / `react-dom` | `^18` | UI runtime |
| `framer-motion` | `^12.42.2` | Animation và transition |
| `lucide-react` | `^1.25.0` | Icons |
| `tailwindcss` | `^3.4.1` | Styling |
| `typescript` | `^5` | Type checking |
| `eslint` + `eslint-config-next` | `^8` / `14.2.35` | Lint |
| `postcss` | `^8` | CSS pipeline |

## 18. Rủi ro kiến trúc

**Rủi ro được xác nhận bởi code/config**

- Route webhook không validate idempotency; cùng một update có thể được xử lý lại nếu platform retry.
- Route đợi toàn bộ chuỗi Zalo calls (`sendChatAction` + `sendMessage`) trước khi trả 200; sự chậm hoặc treo của Zalo API có thể kéo dài handler.
- Không có schema runtime (ví dụ Zod) cho payload Zalo.
- Không có quy trình export/reuse `setWebhook`; helper này được viết sẵn nhưng không được route gọi, và tài liệu dùng curl bên ngoài.
- Contact form giả lập gửi thành công ở client; dữ liệu không được lưu hay chuyển tiếp.
- Nội dung marketing, domain, liên hệ và legal facts đều hard-code; chỉ một commit lịch sử, không thể đánh giá quy trình quản trị nội dung từ Git.
- Không có CI; kiểm tra lint/type/build/test không tự động chạy.

**Rủi ro suy luận**

- Secret Zalo được nhúng vào URL API; đây là pattern theo tài liệu/trong code, nhưng làm tăng hiển thị token trong URL endpoint. Cần đối chiếu yêu cầu bảo mật của Zalo Platform.
- Nếu `ZALO_BOT_TOKEN` lộ qua log nền tảng hay log mạng, đối tượng có token có thể gọi Zalo Bot API.
- Rule-based auto-reply có thể trả lời sai chủ đề nếu câu hỏi chứa một từ khóa FAQ, dù ngữ cảnh khác.

## 19. Technical debt

- Business content nằm chung một file lớn `src/lib/content.ts`; các section web và bot dùng cùng dữ liệu, nhưng không có schema validation.
- Không có layer DTO/validation cho webhook Zalo; type chỉ là contract rút gọn.
- Không có test tự động cho `getAutoReply`, `verifyWebhookSecret`, webhook handler hoặc UI.
- Không có cấu hình CI/CD, Docker, environment promotion hay feature flags.
- Không có admin UI/quản trị nội dung; mọi thay đổi content đòi hỏi deploy.
- News, testimonials, footer links và policy có nhiều nội dung static; một số link footer chỉ là text, chưa thấy route tương ứng.
- Dark mode không persist, AgeGate dùng `sessionStorage`, tạo trải nghiệm lại từ đầu ở mỗi tab/session mới.
- Sitemap liệt kê các URL dạng `https://domain/#section`; việc bot có nên index từng anchor hay không chưa được tài liệu hóa.
- `.next` tồn tại trong working tree; việc bỏ `.next` ra khỏi source/package archive không thể xác nhận chỉ từ working tree hiện tại.

## 20. Khu vực nhạy cảm bảo mật

**Bằng chứng trực tiếp**

- Secret `ZALO_BOT_WEBHOOK_SECRET` thiếu làm webhook authentication fail closed.
- So sánh secret dùng `===`; không sử dụng hàm so sánh constant-time. Việc khai thác timing ở mức thực tế chưa được chứng minh, nhưng là điểm kiểm tra nên xem lại.
- Secret bot token nằm trong đường dẫn API `.../bot<TOKEN>/...`.
- Không có rate limiting hay lock thời lượng trong route.
- `GET /api/zalo/webhook` công khai và không xác thực, chỉ tiết lộ trạng thái route.
- `dangerouslySetInnerHTML` được dùng để inject JSON-LD được build từ static content; không thấy nội dung user-controlled, nhưng pattern vẫn cần giữ nguyên tắc khi thay đổi.
- Contact form thu thập name, phone, email và message nhưng không gửi đi; vẫn cần privacy policy nếu triển khai thật.
- AgeGate client-side có thể bị bypass bằng Developer Tools; không phải biên pháp lý chắc chắn.
- `README` ghi nhận cần rà soát pháp lý về quảng cáo rượu/bia và ABV thật.

**Chưa biết/thiếu**

- Không có `.env.local`, secret hay token thật trong working tree được khảo sát.
- Không có dữ liệu runtime, cấu hình production hay quyền Vercel để đánh giá secret rotation, headers, WAF và log retention.

## Xác minh đã thực hiện

- Quét toàn bộ working tree loại trừ `node_modules`, `.next`, `.git`.
- Đọc README, tài liệu Zalo, config, mã nguồn, API route và cấu hình.
- Tìm kiếm Docker, CI, tests, environment references và background jobs.
- Chạy `next lint` và `tsc --noEmit` chỉ đọc; cả hai thành công.
- Không thay đổi mã nguồn ứng dụng.
