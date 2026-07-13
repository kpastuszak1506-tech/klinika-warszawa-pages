import Link from "next/link";
import {
  companyConfig,
  isPublicDataVerified,
} from "@/config/companyConfig";
import { formMedicalDataNotice } from "@/lib/siteContent";
import { RiskNotice } from "./RiskNotice";

export function BookingContactForm() {
  if (!isPublicDataVerified) {
    return (
      <section
        aria-labelledby="booking-privacy-title"
        className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-6"
        id="rezerwacja"
      >
        <h2 className="text-xl font-semibold text-navy-950" id="booking-privacy-title">
          Rezerwacja online
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Rezerwacja online zostanie udostępniona przed rozpoczęciem przyjmowania pacjentów.
        </p>
      </section>
    );
  }

  return <VerifiedBookingContactForm />;
}

function VerifiedBookingContactForm() {
  const phoneHref = `tel:${companyConfig.phone.replace(/[^+\d]/g, "")}`;

  return (
    <section
      aria-labelledby="booking-privacy-title"
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-6"
      id="rezerwacja"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-medical-green">
        Prywatność rezerwacji
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-navy-950" id="booking-privacy-title">
        Ustal termin telefonicznie
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        Rezerwacja online jest jeszcze niedostępna. Aby ustalić termin wizyty,
        zadzwoń.
      </p>

      <RiskNotice className="mt-5" title="Nie przesyłaj danych medycznych">
        <p>{formMedicalDataNotice}</p>
      </RiskNotice>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-medical-green bg-medical-green px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-medical-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-green"
          href={phoneHref}
        >
          Zadzwoń w sprawie terminu
        </a>
        <Link
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-navy-900 transition hover:border-medical-green hover:text-medical-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-green"
          href="/informacja-dla-pacjenta"
        >
          Informacja dla pacjenta
        </Link>
      </div>
    </section>
  );
}
