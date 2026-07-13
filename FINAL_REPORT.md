# Raport koncowy

Data stanu: 2026-07-13. Raport opisuje rozdzielenie lokalnego demo i eksportu produkcyjnego. Nie oznacza publikacji ani pushu do GitHub. Finalny rerun walidacji zakonczyl sie PASS.

## Podsumowanie

- Lokalny demo pokazuje ceny 300/200 oraz podglady wszystkich 7 roboczych artykulow edukacyjnych. Jest przeznaczony wylacznie do developmentu.
- Eksport produkcyjny/static ukrywa ceny i drafty; nie generuje draft schema, draft sitemap ani indeksowania wiedzy.
- `publicDataVerified=false`, `legalDocumentsReviewed=false`, `allowSearchIndexing=false`; produkcyjna publikacja pozostaje zablokowana.
- Zachowano neutralny jezyk medyczny i informacje, ze decyzje podejmuje lekarz po osobistym badaniu pacjenta.
- Booking pozostaje wylaczony. Pelny fallback brzmi: "Rezerwacja online zostanie udostepniona przed rozpoczeciem przyjmowania pacjentow."
- `/informacja-dla-pacjenta` przekierowuje do `/jak-wyglada-wizyta`; huby tematow sa ukryte w eksporcie.

## Routing i QA

Sprawdzono 23 kombinacje route/viewport dla 320, 390, 1024 i 1440: zero failures, brak overflow, placeholderow `tel:`/`mailto:` i bledow runtime. Lokalne ceny i karty draftow byly obecne. Lokalny draft route zwraca 200 i nie zawiera schema `Article`. W eksporcie `publicKnowledgeArticles=0`, `publicKnowledgeTopics=0`, brak draft schema/sitemap/indexing, a robots ma `Disallow: /`.

Hero korzysta z nieoprawionego asymetrycznego kadrowania obrazu oraz subtelnego wewnetrznego parallaxu z obsluga reduced motion.

## Audyt artykulow

W repozytorium pozostaje 7 rekordow `review-required`, kazdy z 4 zrodlami: razem 28 zrodel i 111 rozwiazywalnych strukturalnie `citationIds`. Wszystkie wymagaja rzeczywistego review medycznego, autora, recenzenta, dat zrodel i dat review oraz sprawdzenia dopasowania zrodlo-twierdzenie. Decyzje audytowe: MERGE `jak-wyglada-konsultacja-kwalifikacyjna`, `przygotowanie-do-wizyty-stacjonarnej`, `prawo-do-informacji-i-dokumentacji`; KEEP DRAFT pozostalych czterech. Lokalne podglady nie sa publikacja.

## Walidacja

Finalna walidacja: `npm install` PASS, up to date; `npm run lint` PASS; `npm run validate:content` PASS; `npm run validate` PASS z production Next build generujacym 19 stron statycznych; `npm run build:pages` PASS; `validate-export` PASS dla HTML, redirect, canonical, robots i linkow `basePath`; `node /tmp/clinic-browser-qa.mjs` PASS, 23 checked i zero failures; `node /tmp/clinic-cookie-qa.mjs` PASS, zero failures; `git diff --check` PASS.

Pierwsza nieuprzywilejowana proba `npm run validate` nie mogla zbindowac portu Turbopack z powodu sandboxa. Dozwolony rerun przeszedl; nie jest to defekt produktu.

## Pozostale blokery

Brakuje potwierdzonych danych spolki, adresu, telefonu, e-maila, RPWDL, lekarza, cen produkcyjnych, czasu wizyty, polityki anulowania, bookingu i EDM. Dokumenty prywatnosci, cookies i regulamin rezerwacji sa robocze i wymagaja review prawnika. Booking wymaga ustalenia dostawcy, zakresu danych i bezpiecznego procesu. Brak publicznego HIGH RISK, ale publikacja wymaga uzupelnienia danych oraz review prawnego i medycznego.

## Nota biezacej iteracji

- Copy procesu zmieniono na „Od rezerwacji do zalecen” i dodano nowy, naturalny lede.
- Scentralizowane lokalne dane demonstracyjne firmy, kontaktu i rejestru sa renderowane w stopce oraz na `/kontakt`, z jawnym badge demo. Przy niezweryfikowanym eksporcie produkcyjnym dane przyjmuja `null`, bez linkow `tel:`/`mailto:`.
- Potwierdzona nazwa oprogramowania to Medfile. Konfiguracja akceptuje wylacznie publiczny adres HTTPS na `medfile.pl` lub subdomenie; gotowosc wymaga rowniez `publicDataVerified`. Po stronie klienta nie jest przechowywany token ani sekret API. Adapter/slot jest przygotowany i oczekuje na publiczny URL rezerwacji; widget Medfile nie jest aktywny. Slot pozostaje wysoko w hero i w pelnym ukladzie na `/kontakt`.
- Browser QA: 23 kombinacje route/viewport dla 320, 390, 1024 i 1440, PASS, bez overflow i bledow; oczekiwany jest jeden lokalny link telefonu i jeden lokalny link e-mail.
- `npm run lint` PASS, `npm run validate:content` PASS, `npm run validate` PASS (19 stron statycznych), `npm run build:pages` PASS, `validate-export` PASS oraz `git diff --check` PASS.

### Iteracja: pionowy stos folderow

- Pionowy stos folderow jest funkcjonalny: slot rezerwacji znajduje sie w `01`, checklista przygotowania w `02`, checklista oceny w `03`, a sciezka po wizycie/wiedzy w `04`.
- Usunieto booking overlay z hero; aktywny folder jest podnoszony, aby linki pozostawaly klikalne; skorygowano offset podpisu hero.
- Folder structural QA: PASS dla 320/360/390/430/1024/1440; scroll/occlusion QA: PASS dla 12 stanow aktywnego folderu.
- Pelna regresja browserowa: 23 checks PASS. `npm run lint`: PASS. `validate:content`: PASS. `build:pages` i export validator: PASS.
