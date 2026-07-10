# Klinika - strona

Statyczna strona Next.js dla stacjonarnych konsultacji lekarskich w Warszawie w zakresie kwalifikacji do terapii kannabinoidowej.

## Uruchomienie

```bash
npm install
npm run dev
```

## Walidacja

```bash
npm run lint
npm run build
```

## GitHub Pages

Repo jest przygotowane do darmowego hostingu na GitHub Pages jako statyczny export Next.js.

```bash
npm run build:pages
```

Workflow `.github/workflows/pages.yml` buduje katalog `out` i publikuje go przez GitHub Pages. Docelowy adres po wdrożeniu:

```text
https://kpastuszak1506-tech.github.io/klinika-warszawa-pages/
```

Raporty projektu:

- `PROJECT_PLAN.md`
- `VALIDATION_REPORT.md`
- `FINAL_REPORT.md`

## Konfiguracja

Dane spółki, gabinetu, kontaktu i cennika znajdują się w:

```text
src/config/companyConfig.ts
```

Widget rezerwacji jest przygotowany jako osobna integracja do podłączenia po wyborze dostawcy systemu medycznego. Dokumenty prawne powinny przejść finalny review przed publikacją.
