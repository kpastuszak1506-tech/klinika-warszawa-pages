# Gate 0 - Baseline UI Audit

Data audytu: 2026-07-12
Repo: `/Users/krzysztofpastuszak/Documents/Codex/Klinika -stronka`
Zakres: audyt bazowy bez zmian w kodzie aplikacji.

## Stan repo

- `pwd`: `/Users/krzysztofpastuszak/Documents/Codex/Klinika -stronka`
- Branch/HEAD: `main` / `5be24e0` (`Document token-efficient agent workflow`)
- `main` jest zgodny z `origin/main`.
- Przed audytem obecne były nieśledzone pliki użytkownika, m.in. `FINAL_REPORT 2.md`, `PROJECT_PLAN 2.md`, kopie plików `src/* 2.*` oraz `scripts/validate-site 2.mjs`. Nie zostały cofnięte, zmienione ani dodane do indeksu.

Ostatnie pięć commitów:

1. `5be24e0` Document token-efficient agent workflow
2. `e332f80` Refine content density and responsive typography
3. `df53be8` Complete SEO foundation and premium mobile redesign
4. `568eccc` Build SEO knowledge hub foundation
5. `1dcc9de` Polish clinic design and release safeguards

## Gate komend

| Polecenie | Wynik | Notatka |
| --- | --- | --- |
| `npm install` | PASS | Zależności aktualne; `npm audit` raportuje 2 podatności moderate. |
| `npm run lint` | PASS | ESLint bez błędów i ostrzeżeń. |
| `npm run validate:content` | PASS | 35 wymaganych plików; brak zakazanych fraz, trackerów i pól medycznych w rezerwacji. |
| `npm run validate` | PASS | Lint, walidacja treści i produkcyjny `next build` ukończone. |
| `npm run build:pages` | PASS | Statyczny build GitHub Pages ukończony. |

Pierwsze uruchomienie `npm install` oraz produkcyjnego builda w sandboxie zostało zatrzymane przez `EPERM` dla `package-lock.json` i `.next/trace`; po zatwierdzonym uruchomieniu poza sandboxem obie operacje przeszły poprawnie. To ograniczenie środowiska audytowego, nie błąd projektu.

Build Next.js 16.2.10 (Turbopack) wygenerował 24 strony: trasy statyczne oraz SSG dla 4 artykułów i 3 tematów wiedzy.

## Artefakty builda

Wariant `build:pages`, katalog `.next/static/chunks`:

| Chunk JS | Raw | gzip |
| --- | ---: | ---: |
| `0iec5q4ack_04.js` | 227,315 B | 70,997 B |
| `141mz92lvo4yx.js` | 149,997 B | 40,566 B |
| `0cz1d0mv5g_q7.js` | 112,594 B | 39,490 B |
| `14mrh2-p_w84d.js` | 54,646 B | 12,880 B |
| `15orcrkp-_9ct.js` | 50,702 B | 10,581 B |
| pozostałe 6 chunków | 68,988 B | 25,697 B |
| **Łącznie JS** | **664,242 B** | **194,918 B** |

CSS: `3ob0b2v-qicmf.css`, 42,124 B raw. Wartości gzip dotyczą kompresji lokalnej plików chunków; nie są per-route network payloadem.

## Inwentaryzacja UI

Komponenty w `src/components`: `BookingContactForm`, `BookingWidgetSlot`, `Breadcrumbs`, `ClinicalOrbit`, `CompanyDetails`, `ComplianceNotice`, `CookieConsent`, `CTAButton`, `FAQ`, `Footer`, `Header`, `KnowledgeArticleLayout`, `KnowledgeCard`, `KnowledgeTopicCard`, `LegalPageLayout`, `PriceTable`, `ProcessSteps`, `RiskNotice`, `ScrollProgress`, `SectionHeading`.

Elementy animowane i interaktywne:

- Hero używa wejścia `reveal-up` (760 ms) dla eyebrow, H1 i opisu; CTA ma podniesienie oraz przesunięcie strzałki na hover.
- `ScrollProgress` aktualizuje pasek przez pasywny listener scroll + `requestAnimationFrame`.
- `ProcessSteps` wybiera aktywny krok przez `IntersectionObserver`; emituje `clinical-process-step`, który synchronizuje `ClinicalOrbit`.
- `ClinicalOrbit` ma 3D tilt reagujący na pointer tylko od 768 px wzwyż i wyłącza go dla `prefers-reduced-motion`.
- FAQ, nagłówek/menu, tabela cen, karty wiedzy oraz formularze mają przejścia hover/focus; FAQ obraca ikonę po otwarciu.
- CSS globalnie obsługuje `prefers-reduced-motion`: wyłącza smooth scrolling i redukuje animacje/przejścia do `0.00001s`.

