import { MetadataRoute } from "next";
import { site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const sections = [
    "",
    "#gioi-thieu",
    "#vi-sao-chon-rio",
    "#quy-trinh",
    "#san-pham",
    "#rio-light",
    "#loi-ich",
    "#khach-hang",
    "#tin-tuc",
    "#faq",
    "#lien-he",
  ];

  return sections.map((path) => ({
    url: `${site.domain}/${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
