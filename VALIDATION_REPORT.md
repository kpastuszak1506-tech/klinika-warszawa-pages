# Raport walidacyjny

Data stanu: 2026-07-13
Zakres: finalizacja dokumentacji na podstawie zapisanych wynikow walidacji i runtime QA. Ten raport nie potwierdza publicznego wdrozenia ani commita.

## Status wykonania

Wymagane komendy maja zapisany wynik **PASS**; Sol wykona je ponownie jako koncowe potwierdzenie po tej aktualizacji dokumentacji.

| Komenda | Zapisany wynik | Uwagi |
| --- | --- | --- |
| `npm install` | PASS | Lockfile i zaleznosci zostaly zweryfikowane. |
| `npm run lint` | PASS | Brak bledow i ostrzezen ESLint. |
| `npm run validate:content` | PASS | 35 wymaganych plikow; brak zakazanych fraz, trackerow i pol medycznych w rezerwacji. |
| `npm run validate` | PASS | Lint, walidacja tresci i produkcyjny build Next.js zakonczone powodzeniem. |
| `npm run build:pages` | PASS | Statyczny eksport GitHub Pages zakonczony powodzeniem. |

Build generuje **24 trasy**. Wymagane podstrony istnieja, a kazda ma dokladnie jeden `h1`.

## Runtime i screenshoty

| Obszar | Wynik | Dowod |
| --- | --- | --- |
| Matryca 9 viewportow | PASS | `320x568`, `360x800`, `390x844`, `430x932`, `768x1024`, `1024x768`, `1280x800`, `1440x900`, `1920x1080`; HTTP 200 i brak poziomego overflow. |
| CTA w pierwszym widoku | PASS | Drugi przebieg naprawil trzy wczesniejsze P1: `320x568` 455.0469055175781-503.0469055175781 px, `1024x768` 559.015625-625.015625 px, `1280x800` 569.46875-635.46875 px. |
| Proces i dostepnosc | PASS | `aria-current` przechodzi kolejno przez wszystkie cztery kroki na `390x844` i `1440x900`. |
| Screenshot matrix | PASS | 76 PNG w `artifacts/final`: pelne strony, sekcje i stany otwartego menu. |
| Bledy runtime | PASS | Brak `console.error`, `pageerror`, tekstu runtime error lub dialogu bledu Next w zapisanej matrycy. |

## 3D, motion i fallback

| Obszar | Wynik | Dowod |
| --- | --- | --- |
| Clinical Pathway | PASS | Prawdziwy renderer WebGL, cztery zsynchronizowane stany procesu i aktywna obsluga pointera na desktopie. |
| Bloom | PASS | High tier na `1024x768`, `1280x800` i `1440x900` ma `bloom=true`; balanced tier nie wlacza bloom. |
| Fallback | PASS | Post-fix `320x568` rejestruje status fallback; reduced motion i mock `saveData` uzywaja statycznego renderera bez canvasa. |
| Motion | PASS | Reveal/stagger, animacja procesu, kamera 3D, pointer parallax, menu, CTA i FAQ respektuja `prefers-reduced-motion`. |
| Lifecycle | PASS | Renderowanie 3D jest wstrzymywane poza viewportem; scena nie przechwytuje touch/pointer (`pointer-events: none`). |

## Interakcje i tresc

| Obszar | Wynik | Dowod |
| --- | --- | --- |
| Cookies | PASS | Trzy rownorzedne decyzje; odrzucenie utrwala `necessary=true`, `analytics=false`, `marketing=false`; ustawienia otwieraja sie z footera. Nie pozostaje cookie FAB. |
| Menu mobilne | PASS | Target 44x44 px, trap fokusu oraz zamykanie przez Escape, backdrop i link. |
| Dostepnosc | PASS | Skip link, widoczne focus states, semantyczne `tel:`/`mailto:`, minimum 16 px tekstu mobilnego i prawidlowa zmiana `aria-current`. |
| Rezerwacja i prywatnosc | PASS | Brak pozornej wysylki, danych o zdrowiu, sekretow, iframe i requestow do dostawcy przed zatwierdzona integracja. |
| Tresc i compliance | PASS | Brak zakazanych fraz i trackerow; jezyk pozostaje neutralny, bez gwarancji efektu lub recepty. |

## Wydajnosc

| Artefakt | Raw | gzip | Ocena |
| --- | ---: | ---: | --- |
| Asynchroniczny chunk 3D | 558,597 B | 138,110 B | PASS; ladowany poza krytycznym bundlem. |
| CSS | 62,006 B | 13,068 B | PASS. |

## Pozostale ryzyka i wymagane review

Nie ma pozycji **HIGH RISK** w aktualnym kodzie. Pozostaja wylacznie ryzyka niezalezne od implementacji:

1. Dane prawne, rejestrowe i kontaktowe podmiotu wymagaja potwierdzenia przez wlasciciela oraz w RPWDL przed wlaczeniem indeksowania.
2. Polityka prywatnosci, cookies, regulamin, retencja, odbiorcy i proces rezerwacji wymagaja finalnego review prawnika dla faktycznego flow.
3. Nalezy potwierdzic dostawce Medlife/Medfile, dokumentacje, umowe powierzenia i model bezpiecznego serwerowego posrednika przed aktywacja rezerwacji online.
4. Test na fizycznym iPhonie pozostaje do wykonania przed wydaniem, w szczegolnosci dla WebGL, touch, safe-area i fallbacku wydajnosciowego.

Historia SEO pozostaje aktualna: canonicale, Open Graph, Twitter metadata, `robots.txt`, `sitemap.xml`, breadcrumbs, huby wiedzy i cztery materialy statyczne sa gotowe technicznie. Indeksowanie oraz Article JSON-LD pozostaja zablokowane do potwierdzenia danych publicznych i review merytorycznego/prawnego.

## Zrodla do review prawnego i operacyjnego

* [Ustawa o dzialalnosci leczniczej, art. 14](https://isap.sejm.gov.pl/isap.Nsf/download.xsp/WDU20230000991/O/D20230991.pdf)
* [RODO, art. 13](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32016R0679)
* [Prawo komunikacji elektronicznej](https://eli.sejm.gov.pl/eli/DU/2024/1221/ogl/pol)
* [Rejestr RPWDL](https://rpwdl2.ezdrowie.gov.pl/informacja-o-rejestrze)
* [API rejestracji Medfile](https://www.medfile.pl/api-do-rejestracji-online) - nazwa Medlife wymaga niezaleznego potwierdzenia.
