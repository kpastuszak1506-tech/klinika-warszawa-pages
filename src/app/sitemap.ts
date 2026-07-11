import type { MetadataRoute } from "next";
import { isPublicReleaseReady } from "@/config/companyConfig";
import { knowledgeArticles } from "@/lib/knowledge";
import { absoluteSiteUrl } from "@/lib/seo";

export const dynamic = "force-static";

const publicPaths = [
  "/",
  "/konsultacja",
  "/jak-wyglada-wizyta",
  "/dla-kogo",
  "/cennik",
  "/faq",
  "/wiedza",
  "/kontakt",
  "/polityka-prywatnosci",
  "/polityka-cookies",
  "/regulamin-rezerwacji",
  "/informacja-dla-pacjenta",
];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isPublicReleaseReady) {
    return [];
  }

  return [
    ...publicPaths.map((path) => ({
      url: absoluteSiteUrl(path),
      lastModified: new Date("2026-07-11"),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
    })),
    ...knowledgeArticles.map((article) => ({
      url: absoluteSiteUrl("/wiedza/" + article.slug),
      lastModified: new Date(article.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  ];
}
