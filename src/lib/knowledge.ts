import {
  isLocalDemoPreview,
  isPublicReleaseReady,
} from "@/config/companyConfig";

export type KnowledgeSource = {
  id: string;
  title: string;
  publisher: string;
  href: string;
  publicationDate?: string;
  quality: "high" | "standard";
};

export type KnowledgeParagraph = {
  text: string;
  citationIds?: string[];
};

export type KnowledgeSection = {
  heading: string;
  paragraphs: KnowledgeParagraph[];
  bullets?: string[];
  kind?: "overview" | "evidence" | "interpretation" | "limits" | "practice";
};

export type KnowledgeArticle = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  readingTime: string;
  publishedAt: string;
  updatedAt: string;
  reviewStatus: "review-required" | "reviewed";
  authorName?: string;
  medicalReviewer?: MedicalReviewer;
  reviewedAt?: string;
  nextReviewAt?: string;
  topics: string[];
  keyPoints: string[];
  sections: KnowledgeSection[];
  sources: KnowledgeSource[];
  relatedSlugs: string[];
};

export type MedicalReviewer = {
  name: string;
  role: string;
  qualifications: string;
  professionalId?: string;
};

export type KnowledgeTopic = {
  slug: string;
  label: string;
  description: string;
  articleSlugs: string[];
};

export const knowledgeTopics: KnowledgeTopic[] = [
  {
    slug: "konsultacja-stacjonarna",
    label: "Konsultacja stacjonarna",
    description:
      "Jak wygląda model wizyty tej placówki i jak przygotować rzeczową rozmowę z lekarzem.",
    articleSlugs: [
      "jak-wyglada-konsultacja-kwalifikacyjna",
      "przygotowanie-do-wizyty-stacjonarnej",
      "prawo-do-informacji-i-dokumentacji",
    ],
  },
  {
    slug: "bezpieczenstwo-i-zrodla",
    label: "Bezpieczeństwo i źródła",
    description:
      "Jak czytać badania, rozumieć niepewność i odróżniać pojęcia używane wokół kannabinoidów.",
    articleSlugs: [
      "jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej",
      "bezpieczenstwo-i-rozmowa-z-lekarzem",
      "terapia-kannabinoidowa-a-przewlekly-bol",
      "cbd-thc-i-leki-kannabinoidowe",
    ],
  },
  {
    slug: "przygotowanie-i-komunikacja",
    label: "Przygotowanie i komunikacja",
    description:
      "Dokumentacja, pytania do lekarza i granice kontaktu organizacyjnego przed wizytą.",
    articleSlugs: [
      "jak-wyglada-konsultacja-kwalifikacyjna",
      "bezpieczenstwo-i-rozmowa-z-lekarzem",
      "przygotowanie-do-wizyty-stacjonarnej",
      "prawo-do-informacji-i-dokumentacji",
    ],
  },
];

