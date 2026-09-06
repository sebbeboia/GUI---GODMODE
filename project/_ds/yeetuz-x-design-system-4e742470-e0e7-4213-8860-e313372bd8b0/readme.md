# YEETUZ-X — Design System

The visual system of **yeetuz-x.com**, the personal site of an independent security engineer and systems builder ("YEETUZ-X", GitHub `sebbeboia`). It is a single-page portfolio: a WebGL orb hero, an indexed list of five projects, a capability grid, and a contact band. Dark, brass-accented, mono-labelled, deliberately hacker-adjacent without being a terminal pastiche.

## Sources used

- **Site repo (supplied by the user as a zip):** `yeetuz-x-web-main` — a single self-contained `index.html` (40 KB) with inline CSS, inline JS and inline WebGL. Preserved unmodified at `source/index.html`, with the repo's own `README.md` and `CNAME`. Every token, component and screen here was read from that file, not from screenshots.
- **Live site:** https://yeetuz-x.com (copy cross-checked against the repo).
- **Linked but not included:** https://reproforge.com (a separate product, no source provided), https://github.com/sebbeboia.
- No Figma file, no design-system definition, and no second product surface were provided.

The one external runtime dependency is the Google Fonts stylesheet — Bricolage Grotesque, IBM Plex Sans, IBM Plex Mono. All three are Google Fonts originals, so **no font substitution was needed**.

## The orb

The site's signature element, and the reason this system exists. It is a dependency-free WebGL wireframe geodesic sphere: an icosahedron subdivided three times, its unique edges drawn as `GL_LINES` with a glow point at every vertex, additively blended so overlapping edges bloom. A vertex shader breathes each point in and out by 2.8% on three offset sine waves; the fragment shader ramps colour by depth — brass `#f5c76b` at the near face, cool slate `#8c99b8` at the far — and fades alpha 0.95 → 0.12 with distance. It auto-spins at 0.12 rad/s and drifts toward the pointer with 0.05 easing. All motion stops under `prefers-reduced-motion`.

`components/brand/Orb.jsx` is a faithful port with four presets: `hero` (as on the site), `contained`, `indicator`, `mark`. A `pulse` prop (an addition, not on the live site) makes it breathe on a 2.6s loop for loading states.

## Content fundamentals

**Voice.** First person, singular, present tense. The author is the product: "I build the systems that break systems." "I'm an independent security engineer who ships whole systems — not just scripts." "I build the tools I wished existed." Never "we", never a company voice, never a passive construction.

**Register.** Claim, then qualify. Nearly every sentence is a flat assertion followed by an em-dash clause that narrows or undercuts it: "Built for authorized engagements, end to end." "A product, not a side project." "Opinionated defaults, hardened, and mine." "Low-level enough to trust, polished enough to ship." That construction is the house style — copy that doesn't do it reads off-brand.

**Humour.** Dry, one beat at a time, always in service of credibility. "Root shells, responsibly obtained." "Let's build something dangerous — legally." The joke always signals professionalism rather than undercutting it.

**Casing.** Sentence case everywhere — headings, buttons, eyebrows, tags. Uppercase happens only via CSS `text-transform` on mono labels (eyebrows, capability headings, the scroll cue); never typed in the copy. Product names keep their own casing: `YEETUZ-X OS`, `YEETUZ-X444 · GODMODE`, `ReproForge`.

**Punctuation.** Em dashes (spaced) carry the qualifying clause. The middot `·` separates metadata pairs: "Security engineer · Systems builder", "OS · 2026", "Product · live". Slash-with-spaces for counters: "01 / 04". Ampersands are used freely in labels ("Stack & capabilities", "Web & network pentest").

**Length.** Headline: 6–8 words on two lines. Lede: one sentence, under 46 characters of measure. Project descriptions: two sentences, ~30 words, always ending on the qualifying clause. List items: 2–4 words. Nothing is longer than it needs to be, and nothing is a bullet-point fragment pretending to be a sentence.

**Domain vocabulary is used unhedged** — Kali, live ISO, amd64, PTES, OWASP, MITRE ATT&CK, OSINT, Tor, agentic tooling, local LLM deploys. The reader is assumed to be technical. Nothing is explained parenthetically.

**No emoji.** Not one, anywhere in the source. Do not introduce them.

