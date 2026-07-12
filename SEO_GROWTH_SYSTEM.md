# System wzrostu SEO

## Cel

Budować widoczność przez użyteczne, weryfikowalne informacje o stacjonarnych konsultacjach lekarskich w Warszawie. Nie zakładamy gwarantowanej pozycji ani nie stosujemy stron tworzonych wyłącznie pod powielenie fraz.

## Pięć warstw

| Warstwa | Co robimy teraz | Co wymaga potwierdzenia |
| --- | --- | --- |
| Techniczna | statyczne strony, canonicale, robots, sitemap, metadata, Open Graph, poprawne statusy 404 | domena produkcyjna, Search Console, monitoring field data |
| Architektura | centrum wiedzy, trzy huby tematyczne, breadcrumbs, linki pomiędzy artykułami i stronami usługowymi | decyzja, które zatwierdzone materiały będą indeksowane |
| Jakość treści | data publikacji i aktualizacji, źródła pierwotne, widoczny status review, brak instrukcji medycznych | osoba recenzująca, podpis autora, daty merytorycznego review |
| Lokalna obecność | przygotowanie struktury danych i spójnego NAP | nazwa, adres, telefon, godziny, RPWDL, własna domena, profil firmy |
| Pomiar | bramki indeksowania i walidacja w CI | Search Console, raport CWV, protokół miesięcznego przeglądu |

## Backlog technik

### P0 - w kodzie teraz

1. Jeden kanoniczny adres na każdą stronę.
2. Unikalny `title`, opis i pojedynczy `h1` dla stron docelowych.
3. Semantyczne nagłówki, HTML języka polskiego i dostępna nawigacja.
4. Static generation, 404, brak cienkich parametrów URL i brak duplikacji slash/non-slash w docelowej domenie.
5. Odpowiedni obraz Open Graph, a docelowo osobne obrazy dla kluczowych stron.
6. Sitemap i robots sterowane jedną bramką publikacji.
7. Hub `Wiedza`, artykuły, tematy, breadcrumbs i linkowanie kontekstowe.
8. Każdy artykuł: data, źródła, zakres, status review i dwa linki powiązane.
9. Walidator: ilość źródeł, hubów, tras, bezpieczeństwo formularza i niedozwolone trackery.
10. Lekki obraz hero, stabilne wymiary i kontrola layout shift.

### P1 - po potwierdzeniu realnych danych

11. Własna domena i 301 z domen pomocniczych do jednego hosta.
12. Search Console, przesłanie sitemap oraz kontrola indeksacji i canonicali.
13. `Organization` oraz `MedicalClinic` JSON-LD z wyłącznie potwierdzonym NAP, godzinami, lokalizacją, logo i identyfikatorami.
14. JSON-LD `Article` po review każdego materiału oraz `BreadcrumbList` na hubach i artykułach.
15. Zdjęcia rzeczywistego gabinetu, wejścia i oznaczenia, z opisami odpowiadającymi faktycznemu miejscu.
16. Profil Firmy w Google z identyczną nazwą, kategorią i danymi kontaktowymi jak na stronie.
17. Dane lekarza i proces redakcyjny: autor, recenzent, kwalifikacje, data review, zasady aktualizacji.
18. Rejestr zmian artykułów oraz kwartalna weryfikacja źródeł.
19. Core Web Vitals z danych rzeczywistych: LCP, INP i CLS.
20. Mapowanie zapytań, stron wejściowych i CTR wyłącznie z danych Search Console.

### P2 - cykl treści po review medycznym

21. Pytania organizacyjne dotyczące przebiegu wizyty.
22. Materiały o rozumieniu jakości badań i ograniczeń dowodów.
23. Materiały o bezpieczeństwie rozmowy z lekarzem, bez instrukcji terapeutycznych.
24. Słownik neutralnych pojęć użytych na stronie.
25. Przewodniki przygotowania dokumentacji do omówienia w gabinecie.
26. Strony lokalne tylko dla faktycznie prowadzonych lokalizacji; bez automatycznego mnożenia dzielnic.
27. Materiały odpowiadające pytaniom z konsultacji, zatwierdzone przez lekarza.
28. Treści aktualizowane po zmianie rekomendacji, prawa lub standardów.
29. Własne, jasno opisane materiały organizacyjne zamiast agregowania cudzych tekstów.
30. Linki z zaufanych, merytorycznie związanych źródeł zdobywane przez realne partnerstwa i cytowalne materiały, nie przez zakup lub automatyzację.

## Bramy jakości dla każdej nowej strony

- Ma jasno określony cel pacjenta i nie powiela istniejącej strony.
- Ma autora lub status „do review”, datę aktualizacji i źródła tam, gdzie opisuje wiedzę medyczną.
- Nie zawiera dawkowania, kwalifikacji automatycznej, deklaracji efektu ani języka sprzedażowego.
- Linkuje do jednej strony nadrzędnej i co najmniej dwóch materiałów powiązanych, gdy to naturalne.
- Ma unikalne metadata, jedno `h1`, poprawny canonical i obraz, gdy materiał jest publicznie indeksowany.
- Po publikacji przechodzi kontrolę HTML, dostępności, wydajności i kontroli merytorycznej.

## Czego nie robimy

- Nie tworzymy programowo setek stron na objawy, dzielnice lub warianty podobnych fraz.
- Nie używamy FAQ schema jako obietnicy rozszerzonego wyniku.
- Nie kupujemy linków, opinii ani ruchu.
- Nie wstawiamy niezweryfikowanych danych lekarza, wyników leczenia ani statystyk.
- Nie poświęcamy prywatności pacjenta dla atrybucji marketingowej.

## Źródła strategiczne

- Google: [helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- Google: [canonicalizacja adresów](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- Google: [dane strukturalne LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- Google: [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)
- Google: [ograniczenia FAQ rich results](https://developers.google.com/search/blog/2023/08/howto-faq-changes)
