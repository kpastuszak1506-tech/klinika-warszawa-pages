"use client";

import { useEffect, useRef, useState } from "react";
import { processSteps } from "@/lib/siteContent";

function StepIcon({ index }: { index: number }) {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {index === 0 ? (
        <>
          <path d="M7 3v4" />
          <path d="M17 3v4" />
          <path d="M4 9h16" />
          <rect height="17" rx="2" width="16" x="4" y="5" />
        </>
      ) : index === 1 ? (
        <>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </>
      ) : index === 2 ? (
        <>
          <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v5h5" />
          <path d="M9 15h6" />
          <path d="M9 11h2" />
        </>
      ) : (
        <path d="M20 6 9 17l-5-5" />
      )}
    </svg>
  );
}

export function ProcessSteps() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const nodes = stepRefs.current.filter(
      (node): node is HTMLLIElement => node !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (!visible) {
          return;
        }

        const index = Number(visible.target.getAttribute("data-step-index"));
        setActiveStep(index);
        window.dispatchEvent(
          new CustomEvent("clinical-process-step", { detail: index }),
        );
      },
      { rootMargin: "-28% 0px -48% 0px", threshold: [0.2, 0.5, 0.8] },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  return (
    <ol className="process-steps" aria-label="Etapy wizyty">
      {processSteps.map((step, index) => (
        <li
          aria-current={activeStep === index ? "step" : undefined}
          className={activeStep === index ? "process-step is-active" : "process-step"}
          data-step-index={index}
          id={`process-step-${index + 1}`}
          key={step.title}
          ref={(node) => {
            stepRefs.current[index] = node;
          }}
        >
          <div className="process-step__rail" aria-hidden="true">
            <span />
          </div>
          <div className="process-step__number">
            {(index + 1).toString().padStart(2, "0")}
          </div>
          <div className="process-step__icon">
            <StepIcon index={index} />
          </div>
          <div className="process-step__content">
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
