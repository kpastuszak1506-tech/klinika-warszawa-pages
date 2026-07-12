export type KnowledgeSource = {
  title: string;
  publisher: string;
  href: string;
};

export type KnowledgeSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
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
  topics: string[];
  sections: KnowledgeSection[];
  sources: KnowledgeSource[];
  relatedSlugs: string[];
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
      "Materiały o organizacji wizyty, jej przebiegu i przygotowaniu do rozmowy z lekarzem.",
    articleSlugs: [
      "jak-wyglada-konsultacja-kwalifikacyjna",
      "przygotowanie-do-wizyty-stacjonarnej",
    ],
  },
  {
    slug: "bezpieczenstwo-i-zrodla",
    label: "Bezpieczeństwo i źródła",
    description:
      "Jak rozumieć ograniczenia publikacji naukowych i dlaczego ocena lekarza jest indywidualna.",
    articleSlugs: [
      "jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej",
      "bezpieczenstwo-i-rozmowa-z-lekarzem",
    ],
  },
  {
    slug: "przygotowanie-i-komunikacja",
    label: "Przygotowanie i komunikacja",
    description:
      "Bezpieczne zasady kontaktu organizacyjnego i przygotowania informacji do omówienia w gabinecie.",
    articleSlugs: [
      "jak-wyglada-konsultacja-kwalifikacyjna",
      "bezpieczenstwo-i-rozmowa-z-lekarzem",
      "przygotowanie-do-wizyty-stacjonarnej",
    ],
  },
];

