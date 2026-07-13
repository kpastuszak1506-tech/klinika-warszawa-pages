export type ClinicalStageId =
  | "booking"
  | "visit"
  | "assessment"
  | "recommendations";

export interface ClinicalStageConfig {
  id: ClinicalStageId;
  label: string;
  position: readonly [number, number, number];
  camera: readonly [number, number, number];
  lookAt: readonly [number, number, number];
  groupRotation: readonly [number, number, number];
  lightColor: number;
  nodeColor: number;
}

export const clinicalProcessEvent = "clinical-process-step" as const;

export const clinicalStages = [
  {
    id: "booking",
    label: "Rezerwacja",
    position: [-3.2, 1.05, 0.35],
    camera: [-5.4, 2.45, 6.9],
    lookAt: [-1.65, 0.25, 0.2],
    groupRotation: [0.08, -0.16, 0],
    lightColor: 0x6fc5a1,
    nodeColor: 0x2f8768,
  },
  {
    id: "visit",
    label: "Wizyta",
    position: [-1.15, -1.05, 0.9],
    camera: [-4.25, 1.05, 6.55],
    lookAt: [-0.55, -0.05, 0.25],
    groupRotation: [-0.06, 0.2, 0.05],
    lightColor: 0x93d3b4,
    nodeColor: 0x3d9978,
  },
  {
    id: "assessment",
    label: "Ocena",
    position: [1.25, 0.95, 0.2],
    camera: [3.6, 1.5, 5.65],
    lookAt: [0.72, 0.08, 0.2],
    groupRotation: [0.12, 0.46, -0.05],
    lightColor: 0xb4deca,
    nodeColor: 0x4eaa86,
  },
  {
    id: "recommendations",
    label: "Zalecenia",
    position: [3.05, -0.75, -0.45],
    camera: [4.75, -0.15, 6.4],
    lookAt: [1.6, 0, 0],
    groupRotation: [-0.04, 0.72, 0.08],
    lightColor: 0x82caae,
    nodeColor: 0x2c7d61,
  },
] satisfies readonly ClinicalStageConfig[];

export function stageFromIndex(index: number): ClinicalStageConfig {
  const safeIndex = Number.isFinite(index)
    ? Math.max(0, Math.min(clinicalStages.length - 1, Math.round(index)))
    : 0;

  return clinicalStages[safeIndex];
}

export function stageIndexFromValue(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return null;
  }

  return Math.max(0, Math.min(clinicalStages.length - 1, Math.round(value)));
}
