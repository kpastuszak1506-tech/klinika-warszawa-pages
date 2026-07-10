import type { Metadata } from "next";
import { ComplianceNotice } from "@/components/ComplianceNotice";
import { CTAButton } from "@/components/CTAButton";
import { ProcessSteps } from "@/components/ProcessSteps";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Jak wygląda wizyta",
  description:
    "Opis przebiegu stacjonarnej wizyty lekarskiej w gabinecie w Warszawie.",
};

export default function VisitFlowPage() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-5xl px-5 py-14 md:py-20">
        <h1 className="display-heading text-balance text-4xl font-semibold text-navy-950 md:text-5xl">
          Jak wygląda wizyta
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          Wizyta odbywa się stacjonarnie w gabinecie. Pacjent omawia z lekarzem
          wskazania, przeciwwskazania i możliwe dalsze postępowanie.
        </p>
        <ComplianceNotice className="mt-8" />
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            align="center"
            description="Rezerwacja jest etapem organizacyjnym. Ocena medyczna odbywa się podczas konsultacji."
            title="Proces wizyty"
          />
          <ProcessSteps />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16">
        <SectionHeading
          description="Dla bezpieczeństwa pacjenta dokumentacja i informacje zdrowotne powinny być omawiane właściwym kanałem."
          title="Przed wizytą"
        />
        <div className="grid gap-5 md:grid-cols-2">
          <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-navy-950">
              Co można przygotować
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Warto zabrać dokument tożsamości oraz posiadaną dokumentację
              medyczną, jeżeli pacjent chce omówić ją z lekarzem podczas
              wizyty.
            </p>
          </article>
          <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-navy-950">
              Czego nie wysyłać formularzem
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Formularz kontaktowy nie służy do przekazywania danych medycznych,
              wyników badań ani informacji o leczeniu.
            </p>
          </article>
        </div>
        <CTAButton className="mt-8" href="/kontakt">
          Skontaktuj się w sprawie terminu
        </CTAButton>
      </section>
    </div>
  );
}