export const knowledgeArticles: KnowledgeArticle[] = [
  {
    slug: "jak-wyglada-konsultacja-kwalifikacyjna",
    title: "Jak wygląda konsultacja kwalifikacyjna?",
    description:
      "Czym jest osobista ocena lekarska w modelu tej placówki, a czym nie jest.",
    excerpt:
      "W tej placówce konsultacja odbywa się stacjonarnie. Rezerwacja terminu nie jest decyzją medyczną ani obietnicą recepty.",
    readingTime: "7 min czytania",
    publishedAt: "2026-07-11",
    updatedAt: "2026-07-13",
    reviewStatus: "review-required",
    topics: ["konsultacja-stacjonarna", "przygotowanie-i-komunikacja"],
    keyPoints: [
      "Rezerwacja ustala termin; ocena medyczna rozpoczyna się dopiero w gabinecie.",
      "Kwalifikacja oznacza tu indywidualną ocenę, a nie test z automatycznym wynikiem.",
      "Dokumentacja i pytania porządkują rozmowę, lecz nie przesądzają o decyzji.",
    ],
    sections: [
      {
        heading: "Konsultacja, nie skrót do wyniku",
        kind: "overview",
        paragraphs: [
          {
            text: "W tej placówce rozważanie terapii kannabinoidowej odbywa się podczas wizyty stacjonarnej. Lekarz prowadzi rozmowę, osobiście bada pacjenta i ocenia dostępne informacje.",
          },
          {
            text: "Artykuł opisuje wyłącznie model organizacyjny tej placówki. Nie próbuje definiować zasad wszystkich konsultacji medycznych prowadzonych w Polsce.",
          },
          {
            text: "Słowo „kwalifikacja” opisuje tutaj indywidualną ocenę lekarską. Nie oznacza jednolitego testu prawnego, listy punktowej ani formularza prowadzącego do ustalonego wyniku.",
          },
          {
            text: "Pacjent ma prawo do przystępnej informacji o stanie zdrowia, proponowanych możliwościach i przewidywalnych następstwach. Ma również prawo dostępu do swojej dokumentacji medycznej.",
            citationIds: ["jak-wyglada-konsultacja-kwalifikacyjna-source-1", "jak-wyglada-konsultacja-kwalifikacyjna-source-2"],
          },
          {
            text: "Rezerwacja porządkuje wyłącznie termin i miejsce spotkania. Nie potwierdza rozpoznania, rozpoczęcia terapii, kontynuacji wcześniejszego postępowania ani wystawienia recepty.",
          },
        ],
      },
      {
        heading: "Co może wydarzyć się w gabinecie",
        kind: "evidence",
        paragraphs: [
          {
            text: "Na początku warto wspólnie ustalić cel rozmowy. Pacjent może nazwać najważniejsze pytania, a lekarz wyjaśnić zakres oceny i sposób wykorzystania przekazanych informacji.",
          },
          {
            text: "Rozmowa może dotyczyć dotychczasowego postępowania, dokumentów przyniesionych na wizytę oraz spraw ważnych dla bezpieczeństwa. Zakres osobistego badania dobiera lekarz do konkretnej sytuacji.",
          },
          {
            text: "Dane naukowe o kannabinoidach dotyczą określonych produktów, populacji i wyników. Wytyczna NICE również rozdziela różne produkty i zastosowania, zamiast traktować je jako jedną wymienną grupę.",
            citationIds: ["jak-wyglada-konsultacja-kwalifikacyjna-source-4"],
          },
          {
            text: "Dokumentacja może pomóc odtworzyć przebieg wcześniejszej opieki. Prawo dostępu do niej nie oznacza jednak, że pojedynczy dokument zastępuje rozmowę lub osobiste badanie.",
            citationIds: ["jak-wyglada-konsultacja-kwalifikacyjna-source-2"],
          },
        ],
        bullets: [
          "ustalenie celu wizyty i pytań pacjenta,",
          "rozmowa o informacjach istotnych dla aktualnej oceny,",
          "osobiste badanie w zakresie wybranym przez lekarza,",
          "omówienie danych, niepewności i możliwych dalszych kroków,",
          "podsumowanie decyzji oraz tego, co pozostaje niewiadome.",
        ],
      },
      {
        heading: "Jak rozumieć możliwe zakończenia wizyty",
        kind: "interpretation",
        paragraphs: [
          {
            text: "Ocena może zakończyć się różnymi ustaleniami. Lekarz może potrzebować dodatkowych informacji, omówić inne kierunki postępowania albo uznać, że nie podejmuje danego kroku.",
          },
          {
            text: "Brak natychmiastowego rozstrzygnięcia nie oznacza, że rozmowa była bezwartościowa. Ważnym wynikiem może być uporządkowanie braków w dokumentacji lub doprecyzowanie pytania medycznego.",
          },
          {
            text: "Publikacje opisują średnie wyniki grup i konkretne interwencje. Nie przewidują odpowiedzi jednej osoby i nie przenoszą wyników badanego produktu na każdy inny produkt.",
            citationIds: ["jak-wyglada-konsultacja-kwalifikacyjna-source-4"],
          },
          {
            text: "Akt prawny wyznacza ramy obrotu substancjami kontrolowanymi, ale nie jest instrukcją samodzielnej oceny klinicznej. Wniosek dla pacjenta wymaga odniesienia do jego sytuacji.",
            citationIds: ["jak-wyglada-konsultacja-kwalifikacyjna-source-3"],
          },
        ],
      },
      {
        heading: "Czego nie da się ustalić przed badaniem",
        kind: "limits",
        paragraphs: [
          {
            text: "Przed wizytą nie da się uczciwie wskazać, która informacja okaże się najważniejsza. Sam opis problemu, wynik badania albo wcześniejsza opinia nie dają automatycznej odpowiedzi.",
          },
          {
            text: "Nie da się też założyć, że lekarz ma pełną historię pacjenta. Dokumentacja powstaje w różnych miejscach, a pacjent decyduje, które posiadane materiały przynosi do omówienia.",
            citationIds: ["jak-wyglada-konsultacja-kwalifikacyjna-source-2"],
          },
          {
            text: "Internetowy artykuł może pomóc przygotować pytania, lecz nie wykonuje badania. Podobnie konsultacja organizacyjna z rejestracją nie jest oceną medyczną.",
          },
          {
            text: "Nie istnieje tutaj katalog chorób zapewniających określony wynik wizyty. Takie uproszczenie pomijałoby różnice między osobami, produktami i jakością dostępnych danych.",
          },
        ],
      },
      {
        heading: "Przykład: artykuł znaleziony przed wizytą",
        kind: "interpretation",
        paragraphs: [
          {
            text: "Pacjent znajduje omówienie badania i zapisuje, że opisano w nim poprawę. Zamiast traktować nagłówek jako rozstrzygnięcie, przynosi źródło oraz trzy pytania.",
          },
          {
            text: "Pierwsze pytanie dotyczy uczestników badania. Lekarz może sprawdzić, czy publikacja obejmowała podobny problem, czy zupełnie inną populację.",
          },
          {
            text: "Drugie pytanie dotyczy produktu. Wspólne słowo „kannabinoid” nie wystarcza, gdy różnią się skład, proporcje substancji oraz sposób podania.",
            citationIds: ["jak-wyglada-konsultacja-kwalifikacyjna-source-4"],
          },
          {
            text: "Trzecie pytanie dotyczy wyniku. Średnia zmiana w grupie nie mówi jeszcze, czy oceniano ból, funkcjonowanie, sen albo rezygnacje z badania.",
          },
          {
            text: "Taka rozmowa może wykazać, że źródło tylko częściowo pasuje do omawianej sytuacji. To cenna informacja, ponieważ wyznacza granicę wniosku.",
          },
          {
            text: "Lekarz może też wskazać, jakiego dokumentu brakuje lub które pytanie wymaga osobnej oceny. Pacjent wychodzi wtedy z konkretnym podsumowaniem, nie z pozorną pewnością.",
          },
          {
            text: "Jeżeli źródło jest tylko komentarzem, warto odnaleźć publikację pierwotną. Skrócone omówienie może pomijać ważne cechy produktu, populacji i wyniku.",
          },
          {
            text: "Nie każde pytanie musi otrzymać odpowiedź podczas jednego spotkania. Uczciwe wskazanie braku danych bywa ważniejsze niż szybkie domknięcie rozmowy.",
          },
          {
            text: "Na końcu pacjent może własnymi słowami powtórzyć ustalenia. To prosty sposób sprawdzenia, czy obie strony tak samo rozumieją dalsze kroki.",
          },
        ],
        bullets: [
          "Zapisz pełny tytuł źródła, nie tylko nagłówek omówienia.",
          "Wskaż, który fragment publikacji budzi pytanie.",
          "Zapytaj o podobieństwo populacji i produktu.",
          "Ustal, jaki wynik rzeczywiście zmierzono.",
          "Zanotuj, gdzie lekarz widzi granicę zastosowania danych.",
        ],
      },
      {
        heading: "Przygotowanie, które naprawdę pomaga",
        kind: "practice",
        paragraphs: [
          {
            text: "Zapisz krótko, czego chcesz dowiedzieć się podczas spotkania. Pytanie „co przemawia za i przeciw?” zwykle otwiera lepszą rozmowę niż oczekiwanie jednego potwierdzenia.",
          },
          {
            text: "Przynieś dokument tożsamości i dokumentację, którą chcesz omówić. Ułóż materiały chronologicznie, zaznacz ważne miejsca i przygotuj własną listę pytań.",
          },
          {
            text: "Formularz rezerwacji oraz zwykły kontakt organizacyjny nie służą do przesyłania opisów zdrowia ani załączników medycznych. Dokumenty omawia się w gabinecie lub przekazuje wskazanym bezpiecznym kanałem.",
          },
          {
            text: "Pod koniec poproś o krótkie podsumowanie. Decyzję medyczną podejmuje lekarz po osobistym badaniu pacjenta, a nie przed wizytą na podstawie rezerwacji.",
          },
        ],
        bullets: [
          "Jaki jest cel dzisiejszej oceny?",
          "Które informacje z dokumentacji mają znaczenie dla rozmowy?",
          "Jakie dane naukowe odnoszą się do omawianego produktu i sytuacji?",
          "Czego nadal nie wiadomo po przeprowadzonej ocenie?",
          "Jakie ustalenia i następne kroki warto zapisać po wizycie?",
        ],
      },
    ],
    sources: [
      {
        id: "jak-wyglada-konsultacja-kwalifikacyjna-source-1",
        title: "Prawo do informacji",
        publisher: "Rzecznik Praw Pacjenta",
        href: "https://www.gov.pl/web/rpp/prawo-do-informacji",
        quality: "high",
      },
      {
        id: "jak-wyglada-konsultacja-kwalifikacyjna-source-2",
        title: "Prawo do dokumentacji medycznej",
        publisher: "Rzecznik Praw Pacjenta",
        href: "https://www.gov.pl/web/rpp/prawo-do-dokumentacji-medycznej",
        quality: "high",
      },
      {
        id: "jak-wyglada-konsultacja-kwalifikacyjna-source-3",
        title: "Ustawa z dnia 29 lipca 2005 r. o przeciwdziałaniu narkomanii",
        publisher: "Elektroniczny Dziennik Ustaw",
        href: "https://eli.gov.pl/api/acts/DU/2023/1939/text.html",
        quality: "high",
      },
      {
        id: "jak-wyglada-konsultacja-kwalifikacyjna-source-4",
        title: "Cannabis-based medicinal products (NG144)",
        publisher: "National Institute for Health and Care Excellence",
        href: "https://www.nice.org.uk/guidance/ng144",
        quality: "high",
      },
    ],
    relatedSlugs: [
      "przygotowanie-do-wizyty-stacjonarnej",
      "prawo-do-informacji-i-dokumentacji",
    ],
  },
  {
    slug: "jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej",
    title: "Jak czytać badania o kannabinoidach i przewlekłym bólu?",
    description:
      "Praktyczny przewodnik po pytaniu badawczym, wielkości efektu, niepewności i działaniach niepożądanych.",
    excerpt:
      "Jak w kilka minut ustalić, kogo badano, jaki produkt porównano, co zmierzono i czy wynik może mieć znaczenie dla pacjenta.",
    readingTime: "11 min czytania",
    publishedAt: "2026-07-11",
    updatedAt: "2026-07-13",
    reviewStatus: "review-required",
    topics: ["bezpieczenstwo-i-zrodla"],
    keyPoints: [
      "Najpierw odtwórz populację, produkt, porównanie, wynik i czas obserwacji.",
      "Czytaj wielkość efektu razem z niepewnością oraz działaniami niepożądanymi.",
      "Nie przenoś wyniku jednego produktu na całą kategorię kannabinoidów.",
    ],
    sections: [
      {
        heading: "Po lekturze będziesz umieć zadać lepsze pytanie",
        kind: "overview",
        paragraphs: [
          {
            text: "Po tym artykule łatwiej rozłożysz nagłówek o „skuteczności kannabinoidów” na kilka sprawdzalnych elementów. W pięć minut ustalisz, kogo badano, co porównano i jaki wynik naprawdę zmierzono.",
          },
          {
            text: "Przewlekły ból jest dobrym przykładem, ponieważ aktualne przeglądy obejmują różne populacje, produkty i punkty końcowe. Dwa pozornie sprzeczne wnioski mogą więc opisywać inne pytania, a oba pozostawać poprawne.",
            citationIds: ["jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej-source-1", "jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej-source-2", "jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej-source-3", "jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej-source-4"],
          },
        ],
      },
      {
        heading: "PICO po ludzku: pięć pytań przed wynikiem",
        kind: "practice",
        paragraphs: [
          {
            text: "Badacze często zapisują pytanie skrótem PICO. To poręczna rama, która pilnuje, aby ogólne hasło nie zastąpiło szczegółów. Do czterech liter warto dodać czas obserwacji, bo miesiąc i kilka lat odpowiadają na różne pytania.",
          },
          {
            text: "PICO nie ocenia jeszcze jakości wykonania badania. Pomaga natomiast szybko sprawdzić, czy publikacja odpowiada na interesujące cię pytanie, zanim zaczniesz analizować liczby i wnioski autorów.",
          },
        ],
        bullets: [
          "Kto? Jacy pacjenci uczestniczyli w badaniu i jaki rodzaj bólu u nich rozpoznano?",
          "Co dokładnie? Jaki konkretny produkt, proporcję THC:CBD, postać i drogę podania oceniano?",
          "Z czym porównano? Z placebo, zwykłym postępowaniem czy innym aktywnym leczeniem?",
          "Jaki wynik? Średnie natężenie bólu, wyraźna ulga, funkcjonowanie, sen czy rezygnacje z badania?",
          "Jak długo? Przez kilka tygodni, kilka miesięcy czy wystarczająco długo, aby ocenić trwałość wyniku?",
        ],
      },
      {
        heading: "Annals 2026: co mówią 25 badań, a czego nie mówią",
        kind: "evidence",
        paragraphs: [
          {
            text: "Przegląd Annals opublikowany w tomie z 2026 r. objął 25 randomizowanych badań z grupą kontrolną. Uczestników przydzielano losowo do porównywanych grup, co ogranicza część różnic istniejących jeszcze przed badaniem.",
            citationIds: ["jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej-source-1"],
          },
          {
            text: "Łącznie w badaniach uczestniczyły 2303 osoby, 64% z bólem neuropatycznym. Obserwacja trwała od 1 do 6 miesięcy. Te liczby pokazują rozmiar i profil zebranego materiału, ale nie tworzą jednego wyniku dla wszystkich produktów.",
            citationIds: ["jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej-source-1"],
          },
          {
            text: "Przegląd pozwala wnioskować przede wszystkim o krótkoterminowych wynikach badanych produktów, głównie w bólu neuropatycznym. Nie dowodzi skuteczności całej kategorii „kannabinoidów”, trwałej korzyści po latach ani określonego wyniku u konkretnej osoby.",
            citationIds: ["jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej-source-1"],
          },
        ],
        bullets: [
          "Liczba prób nie oznacza zgodnych odpowiedzi na każde pytanie.",
          "Łączna grupa może ukrywać znacznie mniejsze zbiory w poszczególnych porównaniach.",
          "Przewaga jednej populacji ogranicza przenoszenie wniosków na inne rodzaje bólu.",
          "Krótki okres nie rozstrzyga o długoterminowej korzyści ani rzadkich szkodach.",
        ],
      },
      {
        heading: "AHRQ 2025: nazwa kannabinoidu to za mało",
        kind: "evidence",
        paragraphs: [
          {
            text: "Przegląd AHRQ z 2025 r. grupował badania według proporcji THC do CBD oraz typu produktu. Autorzy rozróżniali produkty syntetyczne, oczyszczone z pojedynczym kannabinoidem i ekstrakty zawierające wiele kannabinoidów.",
            citationIds: ["jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej-source-2"],
          },
          {
            text: "To ważna wskazówka dla czytelnika. Wynik dotyczący produktu o porównywalnej proporcji THC:CBD nie przechodzi automatycznie na produkt z przewagą CBD. Nie można też zakładać, że inna postać lub droga podania da taki sam bilans korzyści i szkód.",
            citationIds: ["jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej-source-2"],
          },
          {
            text: "Nawet podobna proporcja nie usuwa wszystkich różnic. Znaczenie mogą mieć źródło substancji, skład produktu, sposób podania oraz populacja objęta konkretną próbą.",
            citationIds: ["jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej-source-2"],
          },
          {
            text: "Czytając omówienie, szukaj więc nazwy kategorii badanej przez autorów, a nie samego słowa „kannabinoidy”. Jeżeli szczegóły produktu znikają z nagłówka, wniosek prawdopodobnie stał się szerszy niż dane.",
          },
        ],
      },
      {
        heading: "Cochrane 2026: wynik zależy od progu",
        kind: "evidence",
        paragraphs: [
          {
            text: "Przegląd Cochrane z 2026 r. dotyczył przewlekłego bólu neuropatycznego. Nie znalazł jasnego dowodu na ulgę wynoszącą co najmniej 50% dla leków z przewagą THC, z równowagą THC/CBD ani z przewagą CBD.",
            citationIds: ["jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej-source-3"],
          },
          {
            text: "Pewność tych danych oceniono jako niską lub bardzo niską, zależnie od grupy i wyniku. Oznacza to, że kolejne dobrze przeprowadzone badania mogą istotnie zmienić oszacowanie, a obecny brak jasnego dowodu nie jest dowodem identycznego działania wszystkich produktów.",
            citationIds: ["jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej-source-3"],
          },
          {
            text: "Ten wniosek nie musi przeczyć małym średnim różnicom natężenia bólu opisywanym w Annals, AHRQ lub starszym przeglądzie powiązanym z wytyczną BMJ. Średnia zmiana na skali bólu odpowiada na inne pytanie niż odsetek osób osiągających ulgę co najmniej 50%.",
            citationIds: ["jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej-source-1", "jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej-source-2", "jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej-source-3", "jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej-source-4"],
          },
          {
            text: "Niewielkie przesunięcie średniej może wystąpić bez wyraźnego wzrostu liczby osób przekraczających wysoki próg poprawy. Różne punkty końcowe i progi dają więc różne, lecz możliwe do pogodzenia opisy tych samych danych.",
          },
        ],
      },
      {
        heading: "Istotność statystyczna, wielkość efektu i odczuwalna korzyść",
        kind: "interpretation",
        paragraphs: [
          {
            text: "Istotność statystyczna mówi, na ile zaobserwowany wynik pasuje do przypadku przy założeniach danej analizy. Nie mówi sama, czy różnica jest duża, ważna dla pacjenta albo pewna w codziennym życiu.",
          },
          {
            text: "Wielkość efektu opisuje rozmiar różnicy między grupami, na przykład zmianę średniego natężenia bólu. Trzeba ją czytać razem z przedziałem ufności, który pokazuje zakres wartości zgodnych z danymi i precyzję oszacowania.",
          },
          {
            text: "Szeroki przedział ufności sygnalizuje dużą niepewność, nawet gdy środkowe oszacowanie wygląda obiecująco. Wąski przedział daje większą precyzję, lecz nadal nie naprawia źle dobranego pytania badawczego.",
          },
          {
            text: "Odczuwalna korzyść kliniczna dotyczy zmiany, która ma praktyczne znaczenie dla pacjenta. Może być oceniana progiem poprawy, funkcjonowaniem lub innym wynikiem ważnym w danym badaniu.",
          },
          {
            text: "Dlatego samo p-value, czyli liczba używana w teście statystycznym, nie wystarcza. Najpierw sprawdź wielkość różnicy, jej niepewność i to, czy mierzony wynik odpowiada na pytanie ważne dla pacjenta.",
          },
        ],
      },
      {
        heading: "Skutki uboczne i rezygnacje są częścią wyniku",
        kind: "evidence",
        paragraphs: [
          {
            text: "W części krótkich badań zawroty głowy, sedacja lub senność oraz nudności występowały częściej przy niektórych produktach zawierających THC. Annals i AHRQ opisują te szkody obok małych średnich różnic w bólu, a nie jako osobny przypis.",
            citationIds: ["jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej-source-1", "jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej-source-2"],
          },
          {
            text: "Rezygnacje z powodu działań niepożądanych pokazują, czy uczestnicy byli w stanie pozostać w badaniu. Cochrane wskazuje możliwość częstszych rezygnacji w części porównań, lecz pewność tego wyniku jest ograniczona.",
            citationIds: ["jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej-source-3"],
          },
          {
            text: "Krótkie badanie może dobrze uchwycić częste objawy pojawiające się szybko, ale słabiej odpowiada na pytania wieloletnie. Niepewność długoterminowa dotyczy zarówno utrzymania korzyści, jak i rzadszych szkód.",
            citationIds: ["jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej-source-1", "jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej-source-2", "jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej-source-3"],
          },
        ],
      },
      {
        heading: "Checklista: ocena publikacji w pięć minut",
        kind: "practice",
        paragraphs: [
          {
            text: "Zacznij od tytułu i abstraktu, czyli krótkiego streszczenia publikacji. Zapisz odpowiedzi jednym zdaniem; brak informacji także jest ważnym wynikiem sprawdzenia.",
          },
          {
            text: "Jeżeli abstrakt nie podaje produktu, czasu albo szkód, otwórz pełny tekst i tabele. Gdy nadal brakuje tych danych, ogranicz wniosek zamiast uzupełniać luki przypuszczeniem.",
          },
        ],
        bullets: [
          "Data: kiedy wykonano wyszukiwanie i kiedy opublikowano lub zaktualizowano materiał?",
          "Typ badania: pojedyncza próba, przegląd systematyczny, obserwacja czy wytyczna?",
          "Populacja: kogo badano i czy ta grupa odpowiada pytaniu, które czytasz?",
          "Produkt: jaka proporcja THC:CBD, typ produktu i droga podania zostały ocenione?",
          "Porównanie: placebo, zwykłe postępowanie czy inne aktywne leczenie?",
          "Wynik: średnia zmiana, określony próg ulgi, funkcjonowanie czy jakość snu?",
          "Czas: jak długo obserwowano uczestników i czego ten okres nie pozwala ocenić?",
          "Precyzja: ilu było uczestników i jak szerokie są przedziały ufności?",
          "Szkody: jakie działania niepożądane i rezygnacje raportowano?",
          "Niezależność: kto finansował badanie i jakie konflikty interesów ujawnili autorzy?",
        ],
      },
      {
        heading: "Czerwone flagi w internetowych omówieniach",
        kind: "limits",
        paragraphs: [
          {
            text: "Dobre omówienie pozwala odtworzyć PICO i nie ukrywa szkód. Zatrzymaj się, gdy widzisz któryś z poniższych skrótów.",
          },
        ],
        bullets: [
          "„Udowodniono skuteczność” bez wskazania produktu, wyniku i czasu obserwacji.",
          "Przenoszenie wyniku dotyczącego CBD na THC albo odwrotnie.",
          "Przedstawianie średniego wyniku grupy jako obietnicy dla pojedynczej osoby.",
          "Podawanie wyłącznie p-value, bez wielkości efektu i przedziału ufności.",
          "Opis korzyści bez działań niepożądanych, rezygnacji i ograniczeń badania.",
          "Stare źródło przedstawione jako aktualny stan wiedzy, bez sprawdzenia nowszej aktualizacji.",
        ],
      },
      {
        heading: "Przykład: od abstraktu do trzech pytań",
        kind: "practice",
        paragraphs: [
          {
            text: "Załóżmy, że tytuł mówi o produktach kannabinoidowych w przewlekłym bólu. Najpierw rozpoznajesz przegląd systematyczny, a w abstrakcie znajdujesz 25 badań randomizowanych, 2303 osoby i obserwację od 1 do 6 miesięcy.",
            citationIds: ["jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej-source-1"],
          },
          {
            text: "Następnie zauważasz, że 64% uczestników miało ból neuropatyczny, a produkty podzielono według proporcji THC:CBD, źródła i drogi podania. Wynik opisuje małe średnie różnice dla części kategorii oraz częstsze działania niepożądane.",
            citationIds: ["jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej-source-1", "jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej-source-2"],
          },
          {
            text: "Wreszcie sprawdzasz ograniczenia: krótki czas, różnice między produktami i brak pełnych danych długoterminowych. Z tak przeczytanego abstraktu powstają trzy rzeczowe pytania do lekarza.",
            citationIds: ["jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej-source-1", "jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej-source-2"],
          },
        ],
        bullets: [
          "Które badania dotyczą populacji i rodzaju bólu najbardziej zbliżonych do omawianej sytuacji?",
          "Jaki konkretny wynik uznano za ważny i czy była to średnia różnica, czy wyraźny próg ulgi?",
          "Jak zestawić możliwą korzyść z działaniami niepożądanymi oraz niepewnością po sześciu miesiącach?",
        ],
      },
      {
        heading: "Najważniejsza lekcja",
        kind: "interpretation",
        paragraphs: [
          {
            text: "Nie pytaj tylko: „czy działa?”. Zapytaj: „u kogo, jaki dokładnie produkt, wobec czego, w jakim wyniku i przez jaki czas?”. To jedno zdanie zwykle odsłania, ile naprawdę mówi publikacja.",
          },
        ],
      },
    ],
    sources: [
      {
        id: "jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej-source-1",
        title: "Cannabis-Based Products for Chronic Pain: An Updated Systematic Review",
        publisher: "Annals of Internal Medicine / PubMed",
        href: "https://pubmed.ncbi.nlm.nih.gov/41429020/",
        quality: "high",
      },
      {
        id: "jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej-source-2",
        title: "Living Systematic Review on Cannabis and Other Plant-Based Treatments for Chronic Pain: 2025 Update",
        publisher: "Agency for Healthcare Research and Quality / NCBI Bookshelf",
        href: "https://www.ncbi.nlm.nih.gov/books/NBK618045/",
        quality: "high",
      },
      {
        id: "jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej-source-3",
        title: "Cannabis-based medicines for chronic neuropathic pain in adults",
        publisher: "Cochrane Database of Systematic Reviews / PubMed",
        href: "https://pubmed.ncbi.nlm.nih.gov/41548880/",
        quality: "high",
      },
      {
        id: "jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej-source-4",
        title: "Medical cannabis or cannabinoids for chronic pain: a clinical practice guideline",
        publisher: "The BMJ",
        href: "https://doi.org/10.1136/bmj.n2040",
        quality: "high",
      },
    ],
    relatedSlugs: [
      "terapia-kannabinoidowa-a-przewlekly-bol",
      "cbd-thc-i-leki-kannabinoidowe",
    ],
  },
  {
    slug: "bezpieczenstwo-i-rozmowa-z-lekarzem",
    title: "Bezpieczeństwo i rozmowa z lekarzem",
    description:
      "Jak czytać dane o działaniach niepożądanych i przygotować rozmowę o ryzyku bez fałszywej pewności.",
    excerpt:
      "Zawroty głowy, sedacja lub senność i nudności pojawiały się częściej w części krótkich badań. Znaczenie ma konkretny produkt i kontekst pacjenta.",
    readingTime: "7 min czytania",
    publishedAt: "2026-07-11",
    updatedAt: "2026-07-13",
    reviewStatus: "review-required",
    topics: ["bezpieczenstwo-i-zrodla", "przygotowanie-i-komunikacja"],
    keyPoints: [
      "Pytaj o ryzyko dla konkretnego produktu, nie dla samego hasła „kannabinoidy”.",
      "Oddziel częste krótkoterminowe obserwacje od braków danych wieloletnich.",
      "Przygotuj pełną listę stosowanych produktów i pytań o codzienne funkcjonowanie.",
    ],
    sections: [
      {
        heading: "Bezpieczeństwo zaczyna się od właściwego pytania",
        kind: "overview",
        paragraphs: [
          {
            text: "Pytanie „czy kannabinoidy są bezpieczne?” jest zbyt szerokie. Trzeba wiedzieć, jaki produkt badano, u kogo, przez jaki czas i z czym go porównano.",
            citationIds: ["bezpieczenstwo-i-rozmowa-z-lekarzem-source-1", "bezpieczenstwo-i-rozmowa-z-lekarzem-source-2", "bezpieczenstwo-i-rozmowa-z-lekarzem-source-3"],
          },
          {
            text: "W krótkich badaniach części produktów zawierających THC częściej notowano zawroty głowy, sedację lub senność oraz nudności. Te obserwacje powinny być czytane razem z możliwymi korzyściami.",
            citationIds: ["bezpieczenstwo-i-rozmowa-z-lekarzem-source-1", "bezpieczenstwo-i-rozmowa-z-lekarzem-source-2"],
          },
          {
            text: "Dane grupowe nie przewidują, czy konkretny objaw wystąpi u jednej osoby. Pomagają jednak przygotować pytania o codzienne obowiązki, inne leki i tolerancję niepożądanych odczuć.",
            citationIds: ["bezpieczenstwo-i-rozmowa-z-lekarzem-source-1", "bezpieczenstwo-i-rozmowa-z-lekarzem-source-2", "bezpieczenstwo-i-rozmowa-z-lekarzem-source-3"],
          },
          {
            text: "Wytyczna NICE zaleca przed przepisaniem omówienie możliwych korzyści, szkód, interakcji, wpływu na prowadzenie pojazdów i planowanego czasu stosowania.",
            citationIds: ["bezpieczenstwo-i-rozmowa-z-lekarzem-source-4"],
          },
        ],
      },
      {
        heading: "Co pokazują aktualne przeglądy",
        kind: "evidence",
        paragraphs: [
          {
            text: "Przegląd AHRQ z 2025 r. obejmował 29 badań randomizowanych z 2579 uczestnikami. Badania były głównie krótkie, a 48% osób miało ból neuropatyczny.",
            citationIds: ["bezpieczenstwo-i-rozmowa-z-lekarzem-source-2"],
          },
          {
            text: "Dla doustnego aerozolu o porównywalnej proporcji THC:CBD sześć badań z 866 osobami wskazało większe ryzyko zawrotów głowy, sedacji i nudności niż placebo. Względne ryzyko wynosiło odpowiednio 3,57, 5,04 i 1,79.",
            citationIds: ["bezpieczenstwo-i-rozmowa-z-lekarzem-source-2"],
          },
          {
            text: "Względne ryzyko porównuje częstość między grupami. Bez liczby zdarzeń w grupie placebo nie mówi wprost, ile osób na sto doświadczy danego objawu.",
          },
          {
            text: "AHRQ opisał również częstsze rezygnacje z powodu działań niepożądanych dla syntetycznych lub oczyszczonych produktów z wysoką proporcją THC do CBD. Wynik dotyczył tej kategorii, nie każdego produktu.",
            citationIds: ["bezpieczenstwo-i-rozmowa-z-lekarzem-source-2"],
          },
          {
            text: "Przegląd Cochrane dotyczący bólu neuropatycznego oceniał wiele wyników bezpieczeństwa jako niepewne. Dla części porównań wskazywał możliwy wzrost zdarzeń ze strony układu nerwowego lub rezygnacji.",
            citationIds: ["bezpieczenstwo-i-rozmowa-z-lekarzem-source-3"],
          },
        ],
      },
      {
        heading: "Objaw, rezygnacja i poważne zdarzenie to różne wyniki",
        kind: "interpretation",
        paragraphs: [
          {
            text: "Lista działań niepożądanych nie wystarcza bez informacji o częstości i nasileniu. Krótki epizod nudności oraz zdarzenie wymagające pilnej pomocy nie powinny być wrzucane do jednego worka.",
          },
          {
            text: "Rezygnacja z badania pokazuje, że uczestnik nie kontynuował przydzielonej interwencji z powodu szkody. Nie wyjaśnia automatycznie, jak ciężki był objaw ani co wydarzyłoby się poza próbą.",
            citationIds: ["bezpieczenstwo-i-rozmowa-z-lekarzem-source-2", "bezpieczenstwo-i-rozmowa-z-lekarzem-source-3"],
          },
          {
            text: "Poważne zdarzenia są zwykle rzadsze, dlatego małe i krótkie próby mogą nie oszacować ich precyzyjnie. Brak wyraźnej różnicy nie zawsze oznacza pewność braku ryzyka.",
            citationIds: ["bezpieczenstwo-i-rozmowa-z-lekarzem-source-2", "bezpieczenstwo-i-rozmowa-z-lekarzem-source-3"],
          },
          {
            text: "Warto też oddzielić efekt substancji od efektu konkretnej postaci produktu. Przeglądy grupują interwencje według proporcji THC:CBD, źródła oraz drogi podania.",
            citationIds: ["bezpieczenstwo-i-rozmowa-z-lekarzem-source-1", "bezpieczenstwo-i-rozmowa-z-lekarzem-source-2"],
          },
        ],
      },
      {
        heading: "Jak nie zgubić skali ryzyka",
        kind: "interpretation",
        paragraphs: [
          {
            text: "Zacznij od ustalenia, czy publikacja podaje ryzyko względne, bezwzględne czy oba. Te miary odpowiadają na pokrewne, ale różne pytania.",
          },
          {
            text: "Ryzyko względne pokazuje, ile razy wynik był częstszy w jednej grupie. Ryzyko bezwzględne pokazuje różnicę liczby zdarzeń między grupami.",
          },
          {
            text: "Duży iloraz może dotyczyć zdarzenia rzadkiego, a mały iloraz zdarzenia częstego. Dlatego warto szukać także liczby uczestników i zdarzeń.",
          },
          {
            text: "Sprawdź definicję wyniku. „Zdarzenie ze strony układu nerwowego” może obejmować kilka objawów, natomiast sedacja jest bardziej szczegółową kategorią.",
            citationIds: ["bezpieczenstwo-i-rozmowa-z-lekarzem-source-2", "bezpieczenstwo-i-rozmowa-z-lekarzem-source-3"],
          },
          {
            text: "Następnie sprawdź czas obserwacji i liczbę rezygnacji. Krótka próba z licznymi rezygnacjami może opisywać tolerancję inaczej niż sama tabela objawów.",
            citationIds: ["bezpieczenstwo-i-rozmowa-z-lekarzem-source-1", "bezpieczenstwo-i-rozmowa-z-lekarzem-source-2", "bezpieczenstwo-i-rozmowa-z-lekarzem-source-3"],
          },
          {
            text: "Na końcu zapytaj, czy porównanie dotyczyło placebo, zwykłej opieki czy aktywnego leczenia. Bez tej informacji liczba traci ważny kontekst.",
            citationIds: ["bezpieczenstwo-i-rozmowa-z-lekarzem-source-1", "bezpieczenstwo-i-rozmowa-z-lekarzem-source-2", "bezpieczenstwo-i-rozmowa-z-lekarzem-source-3"],
          },
          {
            text: "Sprawdź też, ilu uczestników rzeczywiście uwzględniono w analizie. Wynik całego przeglądu może opierać się na mniejszej grupie badań.",
            citationIds: ["bezpieczenstwo-i-rozmowa-z-lekarzem-source-1", "bezpieczenstwo-i-rozmowa-z-lekarzem-source-2", "bezpieczenstwo-i-rozmowa-z-lekarzem-source-3"],
          },
          {
            text: "Własne podsumowanie zapisz neutralnie: co zaobserwowano, jak pewny jest wynik i czego nie zbadano. Unikaj przewidywania osobistej reakcji.",
          },
        ],
        bullets: [
          "Jaka była częstość zdarzenia w każdej porównywanej grupie?",
          "Czy wynik dotyczył pojedynczego objawu, czy szerokiej kategorii?",
          "Ilu uczestników przerwało udział z powodu szkód?",
          "Jak długo zbierano informacje o bezpieczeństwie?",
          "Czy opisano niepewność oszacowania?",
        ],
      },
      {
        heading: "Granice obecnej wiedzy",
        kind: "limits",
        paragraphs: [
          {
            text: "Badania w przeglądzie Annals trwały od 1 do 6 miesięcy. Taki okres nie wystarcza do pewnej oceny wieloletniego bezpieczeństwa ani trwałości obserwowanych wyników.",
            citationIds: ["bezpieczenstwo-i-rozmowa-z-lekarzem-source-1"],
          },
          {
            text: "AHRQ uznał dane o ważnych szkodach, takich jak psychoza, zaburzenie używania konopi i wpływ poznawczy, za niedostępne w ocenianym materiale. To brak danych, nie potwierdzenie braku problemu.",
            citationIds: ["bezpieczenstwo-i-rozmowa-z-lekarzem-source-2"],
          },
          {
            text: "Cochrane oceniał pewność wielu wyników jako niską lub bardzo niską. Kolejne lepsze badania mogą więc zmienić zarówno wielkość oszacowania, jak i kierunek wniosku.",
            citationIds: ["bezpieczenstwo-i-rozmowa-z-lekarzem-source-3"],
          },
          {
            text: "Wynik produktu użytego w próbie nie przechodzi na preparat o innym składzie lub pochodzeniu. Różnica nazwy handlowej, proporcji albo postaci może zmienić zakres danych.",
            citationIds: ["bezpieczenstwo-i-rozmowa-z-lekarzem-source-1", "bezpieczenstwo-i-rozmowa-z-lekarzem-source-2", "bezpieczenstwo-i-rozmowa-z-lekarzem-source-4"],
          },
        ],
      },
      {
        heading: "Jak przygotować rozmowę o ryzyku",
        kind: "practice",
        paragraphs: [
          {
            text: "Przygotuj aktualną listę wszystkich stosowanych leków i innych produktów. Nie wysyłaj jej zwykłym formularzem rezerwacyjnym; zabierz ją do gabinetu.",
          },
          {
            text: "Zastanów się, które codzienne zadania wymagają pełnej czujności. Pytania o pracę, prowadzenie pojazdów i opiekę nad innymi pomagają osadzić ryzyko w realnym dniu.",
          },
          {
            text: "Poproś lekarza o oddzielenie danych dobrze udokumentowanych od niepewnych. Dopytaj również, czy omawiane źródło dotyczy dokładnie tego produktu i podobnej populacji.",
          },
          {
            text: "W tej placówce decyzję podejmuje lekarz po osobistym badaniu pacjenta. Rozmowa o bezpieczeństwie jest częścią tej oceny, a nie osobnym automatycznym testem.",
          },
        ],
        bullets: [
          "Które działania niepożądane opisano najpewniej dla omawianego produktu?",
          "Czy podane ryzyko jest względne, czy znamy także częstość bezwzględną?",
          "Jak krótki czas badań ogranicza wniosek o dłuższym okresie?",
          "Jakie możliwe interakcje wymagają omówienia na podstawie pełnej listy produktów?",
          "Które objawy lub zmiany funkcjonowania powinny skłonić do kontaktu z lekarzem?",
        ],
      },
    ],
    sources: [
      {
        id: "bezpieczenstwo-i-rozmowa-z-lekarzem-source-1",
        title: "Cannabis-Based Products for Chronic Pain: An Updated Systematic Review",
        publisher: "Annals of Internal Medicine / PubMed",
        href: "https://pubmed.ncbi.nlm.nih.gov/41429020/",
        quality: "high",
      },
      {
        id: "bezpieczenstwo-i-rozmowa-z-lekarzem-source-2",
        title: "Living Systematic Review on Cannabis and Other Plant-Based Treatments for Chronic Pain: 2025 Update",
        publisher: "Agency for Healthcare Research and Quality / NCBI Bookshelf",
        href: "https://www.ncbi.nlm.nih.gov/books/NBK618045/",
        quality: "high",
      },
      {
        id: "bezpieczenstwo-i-rozmowa-z-lekarzem-source-3",
        title: "Cannabis-based medicines for chronic neuropathic pain in adults",
        publisher: "Cochrane Database of Systematic Reviews / PubMed",
        href: "https://pubmed.ncbi.nlm.nih.gov/41548880/",
        quality: "high",
      },
      {
        id: "bezpieczenstwo-i-rozmowa-z-lekarzem-source-4",
        title: "Cannabis-based medicinal products (NG144)",
        publisher: "National Institute for Health and Care Excellence",
        href: "https://www.nice.org.uk/guidance/ng144",
        quality: "high",
      },
    ],
    relatedSlugs: [
      "terapia-kannabinoidowa-a-przewlekly-bol",
      "przygotowanie-do-wizyty-stacjonarnej",
    ],
  },
  {
    slug: "przygotowanie-do-wizyty-stacjonarnej",
    title: "Jak przygotować się do wizyty stacjonarnej?",
    description:
      "Praktyczne przygotowanie dokumentów, pytań i spraw organizacyjnych do modelu wizyty tej placówki.",
    excerpt:
      "Dokumenty i zapisana lista tematów mogą ułatwić rozmowę. IKP oraz EDM pomagają, ale nie tworzą automatycznie kompletnego archiwum.",
    readingTime: "7 min czytania",
    publishedAt: "2026-07-11",
    updatedAt: "2026-07-13",
    reviewStatus: "review-required",
    topics: ["konsultacja-stacjonarna", "przygotowanie-i-komunikacja"],
    keyPoints: [
      "Przygotuj chronologię i pytania, zamiast próbować samodzielnie rozstrzygnąć wynik wizyty.",
      "Sprawdź IKP i własne dokumenty; żaden system nie gwarantuje pełnej historii.",
      "Dane medyczne omawiaj w gabinecie lub przez wyraźnie wskazany bezpieczny kanał.",
    ],
    sections: [
      {
        heading: "Dobry cel przygotowania",
        kind: "overview",
        paragraphs: [
          {
            text: "Przygotowanie nie polega na udowadnianiu z góry określonej tezy. Ma pomóc lekarzowi i pacjentowi szybko odnaleźć fakty oraz nazwać najważniejsze pytania.",
          },
          {
            text: "W tej placówce wizyta odbywa się stacjonarnie. Przed terminem sprawdź adres, godzinę, sposób wejścia oraz zasady kontaktu w sprawach organizacyjnych.",
          },
          {
            text: "Rezerwacja nie jest oceną medyczną. Nie przesądza o rozpoznaniu, dalszym postępowaniu ani recepcie i nie zastępuje osobistego badania.",
          },
          {
            text: "Pacjent ma prawo do przystępnej informacji oraz dostępu do swojej dokumentacji. Te prawa ułatwiają przygotowanie, ale nie mówią, który dokument będzie najważniejszy w konkretnej rozmowie.",
            citationIds: ["przygotowanie-do-wizyty-stacjonarnej-source-1", "przygotowanie-do-wizyty-stacjonarnej-source-2", "przygotowanie-do-wizyty-stacjonarnej-source-4"],
          },
        ],
      },
      {
        heading: "Dokumenty: zacznij od mapy, nie od stosu papieru",
        kind: "practice",
        paragraphs: [
          {
            text: "Ułóż posiadane materiały chronologicznie. Na osobnej kartce zapisz, z jakiej placówki pochodzi dokument i czego dotyczy, bez tworzenia własnej diagnozy.",
          },
          {
            text: "Jeżeli dokumentacja jest obszerna, zaznacz strony, o które chcesz zapytać. Oryginały trzymaj oddzielnie od własnych notatek, aby łatwo wróciły na swoje miejsce.",
          },
          {
            text: "Brak dokumentu nie powinien prowadzić do zgadywania jego treści. Zapisz nazwę placówki i przybliżony czas zdarzenia; lekarz oceni, czy informacja wymaga uzupełnienia.",
          },
          {
            text: "Prawo pacjenta obejmuje dostęp do dokumentów dotyczących jego stanu zdrowia i udzielonych świadczeń. Szczegóły udostępnienia warto sprawdzić bezpośrednio w placówce, która dokumentację wytworzyła.",
            citationIds: ["przygotowanie-do-wizyty-stacjonarnej-source-2", "przygotowanie-do-wizyty-stacjonarnej-source-4"],
          },
        ],
        bullets: [
          "dokument tożsamości i potwierdzenie terminu,",
          "dokumenty, które pacjent chce omówić,",
          "krótka chronologia istotnych zdarzeń,",
          "lista nazw placówek, z których brakuje materiałów,",
          "pytania zapisane w kolejności ważności.",
        ],
      },
      {
        heading: "IKP i EDM: pomocne, lecz nie kompletne",
        kind: "evidence",
        paragraphs: [
          {
            text: "Na Internetowym Koncie Pacjenta można wyszukiwać zdarzenia medyczne i dostępne dokumenty EDM. W aplikacji mojeIKP lista zdarzeń może pokazywać, które pozycje mają dokumenty dostępne online.",
            citationIds: ["przygotowanie-do-wizyty-stacjonarnej-source-3"],
          },
          {
            text: "Katalog EDM obejmuje między innymi opisy badań diagnostycznych, wyniki laboratoryjne z opisem i wypisy ze szpitala. Centrum e-Zdrowia zaznacza, że katalog jest nadal rozszerzany.",
            citationIds: ["przygotowanie-do-wizyty-stacjonarnej-source-3"],
          },
          {
            text: "Widoczność zależy również od tego, czy placówka ma odpowiednie oprogramowanie i umieściła dokumenty w systemie. Brak pliku w IKP nie dowodzi, że dokument nigdy nie powstał.",
            citationIds: ["przygotowanie-do-wizyty-stacjonarnej-source-3"],
          },
          {
            text: "Dostęp innego lekarza nie jest automatyczny tylko dlatego, że pacjent widzi dokument. CeZ opisuje udostępnienie lekarzowi w zakresie i czasie wybranym przez pacjenta.",
            citationIds: ["przygotowanie-do-wizyty-stacjonarnej-source-3"],
          },
        ],
      },
      {
        heading: "Gdy dokumenty są rozproszone",
        kind: "practice",
        paragraphs: [
          {
            text: "Zacznij od prostej tabeli z trzema kolumnami: data, placówka i rodzaj dokumentu. Puste miejsce łatwiej wtedy zauważyć bez przeglądania całego stosu.",
          },
          {
            text: "Najpierw sprawdź własne pliki i IKP. Następnie skontaktuj się z podmiotem, który wytworzył brakujący dokument, korzystając z jego zasad udostępniania.",
            citationIds: ["przygotowanie-do-wizyty-stacjonarnej-source-2", "przygotowanie-do-wizyty-stacjonarnej-source-3", "przygotowanie-do-wizyty-stacjonarnej-source-4"],
          },
          {
            text: "Nie odkładaj wizyty wyłącznie dlatego, że jeden materiał nie dotarł. Zapisz brak i zapytaj lekarza, czy zmienia on zakres możliwej oceny.",
          },
          {
            text: "Jeżeli otrzymujesz kilka wersji tego samego dokumentu, zachowaj daty i źródła. Lekarz łatwiej rozpozna, która wersja była późniejsza.",
          },
          {
            text: "Nie łącz plików przez przepisywanie wartości do własnego zestawienia. Oryginalny dokument zachowuje kontekst, jednostki, zakresy i dane placówki.",
          },
          {
            text: "Po uporządkowaniu wybierz niewielki zestaw pytań. Celem jest sprawna rozmowa, a nie samodzielne stworzenie kompletnej dokumentacji medycznej.",
          },
        ],
        bullets: [
          "Który dokument już mam i skąd pochodzi?",
          "Którego materiału nie widzę w IKP?",
          "Która placówka może udostępnić brakującą kopię?",
          "Czy brak trzeba uzupełnić przed oceną, czy można omówić go na wizycie?",
        ],
      },
      {
        heading: "Krótka chronologia zamiast opowieści bez końca",
        kind: "interpretation",
        paragraphs: [
          {
            text: "Chronologia nie musi zawierać każdego szczegółu. Jej zadaniem jest wskazanie kolejności zdarzeń i miejsc, do których odnoszą się przyniesione dokumenty.",
          },
          {
            text: "Oddziel to, co zapisano w dokumentacji, od własnych pytań i obserwacji. Taki podział ułatwia rozpoznanie, gdzie znajduje się informacja źródłowa, a gdzie potrzebne jest wyjaśnienie.",
          },
          {
            text: "Zamiast wybierać dokumenty wyłącznie dlatego, że wydają się „korzystne”, zabierz materiały potrzebne do uczciwej rozmowy. O ich znaczeniu decyduje lekarz podczas oceny.",
          },
          {
            text: "Nie próbuj dopasowywać historii do internetowej listy. Publikacje opisują grupy badane, natomiast konsultacja dotyczy informacji zebranych od jednej osoby.",
          },
        ],
      },
      {
        heading: "Granice kontaktu przed terminem",
        kind: "limits",
        paragraphs: [
          {
            text: "Formularz rezerwacyjny i zwykła korespondencja organizacyjna nie służą do przesyłania opisów zdrowia, wyników badań, list leków ani załączników medycznych.",
          },
          {
            text: "Jeżeli placówka wskaże zabezpieczony kanał do dokumentów, korzystaj dokładnie z tej metody. Brak takiej instrukcji oznacza, że materiały należy przynieść do gabinetu.",
          },
          {
            text: "Nie zakładaj, że osoba ustalająca termin może ocenić przydatność dokumentu. Pytania medyczne należą do rozmowy z lekarzem, nie do kontaktu administracyjnego.",
          },
          {
            text: "Nieobecność materiału w IKP lub EDM nie powinna być uzupełniana domysłem. System nie jest kompletnym automatycznym archiwum wszystkich dokumentów pacjenta.",
            citationIds: ["przygotowanie-do-wizyty-stacjonarnej-source-3"],
          },
        ],
      },
      {
        heading: "Plan na dzień wizyty",
        kind: "practice",
        paragraphs: [
          {
            text: "Przyjdź z niewielkim zapasem czasu i miej dokumenty w łatwo dostępnej kolejności. Na górze połóż listę pytań oraz krótką chronologię.",
          },
          {
            text: "Na początku powiedz, które pytanie jest dla ciebie najważniejsze. Jeżeli pojawia się niezrozumiały termin, poproś o wyjaśnienie prostszymi słowami.",
          },
          {
            text: "Pod koniec sprawdź, co zostało ustalone, czego brakuje i jaki jest następny krok. Zapisz odpowiedzi po rozmowie, zanim szczegóły zaczną się mieszać.",
          },
          {
            text: "Dokumenty pomagają, ale nie wydają decyzji. W tej placówce decyzję medyczną podejmuje lekarz po osobistym badaniu pacjenta.",
          },
        ],
        bullets: [
          "Co chcę zrozumieć po tej rozmowie?",
          "Który dokument wymaga wyjaśnienia?",
          "Jakich informacji brakuje i skąd można je uzyskać?",
          "Co wynika z danych, a co nadal pozostaje niepewne?",
          "Jak mam rozumieć ustalone dalsze kroki?",
        ],
      },
    ],
    sources: [
      {
        id: "przygotowanie-do-wizyty-stacjonarnej-source-1",
        title: "Prawo do informacji",
        publisher: "Rzecznik Praw Pacjenta",
        href: "https://www.gov.pl/web/rpp/prawo-do-informacji",
        quality: "high",
      },
      {
        id: "przygotowanie-do-wizyty-stacjonarnej-source-2",
        title: "Prawo do dokumentacji medycznej",
        publisher: "Rzecznik Praw Pacjenta",
        href: "https://www.gov.pl/web/rpp/prawo-do-dokumentacji-medycznej",
        quality: "high",
      },
      {
        id: "przygotowanie-do-wizyty-stacjonarnej-source-3",
        title: "Elektroniczna dokumentacja medyczna",
        publisher: "Centrum e-Zdrowia / Pacjent.gov.pl",
        href: "https://pacjent.gov.pl/elektroniczna-dokumentacja-medyczna",
        quality: "high",
      },
      {
        id: "przygotowanie-do-wizyty-stacjonarnej-source-4",
        title: "Ustawa o prawach pacjenta i Rzeczniku Praw Pacjenta",
        publisher: "Elektroniczny Dziennik Ustaw",
        href: "https://api.sejm.gov.pl/eli/acts/DU/2024/581/text.html",
        quality: "high",
      },
    ],
    relatedSlugs: [
      "jak-wyglada-konsultacja-kwalifikacyjna",
      "prawo-do-informacji-i-dokumentacji",
    ],
  },
  {
    slug: "terapia-kannabinoidowa-a-przewlekly-bol",
    title: "Terapia kannabinoidowa a przewlekły ból: co naprawdę pokazują badania?",
    description:
      "Konkretne wyniki aktualnych przeglądów oraz granice tego, co można z nich wywnioskować.",
    excerpt:
      "Aktualne przeglądy opisują głównie krótkie badania, różne produkty i niewielkie średnie zmiany. Wnioski zależą od rodzaju bólu i mierzonego wyniku.",
    readingTime: "7 min czytania",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    reviewStatus: "review-required",
    topics: ["bezpieczenstwo-i-zrodla"],
    keyPoints: [
      "Oddziel średnią zmianę bólu od odsetka osób osiągających wyraźną ulgę.",
      "Sprawdzaj rodzaj bólu, skład produktu i czas obserwacji każdego wyniku.",
      "Czytaj możliwą korzyść razem ze szkodami oraz brakami danych długoterminowych.",
    ],
    sections: [
      {
        heading: "Jedno pytanie, kilka różnych odpowiedzi",
        kind: "overview",
        paragraphs: [
          {
            text: "Hasło „przewlekły ból” obejmuje różne sytuacje. Badanie bólu neuropatycznego nie odpowiada automatycznie na pytanie o każdy inny rodzaj bólu.",
            citationIds: ["terapia-kannabinoidowa-a-przewlekly-bol-source-1", "terapia-kannabinoidowa-a-przewlekly-bol-source-2", "terapia-kannabinoidowa-a-przewlekly-bol-source-3"],
          },
          {
            text: "Równie ważny jest produkt. Przeglądy rozdzielają interwencje według proporcji THC:CBD, źródła substancji i sposobu podania, ponieważ wyniki nie są wymienne.",
            citationIds: ["terapia-kannabinoidowa-a-przewlekly-bol-source-1", "terapia-kannabinoidowa-a-przewlekly-bol-source-2"],
          },
          {
            text: "Trzeci element to wynik. Średnia zmiana natężenia bólu, wyraźny próg ulgi i codzienne funkcjonowanie opisują inne aspekty doświadczenia pacjenta.",
            citationIds: ["terapia-kannabinoidowa-a-przewlekly-bol-source-1", "terapia-kannabinoidowa-a-przewlekly-bol-source-2", "terapia-kannabinoidowa-a-przewlekly-bol-source-3"],
          },
          {
            text: "Dlatego uczciwa odpowiedź nie mieści się w słowie „działa” lub „nie działa”. Trzeba wskazać, o której populacji, interwencji i mierze wyniku mowa.",
          },
        ],
      },
      {
        heading: "Najnowszy obraz z Annals",
        kind: "evidence",
        paragraphs: [
          {
            text: "Przegląd opublikowany w Annals objął 25 randomizowanych badań kontrolowanych i 2303 uczestników. Próby trwały od 1 do 6 miesięcy, a 64% osób miało ból neuropatyczny.",
            citationIds: ["terapia-kannabinoidowa-a-przewlekly-bol-source-1"],
          },
          {
            text: "Produkty z wysoką proporcją THC do CBD oraz ekstrakty o porównywalnej proporcji mogły dawać małe średnie zmniejszenie natężenia bólu. Produkty z niską proporcją THC do CBD mogły nie poprawiać wyników.",
            citationIds: ["terapia-kannabinoidowa-a-przewlekly-bol-source-1"],
          },
          {
            text: "W części kategorii zawierających THC częściej obserwowano zawroty głowy, sedację i nudności. Autorzy podkreślili potrzebę badań długoterminowych oraz danych o innych typach produktów.",
            citationIds: ["terapia-kannabinoidowa-a-przewlekly-bol-source-1"],
          },
          {
            text: "Liczba 25 nie oznacza, że każdy wynik opierał się na wszystkich próbach. Poszczególne analizy obejmowały mniejsze zbiory porównywalnych interwencji.",
            citationIds: ["terapia-kannabinoidowa-a-przewlekly-bol-source-1"],
          },
        ],
      },
      {
        heading: "AHRQ: mała różnica na skali nie jest pełnym obrazem",
        kind: "evidence",
        paragraphs: [
          {
            text: "AHRQ oszacował dla doustnego aerozolu o porównywalnej proporcji THC:CBD średnią różnicę bólu na minus 0,54 punktu w skali od 0 do 10. Analiza obejmowała siedem badań i 878 osób.",
            citationIds: ["terapia-kannabinoidowa-a-przewlekly-bol-source-2"],
          },
          {
            text: "Dla syntetycznych lub oczyszczonych produktów z wysoką proporcją THC do CBD średnia różnica wyniosła minus 0,78 punktu. Osiem badań obejmowało 507 osób, a wynik funkcjonalny nie uległ poprawie.",
            citationIds: ["terapia-kannabinoidowa-a-przewlekly-bol-source-2"],
          },
          {
            text: "Dla oczyszczonego doustnego CBD bez THC cztery badania z 334 osobami nie wykazały zmniejszenia natężenia bólu ani większej szansy odpowiedzi bólowej względem placebo.",
            citationIds: ["terapia-kannabinoidowa-a-przewlekly-bol-source-2"],
          },
          {
            text: "Te wyniki dotyczą konkretnych kategorii i krótkiego okresu. Nie są wspólną średnią dla wszystkich produktów dostępnych pod szeroką nazwą kannabinoidów.",
            citationIds: ["terapia-kannabinoidowa-a-przewlekly-bol-source-2"],
          },
        ],
      },
      {
        heading: "Cochrane: wysoki próg ulgi zmienia pytanie",
        kind: "evidence",
        paragraphs: [
          {
            text: "Przegląd Cochrane dotyczył dorosłych z przewlekłym bólem neuropatycznym. Autorzy osobno oceniali leki z przewagą THC, z równowagą THC/CBD i z przewagą CBD.",
            citationIds: ["terapia-kannabinoidowa-a-przewlekly-bol-source-3"],
          },
          {
            text: "Dla każdej z tych grup nie znaleziono jasnego dowodu na ulgę wynoszącą co najmniej 50%. Pewność tego wyniku była niska albo bardzo niska.",
            citationIds: ["terapia-kannabinoidowa-a-przewlekly-bol-source-3"],
          },
          {
            text: "Dla produktów o zrównoważonej proporcji THC/CBD możliwy był niewielki wzrost odsetka osób osiągających ulgę co najmniej 30%. Autorzy uznali wielkość tej różnicy za klinicznie nieistotną.",
            citationIds: ["terapia-kannabinoidowa-a-przewlekly-bol-source-3"],
          },
          {
            text: "Wniosek Cochrane nie musi przeczyć małej zmianie średniej z AHRQ. Próg 50% pyta o wyraźną odpowiedź u części osób, a średnia opisuje przesunięcie całej grupy.",
            citationIds: ["terapia-kannabinoidowa-a-przewlekly-bol-source-2", "terapia-kannabinoidowa-a-przewlekly-bol-source-3"],
          },
        ],
      },
      {
        heading: "Jak przełożyć wynik grupy na rozmowę",
        kind: "interpretation",
        paragraphs: [
          {
            text: "Średnia różnica może powstać z wielu indywidualnych przebiegów. Część osób może odczuć większą zmianę, część mniejszą, a część żadną.",
            citationIds: ["terapia-kannabinoidowa-a-przewlekly-bol-source-1", "terapia-kannabinoidowa-a-przewlekly-bol-source-2", "terapia-kannabinoidowa-a-przewlekly-bol-source-3"],
          },
          {
            text: "Przedział ufności pokazuje precyzję oszacowania. Szeroki zakres oznacza, że dane są zgodne z kilkoma różnymi wielkościami efektu.",
            citationIds: ["terapia-kannabinoidowa-a-przewlekly-bol-source-1", "terapia-kannabinoidowa-a-przewlekly-bol-source-2", "terapia-kannabinoidowa-a-przewlekly-bol-source-3"],
          },
          {
            text: "Pewność dowodów mówi, jak bardzo można ufać oszacowaniu w świetle jakości i spójności badań. Nie opisuje pewności wyniku u konkretnego pacjenta.",
            citationIds: ["terapia-kannabinoidowa-a-przewlekly-bol-source-1", "terapia-kannabinoidowa-a-przewlekly-bol-source-2", "terapia-kannabinoidowa-a-przewlekly-bol-source-3"],
          },
          {
            text: "Funkcjonowanie bywa równie ważne jak natężenie bólu. Jeżeli publikacja pokazuje zmianę skali, ale nie poprawę codziennych czynności, oba wyniki trzeba zachować w rozmowie.",
            citationIds: ["terapia-kannabinoidowa-a-przewlekly-bol-source-2"],
          },
        ],
      },
      {
        heading: "Najważniejsze ograniczenia",
        kind: "limits",
        paragraphs: [
          {
            text: "Okres od 1 do 6 miesięcy odpowiada na pytania krótkoterminowe. Nie pozwala pewnie opisać trwałości korzyści, rzadkich szkód ani wieloletniego przebiegu.",
            citationIds: ["terapia-kannabinoidowa-a-przewlekly-bol-source-1", "terapia-kannabinoidowa-a-przewlekly-bol-source-2"],
          },
          {
            text: "Większość materiału dotyczyła bólu neuropatycznego. Przenoszenie wniosku na każdy przewlekły ból rozszerzałoby go poza badaną populację.",
            citationIds: ["terapia-kannabinoidowa-a-przewlekly-bol-source-1", "terapia-kannabinoidowa-a-przewlekly-bol-source-2"],
          },
          {
            text: "AHRQ uznał dowody dla całej rośliny, wielu innych produktów oraz porównań z aktywnym leczeniem za niewystarczające. Brak danych nie powinien być zastępowany analogią.",
            citationIds: ["terapia-kannabinoidowa-a-przewlekly-bol-source-2"],
          },
          {
            text: "Wynik jednego produktu nie przechodzi na inny produkt o odmiennym składzie, proporcji lub drodze podania. Wspólne słowo w nazwie nie tworzy wspólnej dokumentacji.",
            citationIds: ["terapia-kannabinoidowa-a-przewlekly-bol-source-1", "terapia-kannabinoidowa-a-przewlekly-bol-source-2", "terapia-kannabinoidowa-a-przewlekly-bol-source-3"],
          },
          {
            text: "Wytyczna BMJ opierała się na wcześniejszym zestawie dowodów. Przy rozmowie warto sprawdzać datę wyszukiwania i nowsze aktualizacje przeglądów.",
            citationIds: ["terapia-kannabinoidowa-a-przewlekly-bol-source-1", "terapia-kannabinoidowa-a-przewlekly-bol-source-2", "terapia-kannabinoidowa-a-przewlekly-bol-source-3", "terapia-kannabinoidowa-a-przewlekly-bol-source-4"],
          },
        ],
      },
      {
        heading: "Przykład: co ukrywa prosty nagłówek",
        kind: "interpretation",
        paragraphs: [
          {
            text: "Nagłówek może mówić, że kannabinoidy zmniejszają przewlekły ból. Pełny tekst ujawnia jednak, że średnia dotyczyła wybranej kategorii produktu i krótkiego okresu.",
            citationIds: ["terapia-kannabinoidowa-a-przewlekly-bol-source-1", "terapia-kannabinoidowa-a-przewlekly-bol-source-2"],
          },
          {
            text: "Po sprawdzeniu tabeli okazuje się, że większość materiału dotyczyła bólu neuropatycznego. Wniosek trzeba więc zawęzić do populacji rzeczywiście obecnej w badaniach.",
            citationIds: ["terapia-kannabinoidowa-a-przewlekly-bol-source-1", "terapia-kannabinoidowa-a-przewlekly-bol-source-2"],
          },
          {
            text: "Dalsza lektura pokazuje częstsze działania niepożądane oraz brak pewnych danych wieloletnich. Korzyść i szkody znów stają się częścią jednego obrazu.",
            citationIds: ["terapia-kannabinoidowa-a-przewlekly-bol-source-1", "terapia-kannabinoidowa-a-przewlekly-bol-source-2"],
          },
          {
            text: "Rzetelne podsumowanie jest dłuższe od nagłówka, ale znacznie bardziej użyteczne. Pozwala zapytać o podobieństwo produktu, populacji i wyniku.",
          },
        ],
      },
      {
        heading: "Pięć pytań do omówienia w gabinecie",
        kind: "practice",
        paragraphs: [
          {
            text: "Najlepsze pytania łączą wynik badania z jego granicami. Nie chodzi o samodzielną kwalifikację, lecz o zrozumienie, które dane lekarz uważa za istotne.",
          },
          {
            text: "Zapytaj też, jak rozpoznana niepewność wpływa na decyzję. Lekarz może wyjaśnić, dlaczego dane dla jednej populacji lub produktu nie odpowiadają omawianej sytuacji.",
          },
          {
            text: "W tej placówce decyzję medyczną podejmuje lekarz po osobistym badaniu pacjenta. Wyniki przeglądów porządkują rozmowę, ale nie wydają indywidualnego rozstrzygnięcia.",
          },
        ],
        bullets: [
          "Jaki rodzaj bólu dominował w badaniach najbliższych omawianej sytuacji?",
          "Który konkretny produkt i drogę podania oceniono?",
          "Czy wynik dotyczy średniej zmiany, progu ulgi czy funkcjonowania?",
          "Jak częste działania niepożądane zestawiono z możliwą korzyścią?",
          "Czego nie wiadomo po zakończeniu krótkiego okresu obserwacji?",
        ],
      },
    ],
    sources: [
      {
        id: "terapia-kannabinoidowa-a-przewlekly-bol-source-1",
        title: "Cannabis-Based Products for Chronic Pain: An Updated Systematic Review",
        publisher: "Annals of Internal Medicine / PubMed",
        href: "https://pubmed.ncbi.nlm.nih.gov/41429020/",
        quality: "high",
      },
      {
        id: "terapia-kannabinoidowa-a-przewlekly-bol-source-2",
        title: "Living Systematic Review on Cannabis and Other Plant-Based Treatments for Chronic Pain: 2025 Update",
        publisher: "Agency for Healthcare Research and Quality / NCBI Bookshelf",
        href: "https://www.ncbi.nlm.nih.gov/books/NBK618045/",
        quality: "high",
      },
      {
        id: "terapia-kannabinoidowa-a-przewlekly-bol-source-3",
        title: "Cannabis-based medicines for chronic neuropathic pain in adults",
        publisher: "Cochrane Database of Systematic Reviews / PubMed",
        href: "https://pubmed.ncbi.nlm.nih.gov/41548880/",
        quality: "high",
      },
      {
        id: "terapia-kannabinoidowa-a-przewlekly-bol-source-4",
        title: "Medical cannabis or cannabinoids for chronic pain: a clinical practice guideline",
        publisher: "The BMJ",
        href: "https://doi.org/10.1136/bmj.n2040",
        quality: "high",
      },
    ],
    relatedSlugs: [
      "jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej",
      "bezpieczenstwo-i-rozmowa-z-lekarzem",
    ],
  },
  {
    slug: "cbd-thc-i-leki-kannabinoidowe",
    title: "CBD, THC i leki kannabinoidowe: dlaczego tych pojęć nie należy używać zamiennie",
    description:
      "Jak odróżnić substancję, skład produktu, status leczniczy i zakres danych z konkretnego badania.",
    excerpt:
      "CBD i THC to nazwy substancji. Nie mówią same, czym jest produkt, jaki ma skład ani czy wynik innego preparatu ma do niego zastosowanie.",
    readingTime: "7 min czytania",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    reviewStatus: "review-required",
    topics: ["bezpieczenstwo-i-zrodla"],
    keyPoints: [
      "Oddziel nazwę substancji od nazwy, składu i statusu konkretnego produktu.",
      "Sprawdzaj proporcję THC:CBD, postać, drogę podania i badaną populację.",
      "Nie przenoś wyników jednego produktu na preparat o innym zakresie danych.",
    ],
    sections: [
      {
        heading: "Cztery poziomy, które łatwo pomylić",
        kind: "overview",
        paragraphs: [
          {
            text: "CBD, czyli kannabidiol, i THC, czyli tetrahydrokannabinol, to nazwy różnych kannabinoidów. Sama nazwa substancji nie określa jeszcze gotowego produktu.",
            citationIds: ["cbd-thc-i-leki-kannabinoidowe-source-1", "cbd-thc-i-leki-kannabinoidowe-source-2", "cbd-thc-i-leki-kannabinoidowe-source-3"],
          },
          {
            text: "Produkt ma własny skład, proporcje substancji, postać i sposób podania. Publikacja naukowa dodatkowo określa populację, porównanie, mierzony wynik i czas obserwacji.",
            citationIds: ["cbd-thc-i-leki-kannabinoidowe-source-2", "cbd-thc-i-leki-kannabinoidowe-source-3"],
          },
          {
            text: "Lek jest konkretnym produktem leczniczym z dokumentacją ocenioną dla określonego zakresu. Nie każda rzecz opisana słowem „CBD”, „THC” lub „konopie” ma ten sam status.",
            citationIds: ["cbd-thc-i-leki-kannabinoidowe-source-1", "cbd-thc-i-leki-kannabinoidowe-source-4"],
          },
          {
            text: "Najbezpieczniej pytać pełnym zdaniem: jaka substancja, w jakim produkcie, dla jakiego zastosowania i na podstawie którego źródła?",
          },
        ],
      },
      {
        heading: "Przykład EMA: jedna substancja nie oznacza wszystkich produktów",
        kind: "evidence",
        paragraphs: [
          {
            text: "EMA opisuje Epidyolex jako dopuszczony w Unii Europejskiej lek zawierający kannabidiol. Jego strona wskazuje konkretny zakres zastosowania w wybranych rzadkich zespołach padaczkowych.",
            citationIds: ["cbd-thc-i-leki-kannabinoidowe-source-1"],
          },
          {
            text: "Dokumentacja EMA dotyczy właśnie tego produktu i jego ocenionego zakresu. Nie potwierdza skuteczności każdego preparatu zawierającego CBD ani zastosowania w przewlekłym bólu.",
            citationIds: ["cbd-thc-i-leki-kannabinoidowe-source-1"],
          },
          {
            text: "EMA opisuje również określone działania niepożądane i środki bezpieczeństwa dla Epidyolexu. Tych informacji nie należy automatycznie kopiować na produkt o innym składzie i dokumentacji.",
            citationIds: ["cbd-thc-i-leki-kannabinoidowe-source-1"],
          },
          {
            text: "Ten przykład pokazuje różnicę między zdaniem „CBD jest składnikiem” a zdaniem „oceniono konkretny lek zawierający CBD”. Drugie zdanie ma znacznie węższy zakres.",
            citationIds: ["cbd-thc-i-leki-kannabinoidowe-source-1"],
          },
        ],
      },
      {
        heading: "Jak przeglądy dzielą produkty",
        kind: "evidence",
        paragraphs: [
          {
            text: "AHRQ grupował interwencje według proporcji THC do CBD. Dodatkowo rozróżniał produkty syntetyczne, oczyszczone z pojedynczym kannabinoidem oraz ekstrakty zawierające wiele kannabinoidów.",
            citationIds: ["cbd-thc-i-leki-kannabinoidowe-source-3"],
          },
          {
            text: "W przeglądzie doustne oczyszczone CBD bez THC oceniono w czterech badaniach z 334 osobami. Nie stwierdzono zmniejszenia natężenia bólu ani poprawy funkcjonowania względem placebo.",
            citationIds: ["cbd-thc-i-leki-kannabinoidowe-source-3"],
          },
          {
            text: "Inne wyniki dotyczyły ekstraktów o porównywalnej proporcji THC:CBD oraz produktów z wysoką proporcją THC. Dla części z nich opisano małe zmiany bólu i częstsze działania niepożądane.",
            citationIds: ["cbd-thc-i-leki-kannabinoidowe-source-3"],
          },
          {
            text: "NICE używa pojęcia produktów kannabinoidowych jako szerokiej kategorii obejmującej różne wyroby i związki. Sama wspólna kategoria nie usuwa różnic między ich dokumentacją.",
            citationIds: ["cbd-thc-i-leki-kannabinoidowe-source-2"],
          },
        ],
      },
      {
        heading: "Trzy przykłady błędnego skrótu",
        kind: "interpretation",
        paragraphs: [
          {
            text: "Pierwszy skrót brzmi: „badano CBD, więc każdy olejek CBD ma ten wynik”. Pomija on produkt, czystość, postać, populację oraz zakres oceniony w publikacji.",
            citationIds: ["cbd-thc-i-leki-kannabinoidowe-source-1", "cbd-thc-i-leki-kannabinoidowe-source-3"],
          },
          {
            text: "Drugi brzmi: „wynik dla mieszanki THC:CBD opisuje samo CBD”. Taki wniosek usuwa drugi składnik oraz konkretną proporcję badanego produktu.",
            citationIds: ["cbd-thc-i-leki-kannabinoidowe-source-2", "cbd-thc-i-leki-kannabinoidowe-source-3"],
          },
          {
            text: "Trzeci brzmi: „produkt leczniczy i produkt dostępny bez recepty są wymienne”. Nazwa wspólnego składnika nie tworzy wspólnego statusu ani wspólnej dokumentacji.",
            citationIds: ["cbd-thc-i-leki-kannabinoidowe-source-1", "cbd-thc-i-leki-kannabinoidowe-source-4"],
          },
          {
            text: "Poprawa polega na dopisaniu brakującego rzeczownika. Zamiast „CBD działa” warto napisać: „w tym badaniu oceniono ten produkt, w tej populacji i w tym wyniku”.",
          },
        ],
      },
      {
        heading: "Zakres prawny i zakres badania to dwie różne osie",
        kind: "limits",
        paragraphs: [
          {
            text: "Polska ustawa o przeciwdziałaniu narkomanii określa ramy dotyczące substancji kontrolowanych i surowca farmaceutycznego z konopi. Status konkretnego produktu trzeba sprawdzać w aktualnych dokumentach.",
            citationIds: ["cbd-thc-i-leki-kannabinoidowe-source-4"],
          },
          {
            text: "Fakt, że produkt mieści się w określonych ramach prawnych, nie odpowiada jeszcze na pytanie o korzyści dla jednej osoby. To odrębne pytanie medyczne.",
            citationIds: ["cbd-thc-i-leki-kannabinoidowe-source-4"],
          },
          {
            text: "Z drugiej strony wynik badania nie zmienia samodzielnie statusu produktu. Publikacja naukowa i oficjalna dokumentacja produktu pełnią różne funkcje.",
            citationIds: ["cbd-thc-i-leki-kannabinoidowe-source-1", "cbd-thc-i-leki-kannabinoidowe-source-4"],
          },
          {
            text: "Wytyczna NICE powstała dla brytyjskiego systemu. Może pomagać rozumieć kategorie i jakość danych, ale nie zastępuje polskich przepisów.",
            citationIds: ["cbd-thc-i-leki-kannabinoidowe-source-2", "cbd-thc-i-leki-kannabinoidowe-source-4"],
          },
        ],
      },
      {
        heading: "Jak sprawdzić internetowe twierdzenie o produkcie",
        kind: "practice",
        paragraphs: [
          {
            text: "Najpierw znajdź źródło pierwotne. Link do publikacji, wytycznej albo dokumentacji urzędowej mówi więcej niż zrzut ekranu z wyrwanym zdaniem.",
          },
          {
            text: "Sprawdź, czy nazwa produktu w omówieniu odpowiada nazwie w źródle. Podobne określenie marketingowe nie potwierdza tożsamości składu.",
            citationIds: ["cbd-thc-i-leki-kannabinoidowe-source-1", "cbd-thc-i-leki-kannabinoidowe-source-3"],
          },
          {
            text: "Odszukaj proporcję THC:CBD, postać i drogę podania. AHRQ wykorzystuje właśnie te cechy do rozdzielania kategorii interwencji.",
            citationIds: ["cbd-thc-i-leki-kannabinoidowe-source-3"],
          },
          {
            text: "Następnie sprawdź populację i mierzony wynik. Dane o napadach padaczkowych dla konkretnego leku nie są wynikiem dotyczącym przewlekłego bólu.",
            citationIds: ["cbd-thc-i-leki-kannabinoidowe-source-1"],
          },
          {
            text: "Zwróć uwagę na słowa „może”, „prawdopodobnie” i ocenę pewności. Nie usuwaj ich przy zapisywaniu własnego podsumowania.",
            citationIds: ["cbd-thc-i-leki-kannabinoidowe-source-2", "cbd-thc-i-leki-kannabinoidowe-source-3"],
          },
          {
            text: "Jeżeli któregoś elementu brakuje, zapisz brak zamiast wniosku. To uczciwsze niż przypisywanie produktowi danych z podobnie brzmiącej kategorii.",
          },
          {
            text: "Sprawdź również datę materiału. Nowszy przegląd może obejmować dodatkowe badania albo inaczej oceniać pewność wcześniejszego wyniku.",
          },
          {
            text: "Zachowaj link i krótką notatkę o zakresie źródła. Podczas rozmowy łatwiej wtedy odtworzyć, co dokładnie zostało przeczytane.",
          },
        ],
        bullets: [
          "Czy widzę źródło pierwotne i datę jego aktualizacji?",
          "Czy nazwa oraz skład produktu zgadzają się w obu miejscach?",
          "Czy badano ten sam sposób podania?",
          "Czy wynik dotyczy tej samej populacji i pytania?",
          "Jak autorzy opisali pewność oraz ograniczenia?",
        ],
      },
      {
        heading: "Checklista etykiety, źródła i pytania",
        kind: "practice",
        paragraphs: [
          {
            text: "Gdy czytasz o produkcie, najpierw zapisz jego pełną nazwę i skład podany w źródle. Następnie sprawdź, czy publikacja ocenia dokładnie tę samą interwencję.",
          },
          {
            text: "Oddziel informację z reklamy lub opisu sklepu od dokumentacji urzędowej i publikacji. Brak szczegółów jest powodem do ograniczenia wniosku.",
          },
          {
            text: "Na wizytę przynieś pytania, nie samodzielną konkluzję. W tej placówce decyzję medyczną podejmuje lekarz po osobistym badaniu pacjenta.",
          },
        ],
        bullets: [
          "Jaka jest pełna nazwa i postać produktu?",
          "Jakie substancje oraz proporcje opisuje źródło?",
          "Czy publikacja dotyczy tego samego produktu i sposobu podania?",
          "Jaka populacja uczestniczyła w badaniu?",
          "Czy źródło jest publikacją, wytyczną czy dokumentacją urzędową produktu?",
          "Którego wniosku nie wolno przenieść na inny preparat?",
        ],
      },
    ],
    sources: [
      {
        id: "cbd-thc-i-leki-kannabinoidowe-source-1",
        title: "Epidyolex",
        publisher: "European Medicines Agency",
        href: "https://www.ema.europa.eu/en/medicines/human/EPAR/epidyolex",
        quality: "high",
      },
      {
        id: "cbd-thc-i-leki-kannabinoidowe-source-2",
        title: "Cannabis-based medicinal products (NG144)",
        publisher: "National Institute for Health and Care Excellence",
        href: "https://www.nice.org.uk/guidance/ng144",
        quality: "high",
      },
      {
        id: "cbd-thc-i-leki-kannabinoidowe-source-3",
        title: "Living Systematic Review on Cannabis and Other Plant-Based Treatments for Chronic Pain: 2025 Update",
        publisher: "Agency for Healthcare Research and Quality / NCBI Bookshelf",
        href: "https://www.ncbi.nlm.nih.gov/books/NBK618045/",
        quality: "high",
      },
      {
        id: "cbd-thc-i-leki-kannabinoidowe-source-4",
        title: "Ustawa z dnia 29 lipca 2005 r. o przeciwdziałaniu narkomanii",
        publisher: "Elektroniczny Dziennik Ustaw",
        href: "https://eli.gov.pl/api/acts/DU/2023/1939/text.html",
        quality: "high",
      },
    ],
    relatedSlugs: [
      "jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej",
      "terapia-kannabinoidowa-a-przewlekly-bol",
    ],
  },
  {
    slug: "prawo-do-informacji-i-dokumentacji",
    title: "Prawo do informacji i dokumentacji: jak przygotować rozmowę z lekarzem",
    description:
      "Jak korzystać z przystępnej informacji, własnej dokumentacji oraz IKP bez zakładania, że system pokaże wszystko.",
    excerpt:
      "Pacjent ma prawo pytać i uzyskać dostęp do dokumentacji. IKP oraz EDM pomagają, lecz nie są kompletnym automatycznym archiwum.",
    readingTime: "7 min czytania",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    reviewStatus: "review-required",
    topics: ["konsultacja-stacjonarna", "przygotowanie-i-komunikacja"],
    keyPoints: [
      "Proś o wyjaśnienie prostymi słowami i zapisuj najważniejsze ustalenia.",
      "Traktuj IKP oraz EDM jako pomoc, a nie kompletną historię wszystkich dokumentów.",
      "Udostępniaj dokumentację świadomie, we właściwym zakresie i bezpiecznym kanałem.",
    ],
    sections: [
      {
        heading: "Dwa prawa, które pomagają w rozmowie",
        kind: "overview",
        paragraphs: [
          {
            text: "Pacjent ma prawo do przystępnej informacji o swoim stanie zdrowia. Rzecznik Praw Pacjenta wskazuje także informacje o rozpoznaniu, proponowanych metodach, następstwach, wynikach leczenia i rokowaniu.",
            citationIds: ["prawo-do-informacji-i-dokumentacji-source-1", "prawo-do-informacji-i-dokumentacji-source-4"],
          },
          {
            text: "Pacjent ma również prawo dostępu do dokumentacji dotyczącej stanu zdrowia i udzielonych świadczeń. Dokumentacja oraz rozmowa pełnią jednak inne role.",
            citationIds: ["prawo-do-informacji-i-dokumentacji-source-2", "prawo-do-informacji-i-dokumentacji-source-4"],
          },
          {
            text: "Dokument zapisuje określone informacje z wcześniejszego zdarzenia. Rozmowa pozwala zapytać, jak lekarz rozumie je dzisiaj i czego nadal nie można rozstrzygnąć.",
          },
          {
            text: "Prawo do informacji nie wymaga znajomości języka medycznego przez pacjenta. Można poprosić o prostsze wyjaśnienie terminu albo powtórzenie najważniejszego wniosku.",
            citationIds: ["prawo-do-informacji-i-dokumentacji-source-1", "prawo-do-informacji-i-dokumentacji-source-4"],
          },
        ],
      },
      {
        heading: "Dokumentacja nie mówi sama za siebie",
        kind: "interpretation",
        paragraphs: [
          {
            text: "Wynik badania, wypis i opis konsultacji powstały w określonym czasie oraz celu. Bez tego kontekstu pojedyncze zdanie może być łatwo przecenione.",
          },
          {
            text: "Przed wizytą warto zapisać pytanie przy dokumencie. Zamiast zaznaczać „ważne”, dopisz: „czego ten wynik dotyczy?” albo „czy nadal ma znaczenie?”.",
          },
          {
            text: "Nie trzeba samodzielnie rozstrzygać sprzeczności między dokumentami. Ułóż je chronologicznie i poproś lekarza o wyjaśnienie, skąd może wynikać różnica.",
          },
          {
            text: "Brak dokumentu również jest informacją organizacyjną. Zapisz nazwę placówki i przybliżony czas, zamiast odtwarzać szczegóły z niepewnej pamięci.",
          },
        ],
      },
      {
        heading: "Co rzeczywiście można znaleźć w IKP i EDM",
        kind: "evidence",
        paragraphs: [
          {
            text: "Internetowe Konto Pacjenta pokazuje zdarzenia medyczne i dokumenty EDM przekazane do systemu. Aplikacja mojeIKP pozwala sprawdzić, które zdarzenia mają dokumenty dostępne online.",
            citationIds: ["prawo-do-informacji-i-dokumentacji-source-3"],
          },
          {
            text: "CeZ wymienia w EDM między innymi opisy badań diagnostycznych, wyniki laboratoryjne z opisem, informacje kierujące i wypisy ze szpitala. Katalog ma być rozszerzany.",
            citationIds: ["prawo-do-informacji-i-dokumentacji-source-3"],
          },
          {
            text: "Placówka musi mieć oprogramowanie umożliwiające umieszczenie dokumentu w systemie. Jeżeli materiału nie widać, CeZ zaleca zapytać podmiot, który mógł go wytworzyć.",
            citationIds: ["prawo-do-informacji-i-dokumentacji-source-3"],
          },
          {
            text: "Z tych powodów IKP i EDM nie są kompletnym automatycznym archiwum wszystkich konsultacji, wyników i dokumentów. Brak pozycji nie pozwala wnioskować, że zdarzenia nie było.",
            citationIds: ["prawo-do-informacji-i-dokumentacji-source-3"],
          },
        ],
      },
      {
        heading: "Kto widzi dokument i kiedy",
        kind: "evidence",
        paragraphs: [
          {
            text: "Według CeZ dostęp ma pacjent oraz lekarz lub placówka, którzy wytworzyli dokumentację. Określone uprawnienia mają również wskazani pracownicy podstawowej opieki zdrowotnej.",
            citationIds: ["prawo-do-informacji-i-dokumentacji-source-3"],
          },
          {
            text: "Pacjent może udostępnić dokumentację innemu lekarzowi w wybranym zakresie i czasie. Możliwość zobaczenia materiału na własnym koncie nie daje więc automatycznie dostępu każdej placówce.",
            citationIds: ["prawo-do-informacji-i-dokumentacji-source-3"],
          },
          {
            text: "Zakres udostępnienia warto sprawdzić przed wizytą. Pacjent powinien wiedzieć, czy lekarz otrzymał dokument elektronicznie, czy trzeba pokazać własną kopię.",
          },
          {
            text: "Zwykły e-mail i formularz organizacyjny nie są domyślnym miejscem na dokumentację medyczną. Korzystaj wyłącznie z kanału wyraźnie wskazanego przez placówkę.",
          },
        ],
      },
      {
        heading: "Jak poprosić o dokument bez chaosu",
        kind: "practice",
        paragraphs: [
          {
            text: "Najpierw ustal, który podmiot wytworzył dokument. Prawo dostępu realizuje placówka prowadząca daną dokumentację, zgodnie z obowiązującymi zasadami udostępniania.",
            citationIds: ["prawo-do-informacji-i-dokumentacji-source-2", "prawo-do-informacji-i-dokumentacji-source-4"],
          },
          {
            text: "W prośbie nazwij przybliżony okres i rodzaj świadczenia. Nie musisz odtwarzać treści dokumentu, którego właśnie szukasz.",
          },
          {
            text: "Po otrzymaniu materiału sprawdź, czy zgadzają się dane placówki, data i rodzaj dokumentu. Wątpliwości zgłoś podmiotowi, który wydał kopię.",
          },
          {
            text: "Zachowaj plik w niezmienionej postaci i nadaj mu czytelną nazwę. Własne komentarze trzymaj osobno, aby nie pomieszały się z dokumentacją.",
          },
          {
            text: "Jeżeli dokumentu nadal nie ma, zapisz wykonane kroki. Na wizycie łatwiej wtedy wyjaśnić, czego brakuje i skąd próbowano to uzyskać.",
          },
          {
            text: "Nie przesyłaj otrzymanej kopii na przypadkowy adres. Przed udostępnieniem upewnij się, jaki kanał oraz zakres wskazała placówka przyjmująca.",
          },
          {
            text: "Jeśli prośba jest niejasna, poproś placówkę o wskazanie właściwej procedury. Nie przesyłaj szerszego zestawu danych tylko na wszelki wypadek.",
          },
          {
            text: "Przed wizytą oznacz dokumenty pytaniami, ale nie modyfikuj ich treści. Własna adnotacja powinna pozostać wyraźnie oddzielona od kopii źródłowej.",
          },
        ],
        bullets: [
          "Kto wytworzył dokument?",
          "Jakiego okresu i świadczenia dotyczy prośba?",
          "Czy otrzymana kopia ma właściwą datę oraz źródło?",
          "Gdzie przechowuję oryginalny plik, a gdzie własne notatki?",
        ],
      },
      {
        heading: "Granice praw i systemów",
        kind: "limits",
        paragraphs: [
          {
            text: "Prawo dostępu nie oznacza, że wszystkie dokumenty znajdują się w jednym miejscu. Dokumentację mogą przechowywać różne podmioty, a zakres EDM nadal nie obejmuje wszystkiego.",
            citationIds: ["prawo-do-informacji-i-dokumentacji-source-2", "prawo-do-informacji-i-dokumentacji-source-3", "prawo-do-informacji-i-dokumentacji-source-4"],
          },
          {
            text: "Prawo do informacji nie daje obietnicy określonej decyzji medycznej. Zapewnia możliwość uzyskania wyjaśnienia dotyczącego własnej sytuacji i proponowanego postępowania.",
            citationIds: ["prawo-do-informacji-i-dokumentacji-source-1", "prawo-do-informacji-i-dokumentacji-source-4"],
          },
          {
            text: "Dostęp do dokumentu nie zastępuje jego interpretacji. Warto oddzielić treść źródłową od wniosków, które pojawiły się dopiero podczas samodzielnej lektury.",
          },
          {
            text: "Ten materiał wyjaśnia praktyczne korzystanie z praw pacjenta. Nie rozstrzyga indywidualnego sporu o udostępnienie konkretnego dokumentu.",
          },
        ],
      },
      {
        heading: "Plan rozmowy przed, w trakcie i po wizycie",
        kind: "practice",
        paragraphs: [
          {
            text: "Przed wizytą sprawdź IKP, własne pliki i dokumenty papierowe. Zapisz braki oraz pytania, ale nie wysyłaj danych medycznych kanałem rezerwacyjnym.",
          },
          {
            text: "W gabinecie poproś o wskazanie, które informacje są najważniejsze. Gdy pojawia się termin specjalistyczny, poproś o przykład lub prostsze sformułowanie.",
          },
          {
            text: "Po rozmowie zapisz własnymi słowami ustalenia, niewiadome i następne kroki. Jeżeli czegoś nie rozumiesz, zaznacz pytanie do wyjaśnienia zamiast dopowiadać odpowiedź.",
          },
          {
            text: "W tej placówce decyzję medyczną podejmuje lekarz po osobistym badaniu pacjenta. Dostęp do informacji i dokumentacji wspiera tę rozmowę, lecz jej nie automatyzuje.",
          },
        ],
        bullets: [
          "Co wynika bezpośrednio z dokumentu, a co jest jego interpretacją?",
          "Które materiały są dostępne w IKP, a których trzeba szukać w placówce?",
          "Czy lekarz ma dostęp do potrzebnego dokumentu, czy należy go pokazać?",
          "Które pojęcie wymaga wyjaśnienia prostszymi słowami?",
          "Co zostało ustalone, a co nadal pozostaje otwarte?",
        ],
      },
    ],
    sources: [
      {
        id: "prawo-do-informacji-i-dokumentacji-source-1",
        title: "Prawo do informacji",
        publisher: "Rzecznik Praw Pacjenta",
        href: "https://www.gov.pl/web/rpp/prawo-do-informacji",
        quality: "high",
      },
      {
        id: "prawo-do-informacji-i-dokumentacji-source-2",
        title: "Prawo do dokumentacji medycznej",
        publisher: "Rzecznik Praw Pacjenta",
        href: "https://www.gov.pl/web/rpp/prawo-do-dokumentacji-medycznej",
        quality: "high",
      },
      {
        id: "prawo-do-informacji-i-dokumentacji-source-3",
        title: "Elektroniczna dokumentacja medyczna",
        publisher: "Centrum e-Zdrowia / Pacjent.gov.pl",
        href: "https://pacjent.gov.pl/elektroniczna-dokumentacja-medyczna",
        quality: "high",
      },
      {
        id: "prawo-do-informacji-i-dokumentacji-source-4",
        title: "Ustawa o prawach pacjenta i Rzeczniku Praw Pacjenta",
        publisher: "Elektroniczny Dziennik Ustaw",
        href: "https://api.sejm.gov.pl/eli/acts/DU/2024/581/text.html",
        quality: "high",
      },
    ],
    relatedSlugs: [
      "przygotowanie-do-wizyty-stacjonarnej",
      "jak-wyglada-konsultacja-kwalifikacyjna",
    ],
  },
];

