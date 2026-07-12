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
        "mx-auto mb-7 max-w-3xl md:mb-8",
        align === "center" ? "text-center" : "text-left",
      ].join(" ")}
    >
      <Heading className="display-heading max-w-[18ch] text-balance text-[2.15rem] font-semibold leading-[1.03] text-navy-950 md:text-4xl">
        {title}
      </Heading>
      {description ? (
        <p className="mt-3 max-w-[48ch] text-pretty text-[0.95rem] leading-6 text-slate-600 md:text-lg md:leading-7">
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}
