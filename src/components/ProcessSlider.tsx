"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { processSteps } from "@/lib/siteContent";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function StepIcon({ index }: { index: number }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
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

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {direction === "left" ? (
        <>
          <path d="m15 18-6-6 6-6" />
          <path d="M9 12h10" />
        </>
      ) : (
        <>
          <path d="m9 18 6-6-6-6" />
          <path d="M5 12h10" />
        </>
      )}
    </svg>
  );
}

export function ProcessSlider() {
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
      const trackBounds = track.getBoundingClientRect();
      const viewportCenter = trackBounds.left + track.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      slideRefs.current.forEach((slide, index) => {
        if (!slide) {
          return;
        }

        const bounds = slide.getBoundingClientRect();
        const distance = Math.abs(bounds.left + bounds.width / 2 - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
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

    track.addEventListener("scroll", scheduleMeasurement, { passive: true });
    window.addEventListener("resize", scheduleMeasurement, { passive: true });
    scheduleMeasurement();

    return () => {
      slider?.removeAttribute("data-slider-ready");
      track.removeEventListener("scroll", scheduleMeasurement);
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

    const trackBounds = track.getBoundingClientRect();
    const slideBounds = slide.getBoundingClientRect();
    const trackStyles = window.getComputedStyle(track);
    const paddingLeft = Number.parseFloat(trackStyles.paddingLeft) || 0;
    const left = slideBounds.left - trackBounds.left + track.scrollLeft - paddingLeft;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    track.scrollTo({
      behavior: reducedMotion ? "auto" : "smooth",
      left,
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToStep(activeIndex - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToStep(activeIndex + 1);
    }
  };

  const currentNumber = (activeIndex + 1).toString().padStart(2, "0");
  const totalNumber = totalSteps.toString().padStart(2, "0");

  return (
    <section
      aria-labelledby="process-title"
      aria-roledescription="karuzela"
      className="home-section process-section process-editorial"
      id="proces"
      onKeyDown={handleKeyDown}
      ref={sliderRef}
      role="region"
      tabIndex={0}
    >
      <div className="site-shell process-editorial__intro">
        <div className="process-editorial__heading">
          <p className="eyebrow">Przebieg wizyty</p>
          <h2 className="process-editorial__title" id="process-title">
            Od kontaktu do zaleceń
          </h2>
        </div>
        <p className="process-editorial__lede">
          Cztery etapy organizacyjne. Decyzja medyczna pozostaje indywidualna
          i należy do lekarza.
        </p>
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

        <div className="process-slider__navigation">
          <span aria-hidden="true" className="process-slider__counter">
            <strong>{currentNumber}</strong>
            <span>/ {totalNumber}</span>
          </span>
          <button
            aria-label="Poprzedni etap"
            className="process-slider__button"
            disabled={activeIndex === 0}
            onClick={() => scrollToStep(activeIndex - 1)}
            title="Poprzedni etap"
            type="button"
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            aria-label="Następny etap"
            className="process-slider__button"
            disabled={activeIndex === totalSteps - 1}
            onClick={() => scrollToStep(activeIndex + 1)}
            title="Następny etap"
            type="button"
          >
            <ArrowIcon direction="right" />
          </button>
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
              <article
                aria-labelledby={"process-slide-title-" + (index + 1)}
                className="process-slide__surface"
              >
                {index === 1 ? (
                  <div className="process-slide__image">
                    <Image
                      alt="Jasny gabinet lekarski przygotowany do konsultacji stacjonarnej"
                      className="object-cover"
                      fill
                      sizes="(min-width: 1024px) 36vw, 100vw"
                      src={publicBasePath + "/images/medical-office-hero-soft.jpg"}
                    />
                  </div>
                ) : null}

                <div aria-hidden="true" className="process-slide__folio">
                  <span>{stepNumber}</span>
                  <small>/ {totalNumber}</small>
                </div>

                <div aria-hidden="true" className="process-slide__markers">
                  <span />
                  <span />
                  <span />
                </div>

                <div className="process-slide__content">
                  <div className="process-slide__meta">
                    <span>Etap</span>
                    <span>
                      {stepNumber} / {totalNumber}
                    </span>
                  </div>
                  <div className="process-slide__icon">
                    <StepIcon index={index} />
                  </div>
                  <div className="process-slide__reveal">
                    <h3 id={"process-slide-title-" + (index + 1)}>{step.title}</h3>
                  </div>
                  <div className="process-slide__copy">
                    <p>{step.description}</p>
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
