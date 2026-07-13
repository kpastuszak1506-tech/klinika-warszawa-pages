export const motionTokens = {
  duration: {
    fast: 180,
    standard: 420,
    slow: 720,
  },
  easing: {
    standard: "cubic-bezier(0.2, 0.8, 0.2, 1)",
    entrance: "cubic-bezier(0.16, 1, 0.3, 1)",
  },
  distance: {
    reveal: 18,
    stagger: 14,
  },
} as const;

export type MotionDuration = keyof typeof motionTokens.duration;
