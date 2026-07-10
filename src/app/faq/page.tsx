import type { Metadata } from "next";
import { FAQ } from "@/components/FAQ";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Odpowiedzi na najczęstsze pytania dotyczące stacjonarnych konsultacji lekarskich.",
};

export default function FAQPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-14 md:py-20">
      <SectionHeading
        description="Odpowiedzi mają charakter organizacyjny i informacyjny. Indywidualne decyzje medyczne zapadają podczas wizyty."
        title="Najczęstsze pytania"
      />
      <FAQ />
    </section>
  );
}
