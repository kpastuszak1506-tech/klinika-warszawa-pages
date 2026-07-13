import type { Metadata, Viewport } from "next";
import { CookieConsent } from "@/components/CookieConsent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  companyConfig,
  isDemoPreview,
  isPublicDataVerified,
  isPublicReleaseReady,
} from "@/config/companyConfig";
import { absoluteSiteUrl } from "@/lib/seo";
import { siteDescription, siteTitle } from "@/lib/siteContent";
import "./globals.css";

const homeUrl = absoluteSiteUrl("/");
const siteName = isPublicDataVerified && companyConfig.shortName.trim()
  ? companyConfig.shortName
  : "Konsultacje lekarskie | Warszawa";
const metadataTitle = isPublicDataVerified
  ? siteTitle
  : "Konsultacje lekarskie w Warszawie";

export const metadata: Metadata = {
  metadataBase: new URL(companyConfig.websiteUrl),
  title: {
    default: metadataTitle,
    template: "%s | Konsultacje lekarskie Warszawa",
  },
  description: isPublicDataVerified
    ? siteDescription
    : "Informacje o stacjonarnych konsultacjach lekarskich w Warszawie.",
  alternates: {
    canonical: homeUrl,
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: homeUrl,
    siteName,
    title: metadataTitle,
    description: isPublicDataVerified
      ? siteDescription
      : "Informacje o stacjonarnych konsultacjach lekarskich w Warszawie.",
    images: [
      {
        url: absoluteSiteUrl("/images/medical-office-hero-soft.jpg"),
        width: 1586,
        height: 992,
        alt: "Gabinet lekarski w Warszawie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: metadataTitle,
    description: isPublicDataVerified
      ? siteDescription
      : "Informacje o stacjonarnych konsultacjach lekarskich w Warszawie.",
    images: [absoluteSiteUrl("/images/medical-office-hero-soft.jpg")],
  },
  robots: {
    index: isPublicReleaseReady,
    follow: isPublicReleaseReady,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: homeUrl,
    inLanguage: "pl-PL",
  };

  return (
    <html lang="pl" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        {isPublicReleaseReady ? (
          <script
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c"),
            }}
            type="application/ld+json"
          />
        ) : null}
        <Header />
        {isDemoPreview ? (
          <div className="demo-preview-banner" role="status">
            <p className="demo-preview-banner__content">
              Wersja testowa strony. Dane kontaktowe, ceny i rezerwacja służą wyłącznie do podglądu.
            </p>
          </div>
        ) : null}
        <main className="flex-1" id="main-content">
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
