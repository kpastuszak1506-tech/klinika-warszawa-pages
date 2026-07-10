import { CTAButton } from "@/components/CTAButton";
import { RiskNotice } from "@/components/RiskNotice";
import { SectionHeading } from "@/components/SectionHeading";
import { createPageMetadata } from "@/lib/seo";
import { noMedicalFormFields, patientPreparationItems } from "@/lib/siteContent";

export const metadata = createPageMetadata({
  title: "Informacja dla pacjenta",
  description:
    "Informacje organizacyjne przed stacjonarną konsultacją lekarską w Warszawie.",
  path: "/informacja-dla-pacjenta",
});

export default function PatientInfoPage() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-5xl px-5 py-14 md:py-20">
        <h1 className="display-heading text-balance text-4xl font-semibold text-navy-950 md:text-5xl">
          Informacja dla pacjenta przed wizytą
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          Poniższe informacje pomagają przygotować się organizacyjnie do wizyty
          stacjonarnej. Nie zastępują rozmowy ani badania lekarskiego.
        </p>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading title="Co zabrać" />
            <ul className="space-y-3">
              {patientPreparationItems.map((item) => (
                <li
                  className="rounded-lg border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-700 shadow-sm"
                  key={item}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading title="Czego nie przekazywać przez stronę" />
            <ul className="space-y-3">
              {noMedicalFormFields.map((item) => (
                <li
                  className="rounded-lg border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-700 shadow-sm"
                  key={item}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16">
        <RiskNotice title="Kanały przekazywania informacji medycznych">
          <p>
            Informacje medyczne powinny być omawiane podczas wizyty z lekarzem
            albo przekazywane przez zabezpieczony system dokumentacji medycznej,
            jeżeli taki kanał zostanie wskazany pacjentowi.
          </p>
        </RiskNotice>
        <CTAButton className="mt-8" href="/kontakt">
          Skontaktuj się w sprawie terminu
        </CTAButton>
      </section>
    </div>
  );
}