export function getKnowledgeArticle(slug: string) {
  return knowledgeArticles.find((article) => article.slug === slug);
}

function hasText(value: string | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidDate(value: string | undefined): value is string {
  return hasText(value) && !Number.isNaN(Date.parse(`${value}T12:00:00Z`));
}

function isCompleteMedicalReviewer(
  reviewer: MedicalReviewer | undefined,
): reviewer is MedicalReviewer {
  return Boolean(
    reviewer &&
      hasText(reviewer.name) &&
      hasText(reviewer.role) &&
      hasText(reviewer.qualifications) &&
      (reviewer.professionalId === undefined || hasText(reviewer.professionalId)),
  );
}

export function isValidKnowledgeSource(source: KnowledgeSource) {
  try {
    const url = new URL(source.href);

    return (
      hasText(source.id) &&
      hasText(source.title) &&
      hasText(source.publisher) &&
      url.protocol === "https" &&
      (source.publicationDate === undefined || isValidDate(source.publicationDate))
    );
  } catch {
    return false;
  }
}

export function hasValidKnowledgeCitations(article: KnowledgeArticle) {
  const sourceIds = new Set(article.sources.map((source) => source.id));

  return article.sections.every((section) =>
    section.paragraphs.every((paragraph) => {
      const citationIds = paragraph.citationIds;

      return (
        citationIds === undefined ||
        (citationIds.length > 0 &&
          new Set(citationIds).size === citationIds.length &&
          citationIds.every((citationId) => sourceIds.has(citationId)))
      );
    }),
  );
}

export function isPublicKnowledgeArticle(article: KnowledgeArticle) {
  const hasUniqueSourceIds =
    new Set(article.sources.map((source) => source.id)).size === article.sources.length;
  const hasEnoughHighQualitySources =
    article.sources.filter(
      (source) => source.quality === "high" && isValidKnowledgeSource(source),
    ).length >= 2;
  const hasValidReviewDates =
    isValidDate(article.reviewedAt) &&
    (article.nextReviewAt === undefined ||
      (isValidDate(article.nextReviewAt) &&
        article.nextReviewAt > article.reviewedAt));

  return (
    article.reviewStatus === "reviewed" &&
    hasText(article.authorName) &&
    isCompleteMedicalReviewer(article.medicalReviewer) &&
    hasValidReviewDates &&
    hasUniqueSourceIds &&
    hasEnoughHighQualitySources &&
    hasValidKnowledgeCitations(article)
  );
}

export function isIndexableKnowledgeArticle(article: KnowledgeArticle) {
  return isPublicReleaseReady && isPublicKnowledgeArticle(article);
}

export const publicKnowledgeArticles = knowledgeArticles.filter(
  isPublicKnowledgeArticle,
);

export const visibleKnowledgeArticles = isLocalDemoPreview
  ? knowledgeArticles
  : publicKnowledgeArticles;

export const previewKnowledgeArticles = visibleKnowledgeArticles;

export function getKnowledgeTopic(slug: string) {
  return knowledgeTopics.find((topic) => topic.slug === slug);
}

export function getArticlesForTopic(topic: KnowledgeTopic) {
  return knowledgeArticles.filter((article) =>
    topic.articleSlugs.includes(article.slug),
  );
}

export function getPublicKnowledgeArticle(slug: string) {
  const article = getKnowledgeArticle(slug);

  return article && isPublicKnowledgeArticle(article) ? article : undefined;
}

export function getVisibleKnowledgeArticle(slug: string) {
  const article = getKnowledgeArticle(slug);

  return article && visibleKnowledgeArticles.includes(article) ? article : undefined;
}

export function getPublicArticlesForTopic(topic: KnowledgeTopic) {
  const topicArticleSlugs = new Set(topic.articleSlugs);

  return publicKnowledgeArticles.filter((article) =>
    topicArticleSlugs.has(article.slug),
  );
}

export function isPublicKnowledgeTopic(topic: KnowledgeTopic) {
  return (
    new Set(getPublicArticlesForTopic(topic).map((article) => article.slug)).size >= 3
  );
}

export function isIndexableKnowledgeTopic(topic: KnowledgeTopic) {
  return isPublicReleaseReady && isPublicKnowledgeTopic(topic);
}

export const publicKnowledgeTopics = knowledgeTopics.filter(
  isPublicKnowledgeTopic,
);

export function getPublicKnowledgeTopic(slug: string) {
  const topic = getKnowledgeTopic(slug);

  return topic && isPublicKnowledgeTopic(topic) ? topic : undefined;
}
