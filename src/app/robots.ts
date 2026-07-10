import type { MetadataRoute } from "next";
import { isPublicReleaseReady } from "@/config/companyConfig";
import { absoluteSiteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (!isPublicReleaseReady) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: absoluteSiteUrl("/sitemap.xml"),
  };
}
