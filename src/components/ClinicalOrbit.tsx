"use client";

import { useEffect, useState } from "react";

const orbitSteps = ["Rezerwacja", "Wizyta", "Ocena", "Zalecenia"];

export function ClinicalOrbit() {
  const [activeStep, setActiveStep] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onProcessStep = (event: Event) => {
      const detail = (event as CustomEvent<number>).detail;

      if (typeof detail === "number") {
        setActiveStep(detail);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (window.innerWidth < 768 || reducedMotion.matches) {
        return;
      }

      const target = event.currentTarget as HTMLElement;
      const bounds = target.getBoundingClientRect();
      setPointer({
        x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 10,
        y: ((event.clientY - bounds.top) / bounds.height - 0.5) * -8,
      });
    };

    window.addEventListener("clinical-process-step", onProcessStep);
    const element = document.querySelector<HTMLElement>("[data-clinical-orbit]");
    element?.addEventListener("pointermove", onPointerMove);

    return () => {
      window.removeEventListener("clinical-process-step", onProcessStep);
      element?.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <section
      aria-label="Etapy konsultacji"
      className="clinical-orbit"
      data-clinical-orbit
      style={
        {
          "--orbit-rx": `${pointer.y}deg`,
          "--orbit-ry": `${pointer.x}deg`,
        } as React.CSSProperties
      }
    >
      <div className="clinical-orbit__caption">
        <span className="clinical-orbit__index">0{activeStep + 1}</span>
        <span>{orbitSteps[activeStep]}</span>
      </div>
      <div className="clinical-orbit__stage" aria-hidden="true">
        <svg viewBox="0 0 440 440" role="img">
          <defs>
            <linearGradient id="orbitStroke" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#0f6b4f" stopOpacity="0.13" />
              <stop offset="0.52" stopColor="#0f6b4f" stopOpacity="0.7" />
              <stop offset="1" stopColor="#0b2748" stopOpacity="0.18" />
            </linearGradient>
            <radialGradient id="orbitGlow">
              <stop offset="0" stopColor="#8ed5bd" stopOpacity="0.56" />
              <stop offset="1" stopColor="#8ed5bd" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g className="clinical-orbit__scene">
            <circle className="clinical-orbit__glow" cx="220" cy="220" fill="url(#orbitGlow)" r="128" />
            <ellipse className="clinical-orbit__ring clinical-orbit__ring--one" cx="220" cy="220" fill="none" rx="165" ry="62" />
            <ellipse className="clinical-orbit__ring clinical-orbit__ring--two" cx="220" cy="220" fill="none" rx="143" ry="110" />
            <ellipse className="clinical-orbit__ring clinical-orbit__ring--three" cx="220" cy="220" fill="none" rx="112" ry="168" />
            <path className="clinical-orbit__line" d="M91 225 174 142 278 173 350 102" fill="none" />
            <path className="clinical-orbit__line clinical-orbit__line--soft" d="m92 226 95 89 91-67 73 82" fill="none" />
            {[
              [91, 225],
              [174, 142],
              [278, 173],
              [350, 102],
            ].map(([cx, cy], index) => (
              <g className={activeStep === index ? "clinical-orbit__node is-active" : "clinical-orbit__node"} key={index}>
                <circle cx={cx} cy={cy} r="14" />
                <circle cx={cx} cy={cy} r="4.5" />
              </g>
            ))}
            <circle className="clinical-orbit__core" cx="220" cy="220" r="19" />
            <circle className="clinical-orbit__core-dot" cx="220" cy="220" r="4" />
          </g>
        </svg>
      </div>
      <ol className="clinical-orbit__legend">
        {orbitSteps.map((label, index) => (
          <li className={activeStep === index ? "is-active" : ""} key={label}>
            <span>0{index + 1}</span>
            {label}
          </li>
        ))}
      </ol>
    </section>
  );
}
