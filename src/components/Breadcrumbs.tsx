import Link from "next/link";
import { isPublicReleaseReady } from "@/config/companyConfig";
import { absoluteSiteUrl } from "@/lib/seo";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? absoluteSiteUrl(item.href) : undefined,
    })),
  };

  return (
    <>
      {isPublicReleaseReady ? (
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
          type="application/ld+json"
        />
      ) : null}
      <nav aria-label="Okruszki" className="text-sm text-slate-500">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {items.map((item, index) => (
            <li className="flex items-center gap-x-2" key={item.label}>
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {item.href && index < items.length - 1 ? (
                <Link className="hover:text-medical-green-dark" href={item.href}>
                  {item.label}
                </Link>
              ) : (
                <span aria-current={index === items.length - 1 ? "page" : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
