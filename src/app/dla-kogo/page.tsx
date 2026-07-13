import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Dla kogo jest konsultacja",
  description:
    "Neutralne informacje o sytuacjach, które można omówić z lekarzem podczas stacjonarnej konsultacji.",
  path: "/dla-kogo",
});

const situations = [
  [
    "Przewlekły problem zdrowotny",
    "Pozostajesz pod opieką lekarza i chcesz omówić swoją sytuację, dotychczasowe postępowanie oraz dokumentację.",
  ],
  [
    "Brak poprawy lub trudne działania niepożądane",
    "Dotychczasowe postępowanie nie przynosi oczekiwanej poprawy albo wiążą się z nim trudne działania niepożądane. Możesz omówić to z lekarzem.",
  ],
  [
    "Pytania o korzyści, ryzyko i bezpieczeństwo",
    "Chcesz omówić z lekarzem możliwe korzyści, ryzyko i bezpieczeństwo rozważanego postępowania.",
  ],
  [
    "Wizyta kontrolna",
    "Chcesz omówić dalsze postępowanie po wcześniejszej konsultacji.",
  ],
  [
    "Ocena interakcji i przeciwwskazań",
    "Lekarz analizuje informacje ważne dla bezpieczeństwa rozważanego postępowania w Twojej sytuacji.",
  ],
];

export default function AudiencePage() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-5xl px-5 py-14 md:py-20">
        <h1 className="display-heading text-balance text-4xl font-semibold text-navy-950 md:text-5xl">
          Dla kogo jest konsultacja
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          Podczas stacjonarnej konsultacji możesz omówić z lekarzem swoją
          sytuację, dotychczasowe postępowanie i pytania dotyczące dalszych kroków.
        </p>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {situations.map(([title, description]) => (
            <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm" key={title}>
              <h2 className="text-lg font-semibold text-navy-950">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16">
        <h2 className="text-2xl font-semibold text-navy-950">
          Kiedy najpierw może być potrzebna inna konsultacja lub diagnostyka
        </h2>
        <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
          <li>Gdy pojawiają się nowe, nasilające się lub niewyjaśnione objawy wymagające rozpoznania.</li>
          <li>Gdy potrzebna jest pilna pomoc.</li>
          <li>Gdy potrzebna jest konsultacja innej specjalności lub uzupełnienie diagnostyki.</li>
        </ul>
      </section>

    </div>
  );
}
