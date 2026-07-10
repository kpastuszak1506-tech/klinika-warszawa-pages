# AGENTS.md

## Cel projektu

Strona internetowa w języku polskim dla małego prywatnego podmiotu leczniczego w Warszawie. MVP informuje o stacjonarnych konsultacjach lekarskich w zakresie kwalifikacji do terapii kannabinoidowej, umożliwia kontakt w sprawie rezerwacji, prezentuje neutralny cennik oraz udostępnia dokumenty prawne w wersji roboczej.

## Zasady pracy

- Najpierw czytaj `PROJECT_PLAN.md`, `VALIDATION_REPORT.md` i `FINAL_REPORT.md`.
- Nie dodawaj funkcji zwiększających ryzyko regulacyjne.
- Nie dodawaj formularzy zbierających dane medyczne.
- Nie dodawaj narzędzi reklamowych, kontenerów tagów ani remarketingu.
- Nie używaj języka sprzedażowego, obietnic wyniku wizyty, zachęt cenowych ani komunikatów sugerujących automatyczną decyzję medyczną.
- Każda zmiana w treści ma zachować informację, że decyzję podejmuje lekarz po osobistym badaniu pacjenta.
- Dane spółki i ceny przechowuj w `src/config/companyConfig.ts`.
- Dokumenty prawne traktuj jako robocze i wymagające review prawnika.

## Walidacja po zmianach

1. Uruchom build i lint.
2. Sprawdź routing wymaganych podstron.
3. Sprawdź, czy formularz nadal zbiera wyłącznie dane kontaktowe i organizacyjne.
4. Sprawdź brak narzędzi śledzących i reklamowych.
5. Sprawdź treści pod kątem neutralnego języka medycznego.
6. Zaktualizuj `VALIDATION_REPORT.md` i `FINAL_REPORT.md`.
