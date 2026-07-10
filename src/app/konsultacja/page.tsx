import type { Metadata } from "next";
import { ComplianceNotice } from "@/components/ComplianceNotice";
import { CTAButton } from "@/components/CTAButton";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Konsultacja lekarska",
  description:
    "Informacje o stacjonarnej konsultacji lekarskiej w zakresie kwalifikacji do terapii kannabinoidowej w Warszawie.",
};

export default function ConsultationPage() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-5xl px-5 py-14 md:py-20">
        <h1 className="display-heading text-balance text-4xl font-semibold text-navy-950 md:text-5xl">
          Konsultacja lekarska
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          Konsultacja obejmuje rozmowę z lekarzem, osobiste badanie pacjenta
          oraz ocenę wskazań i przeciwwskazań medycznych do rozważanej terapii
          kannabinoidowej.
        </p>
        <ComplianceNotice className="mt-8" />
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-16">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {[
            [
              "Zakres konsultacji",
              "Lekarz omawia powód wizyty, dotychczasowe leczenie i dokumentację przedstawioną przez pacjenta podczas wizyty.",
            ],
            [
              "Ocena bezpieczeństwa",
              "Elementem konsultacji jest analiza przeciwwskazań, możliwych interakcji oraz ogólnego bezpieczeństwa postępowania.",
            ],
            [
              "Decyzja lekarza",
              "Lekarz może zalecić dalszą diagnostykę, zaproponować inne postępowanie albo odmówić wystawienia recepty.",
            ],
          ].map(([title, description]) => (
            <article
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
              key={title}
            >
              <h2 className="text-lg font-semibold text-navy-950">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16">
        <SectionHeading
          description="Strona nie zastępuje konsultacji lekarskiej i nie służy do prowadzenia dokumentacji medycznej."
          title="Co nie jest częścią strony"
        />
        <ul className="grid gap-4 text-sm leading-6 text-slate-700 md:grid-cols-2">
          <li className="rounded-lg border border-slate-200 bg-white p-5">
            Formularz nie służy do przekazywania informacji o stanie zdrowia.
          </li>
          <li className="rounded-lg border border-slate-200 bg-white p-5">
            Decyzja terapeutyczna nie zapada na podstawie samej rezerwacji.
          </li>
          <li className="rounded-lg border border-slate-200 bg-white p-5">
            Placówka nie prowadzi apteki i nie sprzedaje produktów leczniczych.
          </li>
          <li className="rounded-lg border border-slate-200 bg-white p-5">
            Dokumentacja medyczna jest prowadzona w zewnętrznym systemie EDM.
          </li>
        </ul>
        <CTAButton className="mt-8" href="/kontakt">
          Umów konsultację
        </CTAButton>
      </section>
    </div>
  );
}
