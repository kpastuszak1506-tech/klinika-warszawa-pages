"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { BookingWidgetSlot } from "@/components/BookingWidgetSlot";
import { companyConfig, isLocalDemoPreview } from "@/config/companyConfig";
import { processSteps } from "@/lib/siteContent";

const openingTitle = isLocalDemoPreview
  ? "Klinika Warszawa"
  : companyConfig.shortName ||
    companyConfig.companyName ||
    "Konsultacje lekarskie w Warszawie";

type ProcessSliderProps = {
  medicalNotice: ReactNode;
};

export function ProcessSlider({ medicalNotice }: ProcessSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const slideRefs = useRef<Array<HTMLLIElement | null>>([]);
  const totalSteps = processSteps.length;

  useEffect(() => {
    const slider = sliderRef.current;
    const track = trackRef.current;

    slider?.setAttribute("data-slider-ready", "true");

    if (!track) {
      return;
    }

    let animationFrame = 0;

    const measureActiveSlide = () => {
      animationFrame = 0;
      const trackTop = track.getBoundingClientRect().top + window.scrollY;
      const readingLine = window.scrollY + window.innerHeight * 0.38;
      let closestIndex = 0;

      slideRefs.current.forEach((slide, index) => {
        if (slide && trackTop + slide.offsetTop <= readingLine) {
          closestIndex = index;
        }
      });

      setActiveIndex((currentIndex) =>
        currentIndex === closestIndex ? currentIndex : closestIndex,
      );
    };

    const scheduleMeasurement = () => {
      if (animationFrame !== 0) {
        return;
      }

      animationFrame = window.requestAnimationFrame(measureActiveSlide);
    };

    window.addEventListener("scroll", scheduleMeasurement, { passive: true });
    window.addEventListener("resize", scheduleMeasurement, { passive: true });
    scheduleMeasurement();

    return () => {
      slider?.removeAttribute("data-slider-ready");
      window.removeEventListener("scroll", scheduleMeasurement);
      window.removeEventListener("resize", scheduleMeasurement);

      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  const scrollToStep = (requestedIndex: number) => {
    const track = trackRef.current;
    const nextIndex = Math.min(Math.max(requestedIndex, 0), totalSteps - 1);
    const slide = slideRefs.current[nextIndex];

    setActiveIndex(nextIndex);

    if (!track || !slide) {
      return;
    }

    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const trackStyles = window.getComputedStyle(track);
    const scrollPaddingTop = Number.parseFloat(trackStyles.scrollPaddingTop) || 0;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      behavior: reducedMotion ? "auto" : "smooth",
      top: Math.max(0, trackTop + slide.offsetTop - scrollPaddingTop),
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      scrollToStep(activeIndex - 1);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      scrollToStep(activeIndex + 1);
    }

    if (event.key === "Home") {
      event.preventDefault();
      scrollToStep(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      scrollToStep(totalSteps - 1);
    }
  };

  const totalNumber = totalSteps.toString().padStart(2, "0");

  return (
    <section
      aria-labelledby="process-title"
      className="home-section process-section process-editorial"
      id="proces"
      onKeyDown={handleKeyDown}
      ref={sliderRef}
      role="region"
      tabIndex={0}
    >
      <div className="site-shell process-editorial__intro">
        <div className="process-editorial__heading">
          <p className="eyebrow">Konsultacje stacjonarne · Warszawa</p>
          <h1 className="process-editorial__title" id="process-title">
            {openingTitle}
          </h1>
          <p className="process-editorial__lede process-editorial__lede--opening">
            Stacjonarne konsultacje lekarskie poświęcone ocenie zasadności i
            bezpieczeństwa terapii kannabinoidowej.
          </p>
        </div>
        <div className="process-editorial__medical-note">{medicalNotice}</div>
      </div>

      <div className="site-shell process-slider__toolbar">
        <div aria-hidden="true" className="process-slider__progress">
          <span className="process-slider__progress-label">Etapy wizyty</span>
          <span className="process-slider__progress-rail">
            {processSteps.map((step, index) => (
              <span
                className={index <= activeIndex ? "is-reached" : undefined}
                key={step.title}
              />
            ))}
          </span>
        </div>

        <p
          aria-atomic="true"
          aria-live="polite"
          className="process-slider__sr-status"
        >
          Etap {activeIndex + 1} z {totalSteps}: {processSteps[activeIndex].title}
        </p>
      </div>

      <ol aria-label="Etapy wizyty" className="process-slider__track" ref={trackRef}>
        {processSteps.map((step, index) => {
          const stepNumber = (index + 1).toString().padStart(2, "0");
          const isActive = index === activeIndex;

          return (
            <li
              aria-current={isActive ? "step" : undefined}
              className={
                "process-slide process-slide--" +
                (index + 1) +
                (isActive ? " is-active" : "")
              }
              key={step.title}
              ref={(node) => {
                slideRefs.current[index] = node;
              }}
            >
              <div aria-hidden="true" className="process-slide__folder-tab">
                <span>{stepNumber}</span>
                <span>{step.title}</span>
              </div>
              <article
                aria-labelledby={"process-slide-title-" + (index + 1)}
                className="process-slide__surface"
              >
                <div className="process-slide__workspace">
                  <div className="process-slide__identity">
                    <p className="process-slide__meta">
                      <span>Etap {stepNumber}</span>
                      <span>{totalNumber}</span>
                    </p>
                    <h3 id={"process-slide-title-" + (index + 1)}>{step.title}</h3>
                    <p className="process-slide__copy">{step.description}</p>
                  </div>
                  <div className="process-slide__utility">
                    {index === 0 ? <BookingWidgetSlot compact /> : null}
                    {step.utilityItems.length > 0 ? (
                      <ul className="process-utility-list">
                        {step.utilityItems.map((item, itemIndex) => (
                          <li key={item}>
                            <span aria-hidden="true">
                              {String(itemIndex + 1).padStart(2, "0")}
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <Link className="process-slide__utility-link" href={step.utilityLink.href}>
                      {step.utilityLink.label}
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
