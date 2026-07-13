import type { MetadataRoute } from "next";
import { isPublicReleaseReady } from "@/config/companyConfig";
import { knowledgeArticles, knowledgeTopics } from "@/lib/knowledge";
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

const reviewedKnowledgeArticles = knowledgeArticles.filter(
  (article) => article.reviewStatus === "reviewed",
);
const reviewedArticleSlugs = new Set(
  reviewedKnowledgeArticles.map((article) => article.slug),
);
const indexableKnowledgeTopics = knowledgeTopics.filter(
  (topic) =>
    topic.articleSlugs.length > 0 &&
    topic.articleSlugs.every((slug) => reviewedArticleSlugs.has(slug)),
);
const isKnowledgeHubIndexable =
  reviewedKnowledgeArticles.length === knowledgeArticles.length;

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isPublicReleaseReady) {
    return [];
  }

  return [
    ...publicPaths.map((path) => ({ url: absoluteSiteUrl(path) })),
    ...(isKnowledgeHubIndexable ? [{ url: absoluteSiteUrl("/wiedza") }] : []),
    ...reviewedKnowledgeArticles.map((article) => ({
      url: absoluteSiteUrl("/wiedza/" + article.slug),
      lastModified: new Date(`${article.updatedAt}T00:00:00.000Z`),
    })),
    ...indexableKnowledgeTopics.map((topic) => ({
      url: absoluteSiteUrl("/wiedza/tematy/" + topic.slug),
    })),
  ];
}
