"use client";

import type { CSSProperties, ReactNode } from "react";
import { motionTokens } from "./motionTokens";
import { useInViewport } from "./useInViewport";

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  once?: boolean;
  step?: number;
};

export function StaggerGroup({
  children,
  className = "",
  once = true,
  step = motionTokens.distance.stagger * 10,
}: StaggerGroupProps) {
  const { hasMounted, isInView, reducedMotion, ref } = useInViewport({ once });
  const motionState = isInView || reducedMotion ? "visible" : "pending";
  const style = { "--stagger-step": `${step}ms` } as CSSProperties;

  return (
    <div
      className={["stagger-group", className].filter(Boolean).join(" ")}
      data-motion-enabled={hasMounted ? "true" : "false"}
      data-motion-reduced={reducedMotion ? "true" : "false"}
      data-motion-state={motionState}
      ref={ref}
      style={style}
    >
      {children}
    </div>
  );
}
