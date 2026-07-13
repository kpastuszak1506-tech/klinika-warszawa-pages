export const siteTitle =
  "Konsultacja lekarska w Warszawie | Terapia kannabinoidowa";

export const siteDescription =
  "Stacjonarna konsultacja lekarska w Warszawie dotycząca oceny zasadności i bezpieczeństwa terapii kannabinoidowej.";

export const navItems = [
  { href: "/konsultacja", label: "Konsultacja" },
  { href: "/jak-wyglada-wizyta", label: "Jak wygląda wizyta" },
  { href: "/dla-kogo", label: "Dla kogo" },
  { href: "/cennik", label: "Cennik" },
  { href: "/faq", label: "FAQ" },
  { href: "/kontakt", label: "Kontakt" },
];

export const legalNavItems = [
  { href: "/polityka-prywatnosci", label: "Polityka prywatności" },
  { href: "/polityka-cookies", label: "Polityka cookies" },
  { href: "/regulamin-rezerwacji", label: "Regulamin rezerwacji" },
];

export const footerNavItems = [
  ...navItems,
  { href: "/wiedza", label: "Wiedza" },
];

export const complianceText =
  "Lekarz przeprowadza badanie w zakresie dostosowanym do sytuacji. O zasadności terapii i dalszym postępowaniu decyduje po ocenie medycznej. Samo umówienie wizyty nie przesądza o decyzji lekarza ani o wystawieniu recepty.";

export const shortComplianceText =
  "Lekarz przeprowadza badanie w zakresie dostosowanym do sytuacji. O dalszym postępowaniu decyduje po ocenie medycznej.";

export const formMedicalDataNotice =
  "Nie wpisuj w formularzu rozpoznań, wyników badań, listy leków ani opisu stanu zdrowia. Służy on wyłącznie sprawom organizacyjnym.";

export const processSteps = [
  {
    title: "Rezerwacja terminu",
    description:
      "Wybierz termin konsultacji stacjonarnej lub skorzystaj z danych placówki.",
    utilityItems: [],
    utilityLink: {
      href: "/kontakt",
      label: "Kontakt i dane placówki",
    },
  },
  {
    title: "Przygotowanie do wizyty",
    description:
      "Przygotuj informacje i dokumenty, które mogą ułatwić rozmowę podczas wizyty.",
    utilityItems: [
      "Dokument tożsamości",
      "Posiadana dokumentacja",
      "Lista leków, suplementów i pytań",
    ],
    utilityLink: {
      href: "/jak-wyglada-wizyta",
      label: "Pełna lista przed wizytą",
    },
  },
  {
    title: "Ocena podczas konsultacji",
    description:
      "Lekarz omawia informacje istotne dla oceny podczas osobistej konsultacji.",
    utilityItems: [
      "Rozmowa i wywiad",
      "Dokumentacja i dotychczasowe leczenie",
      "Bezpieczeństwo, interakcje i przeciwwskazania",
    ],
    utilityLink: {
      href: "/konsultacja",
      label: "Co lekarz ocenia",
    },
  },
  {
    title: "Zalecenia i dalsze kroki",
    description:
      "Po konsultacji lekarz omawia dalsze postępowanie odpowiednie do jej przebiegu.",
    utilityItems: [
      "Omówienie wyniku konsultacji",
      "Zalecenia odpowiednie do przebiegu wizyty",
      "Plan kontroli lub dalszej diagnostyki, jeśli potrzebny",
    ],
    utilityLink: {
      href: "/wiedza",
      label: "Przejdź do bazy wiedzy",
    },
  },
];

export const faqItems = [
  {
    question: "Jak przygotować się do wizyty?",
    answer:
      "Weź dokument tożsamości, posiadaną dokumentację oraz listę leków, suplementów, alergii i pytań do lekarza.",
  },
  {
    question: "Czy mam przynieść dokumentację medyczną?",
    answer:
      "Jeśli masz dokumentację, którą chcesz omówić z lekarzem, przynieś ją na wizytę.",
  },
  {
    question: "Czy konsultacja odbywa się stacjonarnie?",
    answer: "Tak. Konsultacja odbywa się osobiście w gabinecie w Warszawie.",
  },
  {
    question: "Czy po konsultacji może zostać wystawiona recepta?",
    answer:
      "Ewentualna recepta jest możliwa tylko wtedy, gdy lekarz uzna ją za medycznie zasadną po ocenie podczas wizyty.",
  },
  {
    question: "Co, jeśli lekarz nie rekomenduje terapii?",
    answer:
      "Lekarz może wyjaśnić brak rekomendacji terapii i omówić inne dalsze kroki, w tym potrzebę innej konsultacji lub diagnostyki.",
  },
  {
    question: "Czym różni się pierwsza wizyta od kontrolnej?",
    answer:
      "Pierwsza wizyta służy ocenie sytuacji i omówieniu możliwego postępowania. Wizyta kontrolna dotyczy dalszego postępowania po wcześniejszej konsultacji.",
  },
  {
    question: "Czy mogę przesłać dokumentację przez formularz?",
    answer:
      "Nie. Formularz służy wyłącznie kontaktowi organizacyjnemu. Dokumentację należy przekazywać wyłącznie kanałem wskazanym przez placówkę.",
  },
  {
    question: "Jak chronione są dane przekazywane przez stronę?",
    answer:
      "Strona nie służy do przekazywania danych medycznych. Informacje o przetwarzaniu danych znajdują się w Polityce prywatności.",
  },
];

export const patientPreparationItems = [
  "Dokument tożsamości.",
  "Posiadana dokumentacja medyczna.",
  "Lista leków, suplementów i alergii.",
  "Krótka historia dotychczasowego leczenia.",
  "Pytania, które chcesz zadać lekarzowi.",
];

export const legalReviewNotice =
  "To jest wersja robocza dokumentu. Przed publikacją musi go sprawdzić prawnik, w szczególności pod kątem danych administratora, procesu rezerwacji, okresów przechowywania danych, odbiorców danych i warunków współpracy z dostawcą systemu.";
