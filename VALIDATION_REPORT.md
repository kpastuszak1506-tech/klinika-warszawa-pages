# Raport walidacyjny

Data stanu: 2026-07-13. Raport rozdziela lokalne demo od eksportu produkcyjnego. Finalny rerun zakonczony PASS.

## Rozdzielenie demo i produkcji

| Zakres | Lokalny browser demo | Eksport produkcyjny/static |
| --- | --- | --- |
| Ceny | Widoczne ceny demonstracyjne: 300 i 200. | Ceny pozostaja ukryte. |
| Wiedza | Widoczne sa podglady wszystkich 7 roboczych artykulow edukacyjnych. To tryb lokalny. | Drafty pozostaja ukryte; brak draft schema, sitemap i indeksowania. |
| Publikacja | Brak push do GitHub i brak publikacji publicznej. | `publicDataVerified=false`, `allowSearchIndexing=false`; brak publikacji. |

## Wyniki komend

| Komenda | Status | Komentarz |
| --- | --- | --- |
| `npm install` | PASS | Up to date. |
| `npm run lint` | PASS | Brak bledow lint. |
| `npm run validate:content` | PASS | Walidacja tresci zakonczona powodzeniem. |
| `npm run validate` | PASS | Production Next build wygenerowal 19 stron statycznych. |
| `npm run build:pages` | PASS | Eksport stron zakonczony powodzeniem. |
| `validate-export` | PASS | HTML, redirect, canonical, robots i linki z `basePath` sa poprawne. |
| `node /tmp/clinic-browser-qa.mjs` | PASS | 23 checked, zero failures. |
| `node /tmp/clinic-cookie-qa.mjs` | PASS | Zero failures. |
| `git diff --check` | PASS | Brak bledow bialych znakow. |

Pierwsza nieuprzywilejowana proba `npm run validate` zostala zablokowana przez sandbox przy probie zbindowania portu Turbopack. Dozwolony rerun zakonczyl sie powodzeniem; nie jest to defekt produktu.

## Routing i browser QA

- Sprawdzono 23 kombinacje route/viewport dla 320, 390, 1024 i 1440; zero failures.
- Brak overflow, placeholderow `tel:`/`mailto:` i bledow error overlay.
- Lokalne ceny i karty draftow sa obecne.
- Lokalny draft route zwraca 200 i nie zawiera schema `Article`.
- `publicKnowledgeArticles=0` i `publicKnowledgeTopics=0` w eksporcie produkcyjnym; brak draft schema, draft sitemap i indeksowania.

## Tresc, rezerwacja i motion

- Pelny disabled booking fallback brzmi: "Rezerwacja online zostanie udostepniona przed rozpoczeciem przyjmowania pacjentow."
- Formularz pozostaje organizacyjny i nie zbiera danych medycznych.
- Hero uzywa nieoprawionego, asymetrycznego kadrowania obrazu oraz subtelnego wewnetrznego parallaxu uwzgledniajacego reduced motion.

## Walidacja wiedzy i blokery

Jest 7 artykulow `review-required`, po 4 zrodla na artykul, razem 28 zrodel i 111 strukturalnie rozwiazywalnych `citationIds`. To walidacja strukturalna, nie review medyczne. Wszystkie artykuly nadal wymagaja oceny lekarza, autora, recenzenta, dat review, dat zrodel i sprawdzenia dopasowania zrodlo-twierdzenie.

`publicDataVerified=false`, `legalDocumentsReviewed=false` i `allowSearchIndexing=false` pozostaja blokadami. Dokumenty prawne sa robocze i wymagaja review prawnika. Produkcyjna publikacja, indeksacja oraz aktywacja bookingu pozostaja wstrzymane. Nie ma publicznego HIGH RISK w aktualnym stanie.

## Nota biezacej iteracji

- Naprawiono zrodlo tytulu ProcessSlider, filtr duplikatow plikow oraz walidacje lokalnych placeholderow; `npm run validate:content` i `git diff --check` pozostaja PASS.
- Copy procesu zmieniono na „Od rezerwacji do zalecen” i dodano nowy, naturalny lede.
- Scentralizowane lokalne dane demonstracyjne firmy, kontaktu i rejestru sa renderowane w stopce oraz na `/kontakt`, z jawnym badge demo. Przy niezweryfikowanym eksporcie produkcyjnym dane przyjmuja `null`, bez linkow `tel:`/`mailto:`.
- Potwierdzona nazwa oprogramowania to Medfile. Konfiguracja akceptuje wylacznie publiczny adres HTTPS na `medfile.pl` lub subdomenie; gotowosc wymaga rowniez `publicDataVerified`. Po stronie klienta nie jest przechowywany token ani sekret API. Adapter/slot jest przygotowany i oczekuje na publiczny URL rezerwacji; widget Medfile nie jest aktywny. Slot pozostaje wysoko w hero i w pelnym ukladzie na `/kontakt`.
- Browser QA: 23 kombinacje route/viewport dla 320, 390, 1024 i 1440, PASS, bez overflow i bledow; oczekiwany jest jeden lokalny link telefonu i jeden lokalny link e-mail.

### Iteracja: pionowy stos folderow

- Pionowy stos folderow jest funkcjonalny: slot rezerwacji znajduje sie w `01`, checklista przygotowania w `02`, checklista oceny w `03`, a sciezka po wizycie/wiedzy w `04`.
- Usunieto booking overlay z hero; aktywny folder jest podnoszony, aby linki pozostawaly klikalne; skorygowano offset podpisu hero.
- Folder structural QA: PASS dla 320/360/390/430/1024/1440.
- Scroll/occlusion QA: PASS dla 12 stanow aktywnego folderu.
- Pelna regresja browserowa: 23 checks PASS. `npm run lint`: PASS. `validate:content`: PASS. `build:pages` i export validator: PASS.
