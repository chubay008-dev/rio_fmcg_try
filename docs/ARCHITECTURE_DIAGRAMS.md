# RIO Website — Sơ Đồ Kiến Trúc Chi Tiết

> Các sơ đồ mô tả mã nguồn hiện tại. Nguồn chính: `src/app`, `src/components`, `src/lib`, `next.config.mjs`.

## 1. Bản đồ tổng thể hệ thống

```mermaid
flowchart TB
  classDef ui fill:#dcfce7,stroke:#166534,color:#052e16
  classDef server fill:#dbeafe,stroke:#1d4ed8,color:#172554
  classDef external fill:#ffedd5,stroke:#9a3412,color:#431407

  visitor["Người dùng / Zalo user"]
  browser["Browser / Zalo client"]
  edge["Next.js App Router<br/>Node runtime"]

  subgraph UI["Trang marketing `/`"]
    ageGate["AgeGate<br/>Client component"]
    legalBar["LegalBar"]
    navbar["Navbar<br/>Client component"]
    shell["page.tsx"]
    sections["11 marketing sections"]
    footer["Footer"]
    zaloButton["ZaloChatButton<br/>Client component"]
  end

  subgraph Data["Static content layer"]
    content["content.ts<br/>site, legal, products, FAQ, news, contact"]
    assets["public/products, public/products-light"]
    fonts["src/fonts<br/>Be Vietnam Pro, Inter"]
  end

  subgraph Api["Next.js Route Handler"]
    webhook["POST /api/zalo/webhook"]
    health["GET /api/zalo/webhook"]
  end

  subgraph Lib["Server + shared libraries"]
    zaloLib["zalo.ts<br/>verify, timeout, Zalo API calls"]
    autoReply["zaloAutoReply.ts<br/>greeting, FAQ, extra rules, fallback"]
  end

  zaloBot["Zalo Bot Platform<br/>bot-api.zapps.me"]
  zaloPlatform["Zalo webhook delivery"]

  visitor --> browser
  browser -->|GET /| shell
  shell --> ageGate
  shell --> legalBar
  shell --> navbar
  shell --> sections
  shell --> footer
  shell --> zaloButton
  sections --> content
  navbar --> content
  ageGate --> content
  footer --> content
  assets -.-> shell
  fonts -.-> shell

  zaloPlatform -->|POST<br/>X-Bot-Api-Secret-Token| webhook
  webhook --> zaloLib
  webhook --> autoReply
  zaloLib -->|HTTPS POST<br/>timeout 10s| zaloBot
  visitor -->|message| zaloPlatform
  browser -->|GET health| health
  browser -->|open chat link| zaloPlatform
  autoReply --> content
  visitor -->|chat link| zaloButton

  class UI ui
  class Api,Data,Lib server
  class zaloBot,zaloPlatform external
```

## 2. Cấu trúc server và client trong Next.js

```mermaid
flowchart LR
  classDef server fill:#dbeafe,stroke:#1d4ed8
  classDef client fill:#dcfce7,stroke:#166534
  classDef shared fill:#f3f4f6,stroke:#4b5563

  subgraph AppRouter["src/app"]
    layout["layout.tsx<br/>metadata, JSON-LD, fonts"]
    page["page.tsx"]
    sitemap["sitemap.ts"]
    api["api/zalo/webhook/route.ts"]
    css["globals.css"]
  end

  subgraph ClientComponents["Client components"]
    ageGate["AgeGate"]
    navbar["Navbar"]
    zaloButton["ZaloChatButton"]
    contact["Contact"]
    faq["Faq"]
    hero["Hero"]
    process["Process"]
    reveal["Reveal"]
  end

  subgraph ServerComponents["Server components"]
    legalBar["LegalBar"]
    footer["Footer"]
    intro["Intro"]
    whyRio["WhyRio"]
    products["Products"]
    productsLight["ProductsLight"]
    benefits["Benefits"]
    testimonials["Testimonials"]
    news["News"]
  end

  subgraph Shared["Shared/static"]
    content["content.ts"]
    zaloLib["zalo.ts"]
    zaloAutoReply["zaloAutoReply.ts"]
  end

  layout --> page
  page --> ClientComponents
  page --> ServerComponents
  ageGate --> content
  navbar --> content
  contact --> content
  faq --> content
  hero --> content
  reveal --> ClientComponents
  legalBar --> content
  footer --> content
  intro --> content
  whyRio --> content
  products --> content
  productsLight --> content
  benefits --> content
  testimonials --> content
  news --> content
  api --> zaloLib
  api --> zaloAutoReply
  zaloAutoReply --> content

  class AppRouter server
  class ClientComponents client
  class ServerComponents server
  class Shared shared
```

