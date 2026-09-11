import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/lib/content";

// Self-hosted for reliable, network-independent builds (no runtime call to
// Google's font CDN). Files are Be Vietnam Pro & Inter, both OFL-licensed.
const beVietnam = localFont({
  src: [
    { path: "../fonts/BeVietnamPro-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/BeVietnamPro-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/BeVietnamPro-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/BeVietnamPro-Bold.ttf", weight: "700", style: "normal" },
    { path: "../fonts/BeVietnamPro-ExtraBold.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-be-vietnam",
  display: "swap",
});

const inter = localFont({
  src: [{ path: "../fonts/Inter-Variable.ttf", style: "normal", weight: "100 900" }],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: "RIO — Nước trái cây lên men tự nhiên | Chai & Lon, nhiều vị",
    template: "%s | RIO",
  },
  description:
    "RIO là nước trái cây lên men tự nhiên, đóng chai 275ml và lon RIO Light, nhiều vị trái cây, dành cho người từ 18 tuổi trở lên. Uống có trách nhiệm.",
  keywords: [
    "RIO",
    "nước trái cây lên men",
    "RIO Light",
    "RTD cocktail Việt Nam",
    "đồ uống trái cây lên men",
  ],
  authors: [{ name: "RIO" }],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: site.domain,
    siteName: "RIO",
    title: "RIO — Nước trái cây lên men tự nhiên",
    description:
      "Nhiều vị trái cây lên men, đóng chai và lon. Sản phẩm dành cho người từ 18 tuổi trở lên. Uống có trách nhiệm.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RIO — Nước trái cây lên men tự nhiên",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RIO — Nước trái cây lên men tự nhiên",
    description:
      "Nhiều vị trái cây lên men, đóng chai và lon. Dành cho người từ 18 tuổi trở lên. Uống có trách nhiệm.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: site.domain,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RIO",
    url: site.domain,
    logo: `${site.domain}/logo.png`,
    description:
      "RIO là thương hiệu nước trái cây lên men tự nhiên, phân phối tại Việt Nam.",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressCountry: "VN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phone,
      contactType: "customer service",
      email: site.email,
      areaServed: "VN",
      availableLanguage: ["vi"],
    },
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Nước trái cây lên men RIO",
    brand: { "@type": "Brand", name: "RIO" },
    description:
      "Nước trái cây lên men đóng chai 275ml và lon RIO Light, nhiều vị trái cây. Sản phẩm có nồng độ cồn nhẹ, dành cho người từ 18 tuổi trở lên.",
    category: "Nước trái cây lên men",
  };

  return (
    <html lang="vi" className={`${beVietnam.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
