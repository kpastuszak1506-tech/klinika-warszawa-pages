import Link from "next/link";
import { isPublicKnowledgeArticle, type KnowledgeArticle } from "@/lib/knowledge";

type KnowledgeCardProps = {
  article: KnowledgeArticle;
  preview?: boolean;
};

export function KnowledgeCard({ article, preview = false }: KnowledgeCardProps) {
  if (!preview && !isPublicKnowledgeArticle(article)) {
    return null;
  }

  return (
    <article className="knowledge-card">
      <div className="knowledge-card__meta">
        <span>Wiedza dla pacjenta</span>
        <span aria-hidden="true" className="knowledge-card__dot" />
        <span>{article.readingTime}</span>
      </div>
      <h3 className="display-heading knowledge-card__title">
        <Link href={`/wiedza/${article.slug}`}>{article.title}</Link>
      </h3>
      <p className="knowledge-card__excerpt">{article.excerpt}</p>
      <div className="knowledge-card__footer">
        <span className="knowledge-card__status">Do przeczytania przed wizytą</span>
        <Link className="knowledge-card__link" href={`/wiedza/${article.slug}`}>
          Czytaj artykuł
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
