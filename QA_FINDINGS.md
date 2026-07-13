# Final Browser/Runtime QA

Date: 2026-07-13
Target: `http://127.0.0.1:3004`
Method: Chromium via Playwright in fresh browser contexts; evidence in `artifacts/final/runtime-results.json` and `artifacts/final/runtime-results-after-fixes.json`.

## First Pass

The 2026-07-12 matrix found two P1 issues: the primary hero CTA was outside the initial viewport at `320x568`, `1024x768`, and `1280x800`; and the process navigation did not advance `aria-current` beyond the first step. All other first-pass checks passed: HTTP 200, no horizontal overflow, no console/page errors, cookies persistence and reopen, focus-trapped mobile menu, WebGL tiering, reduced-motion/save-data fallback, and offscreen scene pausing.

## Second Pass

**Result: PASS. Failed: 0.** Both previously open P1 findings now pass in the post-fix runtime record dated `2026-07-13T06:56:46.272Z`.

### Resolved P1: CTA visibility

| Viewport | Exact CTA rect (`top`, `bottom`, `left`, `right`, `width` x `height`) | Viewport height | Result |
| --- | --- | ---: | --- |
| `320x568` | `455.0469055175781`, `503.0469055175781`, `20`, `300`, `280 x 48` | 568 | PASS |
| `1024x768` | `559.015625`, `625.015625`, `32`, `236.21875`, `204.21875 x 66` | 768 | PASS |
| `1280x800` | `569.46875`, `635.46875`, `32`, `291.59375`, `259.59375 x 66` | 800 | PASS |

Every rectangle is fully within the initial viewport. Each rechecked context also returned HTTP 200, had `scrollWidth` equal to viewport width, and reported no runtime errors.

### Resolved P1: process accessibility state

The exact `aria-current` sequence is now correct at both a mobile and desktop control viewport:

| Target process step | `390x844` | `1440x900` | Result |
| --- | --- | --- | --- |
| 0 | `["step", null, null, null]` | `["step", null, null, null]` | PASS |
| 1 | `[null, "step", null, null]` | `[null, "step", null, null]` | PASS |
| 2 | `[null, null, "step", null]` | `[null, null, "step", null]` | PASS |
| 3 | `[null, null, null, "step"]` | `[null, null, null, "step"]` | PASS |

## Retained Passed Checks

| Area | Result | Evidence |
| --- | --- | --- |
| Viewport matrix | PASS | `320x568`, `360x800`, `390x844`, `430x932`, `768x1024`, `1024x768`, `1280x800`, `1440x900`, and `1920x1080` return 200 with no horizontal overflow in the recorded matrix. |
| True 3D | PASS | High-tier `1440x900` uses WebGL with bloom; the process event changes stage `0 -> 3`, and pointer runtime attributes remain active. |
| Tier/fallback behavior | PASS | Mobile/tablet uses the balanced tier without bloom where available; the post-fix `320x568` context records fallback status. Reduced motion and mocked `saveData` both use static renderers without canvases. |
| Cookies | PASS | Reject persists as `{"necessary":true,"analytics":false,"marketing":false}`; the footer trigger reopens settings. |
| Mobile menu | PASS | Focus is retained at the boundary and the menu closes by Escape, backdrop, and link navigation. |
| Accessibility | PASS | Body text is `16px` on mobile; menu targets are `44x44px`; cookie actions are at least 48 px high; the canvas uses `pointer-events: none`. |
| Runtime health | PASS | No `console.error` or `pageerror` was recorded in the matrix; no Next error dialog/runtime text was found. |

## Artifacts

`artifacts/final` contains 76 PNG captures: full-page and section captures across the nine viewports, including mobile-menu-open states. The structured first-pass and second-pass evidence is retained in the two runtime JSON files named above.
