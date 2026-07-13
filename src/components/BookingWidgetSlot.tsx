import {
  companyConfig,
  isMedfileBookingReady,
} from "@/config/companyConfig";
import { CTAButton } from "./CTAButton";

type BookingWidgetSlotProps = {
  compact?: boolean;
};

function BookingFallback({ compact = false }: BookingWidgetSlotProps) {
  if (compact) {
    return (
      <section aria-label="Rezerwacja wizyty" className="booking-surface booking-surface--compact">
        <p className="booking-surface__kicker">Rezerwacja wizyty</p>
        <p className="booking-surface__copy">
          Rezerwacja online zostanie udostępniona przed rozpoczęciem przyjmowania pacjentów.
        </p>
      </section>
    );
  }

  return (
    <section aria-label="Rezerwacja wizyty" className="booking-surface">
      <p>Rezerwacja online zostanie udostępniona przed rozpoczęciem przyjmowania pacjentów.</p>
    </section>
  );
}

export function BookingWidgetSlot({ compact = false }: BookingWidgetSlotProps) {
  if (!isMedfileBookingReady) {
    return <BookingFallback compact={compact} />;
  }

  const bookingUrl = companyConfig.bookingWidget.publicBookingUrl;

  if (compact) {
    return (
      <section aria-label="Rezerwacja wizyty" className="booking-surface booking-surface--compact">
        <p className="booking-surface__kicker">Rezerwacja wizyty</p>
        <p className="booking-surface__copy">
          Wybierz termin konsultacji stacjonarnej w Warszawie.
        </p>
        <CTAButton className="booking-surface__action" href={bookingUrl}>
          Przejdź do rezerwacji
        </CTAButton>
      </section>
    );
  }

  return (
    <section aria-labelledby="booking-widget-title" className="booking-widget-card">
      <p className="booking-widget-card__kicker">Rezerwacja wizyty</p>
      <h2 className="booking-widget-card__title" id="booking-widget-title">
        Wybierz dogodny termin konsultacji
      </h2>
      <p className="booking-widget-card__copy">
        Rezerwacja dotyczy konsultacji stacjonarnej w Warszawie.
      </p>
      <CTAButton className="booking-widget-card__action" href={bookingUrl}>
        Przejdź do rezerwacji
      </CTAButton>
    </section>
  );
}
