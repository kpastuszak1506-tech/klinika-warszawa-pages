# Raport walidacyjny

Data walidacji: 2026-07-10

## Podsumowanie

| Obszar | Status | Komentarz |
| --- | --- | --- |
| Build | PASS | `npm run build` zakończył się sukcesem. Wszystkie 16 tras App Router zostało wygenerowanych statycznie. |
| Lint | PASS | `npm run lint` nie zwrócił błędów. |
| Content validation | PASS | `npm run validate:content` sprawdził 27 wymaganych plików, zakazane frazy, trackery, pola wysokiego ryzyka i noty compliance na stronach krytycznych. |
| GitHub Pages export | PASS | `npm run build:pages` zakończył się sukcesem z `basePath` repozytorium. |
| Routing i semantyka | PASS | Wszystkie wymagane podstrony istnieją; każda z nich ma dokładnie jeden `h1`. |
| Formularz/rezerwacja | PASS | Usunięto pozorną wysyłkę. Aktualna strona nie zbiera ani nie przesyła danych, a moduł API/widgetu jest wyłączony do czasu zatwierdzonej integracji; przyszłe URL-e muszą być HTTPS i zgodne z zatwierdzoną domeną. |
| Cookies | PASS | Pierwsza warstwa zachowuje trzy równorzędne wybory. Zapis preferencji jest walidowany w `localStorage` pod nową wersją klucza; brak dodatkowych skryptów. |
| Zakazane frazy | PASS | Skan dokładnych fraz z briefu nie zwrócił trafień. |
| Tracking reklamowy | PASS | Skan identyfikatorów `gtag`, `fbq`, `ttq`, Google Tag Manager, Google Analytics, Clarity i Hotjar nie zwrócił trafień. |
| SEO techniczne | PASS | Dodano canonicale, Open Graph, Twitter metadata, `robots.txt` i `sitemap.xml`. Indeksowanie jest celowo wyłączone i wymaga jednocześnie `publicDataVerified` oraz `allowSearchIndexing`. |
| Dostępność | PASS | Dodano skip link, widoczne focus states, mobilne menu natywne oraz semantyczne linki `tel:` i `mailto:`. |
| UI/UX | PASS | Zweryfikowano desktop 1440 px oraz mobile 390 px przez Chrome DevTools. Na mobile `scrollWidth = 390`; nie stwierdzono poziomego overflow. |
| Wydajność obrazu | PASS | Hero image ma 231 KB w JPG zamiast 1,6 MB w PNG. |
| Dependency audit | NEEDS REVIEW | `npm audit --omit=dev` zgłasza 2 umiarkowane pozycje przez zagnieżdżony `postcss` w aktualnym `next@16.2.10`; brak pozycji high/critical i brak poprawnej aktualizacji bez wymuszonego downgrade. React oraz React DOM zaktualizowano do `19.2.7`. |
| Dane placówki i dokumenty prawne | NEEDS FIX | Dane administratora, rejestrowe, retencja, odbiorcy oraz warunki rezerwacji muszą zostać potwierdzone przez właściciela i prawnika przed uruchomieniem indeksowania lub rezerwacji online. |
| Integracja Medlife/Medfile | NEEDS FIX | W kodzie nie ma sekretów, iframe ani requestów do dostawcy. Przed aktywacją trzeba potwierdzić dokładny produkt, dokumentację API/widgetu, umowę powierzenia i bezpieczny serwerowy pośrednik. |

## Wykonane testy

| Test | Wynik |
| --- | --- |
| `npm run validate` | PASS |
| `npm run build:pages` | PASS |
| Kontrola wszystkich wymaganych tras | PASS |
| Kontrola jednego `h1` na trasę | PASS |
| Skan zakazanych fraz | PASS |
| Skan trackerów reklamowych | PASS |
| Test mobilnego menu | PASS, menu natywne otwiera się poprawnie |
| Test odrzucenia cookies | PASS, zapis `necessary: true`, `analytics: false`, `marketing: false` |
| Kontrola desktop 1440 px | PASS |
| Kontrola mobile 390 px | PASS, `scrollWidth = 390` |
| Kontrola canonicali i Open Graph | PASS, poprawna ścieżka GitHub Pages i brak końcowego ukośnika po pliku obrazu |
| Kontrola bramki SEO i adresu widgetu | PASS, podwójna flaga weryfikacji oraz walidacja HTTPS/zatwierdzonego originu |
| `npm audit --omit=dev` | NEEDS REVIEW, 2 moderate; 0 high; 0 critical |

## Wyniki compliance

* Treści nadal wskazują, że decyzję medyczną podejmuje lekarz po osobistym badaniu, a rezerwacja nie gwarantuje otrzymania recepty.
* Strona nie pobiera rozpoznań, diagnoz, leków, historii choroby, wyników badań, PESEL, załączników ani opisu stanu zdrowia.
* Brak Meta Pixel, TikTok Pixel, Google Ads remarketingu, kontenerów tagów i eventów konwersji.
* Opłata jest opisana jako opłata za konsultację, nie za wynik decyzji medycznej.
* Strona nie ładuje widgetu, iframe ani skryptu rezerwacyjnego, dopóki dostawca nie przejdzie osobnego procesu wdrożeniowego.

## Źródła do review prawnego i operacyjnego

* [Ustawa o działalności leczniczej, art. 14](https://isap.sejm.gov.pl/isap.Nsf/download.xsp/WDU20230000991/O/D20230991.pdf): informacja o świadczeniach nie może mieć cech reklamy.
* [RODO, art. 13](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32016R0679): zakres obowiązku informacyjnego przy zbieraniu danych od osoby, której dane dotyczą.
* [Prawo komunikacji elektronicznej](https://eli.sejm.gov.pl/eli/DU/2024/1221/ogl/pol): punkt odniesienia dla oceny mechanizmu zgód na informacje przechowywane na urządzeniu.
* [Rejestr RPWDL](https://rpwdl2.ezdrowie.gov.pl/informacja-o-rejestrze): źródło do weryfikacji wpisu, adresu i danych podmiotu wykonującego działalność leczniczą.
* [API rejestracji Medfile](https://www.medfile.pl/api-do-rejestracji-online): publiczna dokumentacja odnaleziona dla produktu Medfile; nazwa „Medlife” wymaga potwierdzenia przed integracją.

## Pozycje NEEDS FIX

1. Dostarczyć potwierdzone dane prawne i rejestrowe placówki, a następnie ustawić `publicDataVerified` i `allowSearchIndexing` zgodnie ze stanem faktycznym.
2. Zatwierdzić finalne polityki prywatności, cookies i regulamin z prawnikiem po określeniu procesu rezerwacji.
3. Potwierdzić, czy planowany dostawca to Medlife czy Medfile, oraz ustalić bezpieczny model integracji z serwerowym pośrednikiem.
4. Monitorować advisory `next -> postcss` do czasu wydania poprawki bez regresji.

## Pozycje HIGH RISK

Brak wysokiego ryzyka w aktualnym kodzie, ponieważ indeksowanie jest wyłączone, a rezerwacja online i transmisja danych są nieaktywne. Uruchomienie tych funkcji bez zamknięcia pozycji `NEEDS FIX` byłoby nieakceptowalne.
