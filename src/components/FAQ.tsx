import { faqItems } from "@/lib/siteContent";

type FAQProps = {
  limit?: number;
};

export function FAQ({ limit }: FAQProps) {
  const items = typeof limit === "number" ? faqItems.slice(0, limit) : faqItems;

  return (
    <div className="divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200 bg-white">
      {items.map((item) => (
        <details className="group" key={item.question}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-navy-950 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-green">
            <span>{item.question}</span>
            <span
              aria-hidden="true"
              className="text-lg text-medical-green transition group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="px-5 pb-5 text-sm leading-6 text-slate-600">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
