import type { ReactNode } from "react";

type SectionHeadingProps = {
  title: string;
  description?: string;
  align?: "left" | "center";
  children?: ReactNode;
};

export function SectionHeading({
  title,
  description,
  align = "left",
  children,
}: SectionHeadingProps) {
  return (
    <div
      className={[
        "mx-auto mb-10 max-w-3xl",
        align === "center" ? "text-center" : "text-left",
      ].join(" ")}
    >
      <h2 className="display-heading text-balance text-3xl font-semibold text-navy-950 md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-pretty text-base leading-7 text-slate-600 md:text-lg">
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}
