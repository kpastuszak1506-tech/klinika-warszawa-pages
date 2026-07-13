"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { clinicalProcessEvent, clinicalStages, stageFromIndex, stageIndexFromValue } from "./clinicalPathwayConfig";
import { useDevicePerformanceTier } from "./useDevicePerformanceTier";
import styles from "./ClinicalPathway.module.css";

type NodeParts = {
  group: THREE.Group;
  mesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>;
  ring: THREE.Mesh<THREE.TorusGeometry, THREE.MeshBasicMaterial>;
};

const damp = (value: number, target: number, amount: number) =>
  THREE.MathUtils.lerp(value, target, amount);

export function ClinicalPathwayCanvas() {
  const hostRef = useRef<HTMLDivElement>(null);
  const { ready, tier, reducedMotion, saveData, supportsWebGL } = useDevicePerformanceTier();

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !ready || !supportsWebGL || reducedMotion || saveData || tier === "low") return;

    let renderer: THREE.WebGLRenderer | null = null;
    let composer: EffectComposer | null = null;
    let frame = 0;
    let running = true;
    let disposed = false;
    let activeIndex = 0;
    let inViewport = true;
    let scrollOffset = 0;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    const pathway = new THREE.Group();
    const nodeParts: NodeParts[] = [];
    const targetCamera = new THREE.Vector3();
    const targetLookAt = new THREE.Vector3();
    const targetRotation = new THREE.Euler();
    const lookAt = new THREE.Vector3();
    const pointer = new THREE.Vector2();
    const pointerTarget = new THREE.Vector2();
    const scrollTarget = { y: 0 };
    const targetLightColor = new THREE.Color();

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: tier === "high",
        powerPreference: "high-performance",
      });
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      host.appendChild(renderer.domElement);

      const ambient = new THREE.AmbientLight(0xccebdd, 1.25);
      const directional = new THREE.DirectionalLight(0xffffff, 2.1);
      directional.position.set(-3, 5, 5);
      const point = new THREE.PointLight(clinicalStages[0].lightColor, 3.2, 12);
      point.position.set(0, 1.5, 3.4);
      scene.add(ambient, directional, point, pathway);

      const positions = clinicalStages.map(
        (stage) => new THREE.Vector3(...stage.position),
      );
      const pathGeometry = new THREE.BufferGeometry().setFromPoints(positions);
      const pathMaterial = new THREE.LineBasicMaterial({
        color: 0x7acaa7,
        transparent: true,
        opacity: 0.62,
      });
      pathway.add(new THREE.Line(pathGeometry, pathMaterial));

      const core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.62, 2),
        new THREE.MeshStandardMaterial({
          color: 0x9ed9bc,
          emissive: 0x1b4f3b,
          emissiveIntensity: 0.75,
          roughness: 0.25,
          metalness: 0.15,
        }),
      );
      pathway.add(core);

      clinicalStages.forEach((stage, index) => {
        const group = new THREE.Group();
        group.position.copy(positions[index]);
        const mesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.28, tier === "high" ? 24 : 16, tier === "high" ? 16 : 12),
          new THREE.MeshStandardMaterial({
            color: stage.nodeColor,
            emissive: stage.nodeColor,
            emissiveIntensity: index === 0 ? 0.45 : 0.18,
            roughness: 0.32,
            metalness: 0.18,
          }),
        );
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(0.48, 0.018, 8, 48),
          new THREE.MeshBasicMaterial({ color: stage.lightColor, transparent: true, opacity: 0.76 }),
        );
        ring.rotation.x = Math.PI / 2;
        group.add(mesh, ring);
        pathway.add(group);
        nodeParts.push({ group, mesh, ring });
      });

      const particleCount = tier === "high" ? 180 : 90;
      const particlePositions = new Float32Array(particleCount * 3);
      for (let index = 0; index < particleCount; index += 1) {
        particlePositions[index * 3] = (Math.random() - 0.5) * 9;
        particlePositions[index * 3 + 1] = (Math.random() - 0.5) * 5;
        particlePositions[index * 3 + 2] = (Math.random() - 0.5) * 3;
      }
      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
      const particles = new THREE.Points(
        particleGeometry,
        new THREE.PointsMaterial({ color: 0xa8dfc4, size: 0.026, transparent: true, opacity: 0.7 }),
      );
      scene.add(particles);

      if (tier === "high") {
        composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));
        composer.addPass(new UnrealBloomPass(new THREE.Vector2(1, 1), 0.75, 0.7, 0.82));
      }

      const applyStage = (index: number) => {
        const stage = stageFromIndex(index);
        activeIndex = stageIndexFromValue(index) ?? 0;
        targetCamera.set(...stage.camera);
        targetLookAt.set(...stage.lookAt);
        targetRotation.set(...stage.groupRotation);
        targetLightColor.setHex(stage.lightColor);
      };
      applyStage(0);

      const onStep = (event: Event) => {
        const detail = (event as CustomEvent<unknown>).detail;
        const index = typeof detail === "object" && detail !== null && "index" in detail
          ? Number((detail as { index: unknown }).index)
          : Number(detail);
        const safeIndex = stageIndexFromValue(index);
        if (safeIndex !== null) {
          applyStage(safeIndex);
          host.dataset.stage = String(safeIndex);
        }
      };
      const onPointerMove = (event: PointerEvent) => {
        if (event.pointerType === "touch") return;
        pointerTarget.set(
          (event.clientX / window.innerWidth - 0.5) * 0.16,
          (event.clientY / window.innerHeight - 0.5) * 0.12,
        );
      };
      const onScroll = () => {
        const progress = Math.min(1, Math.max(0, window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight)));
        scrollTarget.y = THREE.MathUtils.clamp(progress * 0.06, -0.06, 0.06);
      };
      const onVisibility = () => {
        running = !document.hidden && inViewport;
        if (running && !frame) frame = requestAnimationFrame(render);
      };
      const onViewport = (entries: IntersectionObserverEntry[]) => {
        inViewport = entries[0]?.isIntersecting ?? true;
        running = !document.hidden && inViewport;
        if (running && !frame) frame = requestAnimationFrame(render);
      };
      const resize = () => {
        const width = host.clientWidth || 1;
        const height = host.clientHeight || 1;
        const portrait = height > width;
        const narrow = width <= 700;
        camera.aspect = width / height;
        camera.fov = portrait ? 52 : narrow ? 48 : 34;
        camera.updateProjectionMatrix();
        renderer?.setPixelRatio(Math.min(window.devicePixelRatio || 1, tier === "high" ? 1.5 : 1.25));
        renderer?.setSize(width, height, false);
        composer?.setSize(width, height);
      };
      const observer = new ResizeObserver(resize);
      const viewportObserver = new IntersectionObserver(onViewport, { threshold: 0 });

      const render = (time: number) => {
        frame = 0;
        if (disposed || !running || !renderer) return;
        scrollOffset = damp(scrollOffset, scrollTarget.y, 0.055);
        pointer.x = damp(pointer.x, pointerTarget.x, 0.045);
        pointer.y = damp(pointer.y, pointerTarget.y, 0.045);
        camera.position.x = damp(camera.position.x, targetCamera.x + pointer.x, 0.055);
        camera.position.y = damp(camera.position.y, targetCamera.y - pointer.y + scrollOffset, 0.055);
        camera.position.z = damp(camera.position.z, targetCamera.z, 0.055);
        lookAt.lerp(targetLookAt, 0.055);
        camera.lookAt(lookAt);
        pathway.rotation.x = damp(pathway.rotation.x, targetRotation.x + pointer.y * 0.18, 0.055);
        pathway.rotation.y = damp(pathway.rotation.y, targetRotation.y + pointer.x * 0.24, 0.055);
        pathway.rotation.z = damp(pathway.rotation.z, targetRotation.z, 0.055);
        point.color.lerp(targetLightColor, 0.055);
        point.intensity = damp(point.intensity, 2.7 + activeIndex * 0.18, 0.055);
        nodeParts.forEach(({ group, mesh, ring }, index) => {
          const selected = index === activeIndex;
          const scale = damp(group.scale.x, selected ? 1.25 : 0.88, 0.06);
          group.scale.setScalar(scale);
          mesh.material.emissiveIntensity = damp(mesh.material.emissiveIntensity, selected ? 0.72 : 0.18, 0.06);
          ring.material.opacity = damp(ring.material.opacity, selected ? 0.95 : 0.38, 0.06);
          ring.rotation.z = time * 0.00035 * (selected ? 1.6 : 0.7);
        });
        particles.rotation.y = time * 0.000025;
        if (composer) composer.render();
        else renderer.render(scene, camera);
        frame = requestAnimationFrame(render);
      };

      window.addEventListener(clinicalProcessEvent, onStep);
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
      observer.observe(host);
      viewportObserver.observe(host);
      resize();
      frame = requestAnimationFrame(render);

      return () => {
        disposed = true;
        running = false;
        if (frame) cancelAnimationFrame(frame);
        window.removeEventListener(clinicalProcessEvent, onStep);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("scroll", onScroll);
        document.removeEventListener("visibilitychange", onVisibility);
        observer.disconnect();
        viewportObserver.disconnect();
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Points) {
            object.geometry.dispose();
            const materials = Array.isArray(object.material) ? object.material : [object.material];
            materials.forEach((material) => material.dispose());
          }
        });
        composer?.dispose();
        renderer?.dispose();
        renderer?.domElement.remove();
      };
    } catch {
      renderer?.dispose();
      host.dataset.clinicalPathwayStatus = "fallback";
      host.textContent = "";
      const fallback = document.createElement("div");
      fallback.className = styles.fallback;
      fallback.dataset.clinicalPathwayFallback = "true";
      fallback.setAttribute("aria-hidden", "true");
      const fallbackPath = document.createElement("div");
      fallbackPath.className = styles.fallbackPath;
      fallback.appendChild(fallbackPath);
      clinicalStages.forEach((stage, index) => {
        const node = document.createElement("span");
        node.className = styles.fallbackNode;
        node.dataset.nodeIndex = String(index);
        node.style.left = (26 + index * 16) + "%";
        node.style.top = (48 + (index % 2 ? 16 : -16)) + "%";
        const ring = document.createElement("span");
        ring.className = styles.fallbackRing;
        node.appendChild(ring);
        fallback.appendChild(node);
      });
      host.appendChild(fallback);
      return () => {
        fallback.remove();
      };
    }
  }, [ready, reducedMotion, saveData, supportsWebGL, tier]);

  return (
    <div
      aria-hidden="true"
      className={styles.canvasHost}
      data-bloom={String(tier === "high")}
      data-clinical-pathway-canvas="true"
      data-quality-tier={tier}
      data-renderer="webgl"
      data-stage="0"
      data-performance-tier={tier}
      data-reduced-motion={String(reducedMotion)}
      data-save-data={String(saveData)}
      ref={hostRef}
    />
  );
}
