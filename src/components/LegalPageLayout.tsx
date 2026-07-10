import type { ReactNode } from "react";
import { legalReviewNotice } from "@/lib/siteContent";
import { RiskNotice } from "./RiskNotice";

type LegalPageLayoutProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function LegalPageLayout({
  title,
  description,
  children,
}: LegalPageLayoutProps) {
  return (
    <article className="mx-auto max-w-4xl px-5 py-14 md:py-20">
      <header className="mb-10">
        <p className="text-sm font-semibold uppercase text-medical-green">
          Dokument prawny
        </p>
        <h1 className="display-heading mt-3 text-balance text-4xl font-semibold text-navy-950 md:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          {description}
        </p>
      </header>
      <RiskNotice title="Nota prawna">{legalReviewNotice}</RiskNotice>
      <div className="prose-legal mt-10">{children}</div>
    </article>
  );
}