## 3. Luồng request trang marketing

```mermaid
sequenceDiagram
  autonumber
  participant U as Visitor
  participant B as Browser
  participant N as Next.js Server
  participant P as page.tsx
  participant C as content.ts
  participant R as React hydration

  U->>B: Mở https://domain/
  B->>N: GET /
  N->>P: Render App Router page
  P->>C: import site, legal, products, FAQ...
  C-->>P: Static content objects
  P->>N: HTML + CSS + client bundle
  N-->>B: HTTP 200 + HTML
  B->>R: hydrate AgeGate, Navbar, Reveal, Hero, FAQ, Contact
  R->>B: kiểm tra sessionStorage("rio-age-verified")
  alt chưa xác nhận 18+
    R-->>U: hiển thị AgeGate overlay
    U->>R: confirm 18+
    R->>B: sessionStorage = "yes"
    R-->>U: mở trang
  else đã xác nhận
    R-->>U: mở trang trực tiếp
  end
  N->>N: trả static prerendered `/`
```

## 4. Luồng navigation và cấu trúc trang

```mermaid
flowchart LR
  classDef shell fill:#dcfce7,stroke:#166534
  classDef content fill:#dbeafe,stroke:#1d4ed8

  root["Trang `/`"]
  nav["Navbar links<br/>content.nav"]

  root --> nav
  nav -->|`#gioi-thieu`| intro["Intro"]
  nav -->|`#vi-sao-chon-rio`| whyRio["WhyRio"]
  nav -->|`#quy-trinh`| processSection["Process"]
  nav -->|`#san-pham`| products["Products"]
  nav -->|`#rio-light`| productsLight["ProductsLight"]
  nav -->|`#loi-ich`| benefits["Benefits"]
  nav -->|`#khach-hang`| testimonials["Testimonials"]
  nav -->|`#tin-tuc`| news["News"]
  nav -->|`#faq`| faq["Faq"]
  nav -->|`#lien-he`| contact["Contact"]
  products -->|buy link| contact
  productsLight -->|buy link| contact
  heroCTA["Hero CTA"] --> products
  heroCTA --> processSection
  footer["Footer"] -.->|static `#` links| futureRoutes["Không có route tương ứng"]
  zalo["ZaloChatButton"] -->|external link| zaloChat["NEXT_PUBLIC_ZALO_CHAT_LINK"]

  class root,nav shell
  class intro,whyRio,processSection,products,productsLight,benefits,testimonials,news,faq,contact content
```

## 5. Luồng xác thực tuổi client-side

```mermaid
stateDiagram-v2
  [*] --> Checking
  Checking --> Gate: useEffect đọc sessionStorage
  Checking --> OK: rio-age-verified = "yes"
  Gate --> OK: click "Tôi đã đủ 18 tuổi"
  Gate --> Denied: click "Tôi chưa đủ 18 tuổi"
  OK --> [*]: ẩn overlay
  Denied --> Gate: hiện thông báo từ chối
