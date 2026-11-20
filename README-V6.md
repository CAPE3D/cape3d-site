# CAPE3D — V6 / White Matter Experience

V6 is a visual-direction iteration on the V5 Astro project. It keeps the existing GitHub Pages deployment architecture and the single-page content structure, while changing the immersive opening world to a bright mineral/architectural palette.

## Direction
- Continuous sticky Three.js scene controlled by scroll via GSAP ScrollTrigger.
- Light mineral environment, silver technical assembly, translucent details and restrained copper accents.
- Four narrative chapters: conception, engineering, fabrication, result.
- Reduced-motion support, responsive canvas sizing and static fallback.
- Existing FDM, SLA, laser, process, FAQ and quote-request content retained.

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

The quote form currently opens a prefilled email. Selected files are not automatically attached; the visitor must attach them in their email client. A server-side form endpoint is required for true upload and submission.
