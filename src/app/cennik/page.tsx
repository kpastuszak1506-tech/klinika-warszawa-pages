import type { Metadata } from "next";
import { ComplianceNotice } from "@/components/ComplianceNotice";
import { CTAButton } from "@/components/CTAButton";
import { PriceTable } from "@/components/PriceTable";

export const metadata: Metadata = {
  title: "Cennik",
  description:
    "Cennik stacjonarnych konsultacji lekarskich w Warszawie.",
};

export default function PricingPage() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-5xl px-5 py-14 md:py-20">
        <h1 className="display-heading text-balance text-4xl font-semibold text-navy-950 md:text-5xl">
          Cennik konsultacji
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          Stawki obejmują wizytę lekarską w gabinecie w Warszawie. Szczegóły
          organizacyjne potwierdzamy przed terminem konsultacji.
        </p>
        <ComplianceNotice className="mt-8" />
      </section>
      <section className="border-y border-slate-200 bg-slate-50 px-5 py-16">
        <div className="mx-auto max-w-4xl">
          <PriceTable />
          <CTAButton className="mt-8" href="/kontakt">
            Zarezerwuj wizytę stacjonarną
          </CTAButton>
        </div>
      </section>
    </div>
  );
}
