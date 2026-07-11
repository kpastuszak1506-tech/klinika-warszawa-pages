# Backlog wdrożenia SEO

Data rozpoczęcia: 2026-07-11

## Zasada obecnego etapu

Przygotowujemy techniczną i merytoryczną warstwę SEO, ale nie uruchamiamy indeksowania ani deklaracji zależnych od danych placówki. Treści edukacyjne nie są instrukcją medyczną i wymagają potwierdzenia merytorycznego przed indeksowaniem.

| ID | Obszar | Priorytet | Status | Kryterium akceptacji |
| --- | --- | --- | --- | --- |
| SEO-01 | Centrum wiedzy | P0 | DONE | Istnieje indeks \`/wiedza\` oraz statyczne artykuły z unikalnym tytułem, opisem, datą i linkowaniem wewnętrznym. |
| SEO-02 | Źródła i review | P0 | DONE | Każdy artykuł ma minimum dwa źródła oraz widoczny status weryfikacji merytorycznej. |
| SEO-03 | Schema warunkowe | P0 | DONE | \`Article\` JSON-LD emituje się wyłącznie po aktywacji indeksowania i statusie \`reviewed\`. |
| SEO-04 | Kontrola treści | P0 | DONE | Walidator ma wymuszać strukturę artykułów, źródła, daty i obecność noty compliance. |
| SEO-05 | Metadane artykułów | P1 | DONE | Artykuły mają metadane Article, canonicale i spójne Open Graph. |
| SEO-06 | Wewnętrzne linkowanie | P1 | DONE | Homepage, indeks wiedzy i artykuły wskazują powiązane materiały. |
| SEO-07 | Search Console | P1 | BLOCKED | Wymaga własnej domeny i zweryfikowanej własności. Kod może przyjąć token weryfikacyjny bez zewnętrznego trackera. |
| SEO-08 | Entity schema | P1 | BLOCKED | \`MedicalClinic\` i ewentualny \`Physician\` mogą bazować wyłącznie na potwierdzonych danych placówki oraz lekarza. |
| SEO-09 | Zdjęcia rzeczywiste | P2 | BLOCKED | Wymaga zdjęć gabinetu, wejścia i oznaczenia placówki odpowiadających faktycznej lokalizacji. |
| SEO-10 | Publikacja indeksowana | P0 | BLOCKED | Wymaga prawdziwych danych, review prawnego, review lekarskiego i decyzji o włączeniu indeksowania. |

## Kolejne materiały do review

1. Ustalić osobę odpowiedzialną za weryfikację merytoryczną i częstotliwość aktualizacji.
2. Rozszerzać centrum wiedzy wyłącznie o pytania, które pacjent realnie zadaje przed wizytą.
3. Unikać masowych stron pod jednostki chorobowe, opisów dawkowania oraz deklaracji efektu terapii.
4. Po włączeniu indeksowania mierzyć zapytania, CTR i pokrycie indeksu w Search Console, bez trackerów reklamowych.
