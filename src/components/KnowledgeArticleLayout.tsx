import { companyConfig, isPublicReleaseReady } from "@/config/companyConfig";
import { getKnowledgeTopic, type KnowledgeArticle } from "@/lib/knowledge";
import { absoluteSiteUrl } from "@/lib/seo";
import { Breadcrumbs } from "./Breadcrumbs";
import { ComplianceNotice } from "./ComplianceNotice";
import { KnowledgeCard } from "./KnowledgeCard";

type KnowledgeArticleLayoutProps = {
  article: KnowledgeArticle;
  relatedArticles: KnowledgeArticle[];
};

export function KnowledgeArticleLayout({
  article,
  relatedArticles,
}: KnowledgeArticleLayoutProps) {
  const canPublishArticleSchema =
    isPublicReleaseReady && article.reviewStatus === "reviewed";
  const articleUrl = absoluteSiteUrl("/wiedza/" + article.slug);
  const articleTopics = article.topics
    .map((topicSlug) => getKnowledgeTopic(topicSlug))
    .filter((topic) => topic !== undefined);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: articleUrl,
    author: {
      "@type": "Organization",
      name: companyConfig.companyName,
    },
    publisher: {
      "@type": "Organization",
      name: companyConfig.companyName,
    },
  };

  return (
    <>
      {canPublishArticleSchema ? (
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
          }}
          type="application/ld+json"
        />
      ) : null}
      <article className="bg-white">
        <header className="knowledge-hero border-b border-slate-200 px-5 pb-14 pt-14 md:pb-20 md:pt-20">
          <div className="mx-auto max-w-5xl">
            <Breadcrumbs
              items={[
                { label: "Strona główna", href: "/" },
                { label: "Wiedza", href: "/wiedza" },
                { label: article.title },
              ]}
            />
            <p className="eyebrow mt-8">Materiały informacyjne</p>
            <h1 className="display-heading max-w-4xl text-balance text-4xl font-semibold leading-tight text-navy-950 md:text-6xl">
              {article.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              {article.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-y border-slate-200 py-4 text-sm text-slate-600">
              <time dateTime={article.updatedAt}>
                Aktualizacja:{" "}
                {new Intl.DateTimeFormat("pl-PL", {
                  dateStyle: "long",
                }).format(new Date(article.updatedAt + "T12:00:00"))}
              </time>
              <span>{article.readingTime}</span>
            </div>
            {articleTopics.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {articleTopics.map((topic) => (
                  <a
                    className="rounded-full border border-medical-green/25 bg-white px-3 py-1 text-xs font-semibold text-medical-green transition hover:border-medical-green hover:text-medical-green-dark"
                    href={"/wiedza/tematy/" + topic.slug}
                    key={topic.slug}
                  >
                    {topic.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </header>

        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 lg:grid-cols-[minmax(0,1fr)_290px] lg:py-20">
          <div className="knowledge-prose min-w-0">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
            <ComplianceNotice className="mt-10" />
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <section className="border-l-2 border-medical-green bg-medical-green-soft p-5 text-sm leading-6 text-navy-900">
              <p className="font-semibold">Status merytoryczny</p>
              <p className="mt-2">
                Materiał przygotowany do weryfikacji merytorycznej przed
                uruchomieniem indeksowania. Nie stanowi porady lekarskiej.
              </p>
            </section>
            <section aria-labelledby="article-sources" className="border-t border-slate-200 pt-5">
              <h2 className="text-sm font-semibold text-navy-950" id="article-sources">
                Źródła
              </h2>
              <ol className="mt-4 space-y-4 text-sm leading-6 text-slate-600">
                {article.sources.map((source) => {
                  const isInternal = source.href.startsWith("/");

                  return (
                    <li key={source.href}>
                      <a
                        className="font-semibold text-medical-green underline underline-offset-2 hover:text-medical-green-dark"
                        href={source.href}
                        rel={isInternal ? undefined : "noreferrer"}
                        target={isInternal ? undefined : "_blank"}
                      >
                        {source.title}
                      </a>
                      <span className="block text-xs text-slate-500">
                        {source.publisher}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </section>
          </aside>
        </div>
      </article>

      {relatedArticles.length > 0 ? (
        <section className="section-wash border-t border-slate-200 px-5 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="eyebrow">Czytaj dalej</p>
            <h2 className="display-heading text-3xl font-semibold text-navy-950">
              Powiązane materiały
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {relatedArticles.map((relatedArticle) => (
                <KnowledgeCard article={relatedArticle} key={relatedArticle.slug} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
