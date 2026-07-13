# Inwentarz tresci

Data stanu: 2026-07-13. `HIDE` oznacza ukrycie publiczne i nawigacyjne, nie usuniecie rekordu z repozytorium. Dokument zachowuje fakty audytu artykulow i rozdziela lokalne demo od eksportu produkcyjnego.

Finalny rerun walidacji zakonczyl sie PASS.

## Audyt redakcyjny

| Obszar | Decyzja |
| --- | --- |
| `/informacja-dla-pacjenta` | MERGE / REDIRECT do `/jak-wyglada-wizyta`, kanonicznej strony przygotowania. |
| Tresci organizacyjne wizyty | KEEP na stronie kanonicznej; nie zbierac danych medycznych w formularzu. |
| Cennik | KEEP; ceny 300/200 sa tylko lokalnym demo, bez kwot w eksporcie. |
| Dokumenty prawne | KEEP / LEGAL REVIEW; wersje robocze wymagaja review prawnika. |
| Huby tematow | HIDE w eksporcie. |
| `jak-wyglada-konsultacja-kwalifikacyjna`, `przygotowanie-do-wizyty-stacjonarnej`, `prawo-do-informacji-i-dokumentacji` | MERGE po review. |
| Pozostale 4 artykuly | KEEP DRAFT; wymagaja review medycznego. |

## Finalny stan wedlug trybu

| Obszar | Lokalny development demo | Eksport produkcyjny/static |
| --- | --- | --- |
| Ceny | Widoczne ceny demonstracyjne 300 i 200. | Ceny ukryte. |
| Artykuly | Wszystkie 7 podgladow edukacyjnych jest widocznych. | Drafty ukryte; `publicKnowledgeArticles=0`. |
| Publikacja | Brak pushu do GitHub i brak publikacji publicznej. | `publicDataVerified=false`, `allowSearchIndexing=false`; brak draft schema, sitemap i indeksowania. |
| Draft route | 200, podglad bez schema `Article`. | Brak publicznego draft route/schema. |
| Rezerwacja | Widget disabled. Komunikat: "Rezerwacja online zostanie udostepniona przed rozpoczeciem przyjmowania pacjentow." | Ten sam disabled fallback; brak aktywnego procesu. |
| Formularz | Tylko dane kontaktowe i organizacyjne. | Tylko dane kontaktowe i organizacyjne. |
| Hero | Nieoprawione asymetryczne kadrowanie obrazu i subtelny wewnetrzny parallax z reduced motion. | Ten sam layout bez publikacji danych. |

## Artykuly i zrodla

Wszystkie 7 rekordow ma status `review-required`, brak autora, recenzenta i dat review. Kazdy ma 4 zrodla; razem 28 zrodel i 111 strukturalnie rozwiazywalnych `citationIds`. Strukturalna spojnosc nie zastapi review medycznego ani weryfikacji dopasowania zrodlo-twierdzenie.

| Status audytu | Slugi |
| --- | --- |
| MERGE | `jak-wyglada-konsultacja-kwalifikacyjna`, `przygotowanie-do-wizyty-stacjonarnej`, `prawo-do-informacji-i-dokumentacji` |
| KEEP DRAFT | `jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej`, `bezpieczenstwo-i-rozmowa-z-lekarzem`, `terapia-kannabinoidowa-a-przewlekly-bol`, `cbd-thc-i-leki-kannabinoidowe` |

## Mapa routow

Publiczne i neutralne pozostaja `/`, `/konsultacja`, `/jak-wyglada-wizyta`, `/dla-kogo`, `/cennik`, `/faq` i `/kontakt` bez produkcyjnych danych spolki. Dokumenty `/polityka-prywatnosci`, `/polityka-cookies` i `/regulamin-rezerwacji` sa robocze. `/wiedza` jest lokalnym podgladem, a w eksporcie shellem bez artykulow; drafty nie sa publiczne. Formularz nie zbiera danych medycznych, a tresci zachowuja informacje, ze decyzje podejmuje lekarz po osobistym badaniu pacjenta.

## Braki i warunki publikacji

Brakuje potwierdzonej nazwy spolki, adresu, telefonu, e-maila, RPWDL, lekarza, cen produkcyjnych, czasu wizyty, polityki anulowania, bookingu i EDM. Przed publikacja trzeba uzupelnic i zweryfikowac dane w `src/config/companyConfig.ts`, wykonac review prawne dokumentow i review medyczne 7 artykulow oraz ustalic bezpieczny proces bookingu bez danych medycznych w formularzu. Dopiero potem mozna rozwazyc publiczne artykuly, schema `Article`, sitemap i indeksacje.

## Walidacja koncowa

- `npm install`: PASS, up to date.
- `npm run lint`: PASS.
- `npm run validate:content`: PASS.
- `npm run validate`: PASS; production Next build wygenerowal 19 stron statycznych.
- `npm run build:pages`: PASS; `validate-export`: PASS dla HTML, redirect, canonical, robots i linkow `basePath`.
- `node /tmp/clinic-browser-qa.mjs`: PASS, 23 checked, zero failures.
- `node /tmp/clinic-cookie-qa.mjs`: PASS, zero failures.
- `git diff --check`: PASS.

Pierwsza nieuprzywilejowana proba `npm run validate` zostala zablokowana przez sandbox przy probie zbindowania portu Turbopack. Dozwolony rerun przeszedl pomyslnie; nie jest to defekt produktu.
