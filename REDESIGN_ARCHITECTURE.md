# Architektura premium redesignu

Data: 2026-07-12
Status: zatwierdzona przez Sol przed implementacją

## Routing modeli

```text
ORCHESTRATOR_MODEL=Sol/Codex
PRIMARY_IMPLEMENTATION_MODEL=gpt-5.6-luna reasoning=max
MECHANICAL_QA_MODEL=gpt-5.6-terra reasoning=high
SPECIALIST_3D_MODEL=gpt-5.6-luna reasoning=max
```

## Kierunek artystyczny

Spokojny editorial healthcare z precyzyjną siatką, asymetrią, rzeczywistą głębią i kontrastem navy / medyczna zieleń / biel. Fotografia gabinetu i scena Clinical Pathway mają tworzyć jedną kompozycję, bez estetyki produktu, dashboardu, Web3 ani symboliki rekreacyjnej.

## Layout mobile

1. Lekki, kontrolowany header z menu modalnym.
2. Eyebrow, H1 w maksymalnie 3–4 liniach, opis minimum 16 px.
3. Główne CTA i drugorzędny link przed visualem.
4. Stabilny wrapper visualu bez sztucznego min-height i bez CLS.
5. Clinical Pathway zintegrowany z fotografią jako warstwa przestrzenna.
6. Kompaktowa rezerwacja, następnie compliance.
7. Proces jako zwarta oś z tekstem minimum 16 px.
8. Cennik, FAQ/kontakt, wiedza i footer w odrębnych, ale spójnych pasach.

## Layout desktop

- Hero do 1440 px: asymetryczna siatka `minmax(0, 0.85fr) / minmax(0, 1.15fr)`.
- Copy pozostaje w wąskiej kolumnie, fotografia tworzy art-directed frame, a WebGL częściowo przenika kadr.
- Proces: sticky visual 3D oraz normalnie przewijane cztery kroki.
- Sekcje nie powtarzają identycznych kart; cennik, FAQ, kontakt i wiedza mają własny rytm.
- 1024 px traktowane jako osobny breakpoint, nie skompresowany desktop 1440 px.

## Clinical Pathway — technologia

Wybrano bezpośrednie `three` zamiast React Three Fiber. Powody: mniejsza liczba zależności, pełna kontrola lifecycle i pętli renderowania, prostszy static export oraz łatwe wstrzymanie renderera poza viewportem.

### Struktura

```text
src/components/clinical-3d/
  ClinicalPathway.tsx
  ClinicalPathwayCanvas.tsx
  ClinicalPathwayFallback.tsx
  clinicalPathwayConfig.ts
  useDevicePerformanceTier.ts
```

### Scena

- `WebGLRenderer` z alpha i antialias zależnym od quality tier.
- `PerspectiveCamera` z interpolowanym położeniem i punktem obserwacji.
- Cztery węzły z realną pozycją `x/y/z`, półmatowymi materiałami i halo geometrycznym.
- Centralny rdzeń, trzy pierścienie w różnych płaszczyznach, krzywa Catmull-Rom oraz lekkie cząsteczki proceduralne.
- AmbientLight, DirectionalLight i PointLight przypisany do aktywnego etapu.
- Stan procesu aktualizowany przez istniejące zdarzenie `clinical-process-step`.
- Pointer zmienia docelową rotację grupy wyłącznie na desktopie.
- Scroll i aktywny etap zmieniają orientację, framing, kamerę, światło i intensywność węzłów.

### Cztery stany

1. Rezerwacja: kamera kieruje się ku pierwszemu węzłowi, aktywna pierwsza część ścieżki.
2. Wizyta: aktywna relacja 1→2, scena zmienia azymut.
3. Ocena: kamera bliżej rdzenia, bardziej widoczne pierścienie analityczne bez sugestii automatycznej diagnostyki.
4. Zalecenia: spokojne domknięcie całej ścieżki i akcent czwartego węzła bez sugerowania wyniku terapii.

### Bloom

Tryb High używa `EffectComposer`, `RenderPass` i `UnrealBloomPass`. Bloom jest subtelny i ograniczony niskim threshold/strength; materiały bazowe nie są neonowe. Balanced renderuje bez ciężkiego post-processingu. Static nie inicjalizuje WebGL.

### Quality tiers

| Tryb | Warunek | DPR | Bloom | Cząsteczki | Pointer |
| --- | --- | ---: | --- | ---: | --- |
| High | desktop, WebGL, brak reduced motion/save-data | max 1.5 | tak | 80 | pełny |
| Balanced | mobile/tablet z WebGL | max 1.25 | nie | 32 | ograniczony/wyłączony |
| Static | reduced motion, save-data, brak WebGL lub błąd | n/a | nie | 0 | nie |

### Lifecycle i performance

- Dynamic import renderera i brak SSR.
- Wrapper ma stały `aspect-ratio`; canvas jest dekoracyjny i nie blokuje touch scroll.
- IntersectionObserver zatrzymuje pętlę poza viewportem.
- ResizeObserver aktualizuje kamerę i renderer bez React state per frame.
- `requestAnimationFrame`, listenery, obserwatory, composer, renderer, geometrie i materiały są czyszczone.
- Brak tekstur, HDR, GLB i bibliotek animacji 3D.
- Dane animacyjne pozostają w refach i obiektach Three, poza React state.

## Motion system

```text
src/components/motion/
  Reveal.tsx
  StaggerGroup.tsx
  useInViewport.ts
  motionTokens.ts
```

System obejmuje: reveal sekcji, stagger hero, aktywne stany procesu, kamerę 3D, pointer parallax, depth kart, menu transition, CTA microinteraction i animację FAQ. Wszystko respektuje reduced motion. Elementy poza viewportem nie animują się ciągle.

## Header i cookies

- Header staje się kontrolowanym komponentem client-side. Menu zamyka link, Escape i kliknięcie backdropu; fokus pozostaje w panelu podczas otwarcia.
- Touch target minimum 44 px.
- Cookie bottom sheet używa minimum 14 px dla przycisków, safe-area, równorzędnych decyzji i dyskretnego ponownego otwarcia.

## Zależności i bundle

- Nowa zależność produkcyjna: `three`.
- Typy: `@types/three` tylko jeśli wymagane przez używaną wersję.
- Three.js i post-processing trafiają do asynchronicznego chunka Clinical Pathway.
- Nie dodajemy GSAP, Framer Motion ani R3F.
- Po integracji mierzymy initial chunks oraz async chunk 3D; wzrost jest akceptowalny tylko przy braku wpływu na krytyczny render hero.

## Task graph i ownership

| Workstream | Model | Własność plików |
| --- | --- | --- |
| Baseline QA | Terra | `BASELINE_UI_AUDIT.md`, bez zmian aplikacji |
| True 3D | Luna max | `package*.json`, `src/components/clinical-3d/**`, ewentualnie fallback `ClinicalOrbit.tsx` |
| Motion | Luna max UI | `src/components/motion/**` |
| UI/UX | Luna max UI | `page.tsx`, `globals.css`, Header, CookieConsent, ProcessSteps, FAQ, PriceTable, KnowledgeCard, Footer, CTAButton |
| Integracja i review | Sol | review diffu, konflikty API, compliance, architektura, acceptance |
| Final QA | Terra | screenshoty, runtime matrix, `VALIDATION_REPORT.md`, completion matrix |

Workstream 3D i UI mają rozłączne write sety. UI importuje publiczny komponent `ClinicalPathway`; 3D nie edytuje strony głównej ani komponentów sekcji.
