"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type HeroMediaProps = {
  src: string;
};

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(Math.max(value, minimum), maximum);

export function HeroMedia({ src }: HeroMediaProps) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const imageLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = mediaRef.current;
    const imageLayer = imageLayerRef.current;

    if (!media || !imageLayer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let animationFrame: number | null = null;
    let listening = false;

    const updateImagePosition = () => {
      if (animationFrame !== null) {
        return;
      }

      animationFrame = window.requestAnimationFrame(() => {
        const rect = media.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        const mediaCenter = rect.top + rect.height / 2;
        const progress = clamp(
          (mediaCenter - viewportCenter) / Math.max(window.innerHeight, 1),
          -1,
          1,
        );
        const maxOffset = window.matchMedia("(max-width: 767px)").matches ? 7 : 16;

        imageLayer.style.transform = `translate3d(0, ${Math.round(
          progress * -maxOffset,
        )}px, 0)`;
        animationFrame = null;
      });
    };

    const onScroll = () => updateImagePosition();
    const onResize = () => updateImagePosition();

    const setListening = (shouldListen: boolean) => {
      if (shouldListen === listening) {
        return;
      }

      listening = shouldListen;

      if (listening) {
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);
        updateImagePosition();
      } else {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => setListening(entry.isIntersecting),
      { rootMargin: "80px 0px" },
    );

    observer.observe(media);

    return () => {
      observer.disconnect();
      setListening(false);

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div className="hero-media" ref={mediaRef}>
      <div className="hero-media__image-layer" ref={imageLayerRef}>
        <Image
          alt="Jasny gabinet lekarski przygotowany do konsultacji stacjonarnej"
          className="object-cover"
          fill
          priority
          sizes="(min-width: 1024px) 58vw, 100vw"
          src={src}
        />
      </div>
      <div className="hero-media__veil" />
      <div className="hero-media__label">
        <span>Gabinet</span>
        Konsultacja na miejscu
      </div>
      <p className="hero-media__caption">
        Przestrzeń przygotowana do spokojnej rozmowy z lekarzem
      </p>
    </div>
  );
}
