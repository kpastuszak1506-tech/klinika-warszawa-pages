# Backlog audytu finalnego

Data rozpoczęcia: 2026-07-10

## Zasada wydania

Pozycje oznaczone jako `BLOCKED` nie mogą zostać zamknięte samą zmianą kodu. Nie publikujemy deklaracji medycznych, rejestracyjnych ani integracji, których nie da się potwierdzić u właściciela placówki lub dostawcy systemu.

| ID | Obszar | Priorytet | Status | Zadanie i kryterium akceptacji |
| --- | --- | --- | --- | --- |
| AUD-01 | Formularz | P0 | DONE | Usunięto pozorne potwierdzenie wysłania zgłoszenia. Strona nie przyjmuje danych, dopóki nie istnieje zatwierdzony endpoint/widget. |
| AUD-02 | Integracja rezerwacji | P0 | DONE | Przygotowano neutralny slot pod API/widget oraz konfigurację bez sekretów po stronie klienta. Domyślnie brak requestów zewnętrznych, a przyszły adres musi być HTTPS i zgodny z zatwierdzoną domeną. |
| AUD-03 | Dane placówki | P0 | BLOCKED | Potwierdzić nazwę prawną, adresy, NIP, REGON, REGON zakładu, RPWDL, telefon, e-mail, ceny i zasady płatności w źródłach właściciela/RPWDL. Nie wolno traktować przykładowych danych jako danych produkcyjnych. |
| AUD-04 | Integracja Medlife/Medfile | P0 | BLOCKED | Potwierdzić dokładną nazwę dostawcy, dokumentację API/widgetu, model autoryzacji, zakres danych, umowę powierzenia, lokalizację przetwarzania i politykę retencji. |
| AUD-05 | UX hero | P1 | DONE | Zmniejszono i ustabilizowano nagłówek, przeniesiono slot rezerwacji na warstwę zdjęcia na desktopie oraz zweryfikowano widok 390 px. |
| AUD-06 | Nawigacja mobilna | P1 | DONE | Pełną nawigację zastąpiono kompaktowym menu natywnym, dostępnym z klawiatury. |
| AUD-07 | Cookies | P1 | DONE | Zachowano trzy równorzędne wybory, skrócono pierwszą warstwę na mobile i dodano walidację lokalnego zapisu preferencji. |
| AUD-08 | SEO techniczne | P1 | DONE | Dodano kanoniczne adresy, Open Graph, `robots.txt`, `sitemap.xml` i jeden `h1` na każdej trasie. Indeksowanie jest celowo wyłączone do czasu weryfikacji danych publicznych. |
| AUD-09 | Dokumenty prawne | P1 | DONE | Treści opisują obecne działanie statycznej strony oraz przyszłą integrację. Widoczna nota nadal wymaga review prawnika. |
| AUD-10 | Dostępność | P1 | DONE | Dodano skip link, lepsze stany focus, semantykę telefonu/e-maila i dostępne ustawienia prywatności. |
| AUD-11 | Wydajność | P2 | DONE | Hero image zmieniono z PNG 1,6 MB na JPG 231 KB i zweryfikowano eksport statyczny. |
| AUD-12 | Walidacja | P0 | DONE | Build lokalny i GitHub Pages, lint, skany compliance/trackerów, kontrola tras oraz kontrola desktop/mobile zakończyły się powodzeniem. |

## Bramka produkcyjna

Wydanie techniczne może zostać uznane za gotowe po zamknięciu pozycji `IN PROGRESS` i pomyślnej walidacji. Wydanie prawne i operacyjne wymaga dodatkowo zamknięcia `AUD-03` i `AUD-04` oraz finalnego review prawnika dokumentów.
