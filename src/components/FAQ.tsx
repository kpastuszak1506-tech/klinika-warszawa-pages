import { faqItems } from "@/lib/siteContent";

type FAQProps = {
  limit?: number;
};

export function FAQ({ limit }: FAQProps) {
  const items = typeof limit === "number" ? faqItems.slice(0, limit) : faqItems;

  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <details className="faq-item" key={item.question}>
          <summary className="faq-question">
            <span className="faq-question__index">0{index + 1}</span>
            <span className="faq-question__label">{item.question}</span>
            <span aria-hidden="true" className="faq-question__icon">
              +
            </span>
          </summary>
          <div className="faq-answer">
            <div className="faq-answer__inner">{item.answer}</div>
          </div>
        </details>
      ))}
    </div>
  );
}