export const knowledgeArticles: KnowledgeArticle[] = [
  {
    slug: "jak-wyglada-konsultacja-kwalifikacyjna",
    title: "Jak wygląda konsultacja kwalifikacyjna?",
    description:
      "Przejrzysty opis stacjonarnej konsultacji lekarskiej i roli indywidualnej oceny lekarza.",
    excerpt:
      "Konsultacja jest wizytą stacjonarną. Jej celem jest ocena medyczna, a nie automatyczna decyzja.",
    readingTime: "4 min czytania",
    publishedAt: "2026-07-11",
    updatedAt: "2026-07-11",
    reviewStatus: "review-required",
    topics: ["konsultacja-stacjonarna", "przygotowanie-i-komunikacja"],
    sections: [
      {
        heading: "Cel wizyty",
        paragraphs: [
          "Konsultacja kwalifikacyjna służy lekarzowi do osobistej oceny sytuacji pacjenta, dostępnej dokumentacji oraz możliwych wskazań i przeciwwskazań.",
          "Rezerwacja terminu ma charakter organizacyjny. Nie przesądza o rozpoznaniu, wdrożeniu terapii ani wystawieniu recepty.",
        ],
      },
      {
        heading: "Co dzieje się podczas konsultacji",
        paragraphs: [
          "Zakres rozmowy i badania dobiera lekarz do indywidualnej sytuacji pacjenta. W razie potrzeby może poprosić o omówienie dokumentacji dostępnej podczas wizyty.",
          "Lekarz omawia możliwe dalsze postępowanie oraz granice bezpiecznej komunikacji poza gabinetem.",
        ],
        bullets: [
          "potwierdzenie celu wizyty i danych organizacyjnych,",
          "rozmowa oraz badanie prowadzone osobiście przez lekarza,",
          "ocena wskazań, przeciwwskazań i bezpieczeństwa,",
          "informacja o dalszym postępowaniu, jeżeli jest zasadne.",
        ],
      },
      {
        heading: "Co warto przygotować",
        paragraphs: [
          "Warto zabrać dokument tożsamości oraz posiadaną dokumentację medyczną, jeśli pacjent chce ją omówić z lekarzem.",
          "Nie należy przesyłać opisu stanu zdrowia, wyników badań ani listy leków przez stronę lub zwykłą korespondencję e-mail.",
        ],
      },
    ],
    sources: [
      {
        title: "Ustawa o działalności leczniczej, art. 14",
        publisher: "Kancelaria Sejmu",
        href: "https://api.sejm.gov.pl/eli/acts/DU/2022/633/text.html",
      },
      {
        title: "Informacja dla pacjenta przed wizytą",
        publisher: "Klinika Warszawa",
        href: "/informacja-dla-pacjenta",
      },
    ],
    relatedSlugs: [
      "przygotowanie-do-wizyty-stacjonarnej",
      "bezpieczenstwo-i-rozmowa-z-lekarzem",
    ],
  },
  {
    slug: "jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej",
    title: "Jak czytać dowody naukowe dotyczące terapii kannabinoidowej?",
    description:
      "Jak rozumieć wyniki przeglądów naukowych, ich ograniczenia i rolę indywidualnej decyzji lekarza.",
    excerpt:
      "Źródła naukowe pomagają zadawać lepsze pytania. Nie zastępują osobistej oceny lekarza.",
    readingTime: "6 min czytania",
    publishedAt: "2026-07-11",
    updatedAt: "2026-07-11",
    reviewStatus: "review-required",
    topics: ["bezpieczenstwo-i-zrodla"],
    sections: [
      {
        heading: "Dlaczego pojedyncza publikacja nie wystarcza",
        paragraphs: [
          "Najbardziej użyteczne są przeglądy systematyczne, ponieważ porównują wiele badań i opisują zarówno wyniki, jak i ograniczenia materiału dowodowego.",
          "Wynik badania nie jest automatycznie odpowiedzią dla konkretnej osoby. Znaczenie mają między innymi badana populacja, czas obserwacji, rodzaj interwencji i zgłaszane działania niepożądane.",
        ],
      },
      {
        heading: "Co pokazują aktualne przeglądy",
        paragraphs: [
          "Najnowsze syntezy badań dotyczących przewlekłego bólu opisują niewielkie, krótkoterminowe różnice w części badanych populacji oraz częstsze działania niepożądane. Autorzy podkreślają potrzebę dalszych badań długoterminowych.",
          "To przykład, dlaczego rzetelna informacja powinna przedstawiać jednocześnie możliwe korzyści, ryzyka i niepewność, bez nadmiernych uproszczeń.",
        ],
      },
      {
        heading: "Jak wykorzystać źródła podczas wizyty",
        paragraphs: [
          "Publikacja może być punktem wyjścia do rozmowy z lekarzem, ale nie stanowi samodzielnej kwalifikacji ani instrukcji postępowania.",
        ],
        bullets: [
          "sprawdź, kogo dotyczyło badanie,",
          "zwróć uwagę na czas obserwacji i ograniczenia,",
          "omów z lekarzem, czy źródło ma znaczenie w Twojej sytuacji,",
          "nie podejmuj samodzielnie decyzji na podstawie nagłówka lub skrótu publikacji.",
        ],
      },
    ],
    sources: [
      {
        title: "Updated systematic review of cannabis-based products for chronic pain",
        publisher: "Annals of Internal Medicine / PubMed",
        href: "https://pubmed.ncbi.nlm.nih.gov/41429020/",
      },
      {
        title: "Cannabis-based medicines for chronic neuropathic pain in adults",
        publisher: "Cochrane Library",
        href: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD012182.pub2/pdf/CDSR/CD012182/CD012182_abstract.pdf",
      },
    ],
    relatedSlugs: [
      "jak-wyglada-konsultacja-kwalifikacyjna",
      "bezpieczenstwo-i-rozmowa-z-lekarzem",
    ],
  },
  {
    slug: "bezpieczenstwo-i-rozmowa-z-lekarzem",
    title: "Bezpieczeństwo i rozmowa z lekarzem",
    description:
      "Dlaczego decyzja o rozważanej terapii wymaga osobistego badania, rozmowy i oceny przeciwwskazań.",
    excerpt:
      "Bezpieczeństwo nie wynika z jednego formularza ani z ogólnej listy wskazań. Wymaga indywidualnej oceny.",
    readingTime: "5 min czytania",
    publishedAt: "2026-07-11",
    updatedAt: "2026-07-11",
    reviewStatus: "review-required",
    topics: ["bezpieczenstwo-i-zrodla", "przygotowanie-i-komunikacja"],
    sections: [
      {
        heading: "Dlaczego ocena jest indywidualna",
        paragraphs: [
          "Ta sama informacja naukowa może mieć inne znaczenie dla różnych pacjentów. Lekarz ocenia ją w kontekście stanu zdrowia, historii leczenia, dokumentacji i możliwych przeciwwskazań.",
          "Z tego powodu strona nie zastępuje konsultacji ankietą, automatycznym wynikiem ani opisem dawkowania.",
        ],
      },
      {
        heading: "Pytania, które można przygotować",
        paragraphs: [
          "Przed wizytą można zapisać pytania, które pomogą w rozmowie z lekarzem. Dane medyczne i dokumentację należy omawiać podczas wizyty albo przekazywać tylko wskazanym, zabezpieczonym kanałem.",
        ],
        bullets: [
          "Jakie informacje z mojej dokumentacji są istotne dla lekarza?",
          "Jak lekarz ocenia bezpieczeństwo w mojej sytuacji?",
          "Jakie działania niepożądane i ograniczenia powinny zostać omówione?",
          "Kiedy potrzebna jest kontrola lub inna forma dalszego postępowania?",
        ],
      },
      {
        heading: "Rzetelna informacja zamiast skrótów",
        paragraphs: [
          "Materiały edukacyjne powinny uwzględniać niepewność dowodów i ryzyko działań niepożądanych. Nie powinny sugerować, że jedna metoda jest odpowiednia dla każdej osoby.",
        ],
      },
    ],
    sources: [
      {
        title: "Updated systematic review of cannabis-based products for chronic pain",
        publisher: "Annals of Internal Medicine / PubMed",
        href: "https://pubmed.ncbi.nlm.nih.gov/41429020/",
      },
      {
        title: "Clinical practice guidelines for cannabinoid-based medicines in chronic pain",
        publisher: "PubMed",
        href: "https://pubmed.ncbi.nlm.nih.gov/36971587/",
      },
    ],
    relatedSlugs: [
      "jak-czytac-dowody-naukowe-o-terapii-kannabinoidowej",
      "przygotowanie-do-wizyty-stacjonarnej",
    ],
  },
  {
    slug: "przygotowanie-do-wizyty-stacjonarnej",
    title: "Jak przygotować się do wizyty stacjonarnej?",
    description:
      "Organizacyjne przygotowanie do konsultacji: dokumenty, pytania i bezpieczne kanały przekazywania informacji.",
    excerpt:
      "Dobre przygotowanie pomaga wykorzystać czas konsultacji, bez przesyłania danych medycznych przez zwykły formularz.",
    readingTime: "3 min czytania",
    publishedAt: "2026-07-11",
    updatedAt: "2026-07-11",
    reviewStatus: "review-required",
    topics: ["konsultacja-stacjonarna", "przygotowanie-i-komunikacja"],
    sections: [
      {
        heading: "Przygotowanie organizacyjne",
        paragraphs: [
          "Na wizytę warto zabrać dokument tożsamości, posiadaną dokumentację medyczną przeznaczoną do rozmowy z lekarzem oraz listę pytań.",
          "Przed wizytą sprawdź adres gabinetu i zasady kontaktu w sprawie terminu. Aktualna strona nie przyjmuje zgłoszeń medycznych ani załączników.",
        ],
      },
      {
        heading: "Bezpieczne kanały komunikacji",
        paragraphs: [
          "Zwykły formularz kontaktowy i e-mail służą wyłącznie sprawom organizacyjnym. Nie należy wpisywać w nich rozpoznań, leków, wyników badań ani opisu stanu zdrowia.",
          "Informacje medyczne są omawiane podczas wizyty lub przekazywane przez zabezpieczony system wskazany przez placówkę.",
        ],
      },
      {
        heading: "Czego można oczekiwać po rezerwacji",
        paragraphs: [
          "Rezerwacja potwierdza wyłącznie sprawy organizacyjne związane z terminem wizyty stacjonarnej. Decyzję medyczną podejmuje lekarz po osobistym badaniu pacjenta.",
        ],
      },
    ],
    sources: [
      {
        title: "Informacja dla pacjenta przed wizytą",
        publisher: "Klinika Warszawa",
        href: "/informacja-dla-pacjenta",
      },
      {
        title: "Ogólne rozporządzenie o ochronie danych, art. 13",
        publisher: "EUR-Lex",
        href: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32016R0679",
      },
    ],
    relatedSlugs: [
      "jak-wyglada-konsultacja-kwalifikacyjna",
      "bezpieczenstwo-i-rozmowa-z-lekarzem",
    ],
  },
];

export function getKnowledgeArticle(slug: string) {
  return knowledgeArticles.find((article) => article.slug === slug);
}

export function getKnowledgeTopic(slug: string) {
  return knowledgeTopics.find((topic) => topic.slug === slug);
}

export function getArticlesForTopic(topic: KnowledgeTopic) {
  return knowledgeArticles.filter((article) =>
    topic.articleSlugs.includes(article.slug),
  );
}
