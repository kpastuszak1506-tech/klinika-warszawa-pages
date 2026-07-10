import type { Metadata } from "next";
import { ComplianceNotice } from "@/components/ComplianceNotice";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { companyConfig } from "@/config/companyConfig";

export const metadata: Metadata = {
  title: "Regulamin rezerwacji",
  description:
    "Regulamin rezerwacji stacjonarnych konsultacji lekarskich.",
};

export default function BookingRulesPage() {
  return (
    <LegalPageLayout
      description="Regulamin opisuje organizacyjne zasady kontaktu i rezerwacji wizyt stacjonarnych."
      title="Regulamin rezerwacji wizyt"
    >
      <ComplianceNotice />

      <h2>Charakter strony</h2>
      <p>
        Strona ma charakter informacyjny i służy do kontaktu w sprawie
        rezerwacji stacjonarnej konsultacji lekarskiej w gabinecie pod adresem{" "}
        {companyConfig.medicalOfficeAddress}.
      </p>

      <h2>Rezerwacja wizyty</h2>
      <p>
        Rezerwacja terminu wymaga podania danych kontaktowych i organizacyjnych.
        Potwierdzenie terminu następuje po kontakcie ze strony placówki lub
        przez docelowy system rezerwacji, jeżeli zostanie wdrożony.
      </p>

      <h2>Zakres opłaty</h2>
      <p>
        Opłata dotyczy konsultacji lekarskiej, a nie wystawienia recepty ani
        określonej decyzji medycznej. Lekarz może odmówić wystawienia recepty,
        jeżeli nie stwierdzi wskazań medycznych albo rozpozna przeciwwskazania.
      </p>

      <h2>Brak danych medycznych w formularzu</h2>
      <p>
        Formularz kontaktowy nie służy do przekazywania informacji o stanie
        zdrowia, dokumentacji, wyników badań ani informacji o leczeniu. Dane
        medyczne są omawiane podczas wizyty lub przekazywane przez zabezpieczony
        system dokumentacji medycznej.
      </p>

      <h2>Zmiana lub odwołanie terminu</h2>
      <p>
        Zasady zmiany i odwołania terminu wymagają uzupełnienia po ustaleniu
        faktycznego procesu organizacyjnego, godzin pracy gabinetu i zasad
        płatności.
      </p>

      <h2>Postanowienia końcowe</h2>
      <p>
        Regulamin powinien zostać uzupełniony o pełne dane usługodawcy, zasady
        płatności, tryb reklamacji organizacyjnych oraz procedury komunikacji z
        pacjentem przed publikacją strony.
      </p>
    </LegalPageLayout>
  );
}