## Visual foundations

**Colour.** One committed dark theme, no light mode, no theme switching. Ground `#0a0b0e`; surfaces `#121419` / `#191c23` used only on hover; hairlines `#22262e` and `#171a20`. Text runs three levels: `#eceef1` strong, `#9aa0ab` body, `#6b7280` meta. A single accent — brass `#e6a84c`, brightening to `#f4c579` on hover — carries every kicker, link, CTA and figure. Cool colour appears in exactly two places: the faint blue-grey bloom at bottom-left, and the orb's far edges. No second accent, no status palette, no gradients between hues.

**Type.** Three faces with strict jobs. **Bricolage Grotesque** (500, tracking −0.02em to −0.035em, line-height 1.02) for anything that makes a statement: headline, project names, stat figures, the lead paragraph at 400. Its italic, in brass, marks the one emphasised word per headline ("*break*", "*dangerous*") — never more than one. **IBM Plex Sans** (400/600, 1.6 line-height) for prose. **IBM Plex Mono** for everything machine-adjacent: eyebrows at 0.24em tracking, the wordmark at 0.14em, capability headings at 0.12em caps, nav and tags at 0.04–0.06em, counters at 0.1em. The rule: display states, mono labels, sans explains. Sizes are a six-step fluid `clamp()` scale, `--step--1` to `--step-4`.

**Backgrounds.** No photography, no illustration, no stock imagery — the repo contains no raster assets at all. Depth is built from three fixed layers instead: a vertical ground gradient, a warm brass radial bloom at 78%/8% and a cool one at bottom-left, then a fractal-noise film grain tiled at 160px, overlay-blended at 0.5 opacity, jittering across six steps every 6s. Content sits above at `z-index: 2`. Section backgrounds never change colour; the only local background shift is a capability cell lifting to `--surface` on hover, and the brass wash that sweeps a work row from the left.

**Layout.** 1200px max measure inside a fluid gutter (`clamp(20px, 5vw, 88px)`). Vertical rhythm is one token: `--band-y`, `clamp(80px, 12vw, 160px)` between sections. Two fixed elements only — the nav and the pointer. The hero is `100svh`. The work index is a stack of full-width rows on a `44px 1fr auto` grid, not cards. The capability grid is a 1px-gap grid over `--line-soft`, so the gaps themselves read as hairlines. Text measures are capped explicitly: 62ch body, 46ch lede, 60ch description, 16ch on the contact headline.

**Borders and radii.** Two radii exist: `999px` (buttons, tags, nav CTA) and `50%` (the brass dot, the go-circle). Nothing has a mid-range corner — no 8px cards, no 12px panels. Every division in the layout is a 1px hairline in `--line`.

**Shadows.** There are none. Not one `box-shadow` for depth in the entire source. The only shadow is the expanding ring in the brass dot's pulse keyframe. Depth comes from the bloom, the grain, and the orb's additive blending. Do not add elevation.

**Transparency and blur.** Used once, deliberately: the nav gains a 72%-opacity ground scrim with `blur(14px) saturate(140%)` after 24px of scroll. Elsewhere transparency appears only as low-alpha washes (`--accent-glow` at 16%, the cool bloom at 5%). No frosted cards, no glassmorphism.

**Motion.** Two curves. `cubic-bezier(0.22, 1, 0.36, 1)` for interaction at 0.25–0.4s; `cubic-bezier(0.16, 1, 0.3, 1)` for scroll reveals at 0.9s. Everything decelerates into place — nothing bounces, nothing overshoots, nothing springs. Content enters once, rising 26px with a fade, staggered 60–80ms within a group (the hero uses 0/80/200/320). Continuous loops are limited to four: the brass dot pulse (2.6s), the scroll-cue highlight (2.2s), the grain jitter (6s, stepped), and the orb's spin. Every one of them is disabled under `prefers-reduced-motion`.

**Hover states.** Brass comes in and things move 4–6px. Ghost button: border → brass, label → `--accent-bright`. Brass button: fill brightens. Nav link: colour → `--text` plus a 1px brass underline scaling in from the left. Work row: brass wash from the left, title slides 6px right, the go-circle fills brass and rotates −45°. Capability cell: background → `--surface`. Arrows inside buttons translate 4px.

