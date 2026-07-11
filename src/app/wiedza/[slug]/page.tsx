import { notFound } from "next/navigation";
import { KnowledgeArticleLayout } from "@/components/KnowledgeArticleLayout";
import { getKnowledgeArticle, knowledgeArticles } from "@/lib/knowledge";
import { createArticleMetadata } from "@/lib/seo";

type KnowledgeArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return knowledgeArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: KnowledgeArticlePageProps) {
  const { slug } = await params;
  const article = getKnowledgeArticle(slug);

  if (!article) {
    return {};
  }

  return createArticleMetadata({
    title: article.title,
    description: article.description,
    path: "/wiedza/" + article.slug,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
  });
}

export default async function KnowledgeArticlePage({
  params,
}: KnowledgeArticlePageProps) {
  const { slug } = await params;
  const article = getKnowledgeArticle(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = knowledgeArticles.filter((candidate) =>
    article.relatedSlugs.includes(candidate.slug),
  );

  return (
    <KnowledgeArticleLayout
      article={article}
      relatedArticles={relatedArticles}
    />
  );
}
