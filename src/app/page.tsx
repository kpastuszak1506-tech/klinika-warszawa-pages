import Image from "next/image";
import { BookingWidgetSlot } from "@/components/BookingWidgetSlot";
import { ComplianceNotice } from "@/components/ComplianceNotice";
import { CTAButton } from "@/components/CTAButton";
import { FAQ } from "@/components/FAQ";
import { PriceTable } from "@/components/PriceTable";
import { ProcessSteps } from "@/components/ProcessSteps";
import { SectionHeading } from "@/components/SectionHeading";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Home() {
  return (
    <>
      <section className="ambient-grid relative -mt-20 overflow-hidden pt-28 lg:-mt-24 lg:pt-32">
        <div aria-hidden="true" className="hero-hairline absolute inset-x-0 top-28" />
        <div className="mx-auto grid max-w-[1500px] gap-10 px-5 pb-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-5 lg:px-8 lg:pb-20">
          <div className="relative z-20 min-w-0 py-5 lg:py-12 lg:pr-12">
            <p className="eyebrow reveal-up">Warszawa · Wizyta stacjonarna</p>
            <h1 className="display-heading reveal-up max-w-[10ch] text-balance text-[clamp(3.05rem,6.4vw,6.8rem)] font-semibold leading-[0.9] text-navy-950">
              Konsultacje lekarskie w Warszawie
            </h1>
            <p className="reveal-up-delay mt-6 max-w-xl text-pretty text-lg leading-8 text-slate-600 md:text-xl md:leading-9">
              Kwalifikacja do terapii kannabinoidowej odbywa się podczas
              wizyty stacjonarnej w gabinecie. Strona służy do informacji
              organizacyjnych oraz kontaktu w sprawie terminu.
            </p>
            <div className="mt-7 lg:hidden">
              <BookingWidgetSlot compact />
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTAButton href="/kontakt">Zarezerwuj wizytę stacjonarną</CTAButton>
              <CTAButton href="/jak-wyglada-wizyta" variant="secondary">
                Jak wygląda wizyta
              </CTAButton>
            </div>
            <ComplianceNotice className="mt-7 max-w-xl" compact />
          </div>

          <div className="relative min-h-[410px] sm:min-h-[500px] lg:min-h-[660px]">
            <div className="hero-media absolute inset-0 overflow-hidden bg-white shadow-[0_30px_120px_rgba(15,39,72,0.16)]">
              <Image
                alt="Jasny gabinet lekarski przygotowany do konsultacji stacjonarnej"
                className="object-cover"
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                src={`${publicBasePath}/images/medical-office-hero-soft.jpg`}
              />
            </div>

            <div className="absolute right-5 top-5 hidden border border-white/70 bg-white/82 px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.15em] text-navy-900 shadow-sm backdrop-blur-xl xl:block">
              <span className="block text-medical-green">Gabinet</span>
              Konsultacja na miejscu
            </div>

            <div className="absolute bottom-6 left-6 right-6 z-10 hidden max-w-[440px] lg:block">
              <BookingWidgetSlot compact />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">Przebieg wizyty</p>
            <SectionHeading
              description="Proces jest prosty organizacyjnie, ale decyzja medyczna pozostaje indywidualna i należy do lekarza."
              title="Od kontaktu do zaleceń"
            />
          </div>
          <ProcessSteps />
        </div>
      </section>

      <section className="section-wash px-5 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p className="eyebrow">Przejrzyste warunki</p>
            <SectionHeading
              description="Przejrzyste stawki za wizytę pierwszorazową i kontrolną, z jasnym zakresem konsultacji."
              title="Cennik konsultacji"
            />
            <CTAButton href="/cennik" variant="secondary">
              Zobacz cennik
            </CTAButton>
          </div>
          <PriceTable />
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white px-5 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.12fr_0.88fr]">
          <div>
            <p className="eyebrow">Najczęstsze pytania</p>
            <SectionHeading
              description="Najczęstsze pytania dotyczą organizacji wizyty, zakresu formularza i zasad decyzji lekarskiej."
              title="Ważne informacje przed kontaktem"
            />
            <FAQ limit={4} />
            <CTAButton className="mt-6" href="/faq" variant="secondary">
              Zobacz wszystkie odpowiedzi
            </CTAButton>
          </div>
          <div className="contact-panel p-6 md:p-8">
            <p className="eyebrow">Kontakt</p>
            <h2 className="display-heading mt-4 text-3xl font-semibold text-navy-950">
              Termin bez danych medycznych
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Kontakt na stronie służy wyłącznie sprawom organizacyjnym.
              Informacje medyczne są omawiane podczas wizyty lub przez
              zabezpieczony system dokumentacji medycznej.
            </p>
            <CTAButton className="mt-6" href="/kontakt">
              Przejdź do kontaktu
            </CTAButton>
            <ComplianceNotice className="mt-7" compact />
          </div>
        </div>
      </section>
    </>
  );
}
