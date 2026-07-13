import { CTAButton } from "@/components/CTAButton";
import { PriceTable } from "@/components/PriceTable";
import { isPublicDataVerified } from "@/config/companyConfig";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Cennik",
  description:
    "Zakres pierwszej konsultacji i wizyty kontrolnej w gabinecie w Warszawie.",
  path: "/cennik",
});

export default function PricingPage() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-5xl px-5 py-14 md:py-20">
        <h1 className="display-heading text-balance text-4xl font-semibold text-navy-950 md:text-5xl">
          Cennik konsultacji
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          Konsultacje odbywają się stacjonarnie. Zakres wizyty zależy od tego,
          czy jest to pierwsza rozmowa z lekarzem, czy wizyta kontrolna.
        </p>
      </section>

      <section className="home-section price-section">
        <div className="site-shell price-layout">
          <div className="price-intro">
            <p className="eyebrow">Informacje organizacyjne</p>
            <h2 className="display-heading section-title">Cennik konsultacji</h2>
            <p className="section-lede">
              Informacje dotyczą stacjonarnych konsultacji lekarskich i ich
              zakresu organizacyjnego.
            </p>
            {isPublicDataVerified ? (
              <CTAButton href="/kontakt" variant="secondary">
                Kontakt w sprawie terminu
              </CTAButton>
            ) : null}
          </div>
          <div className="price-table-wrap">
            <PriceTable />
          </div>
        </div>
      </section>
    </div>
  );
}
