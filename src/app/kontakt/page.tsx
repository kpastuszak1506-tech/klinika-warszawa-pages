import type { Metadata } from "next";
import { BookingContactForm } from "@/components/BookingContactForm";
import { BookingWidgetSlot } from "@/components/BookingWidgetSlot";
import { CompanyDetails } from "@/components/CompanyDetails";
import { ComplianceNotice } from "@/components/ComplianceNotice";
import { SectionHeading } from "@/components/SectionHeading";
import { companyConfig } from "@/config/companyConfig";

export const metadata: Metadata = {
  title: "Kontakt i rezerwacja",
  description:
    "Kontakt w sprawie rezerwacji stacjonarnej konsultacji lekarskiej w Warszawie.",
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        <h1 className="display-heading text-balance text-5xl font-semibold leading-tight text-navy-950 md:text-6xl">
          Kontakt i rezerwacja
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          Skontaktuj się w sprawie terminu wizyty stacjonarnej w gabinecie w
          Warszawie. Formularz służy wyłącznie do kontaktu organizacyjnego.
        </p>
        <ComplianceNotice className="mt-8" />
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              description="Gabinet przyjmuje pacjentów stacjonarnie w Warszawie. Kontakt służy wyłącznie ustaleniu spraw organizacyjnych."
              title="Dane placówki"
            />
            <div className="rounded-lg border border-slate-200 bg-white p-6 text-sm leading-6 text-slate-700 shadow-sm">
              <p>
                <strong className="text-navy-950">Gabinet:</strong>{" "}
                {companyConfig.medicalOfficeAddress}
              </p>
              <p className="mt-2">
                <strong className="text-navy-950">Telefon:</strong>{" "}
                {companyConfig.phone}
              </p>
              <p className="mt-2">
                <strong className="text-navy-950">E-mail:</strong>{" "}
                {companyConfig.email}
              </p>
              <p className="mt-2">
                <strong className="text-navy-950">E-mail RODO:</strong>{" "}
                {companyConfig.privacyEmail}
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <BookingWidgetSlot />
            <BookingContactForm />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <SectionHeading
          description="Podstawowe informacje rejestrowe podmiotu leczniczego."
          title="Dane rejestrowe"
        />
        <CompanyDetails />
      </section>
    </div>
  );
}
