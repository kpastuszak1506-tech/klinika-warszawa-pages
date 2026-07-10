import { CTAButton } from "@/components/CTAButton";
import { SectionHeading } from "@/components/SectionHeading";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Dla kogo jest konsultacja",
  description:
    "Neutralne informacje o tym, kiedy pacjent może rozważyć rozmowę z lekarzem o kwalifikacji do terapii kannabinoidowej.",
  path: "/dla-kogo",
});

export default function AudiencePage() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-5xl px-5 py-14 md:py-20">
        <h1 className="display-heading text-balance text-4xl font-semibold text-navy-950 md:text-5xl">
          Dla kogo jest konsultacja
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          Konsultacja jest dla osób, które chcą porozmawiać z lekarzem o
          zasadności rozważenia terapii kannabinoidowej oraz o jej
          bezpieczeństwie w indywidualnej sytuacji medycznej.
        </p>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {[
            [
              "Pacjent z dokumentacją",
              "Osoba, która posiada dokumentację medyczną i chce omówić ją z lekarzem podczas wizyty.",
            ],
            [
              "Pacjent szukający oceny",
              "Osoba, która chce uzyskać lekarską ocenę wskazań, przeciwwskazań i możliwego postępowania.",
            ],
            [
              "Pacjent z pytaniami",
              "Osoba, która potrzebuje uporządkowanej rozmowy z lekarzem w warunkach gabinetu.",
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
          description="Lekarz może uznać, że terapia nie jest zasadna lub wymaga wcześniejszego uzupełnienia informacji."
          title="Kiedy konsultacja może zakończyć się inną decyzją"
        />
        <ul className="space-y-3 text-sm leading-6 text-slate-700">
          <li>Gdy lekarz nie stwierdzi wskazań medycznych.</li>
          <li>Gdy występują przeciwwskazania lub ryzyko dla pacjenta.</li>
          <li>Gdy potrzebna jest dodatkowa diagnostyka albo dokumentacja.</li>
          <li>Gdy właściwsze jest inne postępowanie medyczne.</li>
        </ul>
        <CTAButton className="mt-8" href="/jak-wyglada-wizyta" variant="secondary">
          Zobacz przebieg wizyty
        </CTAButton>
      </section>
    </div>
  );
}
