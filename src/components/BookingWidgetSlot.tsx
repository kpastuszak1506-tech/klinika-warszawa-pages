import Link from "next/link";
import { companyConfig } from "@/config/companyConfig";
import { CTAButton } from "./CTAButton";

type BookingWidgetSlotProps = {
  compact?: boolean;
};

function isConfigured(value: string) {
  return value.trim() !== "" && !value.startsWith("DO_UZUPEŁNIENIA");
}

function isApprovedExternalUrl(value: string, allowedOrigin: string) {
  if (!isConfigured(value) || !isConfigured(allowedOrigin)) {
    return false;
  }

  try {
    const url = new URL(value);
    const approvedUrl = new URL(allowedOrigin);

    return (
      url.protocol === "https:" &&
      approvedUrl.protocol === "https:" &&
      url.origin === approvedUrl.origin
    );
  } catch {
    return false;
  }
}

function CalendarMark() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex size-11 shrink-0 items-center justify-center rounded-md border border-medical-green/20 bg-medical-green-soft text-medical-green"
    >
      <svg
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M7 3v4" />
        <path d="M17 3v4" />
        <path d="M4 9h16" />
        <rect height="17" rx="2" width="16" x="4" y="5" />
      </svg>
    </span>
  );
}

function BookingFallback({ compact }: BookingWidgetSlotProps) {
  const phoneHref = `tel:${companyConfig.phone.replace(/[^+\d]/g, "")}`;

  return (
    <section
      aria-label="Rezerwacja wizyty"
      className={[
        "booking-surface overflow-hidden rounded-lg border border-white/80 bg-white/92 shadow-[0_24px_70px_rgba(15,39,72,0.16)] backdrop-blur-xl",
        compact ? "p-5" : "p-6 md:p-8",
      ].join(" ")}
    >
      <div className="flex items-start gap-4">
        <CalendarMark />
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-medical-green">
            Rezerwacja wizyty
          </p>
          <h2 className="mt-2 text-balance text-2xl font-semibold text-navy-950">
            Termin przez zatwierdzony system
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {compact
              ? "Moduł online zostanie uruchomiony po bezpiecznym podłączeniu systemu. Nie podawaj danych medycznych przez stronę."
              : "Moduł rezerwacji online zostanie aktywowany po bezpiecznym podłączeniu systemu. Strona nie zbiera przez niego danych medycznych."}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-y border-slate-200 py-3 text-xs font-semibold text-navy-800">
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-medical-green" />
          Wizyta stacjonarna
        </span>
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-medical-green" />
          Dane organizacyjne
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-medical-green px-4 py-3 text-sm font-semibold text-white transition hover:bg-medical-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-green"
          href={phoneHref}
        >
          Zadzwoń: {companyConfig.phone}
        </a>
        <Link
          className="hidden min-h-11 items-center justify-center rounded-md border border-slate-300 px-4 py-3 text-sm font-semibold text-navy-900 transition hover:border-medical-green hover:text-medical-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-green sm:inline-flex"
          href="/kontakt#rezerwacja"
        >
          Informacje o rezerwacji
        </Link>
      </div>
    </section>
  );
}

export function BookingWidgetSlot({ compact = false }: BookingWidgetSlotProps) {
  const widget = companyConfig.bookingWidget;
  const title = `Rezerwacja online: ${widget.providerName}`;
  const hasApprovedExternalUrl = isApprovedExternalUrl(
    widget.externalUrl,
    widget.allowedOrigin,
  );
  const hasApprovedIframeUrl = isApprovedExternalUrl(
    widget.iframeSrc,
    widget.allowedOrigin,
  );

  if (
    widget.enabled &&
    widget.mode === "externalUrl" &&
    hasApprovedExternalUrl
  ) {
    return (
      <section className="rounded-lg border border-medical-green/20 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-medical-green">
          Rezerwacja wizyty
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-navy-950">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Rezerwacja jest obsługiwana przez zatwierdzony system zewnętrzny.
          Wybierz termin wyłącznie dla wizyty stacjonarnej.
        </p>
        <CTAButton className="mt-5" href={widget.externalUrl}>
          Przejdź do rezerwacji
        </CTAButton>
      </section>
    );
  }

  if (widget.enabled && widget.mode === "iframe" && hasApprovedIframeUrl) {
    return (
      <section className="rounded-lg border border-medical-green/20 bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-2xl font-semibold text-navy-950">{title}</h2>
        <iframe
          className="h-[560px] w-full rounded-md border border-slate-200"
          loading="lazy"
          referrerPolicy="strict-origin"
          sandbox="allow-forms allow-scripts allow-popups"
          src={widget.iframeSrc}
          title="Zewnętrzny widget rezerwacji wizyty"
        />
      </section>
    );
  }

  return <BookingFallback compact={compact} />;
}
