import styles from "./ClinicalPathway.module.css";
import { clinicalStages } from "./clinicalPathwayConfig";

export function ClinicalPathwayFallback() {
  return (
    <div
      aria-hidden="true"
      className={styles.fallback}
      data-clinical-pathway-fallback="true"
    >
      <div className={styles.fallbackPath} />
      {clinicalStages.map((stage, index) => (
        <span
          className={styles.fallbackNode}
          data-node-index={index}
          key={stage.id}
          style={{ left: `${26 + index * 16}%`, top: `${48 + (index % 2 ? 16 : -16)}%` }}
        >
          <span className={styles.fallbackRing} />
        </span>
      ))}
    </div>
  );
}
