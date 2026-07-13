"use client";

import { useEffect, useState } from "react";

export type DevicePerformanceTier = "high" | "balanced" | "low";

export interface DevicePerformanceInfo {
  ready?: boolean;
  tier: DevicePerformanceTier;
  reducedMotion: boolean;
  saveData: boolean;
  supportsWebGL: boolean;
}

function canUseWebGL() {
  if (typeof document === "undefined") return false;

  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

function readPerformanceInfo(): DevicePerformanceInfo {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  const connection = (navigator as Navigator & {
    connection?: { saveData?: boolean };
  }).connection;
  const reducedMotion = media.matches;
  const saveData = connection?.saveData === true;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const cores = navigator.hardwareConcurrency || 4;
  const smallScreen = window.matchMedia("(max-width: 700px)").matches;

  const constrainedDevice =
    reducedMotion ||
    saveData ||
    cores <= 4 ||
    (memory !== undefined && memory <= 4);
  const tier: DevicePerformanceTier = constrainedDevice
    ? "low"
    : smallScreen
      ? "balanced"
      : "high";

  return { tier, reducedMotion, saveData, supportsWebGL: canUseWebGL() };
}

export function useDevicePerformanceTier(): DevicePerformanceInfo {
  const [info, setInfo] = useState<DevicePerformanceInfo>({
    tier: "low",
    reducedMotion: false,
    saveData: false,
    supportsWebGL: false,
    ready: false,
  });

  useEffect(() => {
    const update = () => setInfo({ ...readPerformanceInfo(), ready: true });
    update();
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    motion.addEventListener?.("change", update);
    window.addEventListener("resize", update, { passive: true });
    return () => {
      motion.removeEventListener?.("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return info;
}
