import { companyConfig } from "@/config/companyConfig";
import {
  getKnowledgeTopic,
  isIndexableKnowledgeArticle,
  isPublicKnowledgeArticle,
  isPublicKnowledgeTopic,
  type KnowledgeArticle,
  type KnowledgeTopic,
} from "@/lib/knowledge";
import { absoluteSiteUrl } from "@/lib/seo";
import { Breadcrumbs } from "./Breadcrumbs";
import { KnowledgeCard } from "./KnowledgeCard";

type KnowledgeArticleLayoutProps = {
  article: KnowledgeArticle;
  relatedArticles: KnowledgeArticle[];
};

function formatKnowledgeDate(date: string) {
  return new Intl.DateTimeFormat("pl-PL", {
    dateStyle: "long",
  }).format(new Date(date + "T12:00:00"));
}

function TableOfContents({ article }: { article: KnowledgeArticle }) {
  return (
    <nav aria-label="Spis treści artykułu" className="knowledge-article__toc">
      <ol>
        {article.sections.map((section, index) => (
          <li key={`${section.heading}-${index}`}>
            <a href={`#section-${index + 1}`}>
              <span aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              {section.heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function SourceReferences({
  article,
  citationIds,
}: {
  article: KnowledgeArticle;
  citationIds?: string[];
}) {
  const sourceNumbers = new Map(
    article.sources.map((source, index) => [source.id, index + 1]),
  );
  const references = [...new Set(citationIds ?? [])].filter((citationId) =>
    sourceNumbers.has(citationId),
  );

  if (references.length === 0) {
    return null;
  }

  return (
    <span aria-label="Źródła tego akapitu" className="knowledge-article__references">
      {references.map((citationId) => {
        const sourceNumber = sourceNumbers.get(citationId);
        const source = article.sources.find((item) => item.id === citationId);

        if (!sourceNumber || !source) {
          return null;
        }

        return (
          <a
            aria-label={`Źródło ${sourceNumber}: ${source.title}`}
            href={`#source-${source.id}`}
            key={source.id}
            title={source.title}
          >
            [{sourceNumber}]
          </a>
        );
      })}
    </span>
  );
}

function Sources({ article }: { article: KnowledgeArticle }) {
  return (
    <section
      aria-labelledby="knowledge-article-sources"
      className="knowledge-article__sources"
    >
      <h2 id="knowledge-article-sources">Bibliografia</h2>
      <ol>
        {article.sources.map((source, index) => {
          const sourceNumber = index + 1;

          return (
            <li id={`source-${source.id}`} key={source.id}>
              <span aria-hidden="true" className="knowledge-article__source-number">
                [{sourceNumber}]
              </span>
              <a
                aria-label={`[${sourceNumber}] ${source.title} (otwiera się w nowej karcie)`}
                className="knowledge-article__source-link"
                href={source.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                <cite>{source.title}</cite>
                <span aria-hidden="true">↗</span>
                <span className="sr-only"> (otwiera się w nowej karcie)</span>
              </a>
              <span className="knowledge-article__source-meta">
                {source.publisher}
                {source.publicationDate ? (
                  <>
                    <span aria-hidden="true"> · </span>
                    <time dateTime={source.publicationDate}>
                      {formatKnowledgeDate(source.publicationDate)}
                    </time>
                  </>
                ) : null}
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export function KnowledgeArticleLayout({
  article,
  relatedArticles,
}: KnowledgeArticleLayoutProps) {
  const isPublicArticle = isPublicKnowledgeArticle(article);
  const canPublishArticleSchema = isIndexableKnowledgeArticle(article);
  const articleUrl = absoluteSiteUrl("/wiedza/" + article.slug);
  const articleTopics = article.topics
    .map((topicSlug) => getKnowledgeTopic(topicSlug))
    .filter(
      (topic): topic is KnowledgeTopic =>
        topic !== undefined && isPublicKnowledgeTopic(topic),
    );
  const websiteUrl = absoluteSiteUrl("/");
  const organizationId = `${websiteUrl}#organization`;
  const medicalWebPageId = `${articleUrl}#medical-webpage`;
  const articleSchema =
    canPublishArticleSchema &&
    article.authorName &&
    article.medicalReviewer &&
    article.reviewedAt
      ? {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": organizationId,
              name: companyConfig.companyName,
              url: websiteUrl,
            },
            {
              "@type": "MedicalWebPage",
              "@id": medicalWebPageId,
              url: articleUrl,
              name: article.title,
              description: article.description,
              inLanguage: "pl-PL",
              mainEntity: {
                "@id": `${articleUrl}#article`,
              },
            },
            {
              "@type": "Article",
              "@id": `${articleUrl}#article`,
              headline: article.title,
              description: article.description,
              datePublished: article.publishedAt,
              dateModified: article.updatedAt,
              inLanguage: "pl-PL",
              mainEntityOfPage: {
                "@id": medicalWebPageId,
              },
              author: {
                "@type": "Person",
                name: article.authorName,
              },
              reviewedBy: {
                "@type": "Person",
                name: article.medicalReviewer.name,
                jobTitle: article.medicalReviewer.role,
                hasCredential: article.medicalReviewer.qualifications,
                ...(article.medicalReviewer.professionalId
                  ? { identifier: article.medicalReviewer.professionalId }
                  : {}),
              },
              dateReviewed: article.reviewedAt,
              publisher: {
                "@id": organizationId,
              },
            },
          ],
        }
      : null;

  return (
    <>
      {articleSchema ? (
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
          }}
          type="application/ld+json"
        />
      ) : null}

      <article className="knowledge-article">
        <header className="knowledge-article__hero">
          <div className="knowledge-article__hero-inner">
            <Breadcrumbs
              items={[
                { label: "Strona główna", href: "/" },
                { label: "Wiedza", href: "/wiedza" },
                { label: article.title },
              ]}
            />
            <p className="knowledge-article__eyebrow">Materiał informacyjny</p>
            <h1>{article.title}</h1>
            <p className="knowledge-article__lead">{article.description}</p>

            {isPublicArticle ? (
              <dl className="knowledge-article__metadata">
                <div>
                  <dt>Autor</dt>
                  <dd>{article.authorName}</dd>
                </div>
                <div>
                  <dt>Weryfikacja merytoryczna</dt>
                  <dd>
                    {article.medicalReviewer?.name}, {article.medicalReviewer?.role}
                  </dd>
                </div>
                <div>
                  <dt>Kwalifikacje</dt>
                  <dd>{article.medicalReviewer?.qualifications}</dd>
                </div>
                <div>
                  <dt>Aktualizacja</dt>
                  <dd>
                    <time dateTime={article.updatedAt}>
                      {formatKnowledgeDate(article.updatedAt)}
                    </time>
                  </dd>
                </div>
                <div>
                  <dt>Weryfikacja</dt>
                  <dd>
                    <time dateTime={article.reviewedAt}>
                      {formatKnowledgeDate(article.reviewedAt ?? "")}
                    </time>
                  </dd>
                </div>
                {article.nextReviewAt ? (
                  <div>
                    <dt>Następna weryfikacja</dt>
                    <dd>
                      <time dateTime={article.nextReviewAt}>
                        {formatKnowledgeDate(article.nextReviewAt)}
                      </time>
                    </dd>
                  </div>
                ) : null}
                {article.readingTime ? (
                  <div>
                    <dt>Czas czytania</dt>
                    <dd>{article.readingTime}</dd>
                  </div>
                ) : null}
                <div>
                  <dt>Liczba źródeł</dt>
                  <dd>{article.sources.length}</dd>
                </div>
              </dl>
            ) : null}

            {articleTopics.length > 0 ? (
              <nav aria-label="Tematy artykułu" className="knowledge-article__topics">
                {articleTopics.map((topic) => (
                  <a href={`/wiedza/tematy/${topic.slug}`} key={topic.slug}>
                    {topic.label}
                  </a>
                ))}
              </nav>
            ) : null}
          </div>
        </header>

        <div className="knowledge-article__body">
          <section
            aria-labelledby="knowledge-article-summary"
            className="knowledge-article__summary"
          >
            <p className="knowledge-article__summary-kicker">Najważniejsze informacje</p>
            <h2 id="knowledge-article-summary">W skrócie</h2>
            <ul>
              {article.keyPoints.slice(0, 3).map((keyPoint, index) => (
                <li key={`${keyPoint}-${index}`}>
                  <span aria-hidden="true">{index + 1}</span>
                  <p>{keyPoint}</p>
                </li>
              ))}
            </ul>
          </section>

          <details className="knowledge-article__mobile-toc">
            <summary>
              <span>Spis treści</span>
              <span aria-hidden="true">+</span>
            </summary>
            <TableOfContents article={article} />
          </details>

          <div className="knowledge-article__layout">
            <div className="knowledge-article__prose">
              {article.sections.map((section, sectionIndex) => (
                <section
                  className={`knowledge-article__section knowledge-article__section--${section.kind ?? "overview"}`}
                  id={`section-${sectionIndex + 1}`}
                  key={`${section.heading}-${sectionIndex}`}
                >
                  <div className="knowledge-article__section-heading">
                    <span aria-hidden="true">
                      {String(sectionIndex + 1).padStart(2, "0")}
                    </span>
                    <h2>{section.heading}</h2>
                  </div>

                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={`${paragraph.text}-${paragraphIndex}`}>
                      {paragraph.text}
                      <SourceReferences
                        article={article}
                        citationIds={paragraph.citationIds}
                      />
                    </p>
                  ))}

                  {section.bullets ? (
                    <ul className="knowledge-article__list">
                      {section.bullets.map((item, itemIndex) => (
                        <li key={`${item}-${itemIndex}`}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              <footer className="knowledge-article__editorial-note">
                <p>
                  <strong>Nota redakcyjna.</strong> Materiał ma charakter edukacyjny i
                  nie zastępuje konsultacji lekarskiej. Decyzję dotyczącą postępowania
                  podejmuje lekarz po osobistym badaniu pacjenta.
                </p>
              </footer>
            </div>

            <aside aria-label="Nawigacja i źródła artykułu" className="knowledge-article__rail">
              <div className="knowledge-article__desktop-toc">
                <p className="knowledge-article__rail-label">W tym materiale</p>
                <TableOfContents article={article} />
              </div>
              <Sources article={article} />
            </aside>
          </div>
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
