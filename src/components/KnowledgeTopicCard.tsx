import Link from "next/link";
import type { KnowledgeTopic } from "@/lib/knowledge";

type KnowledgeTopicCardProps = {
  topic: KnowledgeTopic;
};

export function KnowledgeTopicCard({ topic }: KnowledgeTopicCardProps) {
  return (
    <article className="border border-slate-200 bg-white p-6 transition hover:border-medical-green/50 hover:shadow-[0_18px_48px_rgba(15,39,72,0.08)]">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-medical-green">
        Temat
      </p>
      <h2 className="display-heading mt-3 text-2xl font-semibold text-navy-950">
        <Link
          className="rounded-sm hover:text-medical-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-medical-green"
          href={"/wiedza/tematy/" + topic.slug}
        >
          {topic.label}
        </Link>
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{topic.description}</p>
      <p className="mt-5 text-xs font-semibold text-slate-500">
        {topic.articleSlugs.length} materiały
      </p>
    </article>
  );
}
