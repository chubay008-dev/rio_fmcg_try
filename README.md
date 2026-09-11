# RIO — Website nước trái cây lên men

Website chính thức cho sản phẩm RIO — nước trái cây lên men, gồm dòng chai 275ml (6 vị) và dòng lon RIO Light (6 vị, ~3% vol). Xây dựng bằng Next.js 14 (App Router), TypeScript, Tailwind CSS và Framer Motion.

## Cài đặt

```bash
npm install
npm run dev       # chạy thử tại http://localhost:3000
npm run build     # build production
npm run start     # chạy bản build production
```

## Triển khai lên Vercel

1. Đẩy thư mục này lên một repository GitHub/GitLab.
2. Vào vercel.com → New Project → chọn repository.
3. Vercel tự nhận diện Next.js, không cần cấu hình thêm — bấm Deploy.
4. Sau khi deploy, vào Settings → Domains để gắn tên miền riêng.

Trước khi lên production, cập nhật lại thông tin trong `src/lib/content.ts` (số điện thoại, email, địa chỉ, domain, nồng độ cồn chính xác) cho đúng thực tế.

## Tuân thủ quảng cáo rượu, bia tại Việt Nam

Vì RIO là đồ uống có cồn nhẹ, website đã tích hợp sẵn các yếu tố tuân thủ cơ bản theo Luật Phòng, chống tác hại của rượu, bia (2019):

- `src/components/AgeGate.tsx`: cổng xác minh độ tuổi 18+ khi vào site (lưu trạng thái theo phiên trình duyệt qua `sessionStorage`)
- `src/components/LegalBar.tsx`: thanh cảnh báo cố định "Dành cho người từ 18 tuổi trở lên · Đã uống rượu bia thì không lái xe"
- Mục "Trải nghiệm RIO" không đưa ra bất kỳ tuyên bố lợi ích sức khỏe nào (theo đúng quy định cấm quảng cáo rượu bia gắn với lợi ích sức khỏe)
- Footer và FAQ có cảnh báo đầy đủ: không dành cho người dưới 18 tuổi, phụ nữ mang thai/cho con bú, người chuẩn bị lái xe

**Lưu ý quan trọng:** Đây là các biện pháp tuân thủ cơ bản, không thay thế cho việc rà soát pháp lý đầy đủ. Trước khi ra mắt chính thức, nên có bộ phận pháp chế/đăng ký sản phẩm rà lại toàn bộ nội dung, đặc biệt là:
- Nồng độ cồn chính xác (hiện ghi chung chung "dưới 5% ABV" — cần thay bằng số liệu thật in trên bao bì)
- Có cần giấy phép quảng cáo rượu bia theo Nghị định 105/2017/NĐ-CP hay không tùy kênh phân phối
- Quy định về vị trí đặt quảng cáo (không được gần trường học, cơ sở y tế, sân chơi trẻ em...)

## Tông marketing về nồng độ cồn

Theo yêu cầu, đã giảm nhấn mạnh chữ "cồn" trong phần marketing (Hero, Giới thiệu, Vì sao chọn RIO, SEO metadata) — các phần này giờ dẫn dắt bằng "nước trái cây lên men" thay vì "đồ uống có cồn". Các nội dung mang tính pháp lý/an toàn bắt buộc vẫn được giữ nguyên đầy đủ, không thay đổi:

- Cổng xác minh tuổi 18+ (`AgeGate.tsx`) và thanh cảnh báo cố định (`LegalBar.tsx`)
- Thông số nồng độ cồn theo từng vị trong phần Sản phẩm (spec strip)
- Cảnh báo không tuyên bố lợi ích sức khỏe trong mục "Trải nghiệm RIO" (bắt buộc theo Luật Phòng, chống tác hại của rượu, bia 2019)
- Câu hỏi/trả lời trực tiếp về nồng độ cồn trong FAQ
- Cảnh báo pháp lý ở Footer (18+, phụ nữ mang thai, không lái xe khi đã uống)

## Cấu trúc thư mục

```
src/
  app/
    layout.tsx      # Font, metadata SEO, Schema.org JSON-LD
    page.tsx        # Ghép toàn bộ section + AgeGate + LegalBar
    globals.css      # Design tokens CSS, hiệu ứng bong bóng, glass effect
    sitemap.ts       # Sinh sitemap.xml tự động
  components/
    Navbar.tsx, Footer.tsx, AgeGate.tsx, LegalBar.tsx
    ui/
      Reveal.tsx              # Hiệu ứng fade/slide khi cuộn trang
      BubbleField.tsx          # Hiệu ứng bong bóng nổi lên (motif lên men/sủi bọt)
    sections/
      Hero.tsx, Intro.tsx, WhyRio.tsx, Process.tsx, Products.tsx, ProductsLight.tsx,
      Benefits.tsx, Testimonials.tsx, News.tsx, Faq.tsx, Contact.tsx
  lib/
    content.ts       # Toàn bộ nội dung tiếng Việt + dữ liệu thật (site, legal, ageGate, products, productsLight...)
  fonts/
    Be Vietnam Pro & Inter (tự lưu trữ, giấy phép OFL — không cần gọi mạng ngoài lúc build)
public/
  robots.txt
  products/          # Ảnh chai RIO (275ml)
  products-light/     # Ảnh lon RIO Light (330ml)
```

## Trạng thái ảnh sản phẩm

**Đã hoàn thiện ảnh thật cho toàn bộ 12 sản phẩm** ở cả 2 dòng:

- **Dòng chai RIO (275ml, 6 vị)** — `public/products/`: Nho & Brandy, Việt Quất & Vodka, Đào & Brandy, Dâu & Vodka, Chanh Dưa Leo & Rum, Lý Chua Đen Cam & Vodka
- **Dòng lon RIO Light (330ml, ~3% vol, 6 vị)** — `public/products-light/`: Nho & Brandy, Chanh Dây & Vodka, Đào & Brandy, Hoa Hồng & Vải Brandy, Dâu Lactobacillus & Vodka, Lactobacillus & Vodka (vị nguyên bản)

Nếu cần thay ảnh trong tương lai, cập nhật trường `image` trong `products.items` (dòng chai) hoặc `productsLight.items` (dòng lon) tại `src/lib/content.ts`, và đặt file mới vào đúng thư mục tương ứng. **Lưu ý khi tải ảnh lên chat: luôn đặt tên file khác nhau cho mỗi ảnh** — file trùng tên sẽ ghi đè lên nhau và bị mất.

## Khác

- `/public/og-image.png` (1200x630px) và `/public/logo.png` — hiện đang được khai báo trong metadata nhưng chưa có file thật.
- Nội dung Tin tức là ví dụ minh hoạ — cần thay bằng bài viết thật.
- Nồng độ cồn ghi theo từng vị lấy trực tiếp từ nhãn sản phẩm trong ảnh — nên đối chiếu lại với hồ sơ công bố sản phẩm chính thức trước khi đăng.
- Thông tin liên hệ (SĐT, email, địa chỉ) tại `site` trong `src/lib/content.ts` — cập nhật nếu có thay đổi.
