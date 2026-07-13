import { CTAButton } from "@/components/CTAButton";
import { SectionHeading } from "@/components/SectionHeading";
import { isPublicDataVerified } from "@/config/companyConfig";
import { patientPreparationItems } from "@/lib/siteContent";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Jak przebiega konsultacja i jak się przygotować",
  description:
    "Praktyczne informacje o przebiegu stacjonarnej konsultacji lekarskiej i przygotowaniu do wizyty.",
  path: "/jak-wyglada-wizyta",
});

const timeline = [
  [
    "Na początku",
    "Konsultacja odbywa się stacjonarnie w gabinecie. Jej przebieg zależy od sytuacji omawianej z lekarzem.",
  ],
  [
    "Rozmowa i informacje",
    "Lekarz rozmawia o powodzie wizyty, historii leczenia, lekach, suplementach, alergiach oraz pytaniach pacjenta. Analizuje też przedstawioną dokumentację.",
  ],
  [
    "Badanie i ocena",
    "Lekarz przeprowadza badanie w zakresie dostosowanym do sytuacji. Następnie odnosi zebrane informacje do możliwych korzyści, ryzyk i bezpieczeństwa postępowania.",
  ],
  [
    "Wynik i dalsze kroki",
    "Możliwa jest rekomendacja dalszego postępowania, brak rekomendacji terapii kannabinoidowej, ewentualna recepta tylko jeśli lekarz uzna ją za medycznie zasadną albo potrzeba innej diagnostyki lub konsultacji.",
  ],
  [
    "Po wizycie",
    "Lekarz przekazuje informacje i zalecenia odpowiednie do przebiegu konsultacji. Pierwsza wizyta służy ocenie sytuacji, a wizyta kontrolna dotyczy dalszego postępowania po wcześniejszej konsultacji.",
  ],
];

export default function VisitFlowPage() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-5xl px-5 py-14 md:py-20">
        <h1 className="display-heading text-balance text-4xl font-semibold text-navy-950 md:text-5xl">
          Jak przebiega konsultacja i jak się przygotować
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          Przygotowanie dokumentów i pytań ułatwia rozmowę w gabinecie.
        </p>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-16">
        <div className="mx-auto max-w-5xl">
          <SectionHeading title="Przebieg konsultacji" />
          <ol className="space-y-4">
            {timeline.map(([title, description], index) => (
              <li className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm" key={title}>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-medical-green">
                  Krok {index + 1}
                </p>
                <h2 className="mt-2 text-lg font-semibold text-navy-950">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16">
        <SectionHeading title="Pierwsza wizyta i kontrola" />
        <div className="grid gap-5 md:grid-cols-2">
          <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-navy-950">Pierwsza ocena</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Celem pierwszej wizyty jest zebranie informacji, osobiste badanie
              i ocena indywidualnej sytuacji.
            </p>
          </article>
          <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-navy-950">Kontrola dalszego postępowania</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Kontrola służy omówieniu dalszego postępowania po wcześniejszej
              konsultacji oraz zaleceń lekarza.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16">
        <SectionHeading
          description="Przynieś informacje, które lekarz może omówić z Tobą podczas wizyty."
          title="Co zabrać"
        />
        <ul className="grid gap-3 text-sm leading-6 text-slate-700 md:grid-cols-2">
          {patientPreparationItems.map((item) => (
            <li className="rounded-lg border border-slate-200 bg-white p-5" key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="border-t border-slate-200 px-5 py-16">
        <div className="mx-auto max-w-5xl">
          <SectionHeading title="Przekazywanie dokumentacji" />
          <p className="max-w-3xl text-sm leading-6 text-slate-700">
            Dokumentację można przekazać wyłącznie kanałem wskazanym przez placówkę.
            Praktyczne informacje o prawie do dokumentacji medycznej publikuje
            Rzecznik Praw Pacjenta na stronie{" "}
            <a
              className="font-semibold text-medical-green underline underline-offset-4"
              href="https://www.gov.pl/web/rpp/prawo-do-dokumentacji-medycznej"
            >
              Prawo do dokumentacji medycznej
            </a>
            .
          </p>
          <h2 className="mt-8 text-lg font-semibold text-navy-950">Czego nie wysyłać przez stronę</h2>
          <ul className="mt-3 max-w-3xl list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700">
            <li>Rozpoznań i opisu stanu zdrowia.</li>
            <li>Wyników badań i dokumentacji medycznej.</li>
            <li>Listy leków, suplementów ani alergii.</li>
          </ul>
          <CTAButton className="mt-8" href={isPublicDataVerified ? "/kontakt" : "/konsultacja"}>
            {isPublicDataVerified ? "Kontakt w sprawie terminu" : "Zakres konsultacji"}
          </CTAButton>
        </div>
      </section>
    </div>
  );
}
