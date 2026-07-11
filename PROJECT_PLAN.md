# Plan projektu

## Cel wersji finalnej

Zbudować statyczną stronę w języku polskim dla małego prywatnego podmiotu leczniczego w Warszawie, który prowadzi wyłącznie stacjonarne konsultacje lekarskie w zakresie kwalifikacji do terapii kannabinoidowej.

Strona ma informować, umożliwiać kontakt w sprawie rezerwacji, prezentować cennik konsultacji i udostępniać dokumenty prawne do finalnego review prawnika. Strona nie jest systemem medycznym, nie prowadzi dokumentacji medycznej i nie zbiera danych o stanie zdrowia przez formularz.

## Audyt finalny 2026-07-10

Szczegółowy backlog audytu znajduje się w `AUDIT_BACKLOG.md`. Obejmuje on poprawki UX, SEO, dostępności i prywatności oraz oddziela zmiany możliwe do wykonania w kodzie od bramek zależnych od potwierdzonych danych placówki, wyboru dostawcy rezerwacji i review prawnika.

W wyniku audytu wdrożono bezpieczny fallback rezerwacji, przygotowanie pod API, warstwę SEO, mobilną nawigację, kontrolę cookies, skan compliance w CI i iterację wizualną. Indeksowanie pozostaje wyłączone przez konfigurację do czasu weryfikacji danych publicznych.

## Implementacja SEO 2026-07-11

Wdrożono nieindeksowane centrum wiedzy pod ścieżką /wiedza: cztery statyczne materiały z datą aktualizacji, źródłami, linkowaniem wewnętrznym i widocznym statusem review. Metadane Article są gotowe, a JSON-LD jest celowo emitowany dopiero po potwierdzeniu danych placówki, aktywacji indeksowania i zmianie statusu artykułu na reviewed.

Dodano walidację jakości treści: wymagane są daty, źródła, status review, powiązane materiały i nota compliance. Szczegółowe zadania znajdują się w SEO_IMPLEMENTATION_BACKLOG.md.

## Role projektowe

| Rola | Zakres |
| --- | --- |
| Product Planner Agent | Struktura informacji, backlog, acceptance criteria, priorytety wdrożenia |
| Compliance Content Agent | Neutralny język medyczny, komunikaty o osobistym badaniu, ograniczenie ryzyka obietnicy wyniku wizyty |
| Frontend Implementation Agent | Next.js, TypeScript, Tailwind CSS, App Router, komponenty, responsywność |
| Privacy & Security Agent | Minimalizacja danych, formularz bez danych medycznych, cookies bez domyślnego śledzenia, brak narzędzi reklamowych |
| QA / Validation Agent | Build, lint, routing, skan treści, formularz, cookies, raport PASS/NEEDS FIX/HIGH RISK |

## Założenia architektoniczne

| Obszar | Decyzja |
| --- | --- |
| Framework | Next.js z App Router |
| Język | TypeScript |
| Style | Tailwind CSS, spokojny system wizualny: biel, jasna szarość, granat, medyczna zieleń |
| Renderowanie | Statyczne podstrony, bez backendu aplikacyjnego |
| Dane spółki | Jeden plik `src/config/companyConfig.ts` jako źródło danych rejestrowych i kontaktowych |
| Formularz | Komponent klientowy z walidacją frontend-only i neutralnym success message |
| Cookies | Baner z równorzędnymi opcjami akceptacji, odrzucenia i ustawień; domyślnie tylko niezbędne |
| Analityka | Brak realnej analityki; jedynie opis kategorii cookies |
| Tracking reklamowy | Brak pikseli, tagów i remarketingu |
| Dokumenty prawne | Treści przygotowane do finalnego review prawnika |

## Struktura stron

| Ścieżka | Cel |
| --- | --- |
| `/` | Strona główna z neutralnym opisem konsultacji |
| `/konsultacja` | Zakres konsultacji lekarskiej i zasady kwalifikacji |
| `/jak-wyglada-wizyta` | Przebieg wizyty stacjonarnej krok po kroku |
| `/dla-kogo` | Neutralny opis, dla kogo może być konsultacja |
| `/cennik` | Tabelaryczny cennik konsultacji |
| `/faq` | Odpowiedzi ograniczające ryzyko błędnych oczekiwań |
| `/kontakt` | Dane kontaktowe i formularz rezerwacyjny bez danych medycznych |
| `/polityka-prywatnosci` | Polityka prywatności |
| `/polityka-cookies` | Polityka cookies |
| `/regulamin-rezerwacji` | Regulamin rezerwacji wizyt |
| `/informacja-dla-pacjenta` | Informacje organizacyjne przed wizytą |

## Backlog i zakres

