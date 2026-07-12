import { KnowledgeCard } from "@/components/KnowledgeCard";
import { KnowledgeTopicCard } from "@/components/KnowledgeTopicCard";
import { SectionHeading } from "@/components/SectionHeading";
import { knowledgeArticles, knowledgeTopics } from "@/lib/knowledge";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Wiedza dla pacjenta",
  description:
    "Źródłowe materiały informacyjne o konsultacji, bezpieczeństwie i indywidualnej ocenie terapii kannabinoidowej.",
  path: "/wiedza",
});

export default function KnowledgePage() {
  return (
    <div className="bg-white">
      <section className="knowledge-hero border-b border-slate-200 px-5 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">Wiedza dla pacjenta</p>
          <SectionHeading
            description="Materiały porządkują pytania organizacyjne i naukowe. Każdy temat wymaga merytorycznej weryfikacji przed uruchomieniem indeksowania."
            headingLevel="h1"
            title="Źródłowa informacja przed konsultacją"
          />
        </div>
      </section>
      <section className="section-wash border-b border-slate-200 px-5 py-14 md:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">Poruszaj się po tematach</p>
          <div className="grid gap-5 lg:grid-cols-3">
            {knowledgeTopics.map((topic) => (
              <KnowledgeTopicCard key={topic.slug} topic={topic} />
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <p className="eyebrow">Wszystkie materiały</p>
        <div className="grid gap-5 md:grid-cols-2">
          {knowledgeArticles.map((article) => (
            <KnowledgeCard article={article} key={article.slug} />
          ))}
        </div>
      </section>
    </div>
  );
}
