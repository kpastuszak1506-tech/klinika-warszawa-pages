import { ComplianceNotice } from "@/components/ComplianceNotice";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import {
  areLegalDocumentsPublic,
  companyConfig,
  isPublicReleaseReady,
} from "@/config/companyConfig";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Regulamin rezerwacji",
  description:
    "Regulamin rezerwacji stacjonarnych konsultacji lekarskich.",
  path: "/regulamin-rezerwacji",
  indexable: areLegalDocumentsPublic && isPublicReleaseReady,
});

export default function BookingRulesPage() {
  return (
    <LegalPageLayout
      description="Regulamin opisuje charakter strony oraz warunki, które trzeba ustalić przed uruchomieniem rezerwacji online."
      title="Regulamin rezerwacji wizyt"
    >
      <ComplianceNotice />

      <h2>Charakter strony</h2>
      <p>
        Strona ma charakter informacyjny. Dotyczy stacjonarnych konsultacji
        lekarskich w gabinecie pod adresem {companyConfig.medicalOfficeAddress}.
        Nie jest systemem dokumentacji medycznej, apteką ani narzędziem do
        automatycznego podejmowania decyzji medycznych.
      </p>

      <h2>Status rezerwacji online</h2>
      <p>
        Aktualna wersja strony nie potwierdza rezerwacji online i nie przyjmuje
        zgłoszeń przez formularz. Termin może zostać ustalony telefonicznie.
        System rezerwacji online zostanie uruchomiony wyłącznie po
        zatwierdzeniu dostawcy, zasad przetwarzania danych i procesu
        organizacyjnego placówki.
      </p>

      <h2>Wizyta stacjonarna i decyzja lekarza</h2>
      <p>
        Rezerwacja terminu ma wyłącznie charakter organizacyjny. Nie oznacza
        rozpoznania, kwalifikacji do terapii ani określonego wyniku konsultacji.
        Decyzję o leczeniu, kontynuacji terapii lub wystawieniu recepty lekarz
        podejmuje po osobistym badaniu pacjenta i analizie wskazań oraz
        przeciwwskazań medycznych.
      </p>

      <h2>Zakres opłaty</h2>
      <p>
        Podana opłata dotyczy konsultacji lekarskiej. Nie jest opłatą za
        wystawienie recepty ani za określoną decyzję medyczną. O sposobie
        dalszego postępowania decyduje lekarz po badaniu pacjenta.
      </p>

      <h2>Informacje medyczne</h2>
      <p>
        Nie należy przekazywać przez stronę, zwykłą korespondencję e-mail ani
        przez rozmowę organizacyjną danych o stanie zdrowia, dokumentacji,
        wyników badań, lekach lub leczeniu. Informacje medyczne są omawiane
        podczas wizyty albo przekazywane przez wskazany, zabezpieczony system
        dokumentacji medycznej.
      </p>

      <h2>Warunki do zatwierdzenia przed uruchomieniem rezerwacji online</h2>
      <p>
        Przed uruchomieniem rezerwacji online administrator powinien zatwierdzić
        zasady potwierdzenia, zmiany i odwołania terminu, płatności, reklamacji
        organizacyjnych, kontaktu z pacjentem oraz dokumenty dostawcy systemu.
        Ostateczna wersja regulaminu musi zostać opublikowana przed rozpoczęciem
        przyjmowania rezerwacji online.
      </p>
    </LegalPageLayout>
  );
}
