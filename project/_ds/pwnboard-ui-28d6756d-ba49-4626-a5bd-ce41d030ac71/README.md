# PWNBOARD UI — a JARVIS-style cyberpunk HUD system

PWNBOARD UI is a dark, high-contrast "heads-up display" component set for security /
pentest dashboards. Build **with the components** — do not re-create their look from raw
CSS. Every component is a real export on `window.PwnboardUI` (import from `pwnboard-ui`).

## Setup — this system is dark by construction

Components render their own dark navy fills, but they are designed to sit on a **dark
page**. Give any screen you build a near-black background or nothing reads right:

```jsx
<div style={{ background: '#050a12', minHeight: '100vh', padding: 32, fontFamily: "'JetBrains Mono', monospace" }}>
  {/* your composition */}
</div>
```

`styles.css` is the single stylesheet (import it once at the app root). It defines the
tokens, the component classes, and the fonts (JetBrains Mono for the HUD, Inter for
prose, loaded from Google Fonts). Never restyle a component by overriding its classes.

## The palette — use these exact values

Tokens are CSS custom properties on `:root` and drive every component:

| Role | Hex | CSS var |
|---|---|---|
| Primary / interactive | `#00d4ff` | `--jarvis-cyan` |
| Success / running | `#00ff88` | `--jarvis-green` |
| Warning / medium | `#ffd700` | `--jarvis-gold` |
| High severity | `#ff6b35` | `--jarvis-orange` |
| Critical / danger | `#ff0040` | `--jarvis-red` |
| Body text | `#c0d0e0` | — |
| Muted text | `#4a6a8a` / `#8aa0b8` | — |

For your own layout glue, use inline styles with these hex values or `var(--jarvis-*)`.
The only ready-made helper classes in the stylesheet are `.glow-cyan` / `.glow-orange` /
`.glow-red` / `.glow-green` / `.glow-gold` (neon text-shadow), `.jarvis-card`, and
`.hud-corner`. Do NOT assume arbitrary Tailwind utilities exist — the shipped stylesheet
only contains what the library uses; prefer the components and inline styles.

## The components and when to reach for each

- **Layout / surfaces:** `Card` (clip-corner panel), `StatCard` (KPI tile: `label`,
  `value`, `icon` from lucide-react, `color`), `HudPanel` (corner-bracket frame, no fill —
  layer it over content).
- **Actions & input:** `Button` (`variant="primary" | "danger"`, put a lucide icon as a
  child), `Input` (all native attributes).
- **Status:** `SeverityBadge` (`severity="critical|high|medium|low|info"`) and
  `StatusBadge` (`status="running|completed|failed|pending|cancelled"`) — critical and
  running pulse. Both take an optional `label`.
- **Data:** `DataTable` (generic: `columns` with a `cell(row)` renderer, `rows`,
  `rowKey`) — compose the badges inside cells.
- **Activity:** `ProgressBar` (`value` 0–100), `Spinner` (`size`), `Waveform` (`bars`).
- **Identity:** `GlowText` (`color`, `as`) for neon headings, `ArcReactor` (`size`) as the
  brand emblem.

## One idiomatic build — a scan dashboard

```jsx
import { StatCard, DataTable, SeverityBadge, StatusBadge } from 'pwnboard-ui';
import { Bug, Radar } from 'lucide-react';

<div style={{ background: '#050a12', minHeight: '100vh', padding: 32 }}>
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
    <StatCard label="Scans" value={47} icon={Radar} color="#00ff88" />
    <StatCard label="Findings" value={128} icon={Bug} color="#ffd700" />
  </div>
  <DataTable
    columns={[
      { header: 'Finding', cell: (r) => <span style={{ color: '#c0d0e0' }}>{r.name}</span> },
      { header: 'Severity', cell: (r) => <SeverityBadge severity={r.severity} /> },
      { header: 'Status', cell: (r) => <StatusBadge status={r.status} /> },
    ]}
    rows={rows}
    rowKey={(r) => r.id}
  />
</div>
```

Read each component's `.d.ts` and `.prompt.md` for its full prop contract before use.

# PwnboardUI (pwnboard-ui@0.1.0)

This design system is the published pwnboard-ui React library, bundled as a single
browser global. All 14 components are the real upstream code.

## Where things are

- `_ds_bundle.js` — the whole-DS bundle at the project root; loads every component to `window.PwnboardUI`. First line is a `/* @ds-bundle: … */` metadata header.
- `styles.css` — the single stylesheet entry: it `@import`s the tokens, fonts, and component styles (`_ds_bundle.css`). Link this one file.
- `components/<group>/<Name>/<Name>.prompt.md` (example JSX + variants), `<Name>.d.ts` (types), `<Name>.html` (variant grid).
- `tokens/*.css` — CSS custom properties, names verbatim from upstream.
- `fonts/` — `@font-face` files + `fonts.css` (when the package ships fonts).

For a specific component, `read_file("components/<group>/<Name>/<Name>.prompt.md")`.

## Loading

Add these two lines to your page once (React must be on the page first):

```html
<link rel="stylesheet" href="styles.css">
<script src="_ds_bundle.js"></script>
```

Components are then available at `window.PwnboardUI.*`. Mount into a dedicated child node (e.g. `<div id="ds-root">`), not the host page's own React root, so the two trees don't collide:

```jsx
const { ArcReactor } = window.PwnboardUI;
ReactDOM.createRoot(document.getElementById('ds-root')).render(<ArcReactor />);
```

## Tokens

62 CSS custom properties from pwnboard-ui. Names are
preserved verbatim from upstream. They are declared inside `_ds_bundle.css` (this DS ships one compiled stylesheet rather than separate token files).

- **color** (6): `--tw-border-spacing-x`, `--tw-border-spacing-y`, `--tw-ring-offset-color`, …
- **spacing** (1): `--tw-ring-inset`
- **shadow** (4): `--tw-ring-offset-shadow`, `--tw-ring-shadow`, `--tw-shadow`, …
- **other** (51): `--tw-translate-x`, `--tw-translate-y`, `--tw-rotate`, …

## Components

### general
- `ArcReactor` — ArcReactor  the PWNBOARD brand mark: concentric cyan rings with a pulsing
- `Button` — Button  an angled-corner HUD action control in the JARVIS idiom.
- `Card` — Card  the core JARVIS surface. A clipped-corner panel with a cyan top
- `DataTable` — DataTable  a HUD data grid with uppercase monospace headers and cyan
- `GlowText` — GlowText  applies the JARVIS neon text-shadow in one of five palette
- `HudPanel` — HudPanel  wraps content in four cyan corner brackets, the JARVIS HUD frame.
- `Input` — Input  a single-line text field in the JARVIS idiom: dark fill, thin
- `ProgressBar` — ProgressBar  a thin HUD progress track with a cyan-to-green gradient fill
- `SeverityBadge` — SeverityBadge  a vulnerability-severity pill (critical/high/medium/low/info)
- `Spinner` — Spinner  a cyan HUD loading ring. Use while a scan or request is in flight.
- `StatCard` — StatCard  a KPI tile built on Card. Shows a labelled metric with a glowing
- `StatusBadge` — StatusBadge  a job/scan lifecycle pill (running/completed/failed/pending/
- `Tabs` — Tabs  an underline tab strip in the JARVIS idiom (uppercase monospace,
- `Waveform` — Waveform  a small animated equalizer of cyan bars, the voice active HUD
