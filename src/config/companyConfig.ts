export const companyConfig = {
  // Replace the blank public fields only after the controller has verified them.
  publicDataVerified: false,
  legalDocumentsReviewed: false,
  allowSearchIndexing: false,
  demoMode: true,
  searchConsoleVerification: "",
  websiteUrl: "https://kpastuszak1506-tech.github.io/klinika-warszawa-pages",
  companyName: "",
  shortName: "",
  legalForm: "",
  registeredOfficeAddress: "",
  medicalOfficeAddress: "",
  nip: "",
  regon: "",
  medicalRegon: "",
  rpwdlNumber: "",
  phone: "",
  email: "",
  privacyEmail: "",
  firstVisitPrice: "",
  followUpVisitPrice: "",
  demoFirstVisitPrice: "300",
  demoFollowUpVisitPrice: "200",
  bookingWidget: {
    // Paste the public HTTPS address copied from the Medfile panel here.
    provider: "medfile" as const,
    publicBookingUrl: "",
  },
};

export type CompanyConfig = typeof companyConfig;

type CompanyDataFields = Pick<
  CompanyConfig,
  | "companyName"
  | "shortName"
  | "legalForm"
  | "registeredOfficeAddress"
  | "medicalOfficeAddress"
  | "nip"
  | "regon"
  | "medicalRegon"
  | "rpwdlNumber"
  | "phone"
  | "email"
  | "privacyEmail"
>;

export type DisplayCompanyData = Readonly<CompanyDataFields>;

export const isPublicDataVerified = companyConfig.publicDataVerified;

export const isDemoPreview =
  companyConfig.demoMode &&
  (process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_DEMO_PREVIEW === "true");

const verifiedCompanyData: DisplayCompanyData = {
  companyName: companyConfig.companyName,
  shortName: companyConfig.shortName,
  legalForm: companyConfig.legalForm,
  registeredOfficeAddress: companyConfig.registeredOfficeAddress,
  medicalOfficeAddress: companyConfig.medicalOfficeAddress,
  nip: companyConfig.nip,
  regon: companyConfig.regon,
  medicalRegon: companyConfig.medicalRegon,
  rpwdlNumber: companyConfig.rpwdlNumber,
  phone: companyConfig.phone,
  email: companyConfig.email,
  privacyEmail: companyConfig.privacyEmail,
};

const localDemoCompanyData: DisplayCompanyData = {
  companyName: "Klinika Warszawa",
  shortName: "Klinika Warszawa",
  legalForm: "sp. z o.o.",
  registeredOfficeAddress: "ul. Demonstracyjna 12, 00-001 Warszawa",
  medicalOfficeAddress: "ul. Pokazowa 8, 00-002 Warszawa",
  nip: "000-000-00-00",
  regon: "000000000",
  medicalRegon: "00000000000000",
  rpwdlNumber: "000000000000",
  phone: "+48 22 000 00 00",
  email: "kontakt@centrum-demo.test",
  privacyEmail: "prywatnosc@centrum-demo.test",
};

// This is the only route by which sample company data may reach a demo preview.
export function getDisplayCompanyData(): DisplayCompanyData | null {
  if (isPublicDataVerified) {
    return verifiedCompanyData;
  }

  return isDemoPreview ? localDemoCompanyData : null;
}

export const displayCompanyData = getDisplayCompanyData();

export function isValidMedfileBookingUrl(value: string) {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();

    return url.protocol === "https:" && (host === "medfile.pl" || host.endsWith(".medfile.pl"));
  } catch {
    return false;
  }
}

export const isMedfileBookingReady =
  isPublicDataVerified &&
  isValidMedfileBookingUrl(companyConfig.bookingWidget.publicBookingUrl);

export const areLegalDocumentsPublic =
  isPublicDataVerified && companyConfig.legalDocumentsReviewed;

// Two explicit confirmations prevent an accidental SEO launch with sample data.
export const isPublicReleaseReady =
  isPublicDataVerified && companyConfig.allowSearchIndexing;
