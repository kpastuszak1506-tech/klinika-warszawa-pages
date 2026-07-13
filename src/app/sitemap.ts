import type { MetadataRoute } from "next";
import {
  areLegalDocumentsPublic,
  isPublicReleaseReady,
} from "@/config/companyConfig";
import {
  isIndexableKnowledgeArticle,
  isIndexableKnowledgeTopic,
  publicKnowledgeArticles,
  publicKnowledgeTopics,
} from "@/lib/knowledge";
import { absoluteSiteUrl } from "@/lib/seo";

export const dynamic = "force-static";

const corePaths = [
  "/",
  "/konsultacja",
  "/jak-wyglada-wizyta",
  "/dla-kogo",
  "/cennik",
  "/faq",
  "/kontakt",
];

const legalPaths = [
  "/polityka-prywatnosci",
  "/polityka-cookies",
  "/regulamin-rezerwacji",
];

const indexableKnowledgeArticles = publicKnowledgeArticles.filter(
  isIndexableKnowledgeArticle,
);
const indexableKnowledgeTopics = publicKnowledgeTopics.filter(
  isIndexableKnowledgeTopic,
);

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isPublicReleaseReady) {
    return [];
  }

  return [
    ...corePaths.map((path) => ({ url: absoluteSiteUrl(path) })),
    ...(areLegalDocumentsPublic
      ? legalPaths.map((path) => ({ url: absoluteSiteUrl(path) }))
      : []),
    ...(indexableKnowledgeArticles.length > 0
      ? [{ url: absoluteSiteUrl("/wiedza") }]
      : []),
    ...indexableKnowledgeArticles.map((article) => ({
      url: absoluteSiteUrl("/wiedza/" + article.slug),
      lastModified: new Date(`${article.updatedAt}T00:00:00.000Z`),
    })),
    ...indexableKnowledgeTopics.map((topic) => ({
      url: absoluteSiteUrl("/wiedza/tematy/" + topic.slug),
    })),
  ];
}
