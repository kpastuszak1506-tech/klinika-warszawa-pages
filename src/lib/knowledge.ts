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
      "Opis stacjonarnej konsultacji lekarskiej, jej celu oraz miejsca indywidualnej oceny lekarza.",
    excerpt:
      "Wizyta odbywa się stacjonarnie i obejmuje osobistą ocenę lekarza. Rezerwacja terminu nie oznacza decyzji o terapii ani recepty.",
    readingTime: "6 min czytania",
    publishedAt: "2026-07-11",
    updatedAt: "2026-07-13",
    reviewStatus: "review-required",
    topics: ["konsultacja-stacjonarna", "przygotowanie-i-komunikacja"],
    sections: [
      {
        heading: "Cel stacjonarnej konsultacji",
        paragraphs: [
          "W tej placówce kwalifikacja do rozważanej terapii kannabinoidowej odbywa się wyłącznie podczas wizyty stacjonarnej. Lekarz prowadzi rozmowę, wykonuje osobiste badanie i odnosi dostępne informacje do sytuacji konkretnej osoby.",
          "Celem wizyty jest ocena medyczna, a nie potwierdzenie decyzji podjętej wcześniej na podstawie informacji z internetu. Rezerwacja terminu ma wyłącznie charakter organizacyjny i nie przesądza o rozpoznaniu, wdrożeniu lub kontynuacji terapii ani o wystawieniu recepty.",
        ],
      },
      {
        heading: "Przebieg wizyty w gabinecie",
        paragraphs: [
          "Zakres rozmowy i badania dobiera lekarz do indywidualnej sytuacji. Jeżeli pacjent chce, podczas wizyty można omówić posiadaną dokumentację medyczną. Jej znaczenie ocenia lekarz, a nie formularz ani automatyczny mechanizm na stronie.",
          "Pacjent ma prawo do przystępnej informacji o rozważanych możliwościach, ich ograniczeniach i przewidywalnych następstwach. Rozmowa może więc obejmować także jakość dostępnych dowodów, niepewność wyników oraz dalsze postępowanie, o ile jest zasadne.",
        ],
        bullets: [
          "potwierdzenie celu wizyty i spraw organizacyjnych,",
          "osobista rozmowa oraz badanie prowadzone przez lekarza,",
          "ocena informacji istotnych dla bezpieczeństwa i zasadności dalszego postępowania,",
          "omówienie możliwych korzyści, ograniczeń dowodów i działań niepożądanych,",
          "decyzja o dalszym postępowaniu wyłącznie wtedy, gdy lekarz uzna ją za uzasadnioną.",
        ],
      },
      {
        heading: "Dlaczego jedna informacja nie przesądza o kwalifikacji",
        paragraphs: [
          "Badania nad produktami kannabinoidowymi różnią się między sobą populacją, rodzajem preparatu, składem, drogą podania i czasem obserwacji. Wynik publikacji, nawet rzetelnej, nie jest więc gotową odpowiedzią dla każdej osoby ani podstawą do samodzielnego wnioskowania o terapii.",
          "Lekarz odnosi dane naukowe do pełnego obrazu medycznego, w tym możliwych przeciwwskazań, dotychczasowego postępowania i informacji przedstawionych podczas badania. Ramy prawne dotyczące substancji kontrolowanych nie tworzą automatycznego wskazania klinicznego.",
        ],
      },
      {
        heading: "Przygotowanie bez przesyłania danych medycznych",
        paragraphs: [
          "Na wizytę można zabrać dokument tożsamości, posiadaną dokumentację, którą pacjent chce omówić, oraz zapisane pytania. Prawo pacjenta obejmuje dostęp do dokumentacji medycznej i przystępną informację od lekarza.",
          "Formularz kontaktowy i zwykła korespondencja e-mail służą wyłącznie sprawom organizacyjnym. Nie należy przesyłać nimi opisu stanu zdrowia, rozpoznań, wyników badań, informacji o przyjmowanych lekach ani załączników medycznych. Takie informacje są omawiane w gabinecie albo przekazywane wyłącznie przez zabezpieczony kanał wskazany przez placówkę.",
        ],
      },
    ],
    sources: [
      {
        title:
          "Ustawa o zawodach lekarza i lekarza dentysty, tekst jednolity (Dz.U. 2026 poz. 37)",
        publisher: "Kancelaria Sejmu / ISAP",
        href: "https://api.sejm.gov.pl/eli/acts/DU/2026/37/text.pdf",
      },
      {
        title:
          "Ustawa o prawach pacjenta i Rzeczniku Praw Pacjenta, tekst jednolity",
        publisher: "Kancelaria Sejmu",
        href: "https://api.sejm.gov.pl/eli/acts/DU/2024/581/text.html",
      },
      {
        title: "Prawo do informacji",
        publisher: "Rzecznik Praw Pacjenta",
        href: "https://www.gov.pl/web/rpp/prawo-do-informacji",
      },
      {
        title: "Prawo do dokumentacji medycznej",
        publisher: "Rzecznik Praw Pacjenta",
        href: "https://www.gov.pl/web/rpp/prawo-do-dokumentacji-medycznej",
      },
      {
        title: "Ustawa o przeciwdziałaniu narkomanii",
        publisher: "ELI / Kancelaria Sejmu",
        href: "https://eli.gov.pl/eli/DU/2005/1485/ogl",
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
      "Jak oceniać jakość przeglądów naukowych, ich ograniczenia oraz znaczenie dla rozmowy z lekarzem.",
    excerpt:
      "Źródła naukowe pomagają rozumieć niepewność. Nie zastępują osobistego badania ani indywidualnej decyzji lekarza.",
    readingTime: "7 min czytania",
    publishedAt: "2026-07-11",
    updatedAt: "2026-07-13",
    reviewStatus: "review-required",
    topics: ["bezpieczenstwo-i-zrodla"],
    sections: [
      {
        heading: "Najpierw pytanie badawcze, potem wynik",
        paragraphs: [
          "Rzetelne badanie odpowiada na wąsko określone pytanie: u kogo oceniano daną interwencję, z czym ją porównano, jaki wynik mierzono i jak długo trwała obserwacja. Nagłówek o produktach kannabinoidowych nie opisuje jednego, zamiennego produktu ani jednej populacji.",
          "Największą wartość mają przeglądy systematyczne i wytyczne, ponieważ zestawiają wiele badań oraz opisują ryzyko błędu, pewność dowodów i działania niepożądane. Nie usuwają jednak ograniczeń badań, z których korzystają.",
        ],
      },
      {
        heading: "Elementy, które zmieniają znaczenie publikacji",
        paragraphs: [
          "Przy czytaniu wyników warto odróżnić istotność statystyczną od wielkości efektu, a pewność dowodów od samego faktu opublikowania badania. Wynik może być niewielki, krótkotrwały albo obarczony niepewnością, mimo że w streszczeniu brzmi jednoznacznie.",
        ],
        bullets: [
          "populacja uczestników i problem zdrowotny badany przez autorów,",
          "konkretny skład, proporcje substancji i droga podania ocenianej interwencji,",
          "porównanie zastosowane w badaniu oraz długość obserwacji,",
          "wyniki ważne dla codziennego funkcjonowania, a nie tylko pojedyncza skala objawów,",
          "pełny opis działań niepożądanych, przerwanych udziałów i ograniczeń badania.",
        ],
      },
      {
        heading: "Co pokazują aktualne syntezy dotyczące przewlekłego bólu",
        paragraphs: [
          "Najnowsze przeglądy dla przewlekłego bólu analizują głównie krótką obserwację, zwykle od kilku tygodni do kilku miesięcy, i często populacje z bólem neuropatycznym. Produkty, proporcje substancji oraz metody badań są zróżnicowane.",
          "W części porównań z placebo opisano małe różnice w natężeniu bólu lub funkcjonowaniu, przy małej albo umiarkowanej pewności dowodów. Dla wielu preparatów i ważnych wyników, w tym części poważnych działań niepożądanych, dowody pozostają niewystarczające. Badania odnotowują też częstsze krótkotrwałe działania niepożądane, między innymi zawroty głowy, senność lub nudności.",
          "Te ustalenia dotyczą konkretnych badań nad przewlekłym bólem. Nie stanowią listy zastosowań ani podstawy do przenoszenia wyniku na inny problem zdrowotny, inny preparat lub konkretną osobę.",
        ],
      },
      {
        heading: "Jak wykorzystać źródło podczas wizyty",
        paragraphs: [
          "Publikacja może pomóc sformułować pytanie do lekarza, na przykład o populację badaną przez autorów, długość obserwacji lub opisane ryzyka. Nie jest jednak samodzielną kwalifikacją, instrukcją postępowania ani podstawą do uzyskania recepty.",
          "W tej placówce decyzja medyczna zapada po osobistym badaniu podczas wizyty stacjonarnej. Lekarz ocenia, czy zakres i pewność danych naukowych mają znaczenie w indywidualnej sytuacji, oraz czy rozważanie dalszego postępowania jest zasadne.",
        ],
      },
    ],
    sources: [
      {
        title: "Cannabis-Based Products for Chronic Pain: An Updated Systematic Review",
        publisher: "Annals of Internal Medicine / PubMed",
        href: "https://pubmed.ncbi.nlm.nih.gov/41429020/",
      },
      {
        title:
          "Living Systematic Review on Cannabis and Other Plant-Based Treatments for Chronic Pain: 2025 Update",
        publisher: "AHRQ / NCBI Bookshelf",
        href: "https://www.ncbi.nlm.nih.gov/books/NBK618053/",
      },
      {
        title:
          "Medical cannabis or cannabinoids for chronic non-cancer and cancer related pain: a systematic review and meta-analysis of randomised clinical trials",
        publisher: "BMJ / PubMed",
        href: "https://pubmed.ncbi.nlm.nih.gov/34497047/",
      },
      {
        title: "Cannabis-based medicines for chronic neuropathic pain in adults",
        publisher: "Cochrane Database of Systematic Reviews / PubMed",
        href: "https://pubmed.ncbi.nlm.nih.gov/41548880/",
      },
      {
        title: "IASP Position Statement on the Use of Cannabinoids to Treat Pain",
        publisher: "International Association for the Study of Pain",
        href: "https://www.iasp-pain.org/publications/iasp-news/iasp-position-statement-on-the-use-of-cannabinoids-to-treat-pain/",
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
      "Dlaczego bezpieczeństwo wymaga osobistego badania, rozmowy o ograniczeniach dowodów i indywidualnej oceny lekarza.",
    excerpt:
      "Bezpieczeństwa nie da się ocenić na podstawie formularza ani ogólnej listy. Wymaga ono indywidualnej rozmowy i badania.",
    readingTime: "7 min czytania",
    publishedAt: "2026-07-11",
    updatedAt: "2026-07-13",
    reviewStatus: "review-required",
    topics: ["bezpieczenstwo-i-zrodla", "przygotowanie-i-komunikacja"],
    sections: [
      {
        heading: "Dlaczego ocena jest indywidualna",
        paragraphs: [
          "Ta sama informacja naukowa może mieć odmienne znaczenie dla różnych osób. Lekarz odnosi ją do stanu zdrowia, dotychczasowego postępowania, dokumentacji dostępnej podczas wizyty oraz możliwych przeciwwskazań i innych czynników bezpieczeństwa.",
          "Z tego powodu w tej placówce nie stosuje się ankiety, automatycznego wyniku ani opisu dawkowania jako substytutu oceny. Konsultacja odbywa się stacjonarnie i obejmuje osobiste badanie lekarza.",
        ],
      },
      {
        heading: "Co wiadomo o działaniach niepożądanych",
        paragraphs: [
          "W krótkoterminowych badaniach randomizowanych dotyczących przewlekłego bólu częściej niż przy placebo odnotowywano między innymi zawroty głowy, sedację lub senność, nudności oraz przejściowe zaburzenia uwagi albo funkcji poznawczych. Zestawienie tych obserwacji nie pozwala przewidzieć częstości ani nasilenia u konkretnej osoby.",
          "Przeglądy zwracają uwagę, że dane o wielu istotnych działaniach niepożądanych, w tym o rzadkich lub długoterminowych następstwach, są ograniczone albo niewystarczające do pewnych wniosków. Brak mocnego oszacowania nie oznacza braku ryzyka.",
        ],
      },
      {
        heading: "Skąd bierze się niepewność",
        paragraphs: [
          "Pod wspólną nazwą produktów kannabinoidowych kryją się interwencje różniące się składem, proporcjami substancji, pochodzeniem, drogą podania i czasem stosowania w badaniu. Różne są także populacje uczestników oraz wyniki, które badacze mierzyli.",
          "Większość analizowanych prób trwała tygodnie lub miesiące, a nie lata. To ogranicza możliwość wnioskowania o trwałości efektów i bezpieczeństwie długoterminowym. Wynik dotyczący jednego preparatu i jednej populacji nie jest wymienny z wynikiem dla innego preparatu lub innej osoby.",
        ],
      },
      {
        heading: "Pytania pomocne w rozmowie z lekarzem",
        paragraphs: [
          "Przed wizytą można zapisać pytania, które ułatwią rozmowę o danych naukowych i bezpieczeństwie. Informacje medyczne oraz dokumentację omawia się w gabinecie albo przekazuje wyłącznie wskazanym, zabezpieczonym kanałem.",
        ],
        bullets: [
          "Jakie ograniczenia mają źródła, do których się odwołujemy?",
          "Które informacje z dokumentacji mogą mieć znaczenie dla oceny bezpieczeństwa?",
          "Jakie możliwe korzyści, działania niepożądane i niepewności należy omówić?",
          "Jaki dalszy plan jest medycznie uzasadniony po osobistej ocenie?",
        ],
      },
      {
        heading: "Decyzja nie wynika z treści strony",
        paragraphs: [
          "Wytyczne kliniczne i przeglądy systematyczne są źródłem do rozmowy o dowodach, a nie polską decyzją regulacyjną ani instrukcją dla konkretnego pacjenta. Rzetelna informacja przedstawia równocześnie potencjalne korzyści, ryzyka i granice wiedzy.",
          "Po wizycie lekarz podejmuje decyzję wyłącznie na podstawie osobistej oceny. Rezerwacja konsultacji, przeczytanie artykułu ani przedstawienie publikacji nie gwarantują wystawienia recepty.",
        ],
      },
    ],
    sources: [
      {
        title: "Cannabis-Based Products for Chronic Pain: An Updated Systematic Review",
        publisher: "Annals of Internal Medicine / PubMed",
        href: "https://pubmed.ncbi.nlm.nih.gov/41429020/",
      },
      {
        title:
          "Living Systematic Review on Cannabis and Other Plant-Based Treatments for Chronic Pain: 2025 Update",
        publisher: "AHRQ / NCBI Bookshelf",
        href: "https://www.ncbi.nlm.nih.gov/books/NBK618053/",
      },
      {
        title:
          "Medical cannabis or cannabinoids for chronic non-cancer and cancer related pain: a systematic review and meta-analysis of randomised clinical trials",
        publisher: "BMJ / PubMed",
        href: "https://pubmed.ncbi.nlm.nih.gov/34497047/",
      },
      {
        title: "Cannabis-based medicinal products (NG144)",
        publisher: "National Institute for Health and Care Excellence",
        href: "https://www.nice.org.uk/guidance/ng144",
      },
      {
        title: "Prawo do informacji",
        publisher: "Rzecznik Praw Pacjenta",
        href: "https://www.gov.pl/web/rpp/prawo-do-informacji",
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
      "Organizacyjne przygotowanie do konsultacji: termin, dokumenty do omówienia i bezpieczne granice kontaktu.",
    excerpt:
      "Dobre przygotowanie pomaga wykorzystać czas konsultacji, bez przekazywania danych medycznych przez zwykły formularz.",
    readingTime: "5 min czytania",
    publishedAt: "2026-07-11",
    updatedAt: "2026-07-13",
    reviewStatus: "review-required",
    topics: ["konsultacja-stacjonarna", "przygotowanie-i-komunikacja"],
    sections: [
      {
        heading: "Przygotowanie organizacyjne, nie kwalifikacja",
        paragraphs: [
          "Wizyta w tej placówce odbywa się stacjonarnie. Przed terminem warto potwierdzić adres gabinetu oraz zasady kontaktu dotyczące spraw organizacyjnych. Rezerwacja nie jest konsultacją medyczną i nie służy przekazywaniu opisu stanu zdrowia.",
          "Na wizytę można zabrać dokument tożsamości, posiadaną dokumentację, którą pacjent chce omówić z lekarzem, oraz zapisane pytania. Samo posiadanie dokumentów, ich brak albo rezerwacja terminu nie przesądzają o kwalifikacji ani o recepcie.",
        ],
      },
      {
        heading: "Dokumentacja i dostęp pacjenta",
        paragraphs: [
          "Pacjent ma prawo dostępu do swojej dokumentacji medycznej. Jeżeli dokumentacja jest dostępna w elektronicznej dokumentacji medycznej, może być widoczna na Internetowym Koncie Pacjenta, zgodnie z zakresem danych umieszczonych w systemie i nadanymi uprawnieniami.",
          "Dostęp do własnej dokumentacji ułatwia przygotowanie do rozmowy, ale nie zastępuje osobistego badania ani nie oznacza, że placówka uzyska automatyczny dostęp do danych. O tym, jakie informacje są potrzebne do oceny, decyduje lekarz podczas wizyty.",
        ],
      },
      {
        heading: "Bezpieczne granice kontaktu przed wizytą",
        paragraphs: [
          "Zwykły formularz kontaktowy i e-mail służą wyłącznie sprawom organizacyjnym, takim jak termin lub kontakt z rejestracją. Nie należy wpisywać ani przesyłać przez nie rozpoznań, wyników badań, informacji o przyjmowanych lekach, opisu objawów ani załączników medycznych.",
          "Informacje medyczne omawia się podczas wizyty albo przekazuje wyłącznie przez zabezpieczony kanał wskazany przez placówkę. Taki podział ogranicza ryzyko przypadkowego ujawnienia danych i błędnego traktowania komunikacji organizacyjnej jak oceny medycznej.",
        ],
      },
      {
        heading: "Czego można oczekiwać po rezerwacji",
        paragraphs: [
          "Rezerwacja potwierdza wyłącznie sprawy organizacyjne związane z terminem wizyty stacjonarnej. Nie jest potwierdzeniem rozpoznania, kwalifikacji, wdrożenia terapii ani wystawienia recepty.",
          "Decyzję medyczną podejmuje lekarz po osobistym badaniu pacjenta. Podczas wizyty pacjent może prosić o wyjaśnienie celu oceny, dostępnych danych, ograniczeń i dalszego postępowania w sposób dla niego zrozumiały.",
        ],
      },
    ],
    sources: [
      {
        title:
          "Ustawa o zawodach lekarza i lekarza dentysty, tekst jednolity (Dz.U. 2026 poz. 37)",
        publisher: "Kancelaria Sejmu / ISAP",
        href: "https://api.sejm.gov.pl/eli/acts/DU/2026/37/text.pdf",
      },
      {
        title:
          "Ustawa o prawach pacjenta i Rzeczniku Praw Pacjenta, tekst jednolity",
        publisher: "Kancelaria Sejmu",
        href: "https://api.sejm.gov.pl/eli/acts/DU/2024/581/text.html",
      },
      {
        title: "Prawo do dokumentacji medycznej",
        publisher: "Rzecznik Praw Pacjenta",
        href: "https://www.gov.pl/web/rpp/prawo-do-dokumentacji-medycznej",
      },
      {
        title: "Prawo do informacji",
        publisher: "Rzecznik Praw Pacjenta",
        href: "https://www.gov.pl/web/rpp/prawo-do-informacji",
      },
      {
        title: "Poznaj elektroniczną dokumentację medyczną",
        publisher: "Centrum e-Zdrowia / Pacjent.gov.pl",
        href: "https://pacjent.gov.pl/elektroniczna-dokumentacja-medyczna",
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
