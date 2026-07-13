"use client";

import type { CSSProperties, ReactNode } from "react";
import { motionTokens } from "./motionTokens";
import { useInViewport } from "./useInViewport";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  once?: boolean;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  distance = motionTokens.distance.reveal,
  once = true,
}: RevealProps) {
  const { hasMounted, isInView, reducedMotion, ref } = useInViewport({ once });
  const motionState = isInView || reducedMotion ? "visible" : "pending";
  const style = {
    "--reveal-delay": `${delay}ms`,
    "--reveal-distance": `${distance}px`,
  } as CSSProperties;

  return (
    <div
      className={["motion-reveal", className].filter(Boolean).join(" ")}
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
