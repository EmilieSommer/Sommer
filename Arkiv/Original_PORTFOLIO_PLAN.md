# Emilie Sommer — Portfolio Website Plan

## Concept

The portfolio is built around a single core idea: **showing the design process, not just the result.**

Instead of a static portfolio, the site itself *is* the design artifact. The visitor watches (and participates in) a Figma-like design session as they scroll — fonts get tried and discarded, colors get tested for accessibility, grids snap into place — until the full, finished portfolio emerges. This demonstrates design knowledge viscerally rather than just claiming it.

---

## User Journey

### Phase 0 — Blank Canvas (Landing / Intro Animation)
- Page opens completely blank (white background, no UI)
- A cursor drifts into frame from the left — styled like a macOS arrow cursor, not a browser cursor
- The cursor moves to the center, clicks, and a **Figma-style text box** appears (blue outline, handles)
- It types: `Welcom`
- Pause — the cursor moves back, selects and deletes the text
- Types: `hi`
- Cursor moves below, creates a second smaller text box
- Types: `My name is Emilie Sommer and I` — *(finish this sentence later)*
- A small beat, then the cursor "releases" the text box (clicks away, handles disappear)
- This signals the end of the intro and the start of the scroll experience

**Skip option:** A `Skip intro →` button is visible in the top-right corner from the start. Clicking it instantly scrolls past the intro to the About section. The vertical nav (see Navigation) is also always visible and clickable.

---

### Phase 1 — Typography Awakening (scroll ~0–20%)
The page is mostly white. As the user scrolls:

1. **Font trial** — the `hi` text cycles through 5–6 fonts in sequence (Comic Sans → Times New Roman → a heavy display font → a generic sans → finally landing on the chosen typeface). Each switch has a small "undo" animation, as if the designer is trying and rejecting options.
2. **Type scale** — once the font is locked, a hierarchy appears: H1 → H2 → body → caption, with size and weight set in front of the user.
3. **Letter spacing & line height** — subtle adjustment animation shows these being dialed in.

*Design skill shown: typographic decision-making, hierarchy, readability.*

---

### Phase 2 — Color & Accessibility (scroll ~20–40%)
The page is now structured but colorless (black & white).

1. **First color attempt** — a low-contrast color pair appears (e.g. light grey text on white). A small **contrast checker badge** appears (WCAG AA ✗ — Fail), styled like a Figma plugin panel.
2. **Adjustment** — the foreground color darkens in real time, the badge updates to (WCAG AA ✓ — Pass), then (AAA ✓).
3. **Palette build** — primary, secondary, and neutral colors get "sampled" and placed into a small color swatch strip that pins to the top.
4. **Background shift** — the canvas transitions from white to the actual site background color.

*Design skill shown: accessibility thinking, WCAG contrast, intentional color palette.*

---

### Phase 3 — Grid & Layout (scroll ~40–55%)
The content blocks exist but are floating freely, slightly misaligned.

1. **Grid overlay appears** — a 12-column grid flashes on (like pressing G in Figma), columns highlighted in faint pink/blue.
2. **Elements snap** — content blocks animate into alignment with satisfying "snap" micro-interactions.
3. **Spacing tokens** — margin and padding indicators (the red/blue Figma spacing lines) briefly appear between elements, then fade.
4. **Responsive hint** — a brief breakpoint slider animation suggests the layout adapting (optional, can be subtle).

*Design skill shown: grid systems, spatial reasoning, layout discipline.*

---

### Phase 4 — Component Thinking (scroll ~55–65%)
A brief transition section.

1. A single card component "disassembles" into its layers (image, title, tag, CTA) then reassembles — like expanding a component in Figma.
2. This introduces the **Projects** section visually, making the first project card feel like it just got built.

*Design skill shown: component-based thinking, design systems.*

---

### Phase 5 — About Me (scroll ~65–70%)
By now the page feels fully designed. Clean, confident, finished.

- Short personal bio
- Photo or illustrated portrait
- Skills / tools (Figma, research methods, etc.)
- A line about background: education, approach to design

---

### Phase 6 — Work Experience (scroll ~70–75%)

**Key entry to feature prominently:**
> **Studentermedhjælper, Design Team — Nykredit**
> *(Role description, period, what you worked on)*

Other jobs listed more briefly — focus is on relevance to design.

---

### Phase 7 — School Projects (scroll ~75–90%)
This is the deepest content section. Each project gets its own "card" or full-width section.

**Per project, include:**
- Project title + brief description (1–3 sentences)
- Role / context (school, team size, brief)
- Hero image or video embed (autoplay muted loop where relevant)
- Gallery of process/result images (lightbox on click)
- Tags: skills / tools used

**Special flag for the published report project:**
> A callout or badge: *"Report published"* — with a link if available. This is worth a prominent visual treatment to signal academic/professional validation.

---

### Phase 8 — Personal Works (scroll ~90–95%)
Separate from school work — personal creative projects, side experiments, passion pieces.

Slightly looser layout to reflect personal/exploratory nature vs. structured school work.

---

### Phase 9 — Footer / Contact (scroll ~95–100%)
- Contact info / links (email, LinkedIn, etc.)
- A small closing line — perhaps a callback to the opening "hi"
- Copyright

---

## Navigation

### Vertical Section Navigator (Right Side)
A persistent vertical line on the right edge of the viewport:

