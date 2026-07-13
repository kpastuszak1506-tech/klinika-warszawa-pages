import { FAQ } from "@/components/FAQ";
import { SectionHeading } from "@/components/SectionHeading";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "FAQ",
  description:
    "Odpowiedzi na praktyczne pytania o stacjonarną konsultację lekarską.",
  path: "/faq",
});

export default function FAQPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-14 md:py-20">
      <SectionHeading
        description="Krótkie odpowiedzi o przebiegu konsultacji, przygotowaniu i bezpiecznym kontakcie organizacyjnym."
        headingLevel="h1"
        title="Najczęstsze pytania"
      />
      <FAQ />
    </section>
  );
}
