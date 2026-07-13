import type { Metadata } from "next";
import {
  companyConfig,
  isPublicDataVerified,
  isPublicReleaseReady,
} from "@/config/companyConfig";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  indexable?: boolean;
};

type ArticleMetadataInput = PageMetadataInput & {
  publishedAt: string;
  updatedAt: string;
};

const baseUrl = companyConfig.websiteUrl.replace(/\/$/, "");
const neutralSiteName = "Konsultacje lekarskie | Warszawa";

function getSiteName() {
  return isPublicDataVerified && companyConfig.shortName.trim()
    ? companyConfig.shortName
    : neutralSiteName;
}

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
  indexable,
}: PageMetadataInput): Metadata {
  const url = absoluteSiteUrl(path);
  const siteName = getSiteName();
  const pageTitle = `${title} | ${siteName}`;
  const shouldIndex = isPublicDataVerified && (indexable ?? isPublicReleaseReady);

  return {
    title: {
      absolute: pageTitle,
    },
    description,
    alternates: {
      canonical: url,
    },
    robots: {
      index: shouldIndex,
      follow: isPublicReleaseReady,
    },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      url,
      siteName,
      title: pageTitle,
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
      title: pageTitle,
      description,
      images: [absoluteSiteUrl("/images/medical-office-hero-soft.jpg")],
    },
  };
}


export function createArticleMetadata({
  title,
  description,
  path,
  publishedAt,
  updatedAt,
  indexable,
}: ArticleMetadataInput): Metadata {
  const url = absoluteSiteUrl(path);
  const siteName = getSiteName();

  return {
    ...createPageMetadata({
      title,
      description,
      path,
      indexable,
    }),
    openGraph: {
      type: "article",
      locale: "pl_PL",
      url,
      siteName,
      title: `${title} | ${siteName}`,
      description,
      publishedTime: publishedAt,
      modifiedTime: updatedAt,
      images: [
        {
          url: absoluteSiteUrl("/images/medical-office-hero-soft.jpg"),
          width: 1586,
          height: 992,
          alt: "Gabinet lekarski w Warszawie",
        },
      ],
    },
  };
}
