import type { ReactNode } from "react";

type SectionHeadingProps = {
  title: string;
  description?: string;
  align?: "left" | "center";
  headingLevel?: "h1" | "h2";
  children?: ReactNode;
};

export function SectionHeading({
  title,
  description,
  align = "left",
  headingLevel = "h2",
  children,
}: SectionHeadingProps) {
  const Heading = headingLevel;

  return (
    <div
      className={[
        "mx-auto mb-10 max-w-3xl",
        align === "center" ? "text-center" : "text-left",
      ].join(" ")}
    >
      <Heading className="display-heading text-balance text-3xl font-semibold text-navy-950 md:text-4xl">
        {title}
      </Heading>
      {description ? (
        <p className="mt-4 text-pretty text-base leading-7 text-slate-600 md:text-lg">
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}
