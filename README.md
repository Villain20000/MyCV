# Ioannis Ioannidis — Full-Stack Developer Portfolio

A multi-page Angular portfolio for full-stack and Angular work, redesigned around an editorial, 
Baseline-inspired system: navy hero panels, ghost type, spring-driven motion, Lenis smooth scrolling, 
and a persisted light/dark theme.

## Live site

https://villain20000.github.io/MyCV/

Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`, built with the
`/MyCV/` base path. A `404.html` fallback restores deep links so Angular routes work on direct visits.

## Development

```bash
npm install
npm start
```

Served at `http://localhost:4200/` with live reload.

## Routes

| Path                  | Page                                       |
| --------------------- | ------------------------------------------ |
| `/`                   | Home — hero, capabilities, selected work, case studies, stats, journey |
| `/projects`           | Filterable project index                   |
| `/projects/:slug`     | Project case study (detail template)       |
| `/experience`         | Career timeline and stats                  |
| `/healthtech`         | HealthTech domain case study               |
| `/about`              | About, principles, toolkit                 |
| `/contact`            | Contact page with mailto form              |

Legacy `.html` URLs redirect to the matching Angular route. Unknown paths render a not-found page.

## Design system

- **Theme** — `core/theme.service.ts` persists `light` / `dark` in `localStorage` (`mycv-theme`),
  updates `<html data-theme>` and the `theme-color` meta. The toggle lives in the header.
- **Scaling** — root font size is fluid: `0.833vw` from 1920px down to a 4.444vw floor at 640px,
  so every `rem` value scales with the viewport.
- **Layout** — 1425px max content width via a 0.75rem page inset; sections use rounded surface,
  navy and overlapping cards (`.sec`, `.sec--surface`, `.sec--navy`, `.sec--overlap`).
- **Type** — Onest (Google Fonts) across UI and display; uppercase micro labels with wide tracking.
- **Motion** — `core/motion.ts` provides a spring class plus `slideUp`, `hideInner`, `clipWords`,
  `fadeWords`, `inviewSpring` and `hoverSpring` helpers. Reduced-motion users get instant states.
- **Scroll** — `core/scroll-motion.service.ts` runs Lenis with a single RAF loop, drives header
  progress, parallax and hero drift, and locks scrolling for the intro loader and overlays.

## Structure

- `src/app/pages/` — routed pages (home, projects, project-detail, experience, healthtech, about, contact)
- `src/app/shared/` — header, footer, intro loader, contact modal, toast, icons, stat band, page hero, carousel dots
- `src/app/core/` — theme, motion, scroll, loader, modal and toast services; `site-data.ts` content model
- `src/styles.css` — tokens, theme variables, primitives, component styles and responsive rules
- `public/assets/` — project screenshots and abstract artwork used by the app
- `legacy-static/` — original static HTML site, kept for reference and excluded from the build

Page metadata (title, description, Open Graph/Twitter tags) is applied on navigation in `src/app/app.ts`
from route data.

## Build and test

```bash
npm run build
npm test -- --watch=false
```

Production output is written to `dist/mycv/browser`.
