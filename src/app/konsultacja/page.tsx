import { CTAButton } from "@/components/CTAButton";
import { ComplianceNotice } from "@/components/ComplianceNotice";
import { SectionHeading } from "@/components/SectionHeading";
import { isPublicDataVerified } from "@/config/companyConfig";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Konsultacja lekarska",
  description:
    "Informacje o stacjonarnej konsultacji lekarskiej w zakresie kwalifikacji do terapii kannabinoidowej w Warszawie.",
  path: "/konsultacja",
});

const firstConsultationScope = [
  [
    "Rozmowa i wywiad",
    "Lekarz pyta o powód konsultacji, dotychczasowe leczenie i informacje ważne dla Twojej sytuacji.",
  ],
  [
    "Badanie i dokumentacja",
    "Lekarz zapoznaje się z dokumentacją przedstawioną podczas wizyty i przeprowadza badanie w zakresie dostosowanym do sytuacji.",
  ],
  [
    "Omówienie",
    "Na koniec jest czas na pytania oraz wyjaśnienie informacji istotnych dla dalszego postępowania.",
  ],
];

export default function ConsultationPage() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-5xl px-5 py-14 md:py-20">
        <h1 className="display-heading text-balance text-4xl font-semibold text-navy-950 md:text-5xl">
          Konsultacja lekarska
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          To stacjonarna konsultacja, podczas której lekarz osobiście bada
          pacjenta i ocenia zasadność oraz bezpieczeństwo terapii
          kannabinoidowej w jego indywidualnej sytuacji.
        </p>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-16">
        <div className="mx-auto max-w-5xl">
          <SectionHeading title="Zakres pierwszej konsultacji" />
          <div className="grid gap-6 md:grid-cols-3">
            {firstConsultationScope.map(([title, description]) => (
              <article
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
                key={title}
              >
                <h2 className="text-lg font-semibold text-navy-950">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16">
        <SectionHeading title="Co lekarz ocenia" />
        <ul className="grid gap-4 text-sm leading-6 text-slate-700 md:grid-cols-2">
          <li className="rounded-lg border border-slate-200 bg-white p-5">
            Informacje z rozmowy, wywiadu i dokumentacji medycznej.
          </li>
          <li className="rounded-lg border border-slate-200 bg-white p-5">
            Możliwe korzyści, ryzyka i bezpieczeństwo rozważanego postępowania.
          </li>
          <li className="rounded-lg border border-slate-200 bg-white p-5">
            Leki, suplementy, alergie i inne informacje mogące mieć znaczenie.
          </li>
          <li className="rounded-lg border border-slate-200 bg-white p-5">
            Czy w danej sytuacji potrzebna jest inna konsultacja lub diagnostyka.
          </li>
        </ul>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-16">
        <div className="mx-auto max-w-5xl">
          <SectionHeading title="Możliwe wyniki konsultacji" />
          <ul className="grid max-w-3xl gap-3 text-sm leading-6 text-slate-700 md:grid-cols-2">
            <li className="rounded-lg border border-slate-200 bg-white p-5">
              Rekomendacja dalszego postępowania.
            </li>
            <li className="rounded-lg border border-slate-200 bg-white p-5">
              Brak rekomendacji terapii kannabinoidowej.
            </li>
            <li className="rounded-lg border border-slate-200 bg-white p-5">
              Ewentualna recepta, tylko jeśli lekarz uzna ją za medycznie zasadną.
            </li>
            <li className="rounded-lg border border-slate-200 bg-white p-5">
              Potrzeba innej diagnostyki lub konsultacji.
            </li>
          </ul>
          <ComplianceNotice compact className="mt-6 max-w-3xl" />
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-12 px-5 py-16 md:grid-cols-2">
        <div>
          <SectionHeading title="Wizyta kontrolna" />
          <p className="text-sm leading-6 text-slate-700">
            Jej zakres zależy od zaleceń lekarza i sytuacji pacjenta. Może
            obejmować omówienie zmian od poprzedniej wizyty oraz dalszych kroków.
          </p>
        </div>
        <div>
          <SectionHeading title="Dokumentacja i zalecenia" />
          <p className="text-sm leading-6 text-slate-700">
            Dokumentację warto przynieść na wizytę. Po konsultacji lekarz
            przekazuje informacje i zalecenia odpowiednie do jej przebiegu.
          </p>
        </div>
      </section>

      <section className="border-t border-slate-200 px-5 py-16">
        <div className="mx-auto max-w-5xl">
          <SectionHeading title="Krótkie pytania" />
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-lg border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-700">
              <h2 className="font-semibold text-navy-950">Czy trzeba mieć dokumentację?</h2>
              <p className="mt-2">Jeśli ją masz i chcesz ją omówić, przynieś ją do gabinetu.</p>
            </article>
            <article className="rounded-lg border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-700">
              <h2 className="font-semibold text-navy-950">Czym różni się pierwsza wizyta od kontrolnej?</h2>
              <p className="mt-2">Pierwsza wizyta służy ocenie sytuacji, a kontrolna dotyczy dalszego postępowania po wcześniejszej konsultacji.</p>
            </article>
          </div>
          <CTAButton className="mt-8" href={isPublicDataVerified ? "/kontakt" : "/jak-wyglada-wizyta"}>
            {isPublicDataVerified ? "Kontakt w sprawie terminu" : "Jak przebiega konsultacja"}
          </CTAButton>
        </div>
      </section>
    </div>
  );
}
