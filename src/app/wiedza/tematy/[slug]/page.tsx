import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ComplianceNotice } from "@/components/ComplianceNotice";
import { KnowledgeCard } from "@/components/KnowledgeCard";
import { isPublicReleaseReady } from "@/config/companyConfig";
import {
  getArticlesForTopic,
  getKnowledgeTopic,
  knowledgeTopics,
} from "@/lib/knowledge";
import { createPageMetadata } from "@/lib/seo";

type KnowledgeTopicPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;
export const dynamic = "force-static";

export function generateStaticParams() {
  return knowledgeTopics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: KnowledgeTopicPageProps) {
  const { slug } = await params;
  const topic = getKnowledgeTopic(slug);

  if (!topic) {
    return {};
  }

  const articles = getArticlesForTopic(topic);
  const isTopicIndexable =
    isPublicReleaseReady &&
    articles.length > 0 &&
    articles.every((article) => article.reviewStatus === "reviewed");

  return createPageMetadata({
    title: topic.label,
    description: topic.description,
    path: "/wiedza/tematy/" + topic.slug,
    indexable: isTopicIndexable,
  });
}

export default async function KnowledgeTopicPage({ params }: KnowledgeTopicPageProps) {
  const { slug } = await params;
  const topic = getKnowledgeTopic(slug);

  if (!topic) {
    notFound();
  }

  const articles = getArticlesForTopic(topic);

  return (
    <div className="bg-white">
      <section className="knowledge-hero border-b border-slate-200 px-5 pb-14 pt-14 md:pb-20 md:pt-20">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs
            items={[
              { label: "Strona główna", href: "/" },
              { label: "Wiedza", href: "/wiedza" },
              { label: topic.label },
            ]}
          />
          <p className="eyebrow mt-8">Temat wiedzy</p>
          <h1 className="display-heading max-w-3xl text-4xl font-semibold leading-tight text-navy-950 md:text-6xl">
            {topic.label}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            {topic.description}
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="grid gap-5 md:grid-cols-2">
          {articles.map((article) => (
            <KnowledgeCard article={article} key={article.slug} />
          ))}
        </div>
        <ComplianceNotice className="mt-12 max-w-3xl" />
      </section>
    </div>
  );
}
