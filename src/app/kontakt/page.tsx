import { BookingContactForm } from "@/components/BookingContactForm";
import { BookingWidgetSlot } from "@/components/BookingWidgetSlot";
import { CompanyDetails } from "@/components/CompanyDetails";
import { ComplianceNotice } from "@/components/ComplianceNotice";
import { SectionHeading } from "@/components/SectionHeading";
import { companyConfig } from "@/config/companyConfig";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Kontakt i rezerwacja",
  description:
    "Kontakt w sprawie rezerwacji stacjonarnej konsultacji lekarskiej w Warszawie.",
  path: "/kontakt",
});

export default function ContactPage() {
  const phoneHref = `tel:${companyConfig.phone.replace(/[^+\d]/g, "")}`;

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        <h1 className="display-heading text-balance text-5xl font-semibold leading-tight text-navy-950 md:text-6xl">
          Kontakt i rezerwacja
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          Skontaktuj się w sprawie terminu wizyty stacjonarnej w gabinecie w
          Warszawie. Kontakt służy wyłącznie sprawom organizacyjnym.
        </p>
        <div className="mt-7 lg:hidden">
          <BookingWidgetSlot compact />
        </div>
        <ComplianceNotice className="mt-8" />
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="hidden lg:block">
              <BookingWidgetSlot />
            </div>
            <BookingContactForm />
          </div>
          <div className="lg:pt-2">
            <SectionHeading
              description="Gabinet przyjmuje pacjentów stacjonarnie w Warszawie. Kontakt służy wyłącznie ustaleniu spraw organizacyjnych."
              title="Dane placówki"
            />
            <div className="contact-panel p-6 text-sm leading-6 text-slate-700">
              <p>
                <strong className="text-navy-950">Gabinet:</strong>{" "}
                {companyConfig.medicalOfficeAddress}
              </p>
              <p className="mt-2">
                <strong className="text-navy-950">Telefon:</strong>{" "}
                <a
                  className="font-medium text-medical-green underline underline-offset-2"
                  href={phoneHref}
                >
                  {companyConfig.phone}
                </a>
              </p>
              <p className="mt-2">
                <strong className="text-navy-950">E-mail:</strong>{" "}
                <a
                  className="font-medium text-medical-green underline underline-offset-2"
                  href={`mailto:${companyConfig.email}`}
                >
                  {companyConfig.email}
                </a>
              </p>
              <p className="mt-2">
                <strong className="text-navy-950">E-mail RODO:</strong>{" "}
                <a
                  className="font-medium text-medical-green underline underline-offset-2"
                  href={`mailto:${companyConfig.privacyEmail}`}
                >
                  {companyConfig.privacyEmail}
                </a>
              </p>
            </div>
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
