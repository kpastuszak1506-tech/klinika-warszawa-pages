"use client";

import { useEffect, useState } from "react";
import { ClinicalPathwayFallback } from "./ClinicalPathwayFallback";
import { useDevicePerformanceTier } from "./useDevicePerformanceTier";
import styles from "./ClinicalPathway.module.css";

export interface ClinicalPathwayProps {
  className?: string;
  variant?: "hero" | "process";
}

export function ClinicalPathway({ className, variant = "hero" }: ClinicalPathwayProps) {
  const [Canvas, setCanvas] = useState<React.ComponentType | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [stage, setStage] = useState(0);
  const performance = useDevicePerformanceTier();
  const staticOnly =
    performance.ready !== true ||
    performance.reducedMotion ||
    performance.saveData ||
    performance.tier === "low" ||
    !performance.supportsWebGL;

  useEffect(() => {
    if (staticOnly) {
      return;
    }

    let active = true;
    import("./ClinicalPathwayCanvas")
      .then(({ ClinicalPathwayCanvas: Renderer }) => {
        if (active) setCanvas(() => Renderer);
      })
      .catch(() => {
        if (active) setLoadFailed(true);
      });

    return () => {
      active = false;
    };
  }, [staticOnly]);

  useEffect(() => {
    const onStep = (event: Event) => {
      const detail = (event as CustomEvent<unknown>).detail;
      const value =
        typeof detail === "object" && detail !== null && "index" in detail
          ? Number((detail as { index: unknown }).index)
          : Number(detail);
      if (Number.isInteger(value) && value >= 0 && value <= 3) setStage(value);
    };

    window.addEventListener("clinical-process-step", onStep);
    return () => window.removeEventListener("clinical-process-step", onStep);
  }, []);

  const staticRenderer = staticOnly || loadFailed || !Canvas;
  const bloom = !staticRenderer && performance.tier === "high";
  const wrapperClassName = [
    styles.wrapper,
    variant === "process" ? styles.process : styles.hero,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      aria-hidden="true"
      className={wrapperClassName}
      data-bloom={String(bloom)}
      data-clinical-pathway="true"
      data-clinical-pathway-status={staticRenderer ? "fallback" : "ready"}
      data-clinical-pathway-variant={variant}
      data-quality-tier={performance.tier}
      data-renderer={staticRenderer ? "static" : "webgl"}
      data-stage={stage.toString()}
    >
      {staticRenderer ? <ClinicalPathwayFallback /> : <Canvas />}
    </div>
  );
}
