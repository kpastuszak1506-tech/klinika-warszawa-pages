"use client";

import { useEffect, useRef, useState } from "react";
import { processSteps } from "@/lib/siteContent";
import { useInViewport } from "./motion/useInViewport";

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
  const activeStepRef = useRef(0);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);
  const {
    hasMounted,
    isInView,
    reducedMotion,
    ref: stepsRef,
  } = useInViewport<HTMLOListElement>({ rootMargin: "0px 0px -12% 0px" });

  useEffect(() => {
    const nodes = stepRefs.current.filter(
      (node): node is HTMLLIElement => node !== null,
    );
    let animationFrame = 0;

    const selectStep = (index: number) => {
      if (activeStepRef.current === index) {
        return;
      }

      activeStepRef.current = index;
      setActiveStep(index);
      window.dispatchEvent(
        new CustomEvent("clinical-process-step", { detail: index }),
      );
    };

    const measureClosestStep = () => {
      animationFrame = 0;
      const viewportTarget = window.innerHeight * 0.48;
      let closestIndex = activeStepRef.current;
      let closestDistance = Number.POSITIVE_INFINITY;

      nodes.forEach((node) => {
        const bounds = node.getBoundingClientRect();
        const center = bounds.top + bounds.height / 2;
        const distance = Math.abs(center - viewportTarget);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = Number(node.dataset.stepIndex);
        }
      });

      if (Number.isInteger(closestIndex)) {
        selectStep(closestIndex);
      }
    };

    const scheduleMeasurement = () => {
      if (animationFrame !== 0) {
        return;
      }

      animationFrame = window.requestAnimationFrame(measureClosestStep);
    };

    const observer = new IntersectionObserver(
      scheduleMeasurement,
      { rootMargin: "-28% 0px -48% 0px", threshold: [0.2, 0.5, 0.8] },
    );

    nodes.forEach((node) => observer.observe(node));
    window.addEventListener("scroll", scheduleMeasurement, { passive: true });
    window.addEventListener("resize", scheduleMeasurement, { passive: true });
    scheduleMeasurement();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleMeasurement);
      window.removeEventListener("resize", scheduleMeasurement);

      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <ol
      aria-label="Etapy wizyty"
      className="process-steps"
      data-motion-enabled={hasMounted ? "true" : "false"}
      data-motion-reduced={reducedMotion ? "true" : "false"}
      data-motion-state={isInView || reducedMotion ? "visible" : "pending"}
      ref={stepsRef}
    >
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
