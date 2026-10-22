# Developer Portfolio

A six-page personal portfolio built with Angular 22. It includes a home page with interactive content, selected work, experience, a HealthTech case study, about, and contact.

## Live site

https://villain20000.github.io/MyCV/

The site is deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`, built with the `/MyCV/` base path. A `404.html` fallback restores deep links so Angular routes work on direct visits.

## Development

```bash
npm install
npm start
```

The app is served at `http://localhost:4200/` and reloads on source changes.

## Routes

| Path          | Page                                |
| ------------- | ----------------------------------- |
| `/`           | Home                                |
| `/projects`   | Selected work                       |
| `/experience` | Career experience                   |
| `/healthtech` | HealthTech case study               |
| `/about`      | About                               |
| `/contact`    | Contact                             |

Legacy `.html` URLs such as `/projects.html` redirect to the matching Angular route. Unknown paths redirect to `/`.

## Build and test

```bash
npm run build
npm test -- --watch=false
```

Production output is written to `dist/mycv/browser`.

## Structure

- `src/app/pages/` — lazy-loaded page components
- `src/app/shared/` — shared navigation and footer
- `src/app/core/reveal.service.ts` — IntersectionObserver-based scroll reveals
- `src/styles.css` — global design tokens, layout primitives, and shared responsiveness
- `public/assets/` — portfolio imagery used by the app
- `legacy-static/` — the original static HTML version, kept for reference and not included in the build

Page metadata (title, description, Open Graph tags) is set on navigation in `src/app/app.ts` from route data.
