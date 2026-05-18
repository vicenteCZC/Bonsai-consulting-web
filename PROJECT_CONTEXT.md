# Bonsai Consulting Web - Project Context

Last updated: 2026-05-18

## Repository

- GitHub repo: `vicenteCZC/Bonsai-consulting-web`
- Production URL: `https://bonsai-consulting-web.vercel.app/`
- Main deploy branch: `main`
- Active local worktree used for clean deploy work:
  `c:\Users\gparc\OneDrive\Escritorio\Bonsai\Frontend\Bonsai\.sixth\deploy`

Important: use the `.sixth\deploy` worktree for future edits and deploy commits. The original root folder has an older/untracked flattened copy.

## Current Architecture Notes

- The production site is mostly static HTML/CSS plus client-side React via Babel.
- The repo contains duplicated site copies under `docs/` and `Bonsai/`.
- The root `index.html` renders the same app using `<base href="/docs/">`, so the Vercel root URL works while assets remain under `/docs/`.
- The site still relies on browser-side Babel/React, which is acceptable for current iteration but should eventually be replaced with a production build.

## Recent Fixes Already Deployed

### Deploy/runtime fixes

- Added missing CSS references so pages render properly.
- Removed dependency on the missing tweaks panel script by adding safe fallbacks.
- Defaulted theme to light to avoid the dark blank-looking first load.
- Fixed root `/` so it serves the app instead of just redirecting to `/docs/`.

### SEO fixes

- Added root `robots.txt`.
- Added root `sitemap.xml`.
- Added `docs/sitemap.xml`.
- Updated canonical/OG/JSON-LD URLs to the current Vercel domain.
- Added root `og-image.png`.

### UX/conversion improvements

- Hero now communicates a clearer offer:
  "Automatizamos procesos criticos para empresas en crecimiento en 10-15 dias, con alcance cerrado, metricas claras y sistemas en produccion."
- Primary CTA: `Agendar diagnostico 60 min`.
- Secondary CTA: `Calcular ahorro`.
- Added `Paquetes comprables` section:
  - Diagnostico operativo
  - Automation Sprint
  - Operations Stack
  - Bonsai OS Partnership
- Added `Que recibis` section with deliverables by stage.
- Improved final CTA with a short contact form.
- Added lead capture flow inside the savings calculator.

## Latest Commits Pushed

- `e83a109` - Fix GitHub Pages deploy assets
- `f96ff3b` - Default site theme to light
- `8bb3d84` - Render app without tweaks panel dependency
- `44cfc9b` - Improve SEO and UX for Vercel deploy
- `1ed205d` - Add productized UX sections
- `b44bbfa` - Add calculator lead capture flow
- `4de280a` - Add final contact form

## Verification Performed

- Verified Vercel root responds with `200 OK`.
- Verified `/robots.txt`.
- Verified sitemap URLs.
- Verified React renders via Chrome headless DOM dump.
- Verified these sections render publicly:
  - `Paquetes comprables`
  - `Que recibis`
  - `Calcular ahorro`
  - calculator lead capture
  - final contact form

## Current UX/SEO Strategy

The site is being moved from "institutional consulting site" toward "productized AI/automation consultancy site".

Current positioning:

- Target: growing companies with manual, spreadsheet-heavy, fragmented operations.
- Offer: fixed-scope automation and internal systems delivered in short sprints.
- Conversion path:
  1. Hero promise
  2. Problem/solution framing
  3. Productized packages
  4. Deliverables and proof
  5. Savings calculator
  6. Short lead forms by email/WhatsApp

## Recommendations Still Pending

Highest-impact next steps:

1. Replace `mailto`/WhatsApp-only forms with a real form backend.
   Options: Formspree, Tally, Basin, Netlify Forms, Vercel serverless function, Supabase.

2. Create SEO landing pages for high-intent searches:
   - `/docs/automatizacion-de-procesos.html`
   - `/docs/agentes-ia-para-empresas.html`
   - `/docs/desarrollo-software-a-medida-paraguay.html`
   - `/docs/automatizacion-n8n-make.html`
   - `/docs/dashboard-financiero-empresas.html`

3. Production build refactor:
   - remove runtime Babel
   - bundle React once
   - reduce JS/CSS blocking
   - improve Core Web Vitals

4. Add real trust assets:
   - client logos if allowed
   - anonymized screenshots
   - before/after examples
   - stronger case-study pages with measurable outcomes

5. Add analytics:
   - Vercel Analytics or Plausible
   - events for CTA clicks, calculator usage, mailto/WhatsApp leads

## Useful Commands

From the deploy worktree:

```powershell
git status --short --branch
git log --oneline -8
git push origin HEAD:main
curl.exe -I https://bonsai-consulting-web.vercel.app/
curl.exe -s https://bonsai-consulting-web.vercel.app/robots.txt
```

## Notes For Future Work

- Keep changes mirrored in both `docs/` and `Bonsai/` until the duplicated structure is cleaned up.
- Use `docs/` as the source of truth when editing shared front-end code, then copy to `Bonsai/`.
- Avoid changing custom domain strategy for now. The active production host remains the Vercel URL.
- If adding URLs to sitemap, use the Vercel domain until a custom domain decision is made.
