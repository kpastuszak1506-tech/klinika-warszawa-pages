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
      <section className="ambient-grid relative -mt-24 overflow-hidden pt-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent" />
        <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-[1500px] gap-10 px-5 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-0 lg:px-8 lg:py-20">
          <div className="relative z-20 min-w-0 lg:pr-24">
            <div className="mb-8 h-px w-32 bg-medical-green/40" />
            <h1 className="display-heading reveal-up max-w-4xl text-balance text-[clamp(3.6rem,9vw,8.4rem)] font-semibold leading-[0.84] text-navy-950">
              Konsultacje lekarskie w Warszawie
            </h1>
            <p className="reveal-up-delay mt-7 max-w-2xl text-pretty text-lg leading-8 text-slate-600 md:text-xl md:leading-9">
              Kwalifikacja do terapii kannabinoidowej odbywa się podczas
              wizyty stacjonarnej w gabinecie. Strona służy do informacji
              organizacyjnych oraz kontaktu w sprawie terminu.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <CTAButton href="/kontakt">Zarezerwuj wizytę stacjonarną</CTAButton>
              <CTAButton href="/jak-wyglada-wizyta" variant="secondary">
                Jak wygląda wizyta
              </CTAButton>
            </div>
            <div className="relative z-20 mt-8 max-w-2xl lg:mr-[-220px] lg:max-w-[720px]">
              <BookingWidgetSlot compact />
            </div>
            <ComplianceNotice className="mt-8 max-w-2xl" compact />
          </div>
          <div className="relative min-h-[440px] lg:min-h-[680px]">
            <div className="media-edge-fade absolute inset-y-0 -right-8 left-0 overflow-hidden rounded-l-[44px] bg-white shadow-[0_30px_120px_rgba(15,39,72,0.18)]">
              <Image
                alt="Jasny gabinet lekarski przygotowany do konsultacji stacjonarnej"
                className="object-cover"
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                src={`${publicBasePath}/images/medical-office-hero-soft.png`}
              />
            </div>
            <div className="absolute bottom-8 right-8 hidden max-w-sm rounded-lg border border-white/70 bg-white/80 p-5 text-sm leading-6 text-navy-900 shadow-[0_18px_60px_rgba(15,39,72,0.14)] backdrop-blur-xl lg:block">
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.16em] text-medical-green">
                Gabinet stacjonarny
              </span>
              Decyzję terapeutyczną podejmuje lekarz po osobistym badaniu i
              analizie wskazań oraz przeciwwskazań.
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-medical-green">
              Przebieg wizyty
            </p>
            <SectionHeading
              description="Proces jest prosty organizacyjnie, ale decyzja medyczna pozostaje indywidualna i należy do lekarza."
              title="Od kontaktu do zaleceń"
            />
          </div>
          <ProcessSteps />
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#f4f8f7_0%,#ffffff_100%)] px-5 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
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
            <SectionHeading
              description="Najczęstsze pytania dotyczą organizacji wizyty, zakresu formularza i zasad decyzji lekarskiej."
              title="Najczęstsze pytania"
            />
            <FAQ limit={4} />
            <CTAButton className="mt-6" href="/faq" variant="secondary">
              Zobacz wszystkie odpowiedzi
            </CTAButton>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-navy-950">
              Kontakt i rezerwacja
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Formularz na stronie służy wyłącznie do zgłoszenia kontaktowego.
              Informacje medyczne są omawiane podczas wizyty lub przez
              zabezpieczony system dokumentacji medycznej.
            </p>
            <CTAButton className="mt-5" href="/kontakt">
              Przejdź do kontaktu
            </CTAButton>
            <ComplianceNotice className="mt-6" compact />
          </div>
        </div>
      </section>
    </>
  );
}