| ID | Zadanie | Priorytet | Acceptance criteria |
| --- | --- | --- | --- |
| E1-T1 | Utworzyć projekt Next.js + TypeScript + Tailwind | MUST | Projekt uruchamia build bez błędów |
| E1-T2 | Utworzyć `companyConfig.ts` | MUST | Dane spółki i ceny są w jednym pliku |
| E1-T3 | Utworzyć layout bazowy | MUST | Header, footer i main layout działają na każdej stronie |
| E1-T4 | Utworzyć routing podstron | MUST | Wszystkie wymagane ścieżki są dostępne |
| E2-T1 | Napisać neutralne treści strony głównej | MUST | Brak języka sprzedażowego i brak obietnicy wyniku wizyty |
| E2-T2 | Napisać stronę konsultacji | MUST | Strona jasno wskazuje osobiste badanie jako warunek decyzji lekarza |
| E2-T3 | Napisać stronę przebiegu wizyty | MUST | Flow jest stacjonarny i nie sugeruje zdalnej kwalifikacji |
| E2-T4 | Napisać FAQ | SHOULD | Odpowiedzi ograniczają błędne oczekiwania pacjentów |
| E2-T5 | Napisać informację dla pacjenta | SHOULD | Pacjent wie, co zabrać i czego nie wysyłać przez formularz |
| E3-T1 | Utworzyć `BookingContactForm` | MUST | Formularz zbiera wyłącznie dane kontaktowe i terminowe |
| E3-T2 | Dodać walidację formularza | MUST | Nie można wysłać pustego formularza |
| E3-T3 | Dodać ostrzeżenie przy formularzu | MUST | Komunikat o niewysyłaniu danych medycznych jest widoczny |
| E3-T4 | Dodać success message | MUST | Po wysłaniu pojawia się neutralny komunikat organizacyjny |
| E3-T5 | Dodać TODO dla backendu | SHOULD | Kod wskazuje miejsce na bezpieczny backend lub system rezerwacji |
| E4-T1 | Polityka prywatności | MUST | Zawiera administratora, cele, podstawy, odbiorców, retencję i prawa |
| E4-T2 | Polityka cookies | MUST | Opisuje kategorie cookies i brak narzędzi reklamowych |
| E4-T3 | Regulamin rezerwacji | MUST | Wyjaśnia, że opłata dotyczy konsultacji |
| E4-T4 | Nota o review prawnym | MUST | Każdy dokument prawny ma widoczną notę o finalnej weryfikacji |
| E5-T1 | Utworzyć `CookieConsent` | MUST | Są trzy równorzędne opcje pierwszej warstwy |
| E5-T2 | Kategorie cookies | MUST | Są kategorie: niezbędne, analityczne, marketingowe |
| E5-T3 | Domyślnie tylko niezbędne | MUST | Analityczne i marketingowe nie są aktywowane automatycznie |
| E5-T4 | Brak narzędzi reklamowych | MUST | W kodzie nie ma pikseli ani tagów reklamowych |
| E6-T1 | Sprawdzić niedozwolone frazy | MUST | Repo nie zawiera fraz wskazanych jako niedozwolone w wymaganiach |
| E6-T2 | Sprawdzić formularz | MUST | Nie ma pól na dane o stanie zdrowia |
| E6-T3 | Sprawdzić build | MUST | Build kończy się sukcesem |
| E6-T4 | Sprawdzić responsywność | SHOULD | Strona działa na mobile, tablet i desktop |
| E6-T5 | Sprawdzić dostępność | SHOULD | Semantyka i kontrast są sensowne dla wersji wdrożeniowej |
| E6-T6 | Przygotować raport walidacyjny | MUST | Raport ma statusy PASS/NEEDS FIX/HIGH RISK |

## Ryzyka i decyzje ograniczające ryzyko

| Ryzyko | Decyzja ograniczająca |
| --- | --- |
| Użytkownik może potraktować stronę jak gwarancję wyniku wizyty | Powtarzalny `ComplianceNotice` na kluczowych stronach |
| Formularz może prowokować do wpisania danych medycznych | Brak pola wiadomości i widoczny `RiskNotice` przy formularzu |
| Cennik może zostać odczytany jako opłata za efekt medyczny | `PriceTable` opisuje wyłącznie konsultacje i zawiera neutralną notę |
| Cookies mogą naruszać prywatność | Domyślnie aktywne tylko niezbędne, bez realnych trackerów |
| Dokumenty prawne mogą wymagać doprecyzowania | Wyraźna nota prawna i lista elementów do review prawnika |

## Plan walidacji

1. Build projektu.
2. Lint i kontrola typów w zakresie dostępnych skryptów.
3. Sprawdzenie istnienia wymaganych podstron i komponentów.
4. Skan repo pod kątem niedozwolonych fraz z wymagań.
5. Skan repo pod kątem pól medycznych w formularzu.
6. Skan repo pod kątem pikseli, tagów reklamowych i zewnętrznych trackerów.
7. Przegląd cookie bannera: trzy równorzędne opcje i domyślnie tylko niezbędne.
8. Podstawowy test responsywności i dostępności w przeglądarce.
9. Aktualizacja `VALIDATION_REPORT.md`.
10. Poprawki i ponowna walidacja.

## Definition of Done

Wersja jest zakończona, gdy istnieją wszystkie wymagane strony i komponenty, build przechodzi, dane placówki są w jednym pliku konfiguracyjnym, formularz nie zbiera danych medycznych, cennik dotyczy konsultacji, cookie banner nie aktywuje kategorii opcjonalnych domyślnie, w repo nie ma niedozwolonych fraz ani narzędzi reklamowych, a raport walidacyjny nie zawiera pozycji HIGH RISK.
