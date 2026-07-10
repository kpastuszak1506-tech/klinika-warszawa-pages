# Raport walidacyjny

Data walidacji: 2026-07-10

## Podsumowanie

| Obszar | Status | Komentarz |
| --- | --- | --- |
| Build | PASS | `npm run build` zakończył się sukcesem. Wszystkie wymagane ścieżki zostały wygenerowane jako statyczne. |
| Lint | PASS | `npm run lint` zakończył się bez błędów. |
| Routing | PASS | Dostępne są: `/`, `/konsultacja`, `/jak-wyglada-wizyta`, `/dla-kogo`, `/cennik`, `/faq`, `/kontakt`, `/polityka-prywatnosci`, `/polityka-cookies`, `/regulamin-rezerwacji`, `/informacja-dla-pacjenta`. |
| Zakazane frazy | PASS | Skan dokładnych fraz z briefu nie zwrócił trafień poza wykluczonymi katalogami technicznymi. |
| Formularz | PASS | Formularz zbiera wyłącznie dane kontaktowe i organizacyjne. Brak `textarea`, uploadu, PESEL i pól medycznych. |
| Cookies | PASS | Pierwsza warstwa ma trzy równorzędne opcje. Domyślnie aktywne są tylko cookies niezbędne. |
| Tracking reklamowy | PASS | Skan identyfikatorów narzędzi śledzących w `src`, `public` i dokumentacji projektu nie zwrócił trafień. |
| Compliance content | PASS | Kluczowe strony zawierają komunikat o osobistym badaniu i braku gwarancji otrzymania recepty. |
| Dostępność i responsywność | PASS | Sprawdzono desktop 1440 px i mobile 390 px. Brak poziomego overflow w teście produkcyjnym. |
| Iteracja wizualna | PASS | Przebudowano pierwszy ekran w kierunku editorial healthcare inspirowanym selekcją Awwwards: floating header, wielka typografia, warstwowy hero image, kontrolowany bridge-overlap widgetu, ambient grid i motion/reveal z obsługą `prefers-reduced-motion`. |
| Przygotowanie widgetu rezerwacji | PASS | Dodano provider-neutralny `BookingWidgetSlot` w pierwszym ekranie strony głównej i konfigurację `bookingWidget` bez domyślnego ładowania iframe, skryptów lub cookies stron trzecich. |
| Dane rejestrowe | PASS | `companyConfig.ts` jest uzupełniony danymi placówki, a KRS nie jest już elementem konfiguracji ani UI. |
| GitHub Pages | PASS | Repo `kpastuszak1506-tech/klinika-warszawa-pages` zostało opublikowane przez workflow GitHub Actions. Publiczny URL odpowiada `HTTP 200`. |
| Dependency audit | NEEDS REVIEW | `npm audit` zgłasza 2 umiarkowane pozycje przez zagnieżdżony `postcss` w `next@16.2.10`. Automatyczna poprawka proponuje nieakceptowalny downgrade, więc zależność należy monitorować. Brak pozycji high/critical. |

## Wykonane komendy i testy

| Test | Wynik |
| --- | --- |
| `npm run lint` | PASS |
| `npm run build` | PASS |
| `npm run build:pages` | PASS |
| GitHub Actions: `Deploy to GitHub Pages` | PASS |
| Smoke test `https://kpastuszak1506-tech.github.io/klinika-warszawa-pages/` | PASS, `HTTP 200` |
| Skan fraz z briefu przez `rg` | PASS |
| Skan identyfikatorów trackerów przez `rg` | PASS |
| Skan formularza pod kątem pól medycznych | PASS |
| Test produkcyjny na `http://localhost:3002` | PASS |
| Test produkcyjny na `http://localhost:3004` po iteracji Awwwards-inspired | PASS |
| Test produkcyjny na `http://localhost:3004` po redesignie hero i widgetu | PASS |
| Formularz: wymagane pola, checkboxy i success message | PASS |
| Cookies: odrzucenie wszystkich opcjonalnych kategorii | PASS |

## Wyniki testu przeglądarkowego

| Element | Wynik |
| --- | --- |
| Desktop | `documentElement.scrollWidth = 1440`, `viewport = 1440`, widget top = 73 px |
| Mobile | `documentElement.scrollWidth = 390`, `viewport = 390`, widget top = 199 px |
| Cookie banner | Widoczne opcje: `Akceptuję wszystkie`, `Odrzucam wszystkie`, `Ustawienia` |
| Odrzucenie cookies | Zapis: `necessary: true`, `analytics: false`, `marketing: false` |
| Formularz przed wysłaniem | Wszystkie wymagane pola i checkboxy poprawnie uzupełnione |
| Formularz po wysłaniu | Widoczny neutralny komunikat sukcesu i reset pól |
| Slot widgetu | Widoczny jako bridge-panel przenikający tekst i media w hero oraz na stronie kontaktu; `iframe` count = 0 przy konfiguracji domyślnej |

## Pozycje NEEDS FIX

Brak pozycji blokujących.

## Pozycje HIGH RISK

Brak.

## Ryzyka pozostałe

- Dane rejestrowe i ceny są uzupełnione w konfiguracji; przed publikacją produkcyjną trzeba potwierdzić je z faktycznymi rejestrami placówki.
- Dokumenty prawne wymagają finalnego review prawnika.
- Przed podłączeniem backendu rezerwacji trzeba doprecyzować retencję, uprawnienia, antyspam, umowy powierzenia i bezpieczny kanał komunikacji.
- Advisory zależności `next -> postcss` wymaga monitorowania do czasu poprawki w bezpiecznej wersji Next.js.
- Przed włączeniem realnego widgetu rezerwacji należy zatwierdzić dostawcę, zakres danych, umowy powierzenia, retencję, treść polityk i podstawę prawną transferów danych.

## Rekomendacja

Wersja jest akceptowalna technicznie i compliance-contentowo do finalnego review biznesowego oraz prawnego. Nie rekomenduje się publikacji produkcyjnej przed formalnym review dokumentów prawnych i potwierdzeniem danych placówki.