```
│  ●  Intro          ← active section highlighted
│  ○  About
│  ○  Experience
│  ○  Projects
│  ○  Personal
│  ○  Contact
```

- Each circle is clickable → smooth scroll to that section
- The active section is filled/highlighted
- Text labels appear on hover (or always visible on desktop)
- During the intro animation phases, the nav dots are present but the labels read "Typography", "Color", "Grid", "Components" to acknowledge the process sections
- On mobile: collapses to a hamburger or a minimal dot-only version

---

## Design System

### Typography
| Role | Font | Notes |
|---|---|---|
| Display / H1 | **Playfair Display** (Bold) | The big emotional moments — "WELCOME", section titles |
| H2 / H3 / UI | **Poppins** (Medium / SemiBold) | Navigation, labels, subheadings |
| Body | **Poppins** (Regular 400) | All running text |
| Captions / tags | **Poppins** (Light / 300) | Small metadata |

The **intro animation font trial** should reject fonts in this order before landing on the final pairing:
`Arial` → `Times New Roman` → `Comic Sans` → `Georgia` → `Montserrat` → **Playfair Display + Poppins** ✓

### Color Palette
Sourced from Figma designs. All values locked.

| Name | Hex | Role |
|---|---|---|
| Cream | `#F2F0EF` | Background (the canvas) |
| Terracotta | `#D95122` | Primary — headings, accents, image placeholders |
| Rust | `#BD4B26` | Primary dark — hover states, depth |
| Sage | `#B6CFB9` | Secondary accent — tags, highlights |
| Amber | `#EAB05C` | Warm accent — used sparingly |
| Peach | `#FFCB7F` | Light warm — background tints, cards |
| Warm Brown | `#896645` | Tertiary text, borders |
| Dark Brown | `#715438` | Deep tertiary |
| Near Black | `#1E1E20` | Body text, primary text |

**Accessibility note for the Color phase animation:**
- `#1E1E20` on `#F2F0EF` → contrast ratio ~17:1 — AAA ✓
- `#D95122` on `#F2F0EF` → contrast ratio ~4.6:1 — AA ✓ (large text), show adjustment to `#BD4B26` to hit AA on small text too
- The animation should show the terracotta being too light on cream at first, then darkening to pass

### Layout
- **Grid:** 12-column, as visible in Figma designs — column guides in the animation phase will use the pink/blush tint shown in designs
- **Project layout:** Alternating — image left + text right, then image right + text left (staggered vertical rhythm as in your layout sketch)
- **Max content width:** ~1200px, centered
- **Spacing scale:** Base 8px unit
- **Border radius:** Minimal — 0 or 2px on cards to keep the editorial feel

| Token | Value |
|---|---|
| Animation easing | Ease-out for reveals, spring (0.3 stiffness) for snaps |
| Image placeholder color | `#D95122` (terracotta, matches your Figma blocks) |

---

## Technical Considerations

### Hosting
- **GitHub Pages** — free, already set up
- **Custom domain:** Add a `CNAME` file to the repo root containing your domain name. Set an `A` record in your DNS pointing to GitHub's IPs. GitHub handles HTTPS automatically.
- For static export compatibility, avoid any server-side features during build

### Stack
- **Framework:** **Vite + React** — best balance of simplicity and power for a static GitHub Pages site. Lighter than Next.js, no server needed, easy static build.
- **Scroll animations:** **GSAP + ScrollTrigger** — industry standard for this type of scroll-driven animation; precise control over each phase
- **Fonts:** Google Fonts — Playfair Display + Poppins, loaded via `<link>` for performance
- **Cursor animation:** Custom SVG cursor component, animated with GSAP
- **Typewriter effect:** Custom implementation (~30 lines), no library needed
- **Deployment:** `gh-pages` npm package — `npm run deploy` pushes the built site to the `gh-pages` branch automatically

### Accessibility
- `prefers-reduced-motion` CSS media query + JS check — if set, skip all animations and show the finished portfolio immediately
- Skip intro button always visible, `sessionStorage` flag so repeat visitors bypass the intro
- All images need `alt` text; videos need captions or transcript

### Performance
- Images: use WebP format, lazy load everything below the fold
- Videos: `autoplay muted loop playsinline`, never autoplay audio
- Font loading: `font-display: swap` to prevent invisible text flash

---

## Open Questions / To Decide

- [ ] Finish the subtitle text: `My name is Emilie Sommer and I...`
- [x] ~~Select final typeface~~ → **Playfair Display** (display) + **Poppins** (UI/body)
- [x] ~~Select color palette~~ → locked above
- [ ] Confirm which school projects to include and in what order
- [ ] Confirm dates/details for Nykredit role
- [ ] Does the published report have a public URL to link to?
- [ ] Photo or illustrated portrait for About section?
- [ ] Domain name (add to CNAME when ready)

---

## Section Order Summary

| # | Section | Scroll % (approx) |
|---|---|---|
| 0 | Intro animation (Figma cursor) | — |
| 1 | Typography phase | 0–20% |
| 2 | Color & accessibility phase | 20–40% |
| 3 | Grid & layout phase | 40–55% |
| 4 | Component transition | 55–65% |
| 5 | About Me | 65–70% |
| 6 | Work Experience | 70–75% |
| 7 | School Projects | 75–90% |
| 8 | Personal Works | 90–95% |
| 9 | Contact / Footer | 95–100% |
