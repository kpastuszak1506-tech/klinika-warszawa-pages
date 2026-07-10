export const companyConfig = {
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
  bookingUrl: "https://rezerwacje.klinikawarszawa.pl",
  firstVisitPrice: "300",
  followUpVisitPrice: "200",
  bookingWidget: {
    enabled: false,
    provider: "custom" as "docplanner" | "medfile" | "booksy" | "custom",
    providerName: "DO_UZUPEŁNIENIA_SYSTEM_REZERWACJI",
    mode: "placeholder" as "placeholder" | "externalUrl" | "iframe" | "api",
    externalUrl: "DO_UZUPEŁNIENIA_LINK_DO_REZERWACJI",
    iframeSrc: "",
    apiEndpoint: "",
    allowedOrigin: "",
  },
};

export type CompanyConfig = typeof companyConfig;
