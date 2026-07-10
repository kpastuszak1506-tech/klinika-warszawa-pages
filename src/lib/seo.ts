import type { Metadata } from "next";
import { companyConfig } from "@/config/companyConfig";
import { siteTitle } from "@/lib/siteContent";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

const baseUrl = companyConfig.websiteUrl.replace(/\/$/, "");

export function absoluteSiteUrl(path = "/") {
  if (path === "/") {
    return `${baseUrl}/`;
  }

  const normalizedPath = path.replace(/^\/+|\/+$/g, "");
  const hasFileExtension = /\.[a-z0-9]+$/i.test(normalizedPath);

  return `${baseUrl}/${normalizedPath}${hasFileExtension ? "" : "/"}`;
}

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const url = absoluteSiteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      url,
      siteName: companyConfig.shortName,
      title: `${title} | ${siteTitle}`,
      description,
      images: [
        {
          url: absoluteSiteUrl("/images/medical-office-hero-soft.jpg"),
          width: 1586,
          height: 992,
          alt: "Gabinet lekarski w Warszawie",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteTitle}`,
      description,
      images: [absoluteSiteUrl("/images/medical-office-hero-soft.jpg")],
    },
  };
}
