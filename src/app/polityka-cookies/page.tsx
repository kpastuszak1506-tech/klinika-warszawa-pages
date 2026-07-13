import { LegalPageLayout } from "@/components/LegalPageLayout";
import {
  areLegalDocumentsPublic,
  isPublicReleaseReady,
} from "@/config/companyConfig";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Polityka cookies",
  description:
    "Polityka cookies z kategoriami: niezbędne, analityczne i marketingowe.",
  path: "/polityka-cookies",
  indexable: areLegalDocumentsPublic && isPublicReleaseReady,
});

export default function CookiesPolicyPage() {
  return (
    <LegalPageLayout
      description="Dokument opisuje aktualny zapis preferencji prywatności oraz zasady uruchamiania dodatkowych kategorii."
      title="Polityka cookies"
    >
      <h2>Aktualne działanie strony</h2>
      <p>
        Aktualna wersja strony nie ładuje narzędzi analitycznych, marketingowych,
        pikseli reklamowych, kontenerów tagów ani skryptów social media. Nie
        korzysta też z mechanizmu rezerwacji, który przesyłałby dane do
        zewnętrznego dostawcy.
      </p>

      <h2>Zapis ustawień prywatności</h2>
      <p>
        Aby zapamiętać wybór użytkownika, strona zapisuje ustawienie w
        przeglądarce. Zawiera ono wyłącznie informację o wyborze kategorii:
        niezbędne, analityczne i marketingowe. Pozostaje na urządzeniu do czasu
        zmiany decyzji lub usunięcia danych strony w ustawieniach przeglądarki.
      </p>

      <h2>Kategorie</h2>
      <ul>
        <li>
          <strong>Niezbędne</strong> - obejmują mechanizm zapamiętania wyboru
          prywatności. Są aktywne domyślnie.
        </li>
        <li>
          <strong>Analityczne</strong> - kategoria opcjonalna. W obecnej wersji
          nie jest połączona z żadnym narzędziem.
        </li>
        <li>
          <strong>Marketingowe</strong> - kategoria opcjonalna. W obecnej
          wersji nie jest połączona z narzędziami reklamowymi ani
          remarketingiem.
        </li>
      </ul>

      <h2>Wybór użytkownika</h2>
      <p>
        Pierwsza warstwa komunikatu zawiera trzy równorzędne opcje: akceptację
        wszystkich kategorii, odrzucenie kategorii opcjonalnych i przejście do
        ustawień. Użytkownik może wrócić do ustawień w dowolnym momencie przez
        przycisk widoczny na stronie.
      </p>

      <h2>Zmiana zakresu narzędzi</h2>
      <p>
        Przed podłączeniem analityki, marketingu, zewnętrznego systemu
        rezerwacji lub innego narzędzia wykorzystującego informacje z urządzenia
        użytkownika administrator powinien ponownie ocenić podstawę prawną,
        zaktualizować niniejszy dokument i zweryfikować działanie mechanizmu
        zgód.
      </p>
    </LegalPageLayout>
  );
}
