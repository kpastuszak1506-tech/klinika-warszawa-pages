import Link from "next/link";
import type { KnowledgeArticle } from "@/lib/knowledge";

type KnowledgeCardProps = {
  article: KnowledgeArticle;
};

export function KnowledgeCard({ article }: KnowledgeCardProps) {
  return (
    <article className="flex h-full flex-col border-t-2 border-medical-green bg-white p-6 shadow-[0_20px_60px_rgba(15,39,72,0.08)]">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-medical-green">
        Wiedza dla pacjenta
      </p>
      <h3 className="display-heading mt-4 text-2xl font-semibold leading-tight text-navy-950">
        <Link
          className="rounded-sm transition hover:text-medical-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-medical-green"
          href={"/wiedza/" + article.slug}
        >
          {article.title}
        </Link>
      </h3>
      <p className="mt-4 text-sm leading-6 text-slate-600">{article.excerpt}</p>
      <div className="mt-auto flex items-center justify-between gap-4 pt-6 text-xs font-semibold text-slate-500">
        <span>{article.readingTime}</span>
        <Link
          className="text-medical-green transition hover:text-medical-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-green"
          href={"/wiedza/" + article.slug}
        >
          Czytaj artykuł →
        </Link>
      </div>
    </article>
  );
}
