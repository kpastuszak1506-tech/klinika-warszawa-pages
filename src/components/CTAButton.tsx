import Link from "next/link";
import type { ReactNode } from "react";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const variantClasses = {
  primary:
    "border-medical-green bg-medical-green text-white shadow-[0_14px_35px_rgba(15,107,79,0.18)] hover:bg-medical-green-dark",
  secondary:
    "border-navy-200 bg-white/90 text-navy-900 hover:border-medical-green hover:text-medical-green-dark",
  ghost:
    "border-transparent bg-transparent text-navy-800 hover:bg-slate-100 hover:text-navy-950",
};

export function CTAButton({
  href,
  children,
  variant = "primary",
  className = "",
}: CTAButtonProps) {
  const classes = [
    "group inline-flex min-h-12 items-center justify-center gap-3 rounded-md border px-5 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-green",
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const opensNewTab = href.startsWith("http://") || href.startsWith("https://");
  const isExternal = opensNewTab || href.startsWith("tel:") || href.startsWith("mailto:");

  if (isExternal) {
    return (
      <a
        className={classes}
        href={href}
        rel={opensNewTab ? "noreferrer" : undefined}
        target={opensNewTab ? "_blank" : undefined}
      >
        <span>{children}</span>
        <span aria-hidden="true" className="transition group-hover:translate-x-1">
          →
        </span>
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      <span>{children}</span>
      <span aria-hidden="true" className="transition group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
