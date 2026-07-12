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

## Bazowy workflow Codexa

Te zasady obowiązują domyślnie przy kolejnych zadaniach w tym repozytorium. Nie trzeba ich powtarzać w każdym promptcie.

### Optymalizacja kontekstu i tokenów

- Używaj RTK dla odczytów, `rg`, statusów, diffów i walidacji; sprawdzaj `rtk gain` po większej iteracji.
- Czytaj najpierw tylko pliki i zakresy potrzebne do bieżącego zadania. Pełny plik odczytuj dopiero, gdy zmiana jest silnie zależna od całego modułu.
- Przy istniejących zmianach zaczynaj od `git status` i ograniczonego `git diff`; nie powtarzaj pełnego audytu bez powodu.
- Preferuj krótkie, strukturalne wyniki `PASS/FAIL`, a z logów pokazuj tylko błąd i kontekst potrzebny do naprawy.
- Równoległe odczyty i niezależne testy uruchamiaj równolegle, gdy nie tworzą konfliktu.
- Waliduj warstwowo: najpierw lint, content/compliance i typy, następnie pełny build oraz deploy tylko po większym etapie.
- Trzymaj stan pracy w raportach i planie, aby nie odtwarzać decyzji z całej historii rozmowy.

### Delegowanie

- Codex koordynuje zakres, architekturę, priorytety, integrację i końcowy odbiór.
- Terra jest preferowany do większych, wieloplikowych zmian implementacyjnych.
- Luna jest preferowana do rutynowych, lokalnych zmian UI, typografii i prostych komponentów.
- Worker przed edycją musi potwierdzić rzeczywistą ścieżkę repozytorium, status workspace i zakres plików.
- Workerzy mają disjoint write set, nie cofają zmian innych osób i zwracają listę zmienionych plików oraz wynik walidacji.
- Po delegowaniu Codex nie dubluje tej samej pracy; odbiera diff, sprawdza compliance, uruchamia walidację i integruje tylko poprawny wynik.
- Jeżeli worker nie ma dostępu do faktycznego workspace, zgłasza to od razu i zwraca propozycję patcha lub status zamiast długo czekać.

### Minimalna bramka końcowa

- `npm run lint`
- `npm run validate:content`
- `npm run validate`
- `npm run build:pages`
- kontrola responsywności i overflow na wymaganych viewportach
