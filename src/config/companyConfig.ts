export const companyConfig = {
  // Keep search indexing disabled until the controller verifies every public value below.
  publicDataVerified: false,
  allowSearchIndexing: false,
  searchConsoleVerification: "",
  websiteUrl: "https://kpastuszak1506-tech.github.io/klinika-warszawa-pages",
  companyName: "Klinika Warszawa",
  shortName: "Klinika Warszawa",
  legalForm: "podmiot leczniczy",
  registeredOfficeAddress: "ul. Mokotowska 12 lok. 4, 00-561 Warszawa",
  medicalOfficeAddress: "ul. Mokotowska 12 lok. 4, 00-561 Warszawa",
  nip: "525-123-45-67",
  regon: "146123456",
  medicalRegon: "14612345600001",
  rpwdlNumber: "W-14-000123",
  phone: "+48 22 123 45 67",
  email: "kontakt@klinikawarszawa.pl",
  privacyEmail: "rodo@klinikawarszawa.pl",
  firstVisitPrice: "300",
  followUpVisitPrice: "200",
  bookingWidget: {
    enabled: false,
    provider: "medlife" as
      | "medlife"
      | "medfile"
      | "docplanner"
      | "booksy"
      | "custom",
    providerName: "Medlife",
    mode: "api" as "placeholder" | "externalUrl" | "iframe" | "api",
    externalUrl: "",
    iframeSrc: "",
    apiEndpoint: "",
    allowedOrigin: "",
    requiresSecureProxy: true,
  },
};

export type CompanyConfig = typeof companyConfig;

// Two explicit confirmations prevent an accidental SEO launch with sample data.
export const isPublicReleaseReady =
  companyConfig.publicDataVerified && companyConfig.allowSearchIndexing;
