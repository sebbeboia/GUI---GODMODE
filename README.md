# GUI---GODMODE

**PWNBOARD** — a JARVIS-style pentest command HUD. A real, runnable implementation of a
Claude Design handoff, built on the exported PwnboardUI design system. The app lives in
[`app/`](app/) (see [`app/README.md`](app/README.md) for full details).

> Everything is **simulated** — fake jobs, canned OSINT results, a scripted terminal. It is a
> visual prototype (a theatrical cyberpunk HUD); there is no real scanning, exploitation, or
> network tooling of any kind.

## Kom i gang / Getting started

Hent repoet ned og kjør appen lokalt — ingen byggesteg trengs (`app/app.js` er ferdigbygget
og committet, og React + design-systemet ligger vendret i `app/vendor/`, så det kjører også
offline):

```bash
git clone https://github.com/sebbeboia/GUI---GODMODE.git
cd GUI---GODMODE/app
node server.mjs            # → http://localhost:5173
# eller: python3 -m http.server 5173
```

Åpne `http://localhost:5173` i nettleseren.

Skal du **endre koden**? Rediger `app/src/app.jsx`, bygg på nytt, og oppdater nettleseren:

```bash
cd app
npm install               # esbuild (bygg) + playwright/react (dev/verifisering)
npm run watch             # bygger app.js på nytt ved hver endring
# npm run start           # bygg + serve i ett
# npm run verify          # headless test av alle seks skjermene
```

## Skjermer / Screens

Command center · Tool launcher · OSINT workspace · Operation monitor · Settings · Terminal —
alle interaktive og koblet sammen. Se [`app/README.md`](app/README.md) for detaljer.