## Pomiary responsywności

Metoda: Chromium 140 (Playwright), lokalny `next dev` na `127.0.0.1:3000`, czysty kontekst dla każdego viewportu, `networkidle`, pomiar DOM strony głównej z początkowym oraz rozwiniętym panelem cookies. `overflow` oznacza `max(documentElement.scrollWidth, body.scrollWidth) - viewport width`.

| Viewport | Overflow | Hero (w x h) | Process steps (w x h) | Cookies start | Cookies: ustawienia |
| --- | ---: | ---: | ---: | ---: | ---: |
| 320x568 | 0 px | 320 x 1207.7 px | 280 x 706.4 px | 171.5 px | 408.5 px |
| 360x800 | 0 px | 360 x 1179.7 px | 320 x 619.6 px | 167.4 px | 384.4 px |
| 390x844 | 0 px | 390 x 1151.7 px | 350 x 619.6 px | 150.8 px | 347.8 px |
| 430x932 | 0 px | 430 x 1151.7 px | 390 x 554.6 px | 150.8 px | 327.8 px |
| 768x1024 | 0 px | 768 x 1370.8 px | 728 x 461 px | 235 px | 408 px |
| 1024x768 | 0 px | 1024 x 903.5 px | 542.8 x 461 px | 131 px | 264 px |
| 1280x800 | 0 px | 1280 x 916.7 px | 693.8 x 461 px | 111 px | 224 px |
| 1440x900 | 0 px | 1440 x 941.9 px | 717.4 x 461 px | 111 px | 224 px |
| 1920x1080 | 0 px | 1920 x 944.7 px | 717.4 x 461 px | 111 px | 224 px |

Wyniki:

- Brak poziomego overflow dokumentu, hero oraz `ProcessSteps` na 9/9 viewportów.
- Wszystkie trzy kontrolki initial cookies oraz wszystkie kontrolki rozwiniętych ustawień mieściły się w obrębie viewportu na 9/9 wymiarów.
- Na 320 px panel z ustawieniami ma 408.5 px wysokości, ale pozostaje w pełni widoczny i obsługiwalny w widoku 568 px.
- Na 768 px kontrolki cookies są rozciągnięte przez układ grid do 194 px na widoku startowym i 367 px po rozwinięciu. Nie powoduje to przycięcia ani overflow, ale jest obserwacją UX do ewentualnej późniejszej optymalizacji gęstości.
- Po przewinięciu do sekcji procesu działał `IntersectionObserver`: aktywny krok i caption orbity zmieniały się spójnie (np. `01 Rezerwacja` albo `02 Wizyta`, zależnie od punktu przecięcia).
- Nie wystąpiły błędy `console.error` ani `pageerror` w żadnym z dziewięciu przebiegów.
- Test `prefers-reduced-motion` na 320x568 i 1024x768: `reveal-up` i pasek postępu miały obliczone `0.00001s`, a `scroll-behavior` wynosił `auto`.

W pomiarze surowych prostokątów DOM mobilne, zamknięte menu zawierało niewyświetlane potomne linki desktopowej nawigacji poza prawą krawędzią. Nie generują one scrollbara ani overflow dokumentu (wynik 0 px) i nie są renderowane w zamkniętym `details`; odnotowane wyłącznie dla pełnej transparentności metody.

## Werdykt Gate 0

**PASS z obserwacją.** Wszystkie wymagane walidacje i oba buildy przechodzą, a krytyczne powierzchnie UI (overflow, hero, proces, cookies) mieszczą się na wymaganych viewportach. Jedyną otwartą obserwacją jest duża wysokość kolumny przycisków cookies w breakpointach tabletowych oraz 2 moderate vulnerabilities wskazane przez `npm audit`; kod aplikacji nie był zmieniany w ramach tego audytu.

## Wykonane polecenia

```text
pwd
git status --short --branch
git log -5 --oneline --decorate
rg --files ...
sed -n ... package.json
npm install
npm run lint
npm run validate:content
npm run validate
npm run build:pages
rg ... src/app src/components
rg ... animacje/interakcje w src
find .next/static/chunks ...
npm run dev -- --hostname 127.0.0.1 --port 3000
npx --yes playwright@1.55.0 install chromium
npm install --prefix /tmp/klinika-ui-audit playwright@1.55.0
node /tmp/klinika-ui-audit/audit.mjs
node /tmp/klinika-ui-audit/detail-audit.mjs
```

## Pliki utworzone w audycie

- `BASELINE_UI_AUDIT.md` - ten raport.
- Tymczasowo poza repo: `/tmp/klinika-ui-audit/audit.mjs`, `/tmp/klinika-ui-audit/detail-audit.mjs` i zrzuty ekranu pomiarów.