```

## 6. Kiến trúc API và xác thực webhook

```mermaid
flowchart TB
  classDef client fill:#dcfce7,stroke:#166534
  classDef server fill:#dbeafe,stroke:#1d4ed8
  classDef security fill:#fee2e2,stroke:#b91c1c
  classDef external fill:#ffedd5,stroke:#9a3412

  zaloPlatform["Zalo Bot Platform"]
  request["POST /api/zalo/webhook"]
  secretCheck{"verifyWebhookSecret()<br/>secret env đã cấu hình?"}
  missingSecret["fail closed: HTTP 401"]
  body["parse JSON body"]
  invalidBody["HTTP 400 invalid json body"]
  chatCheck{"message.chat.id tồn tại?"}
  skip["HTTP 200 skipped"]
  typing["sendChatAction: typing"]
  reply["getAutoReply(text)"]
  send["sendMessage"]
  success["HTTP 200 ok"]
  sendError["console.error và HTTP 200"]
  getHealth["GET /api/zalo/webhook"]
  health["HTTP 200 health message"]

  zaloPlatform --> request
  request --> secretCheck
  secretCheck -->|false hoặc env thiếu| missingSecret
  secretCheck -->|true| body
  body --> invalidBody
  body --> chatCheck
  chatCheck -->|false| skip
  chatCheck -->|true| typing
  typing --> reply
  reply --> send
  send --> success
  send -.->|throw| sendError
  getHealth --> health

  class zaloPlatform client
  class request,body,chatCheck,typing,reply,send,success,sendError,getHealth,health server
  class secretCheck,missingSecret security
```

## 7. Luồng xử lý tin nhắn Zalo end-to-end

```mermaid
sequenceDiagram
  autonumber
  participant ZU as Zalo User
  participant ZP as Zalo Bot Platform
  participant WH as Webhook Route
  participant AU as Auto Reply
  participant ZL as Zalo Client
  participant ZB as Zalo Bot API

  ZU->>ZP: Gửi tin nhắn
  ZP->>WH: POST /api/zalo/webhook<br/>X-Bot-Api-Secret-Token
  WH->>WH: verify secret constant-time
  WH->>WH: parse update JSON
  WH->>ZL: sendTypingAction(chat.id)
  ZL->>ZB: POST /bot<TOKEN>/sendChatAction
  ZL-->>WH: ok hoặc lỗi non-critical
  WH->>AU: getAutoReply(text)
  AU-->>WH: text reply
  WH->>ZL: sendMessage(chat.id, reply)
  ZL->>ZB: POST /bot<TOKEN>/sendMessage<br/>timeout 10s
  ZB-->>ZL: JSON result/error
  ZL-->>WH: sent hoặc error
  WH-->>ZP: HTTP 200 {ok:true}
  ZP-->>ZU: hiển thị reply
```

## 8. Logic auto-reply rule-based

```mermaid
flowchart TD
  classDef input fill:#dbeafe,stroke:#1d4ed8
  classDef normalize fill:#f3f4f6,stroke:#4b5563
  classDef rule fill:#dcfce7,stroke:#166534
  classDef fallback fill:#fee2e2,stroke:#b91c1c

  raw["rawText từ update.message.text"]
  check{"rawText rỗng?"}
  normalize["normalize: NFD, bỏ dấu, đ→d, lowercase"]
  greeting{"trùng GREETINGS?"}
  welcome["WELCOME reply"]
  rules{"khớp extraRules hoặc FAQ rules"}
  extra["Hotline, legal, giá, phân phối"]
  faq["FAQ reply"]
  softMatch{"FAQ word match ≥ 50%?"}
  fallback["FALLBACK liên hệ"]
  output["Trả về reply text"]

  raw --> check
  check -->|yes| fallback
  check -->|no| normalize
  normalize --> greeting
  greeting -->|yes| welcome
  greeting -->|no| rule
  rule -->|yes| extra
  rule -->|yes| faq
  rule -->|no| softMatch
  softMatch -->|yes| faq
  softMatch -->|no| fallback
  welcome --> output
  extra --> output
  faq --> output
  fallback --> output

  class raw input
  class normalize,greeting,softMatch normalize
  class rule,extra,faq,welcome rule
  class fallback fallback
