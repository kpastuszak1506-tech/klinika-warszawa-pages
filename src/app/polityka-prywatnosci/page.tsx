import { CompanyDetails } from "@/components/CompanyDetails";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import {
  areLegalDocumentsPublic,
  companyConfig,
  isPublicReleaseReady,
} from "@/config/companyConfig";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Polityka prywatności",
  description:
    "Polityka prywatności strony dla stacjonarnych konsultacji lekarskich.",
  path: "/polityka-prywatnosci",
  indexable: areLegalDocumentsPublic && isPublicReleaseReady,
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      description="Poniższa wersja opisuje aktualne działanie statycznej strony oraz warunki, które muszą zostać uzupełnione przed uruchomieniem rezerwacji online."
      title="Polityka prywatności"
    >
      <h2>Aktualny status rezerwacji online</h2>
      <p>
        Aktualna wersja strony nie przesyła zgłoszeń kontaktowych ani danych
        rezerwacyjnych do własnego serwera lub zewnętrznego systemu. Rezerwacja
        online zostanie uruchomiona wyłącznie po wyborze dostawcy, wdrożeniu
        systemu rezerwacji i aktualizacji dokumentów wymaganych dla tego procesu.
      </p>

      <h2>Administrator danych</h2>
      <p>
        Administratorem danych osobowych jest {companyConfig.companyName},{" "}
        {companyConfig.legalForm}, z siedzibą pod adresem{" "}
        {companyConfig.registeredOfficeAddress}.
      </p>
      <p>
        Kontakt w sprawach ochrony danych: {companyConfig.privacyEmail}. Dane
        administratora wymagają potwierdzenia przed publikacją produkcyjną:
      </p>
      <CompanyDetails />

      <h2>Zakres działania strony</h2>
      <p>
        Strona ma charakter informacyjny. Nie zawiera pola opisu sprawy,
        załączników, rozpoznań, leków, wyników badań ani innych pól służących do
        przekazywania informacji o stanie zdrowia.
      </p>
      <p>
        Po uruchomieniu rezerwacji online zakres danych powinien zostać
        ograniczony do danych kontaktowych i organizacyjnych niezbędnych do
        wyboru oraz potwierdzenia terminu. Zakres, podstawa prawna i proces
        ustala się przed uruchomieniem integracji z dostawcą.
      </p>

      <h2>Preferencje prywatności</h2>
      <p>
        Strona zapisuje w przeglądarce wybór dotyczący kategorii cookies.
        Ustawienie nie jest przekazywane przez stronę do systemu rezerwacji i
        służy wyłącznie do zapamiętania wyboru. Użytkownik może je zmienić
        przyciskiem ustawień cookies lub usunąć w ustawieniach przeglądarki.
      </p>

      <h2>Odbiorcy i transfery</h2>
      <p>
        Techniczne udostępnianie statycznej strony odbywa się za pośrednictwem
        GitHub Pages. Przed uruchomieniem systemu rezerwacji administrator
        powinien ustalić faktycznych odbiorców danych, role stron, umowy
        powierzenia oraz ewentualne transfery poza Europejski Obszar Gospodarczy
        i uzupełnić je w finalnej informacji dla pacjenta.
      </p>

      <h2>Retencja</h2>
      <p>
        W aktualnej wersji strona nie przechowuje po swojej stronie zgłoszeń
        rezerwacyjnych. Lokalny zapis preferencji prywatności pozostaje na
        urządzeniu użytkownika do czasu zmiany wyboru albo usunięcia danych
        strony w przeglądarce. Harmonogram retencji danych rezerwacyjnych musi
        zostać określony przed uruchomieniem rezerwacji online.
      </p>

      <h2>Prawa osoby, której dane dotyczą</h2>
      <p>
        W przypadku przetwarzania danych osobowych osoba, której dane dotyczą,
        może żądać dostępu do danych, ich sprostowania, usunięcia, ograniczenia
        przetwarzania, przeniesienia danych lub wnieść sprzeciw, gdy jest to
        właściwe dla przyjętej podstawy prawnej. Może również złożyć skargę do
        Prezesa Urzędu Ochrony Danych Osobowych. Konkretna realizacja tych praw
        dla rezerwacji online zostanie opisana po wdrożeniu systemu.
      </p>

      <h2>Przypadkowo przesłane dane medyczne</h2>
      <p>
        Nie należy przesyłać danych medycznych przez zwykłą korespondencję
        e-mail ani przez stronę. Przed uruchomieniem rezerwacji administrator
        powinien wdrożyć procedurę dla osoby obsługującej kontakt, która
        ograniczy takie przetwarzanie i wskaże pacjentowi właściwy, zabezpieczony
        kanał dokumentacji medycznej.
      </p>
    </LegalPageLayout>
  );
}
