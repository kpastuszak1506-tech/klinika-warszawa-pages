import { KnowledgeCard } from "@/components/KnowledgeCard";
import { SectionHeading } from "@/components/SectionHeading";
import {
  isDemoPreview,
  isPublicReleaseReady,
} from "@/config/companyConfig";
import { visibleKnowledgeArticles } from "@/lib/knowledge";
import { createPageMetadata } from "@/lib/seo";

const isKnowledgeHubIndexable =
  isPublicReleaseReady && visibleKnowledgeArticles.length > 0;

export const metadata = createPageMetadata({
  title: "Wiedza dla pacjenta",
  description:
    "Źródłowe materiały informacyjne o konsultacji, bezpieczeństwie i indywidualnej ocenie terapii kannabinoidowej.",
  path: "/wiedza",
  indexable: isKnowledgeHubIndexable,
});

export const dynamic = "force-static";

export default function KnowledgePage() {
  return (
    <div className="bg-white">
      <section className="knowledge-hero border-b border-slate-200 px-5 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">Wiedza dla pacjenta</p>
          <SectionHeading
            description="Wyjaśniamy, co pokazują badania, gdzie pozostaje niepewność i o co warto zapytać podczas konsultacji."
            headingLevel="h1"
            title="Rzetelna informacja przed konsultacją"
          />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <p className="eyebrow">Wszystkie materiały</p>
        {visibleKnowledgeArticles.length > 0 ? (
          <div className="knowledge-grid">
            {visibleKnowledgeArticles.map((article) => (
              <KnowledgeCard
                article={article}
                key={article.slug}
                preview={isDemoPreview}
              />
            ))}
          </div>
        ) : (
          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">
            Materiały dla pacjentów zostaną opublikowane przed uruchomieniem
            placówki.
          </p>
        )}
      </section>
    </div>
  );
}
