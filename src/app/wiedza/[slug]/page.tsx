import { notFound } from "next/navigation";
import { KnowledgeArticleLayout } from "@/components/KnowledgeArticleLayout";
import { isLocalDemoPreview } from "@/config/companyConfig";
import {
  getVisibleKnowledgeArticle,
  isIndexableKnowledgeArticle,
  visibleKnowledgeArticles,
} from "@/lib/knowledge";
import { createArticleMetadata } from "@/lib/seo";

type KnowledgeArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;
export const dynamic = "force-static";

const unavailableArticleSlug = "__unpublished-article__";

export function generateStaticParams() {
  return visibleKnowledgeArticles.length > 0
    ? visibleKnowledgeArticles.map((article) => ({ slug: article.slug }))
    : [{ slug: unavailableArticleSlug }];
}

export async function generateMetadata({ params }: KnowledgeArticlePageProps) {
  const { slug } = await params;
  const article = getVisibleKnowledgeArticle(slug);

  if (!article) {
    return {};
  }

  return createArticleMetadata({
    title: article.title,
    description: article.description,
    path: "/wiedza/" + article.slug,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
    indexable: isLocalDemoPreview ? false : isIndexableKnowledgeArticle(article),
  });
}

export default async function KnowledgeArticlePage({
  params,
}: KnowledgeArticlePageProps) {
  const { slug } = await params;
  const article = getVisibleKnowledgeArticle(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = visibleKnowledgeArticles.filter((candidate) =>
    article.relatedSlugs.includes(candidate.slug),
  );

  return (
    <KnowledgeArticleLayout
      article={article}
      relatedArticles={relatedArticles}
    />
  );
}
