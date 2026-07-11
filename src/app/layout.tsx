import type { Metadata, Viewport } from "next";
import { CookieConsent } from "@/components/CookieConsent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { companyConfig, isPublicReleaseReady } from "@/config/companyConfig";
import { absoluteSiteUrl } from "@/lib/seo";
import { siteDescription, siteTitle } from "@/lib/siteContent";
import "./globals.css";

const homeUrl = absoluteSiteUrl("/");

export const metadata: Metadata = {
  metadataBase: new URL(companyConfig.websiteUrl),
  title: {
    default: siteTitle,
    template: "%s | Konsultacje lekarskie Warszawa",
  },
  description: siteDescription,
  alternates: {
    canonical: homeUrl,
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: homeUrl,
    siteName: companyConfig.shortName,
    title: siteTitle,
    description: siteDescription,
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
    title: siteTitle,
    description: siteDescription,
    images: [absoluteSiteUrl("/images/medical-office-hero-soft.jpg")],
  },
  robots: {
    index: isPublicReleaseReady,
    follow: isPublicReleaseReady,
  },
  verification: companyConfig.searchConsoleVerification
    ? { google: companyConfig.searchConsoleVerification }
    : undefined,
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
    name: companyConfig.shortName,
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
        <main className="flex-1" id="main-content">
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
