import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Polityka cookies",
  description:
    "Polityka cookies z kategoriami: niezbędne, analityczne i marketingowe.",
};

export default function CookiesPolicyPage() {
  return (
    <LegalPageLayout
      description="Dokument opisuje kategorie plików cookies i zasady zgód na stronie."
      title="Polityka cookies"
    >
      <h2>Kategorie cookies</h2>
      <ul>
        <li>
          <strong>Niezbędne</strong> - wymagane do działania strony i
          zapamiętania wyboru użytkownika. Są aktywne domyślnie.
        </li>
        <li>
          <strong>Analityczne</strong> - opcjonalna kategoria dla przyszłej,
          anonimowej analityki. Obecnie nie jest podłączona do zewnętrznego
          narzędzia.
        </li>
        <li>
          <strong>Marketingowe</strong> - kategoria informacyjna. Obecnie nie są
          ładowane żadne skrypty reklamowe ani piksele.
        </li>
      </ul>

      <h2>Zasady zgody</h2>
      <p>
        Pierwsza warstwa banera zawiera trzy równorzędne opcje: akceptację
        wszystkich kategorii, odrzucenie wszystkich kategorii opcjonalnych oraz
        przejście do ustawień. Domyślnie aktywne są wyłącznie cookies
        niezbędne.
      </p>
      <p>
        Użytkownik może zmienić decyzję przyciskiem ustawień cookies widocznym
        na stronie. Zapis wyboru służy wyłącznie zapamiętaniu preferencji.
      </p>

      <h2>Brak narzędzi reklamowych</h2>
      <p>
        Strona nie ładuje pikseli reklamowych, kontenerów tagów, skryptów
        social media ani narzędzi służących do remarketingu. Formularz
        rezerwacyjny nie wysyła zdarzeń konwersji do platform reklamowych.
      </p>

      <h2>Zmiany polityki</h2>
      <p>
        Przed wdrożeniem jakiejkolwiek analityki lub dodatkowych narzędzi
        polityka cookies, baner oraz dokumentacja zgód powinny zostać ponownie
        sprawdzone pod kątem zgodności z prawem i faktycznym działaniem strony.
      </p>
    </LegalPageLayout>
  );
}
