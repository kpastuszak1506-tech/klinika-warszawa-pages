import { BookingWidgetSlot } from "@/components/BookingWidgetSlot";
import { CompanyDetails } from "@/components/CompanyDetails";
import { SectionHeading } from "@/components/SectionHeading";
import {
  displayCompanyData,
  isPublicDataVerified,
} from "@/config/companyConfig";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Kontakt i rezerwacja",
  description:
    "Kontakt w sprawie rezerwacji stacjonarnej konsultacji lekarskiej w Warszawie.",
  path: "/kontakt",
});

export default function ContactPage() {
  const isDemoData = Boolean(displayCompanyData && !isPublicDataVerified);

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-5xl px-5 py-14 md:py-20">
        <h1 className="display-heading text-balance text-4xl font-semibold text-navy-950 md:text-5xl">
          Kontakt i rezerwacja
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          {displayCompanyData
            ? "W sprawie terminu konsultacji skorzystaj z dostępnego kanału rezerwacji."
            : "Dane kontaktowe i kanał rezerwacji zostaną opublikowane po potwierdzeniu danych placówki."}
        </p>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-16">
        <div className="mx-auto max-w-5xl">
          <BookingWidgetSlot />
        </div>
      </section>

      {displayCompanyData ? (
        <section className="mx-auto max-w-5xl px-5 py-16">
          <SectionHeading title="Dane placówki" />
          {isDemoData ? (
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Poniższe dane służą wyłącznie do lokalnego podglądu strony.
            </p>
          ) : null}
          <div className={isDemoData ? "mt-6" : "mt-8"}>
            <CompanyDetails />
          </div>
        </section>
      ) : null}
    </div>
  );
}