```

## 9. Ma trận tích hợp và kết nối dịch vụ

```mermaid
flowchart LR
  classDef app fill:#dbeafe,stroke:#1d4ed8
  classDef user fill:#dcfce7,stroke:#166534
  classDef ext fill:#ffedd5,stroke:#9a3412
  classDef absent fill:#f3f4f6,stroke:#6b7280,stroke-dasharray: 5 5

  visitor["Visitor"]
  zaloUser["Zalo User"]
  nextApp["Next.js App"]
  api["Zalo webhook route"]
  zaloPlatform["Zalo Bot Platform"]
  staticAssets["Public assets"]
  db[("Database")]
  queue[("Queue / Worker")]
  email[("Email service")]
  storage[("External storage")]
  cms[("CMS")]

  visitor --> nextApp
  nextApp --> staticAssets
  zaloUser --> zaloPlatform
  zaloPlatform --> api
  api --> zaloPlatform
  api -.-> db
  api -.-> queue
  nextApp -.-> email
  nextApp -.-> storage
  nextApp -.-> cms

  class nextApp,api app
  class visitor,zaloUser user
  class zaloPlatform ext
  class db,queue,email,storage,cms missing
```

## 10. Cấu hình, biến môi trường và deployment

```mermaid
flowchart TB
  classDef config fill:#f3f4f6,stroke:#4b5563
  classDef runtime fill:#dbeafe,stroke:#1d4ed8
  classDef secret fill:#fee2e2,stroke:#b91c1c

  envExample[".env.example"]
  envLocal[".env.local / hosting env"]
  token["ZALO_BOT_TOKEN"]
  webhookSecret["ZALO_BOT_WEBHOOK_SECRET"]
  chatLink["NEXT_PUBLIC_ZALO_CHAT_LINK"]
  nextConfig["next.config.mjs<br/>security headers"]
  build["next build"]
  static["Static HTML/CSS/JS"]
  apiFn["Serverless / Node API route"]
  zaloApi["Zalo Bot API"]

  envExample --> envLocal
  envLocal --> token
  envLocal --> webhookSecret
  envLocal --> chatLink
  chatLink -.-> static
  nextConfig --> build
  build --> static
  build --> apiFn
  webhookSecret --> apiFn
  token --> apiFn
  apiFn --> zaloApi

  class envExample,envLocal,token,webhookSecret,chatLink,nextConfig config
  class build,static,apiFn runtime
  class token,webhookSecret secret
```

## 11. Sơ đồ dữ liệu nội bộ

```mermaid
erDiagram
  SITE {
    string name
    string fullName
    string domain
    string phone
    string email
    string address
    string abv
  }
  LEGAL {
    string ageWarning
    string drinkResponsibly
    string pregnancyWarning
  }
  PRODUCT {
    string name
    string note
    string desc
    string image
    string line
    string abvNote
  }
  FAQ_ITEM {
    string q
    string a
  }
  NEWS_ITEM {
    string tag
    string title
    string date
    string excerpt
  }
  CONTACT {
    string name
    string phone
    string email
    string message
  }
  ZALO_MESSAGE {
    string chatId
    string text
  }
  AUTO_REPLY {
    string keywords
    string reply
  }

  SITE ||--o{ PRODUCT : "chai 275ml"
  SITE ||--o{ PRODUCT : "lon Light"
  SITE ||--|| LEGAL : uses
  FAQ_ITEM ||--o| AUTO_REPLY : "generated keywords"
  NEWS_ITEM }o--|| SITE : belongs
  ZALO_MESSAGE }o--o| AUTO_REPLY : matches
  CONTACT ||--o| PERSISTENCE : "không tồn tại"
```

## 12. Deployment và CI/CD hiện trạng

```mermaid
stateDiagram-v2
  [*] --> LocalSource
  LocalSource --> NextBuild: npm run build
  NextBuild --> BuildPass: static pages + API route
  NextBuild --> BuildFailed: error
  BuildFailed --> LocalSource
  LocalSource --> GitPush
  GitPush --> VercelProject: manual deploy qua README
  VercelProject --> ProductionReady
  VercelProject --> EnvRequired: set Zalo envs
  EnvRequired --> WebhookRegistered: manual curl setWebhook
  WebhookRegistered --> ZaloProduction
  ProductionReady --> NoCI: không có GitHub Actions
  ProductionReady --> NoTests: không có test runner