**Press states.** None are defined — no scale-down, no darkening, no opacity dip. The tactile feedback instead is the magnetic CTA: buttons marked `data-magnetic` translate at 0.3× the cursor's offset from their centre and snap back on leave.

**Pointer.** On fine pointers the native cursor is hidden and replaced with a 6px white dot tracking exactly plus a 34px ring lagging at 0.18 easing, both in `mix-blend-mode: difference`. Over any link or button the ring grows to 54px and fills 8% white.

**Focus.** A 2px `--accent-bright` outline at 3px offset with a 2px radius, globally. Do not remove it.

## Iconography

The source has **no icon library, no icon font, and no SVG icon set**. Iconography is entirely typographic:

- **Unicode arrows as the whole vocabulary.** `→` (U+2192) for forward motion — inside buttons and in each work row's go-circle; `↗` (U+2197) for links that leave the site. Nothing else.
- **The em dash `—`** in mono, coloured `--faint`, is the list bullet. Never a disc, never a chevron.
- **The middot `·`** separates metadata pairs.
- **`∞`** appears once, as a stat figure and a joke.
- **A pulsing 8px brass circle** stands in for status/liveness in the wordmark.
- **One vector asset exists:** the favicon — a hexagon outline in brass on the ground colour, inlined as a data URI in the source's `<link rel="icon">`. It is copied out here as `assets/mark.svg` (with ground) and `assets/mark-bare.svg` (transparent). This is the closest thing the brand has to a mark.
- **No emoji, in any context.**

If a design genuinely needs an icon the brand doesn't have, prefer the orb at `variant="mark"` or a typographic glyph. **No icon set has been substituted in** — introducing Lucide or Heroicons here would invent a vocabulary the brand does not use.

### Logo

There is **no logotype file** in the source. The mark is the wordmark itself: `YEETUZ‑X` set in IBM Plex Mono 500 at 0.14em tracking with a non-breaking hyphen, preceded by the pulsing brass dot. Where a logo would go, render that. The hexagon favicon glyph is available but is not used anywhere in the page body.

## Intentional additions

Everything else is a direct extraction. Three things were added, all documented as such:

1. **`Orb`'s `pulse` prop** — a breathing loop, requested for loading/indicator use. Not on the live site.
2. **`Orb`'s `contained` / `indicator` / `mark` variants** — the site only ever uses the hero configuration; these are re-scoped presets of the same geometry.
3. **`Reveal` as a component** — the site does this with a `[data-reveal]` attribute and one IntersectionObserver. Same behaviour, componentised.

No primitive was invented: there is no Toast, Avatar, Tabs, Dialog, Input or Switch here, because the source defines none. (The site's contact section is a mailto link and a GitHub button — the form fields visible in some renderings of the live page are not in the supplied source.)

## Index

**Root**
- `styles.css` — the single entry point consumers link. Imports only.
- `thumbnail.html` — homepage tile.
- `SKILL.md` — Agent Skills front matter for use outside this project.
- `source/` — the untouched supplied site source. Treat as read-only ground truth.

**`tokens/`** — `fonts.css` (Google Fonts import), `colors.css`, `typography.css`, `spacing.css`, `motion.css` (incl. `yx-pulse`, `yx-grain`, `yx-cue` keyframes), `effects.css`, `base.css` (element resets).

**`components/brand/`** — `Orb`, `AmbientBackground`, `Grain`, `Brand`
**`components/core/`** — `Button`, `Eyebrow`, `SectionHead`, `Tag`, `MailLink`
**`components/content/`** — `WorkRow`, `Stat`, `CapabilityCard`
**`components/navigation/`** — `NavBar`, `SiteFooter`, `ScrollCue`, `CustomCursor`, `Reveal`

Each directory carries a `*.card.html` thumbnail; each component a `.d.ts` contract and a `.prompt.md` usage note.

**`ui_kits/website/`** — the full yeetuz-x.com homepage recreation (`index.html`, `hero.screen.jsx`, `sections.screen.jsx`, `README.md`). Registered as a starting point.

**`guidelines/`** — 16 specimen cards across Colors, Type, Spacing and Brand.

**`assets/`** — `mark.svg`, `mark-bare.svg`, `grain.svg`. No raster imagery exists in the source; none was generated.
