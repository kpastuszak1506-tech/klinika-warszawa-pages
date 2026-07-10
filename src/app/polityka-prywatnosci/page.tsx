import type { Metadata } from "next";
import { CompanyDetails } from "@/components/CompanyDetails";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { companyConfig } from "@/config/companyConfig";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description:
    "Polityka prywatności strony dla stacjonarnych konsultacji lekarskich.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      description="Poniższa treść opisuje podstawowe zasady przetwarzania danych osobowych w związku ze stroną informacyjną i formularzem kontaktowym."
      title="Polityka prywatności"
    >
      <h2>Administrator danych</h2>
      <p>
        Administratorem danych osobowych jest {companyConfig.companyName},{" "}
        {companyConfig.legalForm}, z siedzibą pod adresem{" "}
        {companyConfig.registeredOfficeAddress}.
      </p>
      <p>
        Kontakt w sprawach ochrony danych: {companyConfig.privacyEmail}. Dane
        kontaktowe i rejestrowe administratora:
      </p>
      <CompanyDetails />

      <h2>Zakres danych</h2>
      <p>
        Formularz kontaktowy zbiera wyłącznie dane potrzebne do kontaktu w
        sprawie rezerwacji: imię, nazwisko, telefon, adres e-mail, preferowany
        termin oraz preferowaną formę kontaktu.
      </p>
      <p>
        Strona nie służy do przekazywania danych medycznych. Nie należy
        przesyłać przez formularz informacji o stanie zdrowia, dokumentacji,
        wyników badań ani informacji o leczeniu.
      </p>

      <h2>Cele i podstawy prawne</h2>
      <ul>
        <li>
          Obsługa zapytania i kontakt w sprawie terminu wizyty - prawnie
          uzasadniony interes administratora lub działania przed zawarciem
          umowy, zależnie od kontekstu.
        </li>
        <li>
          Organizacja rezerwacji wizyty - działania na żądanie osoby, której
          dane dotyczą.
        </li>
        <li>
          Obsługa obowiązków prawnych podmiotu leczniczego - obowiązek prawny,
          jeżeli znajdzie zastosowanie.
        </li>
        <li>
          Ustalenie, dochodzenie lub obrona roszczeń - prawnie uzasadniony
          interes administratora.
        </li>
        <li>
          Zapamiętanie ustawień cookies - zgoda lub prawnie uzasadniony interes
          w zakresie plików niezbędnych.
        </li>
      </ul>

      <h2>Odbiorcy danych</h2>
      <p>
        Dane mogą być przekazywane dostawcom hostingu, poczty elektronicznej,
        usług IT, usług księgowych, prawnych oraz docelowego systemu rezerwacji,
        jeżeli zostanie wdrożony. Zakres odbiorców powinien zostać uzupełniony
        po wyborze faktycznych dostawców.
      </p>

      <h2>Retencja</h2>
      <p>
        Dane kontaktowe są przechowywane przez okres potrzebny do obsługi
        zapytania i rezerwacji, a następnie przez okres wymagany przepisami lub
        potrzebny do zabezpieczenia ewentualnych roszczeń. Konkretny harmonogram
        retencji wymaga uzupełnienia po ustaleniu procesu operacyjnego.
      </p>

      <h2>Prawa osoby, której dane dotyczą</h2>
      <p>
        Osobie, której dane dotyczą, przysługuje prawo dostępu do danych,
        sprostowania, usunięcia, ograniczenia przetwarzania, sprzeciwu,
        przenoszenia danych, cofnięcia zgody w zakresie opartym na zgodzie oraz
        wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.
      </p>

      <h2>Przypadkowo przesłane dane medyczne</h2>
      <p>
        Jeżeli pacjent przypadkowo prześle dane medyczne przez zwykły formularz
        albo zwykłą korespondencję e-mail, administrator powinien ograniczyć ich
        przetwarzanie do minimum, usunąć je albo skierować pacjenta do
        właściwego zabezpieczonego kanału, zgodnie z procedurą przyjętą po
        review prawnym.
      </p>

      <h2>Profilowanie i transfery</h2>
      <p>
        Strona nie prowadzi profilowania, nie podejmuje automatycznych
        decyzji i nie przekazuje danych do narzędzi reklamowych. Informacje o
        ewentualnych transferach poza Europejski Obszar Gospodarczy wymagają
        uzupełnienia po wyborze faktycznych dostawców.
      </p>
    </LegalPageLayout>
  );
}