```

## 13. Luồng bảo mật webhook

```mermaid
sequenceDiagram
  autonumber
  participant Z as Zalo
  participant W as Webhook Route
  participant V as verifyWebhookSecret
  participant E as Environment

  Z->>W: POST + X-Bot-Api-Secret-Token
  W->>E: đọc ZALO_BOT_WEBHOOK_SECRET
  E-->>V: expected secret hoặc undefined
  W->>V: verify(headerValue)
  alt secret env thiếu
    V-->>W: false
    W-->>Z: HTTP 401
  else độ dài hoặc ký tự không khớp
    V-->>W: false
    W-->>Z: HTTP 401
  else secret khớp
    V-->>W: true
    W->>W: parse update và xử lý
    W-->>Z: HTTP 200 hoặc 400
  end
```

## 14. Luồng sitemap và SEO

```mermaid
flowchart LR
  classDef source fill:#f3f4f6,stroke:#4b5563
  classDef output fill:#dcfce7,stroke:#166534
  classDef missing fill:#fee2e2,stroke:#b91c1c

  site["content.ts site.domain"]
  sitemap["sitemap.ts sections"]
  generated["/sitemap.xml"]
  robots["/robots.txt"]
  layout["layout.tsx metadata"]
  jsonld["Organization + Product JSON-LD"]
  og["/og-image.png<br/>metadata reference"]
  logo["/logo.png<br/>JSON-LD reference"]
  missingAssets["Assets không tồn tại"]

  site --> sitemap
  sitemap --> generated
  generated --> robots
  site --> layout
  layout --> jsonLd
  layout --> og
  jsonLd --> logo
  og -.-> missingAssets
  logo -.-> missingAssets

  class site,sitemap,layout source
  class generated,robots,jsonLd output
  class og,logo,missingAssets missing
```

## 15. Map kết nối component-to-content

```mermaid
flowchart LR
  classDef content fill:#dbeafe,stroke:#1d4ed8
  classDef component fill:#dcfce7,stroke:#166534

  contentAll["content.ts"]
  site["site"]
  legal["legal"]
  nav["nav"]
  ageGateData["ageGate"]
  heroData["heroContent"]
  introData["intro"]
  whyData["whyRio"]
  processData["process"]
  productData["products"]
  lightData["productsLight"]
  benefitData["benefits"]
  testimonialData["testimonials"]
  newsData["news"]
  faqData["faq"]
  contactData["contact"]
  footerData["footerContent"]

  ageGateC["AgeGate"]
  navbarC["Navbar"]
  legalC["LegalBar"]
  footerC["Footer"]
  heroC["Hero"]
  introC["Intro"]
  whyC["WhyRio"]
  processC["Process"]
  productsC["Products"]
  lightC["ProductsLight"]
  benefitsC["Benefits"]
  testimonialsC["Testimonials"]
  newsC["News"]
  faqC["Faq"]
  contactC["Contact"]
  autoReplyC["zaloAutoReply"]

  contentAll --> site
  contentAll --> legal
  contentAll --> nav
  contentAll --> ageGateData
  contentAll --> heroData
  contentAll --> introData
  contentAll --> whyData
  contentAll --> processData
  contentAll --> productData
  contentAll --> lightData
  contentAll --> benefitData
  contentAll --> testimonialData
  contentAll --> newsData
  contentAll --> faqData
  contentAll --> contactData
  contentAll --> footerData

  ageGateData --> ageGateC
  nav --> navbarC
  site --> navbarC
  legal --> legalC
  footerData --> footerC
  site --> footerC
  heroData --> heroC
  introData --> introC
  whyData --> whyC
  processData --> processC
  productData --> productsC
  lightData --> lightC
  benefitData --> benefitsC
  testimonialData --> testimonialsC
  newsData --> newsC
  faqData --> faqC
  contactData --> contactC
  site --> contactC
  faqData --> autoReplyC
  site --> autoReplyC
  legal --> autoReplyC

  class contentAll,site,legal,nav,ageGateData,heroData,introData,whyData,processData,productData,lightData,benefitData,testimonialData,newsData,faqData,contactData,footerData content
  class ageGateC,navbarC,legalC,footerC,heroC,introC,whyC,processC,productsC,lightC,benefitsC,testimonialsC,newsC,faqC,contactC,autoReplyC component
```
