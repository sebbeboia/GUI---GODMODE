# Contributing to PWNBOARD

Thanks for your interest. PWNBOARD is a **visual prototype** — a JARVIS-style pentest
command HUD built on the exported PwnboardUI design system. Contributions of all kinds are
welcome: bug fixes, new simulated screens, design-system polish, accessibility, and docs.

## Scope: everything stays simulated

The single most important rule. PWNBOARD is a *theatrical* HUD: fake jobs, canned OSINT
results, a scripted terminal. It performs **no real scanning, exploitation, network
requests, or device access of any kind**, and it must stay that way.

Pull requests that add real offensive tooling, live network calls, credential handling, or
anything that turns the prototype into a functional attack tool will be declined. Keep new
behaviour self-contained and fake (see the existing `KALI` / `OSINT` / `AI` data tables and
the `_osintRows` / `_scanLine` helpers in `app/src/app.jsx` for the pattern).

## Project layout

Everything runnable lives in [`app/`](app/):

| Path | Role |
|------|------|
| `app/src/app.jsx` | **Source of truth.** The whole app is one React component here. |
| `app/app.js` | **Committed build artifact** — bundled from `src/app.jsx` by esbuild. Rebuild and commit it whenever you change the source. |
| `app/index.html` | Page shell: global CSS, theme, and the script load order. |
| `app/vendor/` | Vendored React and the PwnboardUI design-system bundle (loaded as `window.PwnboardUI`). Do not edit by hand. |
| `app/server.mjs` | Dependency-free static server for local viewing. |
| `app/verify.mjs` | Headless Playwright check of all six screens. |
| `docs/screenshots/` | README screenshots. |

## Getting started

```bash
git clone https://github.com/sebbeboia/GUI---GODMODE.git
cd GUI---GODMODE/app
node server.mjs            # → http://localhost:5173  (no build needed to just view)
```

To change the app:

```bash
cd app
npm install               # esbuild (build) + playwright/react (dev + verify)
npm run watch             # rebuild app.js on every save
# npm run start           # build + serve in one
```

Edit `src/app.jsx`, let `watch` rebuild `app.js`, and refresh the browser.

## Before you open a PR

1. **Rebuild the bundle.** `npm run build`, and commit the updated `app.js` alongside your
   `src/app.jsx` change. A PR whose `app.js` is out of sync with `src` will not run correctly.
2. **Run the verification suite.** `npm run verify` launches all six screens headless and
   fails on any console error. It needs a Playwright browser (`npx playwright install
   chromium`); if you already have a Chromium, point at it with
   `PW_CHROMIUM_PATH=/path/to/chrome npm run verify`.
3. **Keep it accessible.** This project holds a clean accessibility bar — please keep it:
   - Interactive elements are real `<button>`s (or native controls), not `<div onClick>`.
   - Every control has an accessible name (`aria-label` or a `<label>`).
   - Async output uses `aria-live` regions; each screen has a heading.
   - Honour `prefers-reduced-motion`; use `:focus-visible` for focus rings.
4. **Match the visual language.** Reuse the PwnboardUI components (`Card`, `Button`,
   `StatCard`, `DataTable`, `ArcReactor`, …) and the existing colour tokens rather than
   hand-rolling new styling.

## Commit and PR style

- Small, focused commits with a short imperative subject (e.g. `fix: honor scan target`).
- Describe what changed and how you verified it.
- Open the PR against `main`.

## License

By contributing, you agree that your contributions are licensed under the
[GNU GPL v3.0](LICENSE), the same license as this project.
