import { CTAButton } from "@/components/CTAButton";
import { companyConfig } from "@/config/companyConfig";

type BookingWidgetSlotProps = {
  compact?: boolean;
};

function isConfigured(value: string) {
  return value.trim() !== "" && !value.startsWith("DO_UZUPEŁNIENIA");
}

export function BookingWidgetSlot({ compact = false }: BookingWidgetSlotProps) {
  const widget = companyConfig.bookingWidget;
  const title = widget.enabled
    ? `Widget rezerwacji: ${widget.providerName}`
    : "Rezerwacja terminu";

  if (widget.enabled && widget.mode === "externalUrl" && isConfigured(widget.externalUrl)) {
    return (
      <section className="rounded-lg border border-medical-green/20 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-navy-950">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Rezerwacja może zostać przekierowana do zewnętrznego systemu, jeżeli
          dostawca i proces prawny zostaną zatwierdzone.
        </p>
        <CTAButton className="mt-5" href={widget.externalUrl}>
          Przejdź do systemu rezerwacji
        </CTAButton>
      </section>
    );
  }

  if (widget.enabled && widget.mode === "iframe" && isConfigured(widget.iframeSrc)) {
    return (
      <section className="rounded-lg border border-medical-green/20 bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-2xl font-semibold text-navy-950">{title}</h2>
        <iframe
          className="h-[520px] w-full rounded-md border border-slate-200"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
          src={widget.iframeSrc}
          title="Zewnętrzny widget rezerwacji wizyty"
        />
      </section>
    );
  }

  return (
    <section
      className={[
        "overflow-hidden rounded-lg border border-white/80 bg-white/90 shadow-[0_24px_70px_rgba(15,39,72,0.16)] backdrop-blur-xl",
        compact ? "p-5" : "p-6 md:p-8",
      ].join(" ")}
      aria-label="Miejsce na widget rezerwacji"
    >
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className="inline-flex size-12 shrink-0 items-center justify-center rounded-md border border-medical-green/20 bg-medical-green-soft text-medical-green shadow-sm"
        >
          <svg
            className="size-6"
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
        <div>
          <h2 className="text-2xl font-semibold text-navy-950">{title}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Tu zostanie osadzony system rezerwacji po wyborze dostawcy i
            potwierdzeniu integracji. Do tego czasu termin można zgłosić przez
            formularz kontaktowy lub telefonicznie.
          </p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs font-semibold text-slate-500">
        {["Termin", "Dane", "Potwierdzenie"].map((label, index) => (
          <div key={label}>
            <div
              className={[
                "mx-auto mb-2 flex size-8 items-center justify-center rounded-full border",
                index === 0
                  ? "border-medical-green bg-medical-green text-white"
                  : "border-slate-200 bg-slate-50 text-slate-500",
              ].join(" ")}
            >
              {index + 1}
            </div>
            {label}
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-md border border-slate-200 bg-slate-50/80 p-4">
        <div className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
          <span>Podgląd modułu</span>
          <span className="text-medical-green">Gotowe pod API</span>
        </div>
        <div className="mt-4 grid gap-2">
          <div className="h-2 rounded-full bg-slate-200" />
          <div className="grid grid-cols-3 gap-2">
            <div className="h-9 rounded-md border border-medical-green/20 bg-white" />
            <div className="h-9 rounded-md border border-slate-200 bg-white" />
            <div className="h-9 rounded-md border border-slate-200 bg-white" />
          </div>
        </div>
      </div>
      {!compact ? (
        <ul className="mt-6 grid gap-3 text-sm leading-6 text-slate-700 md:grid-cols-3">
          <li className="rounded-md border border-white/80 bg-white/75 p-4">
            Gotowe miejsce pod API, iframe albo bezpieczny link rezerwacyjny.
          </li>
          <li className="rounded-md border border-white/80 bg-white/75 p-4">
            Widget zostanie uruchomiony dopiero po konfiguracji dostawcy.
          </li>
          <li className="rounded-md border border-white/80 bg-white/75 p-4">
            Zakres danych pozostaje organizacyjny: termin i kontakt.
          </li>
        </ul>
      ) : null}
    </section>
  );
}
