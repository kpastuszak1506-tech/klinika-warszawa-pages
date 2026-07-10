import type { MetadataRoute } from "next";
import { isPublicReleaseReady } from "@/config/companyConfig";
import { absoluteSiteUrl } from "@/lib/seo";

export const dynamic = "force-static";

const publicPaths = [
  "/",
  "/konsultacja",
  "/jak-wyglada-wizyta",
  "/dla-kogo",
  "/cennik",
  "/faq",
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

  return publicPaths.map((path) => ({
    url: absoluteSiteUrl(path),
    lastModified: new Date("2026-07-10"),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
