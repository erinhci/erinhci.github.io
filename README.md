# Erin King — UX Research Portfolio

A static HTML/CSS portfolio site showcasing UX research, cognitive engineering, and interaction design case studies. Built for performance, accessibility, and maintainability — no framework, no build step required.

---

## Project Structure

```
/
├── index.html                          # Main portfolio landing page
├── styles.css                          # Global stylesheet (tokens, layout, components)
│
├── eduflow-case-study.html             # EduFlow design system & accessibility infrastructure
├── distracted-pedestrians.html         # Ethnographic field study: phone walking behavior
├── reddit-disability-study.html        # Qualitative research: disability storytelling on Reddit
├── hades-cognitive-engineering-study.html  # Cognitive load study: expert vs. novice Hades players
├── physical-therapy-interaction-study.html # Team efficiency & communication bottlenecks
├── perceived-transparency-generative-ai.html # AI trust & perceived transparency study
├── noticed-case-study.html             # Noticed: adaptive symptom tracking brand & system
│
├── standardized-case-study-template.html  # Template for new case studies
│
└── assets/
    ├── fonts/                          
    ├── ErinN.King Resume.pdf           # Downloadable resume
    └── projects/
        ├── eduflow/                    # EduFlow logos and UI assets
        ├── distracted-pedestrians/     # Field study photos and PDF
        ├── reddit-disability-study/    # Full study PDF
        ├── Hades/                      # Attentional zone diagrams, charts, PDF
        ├── PT-Clinic/                  # Physical therapy clinic photos
        └── Noticed/                    # Brand identity and mockup assets
```

---

## Features

- **Theme switching** — Light and dark mode with localStorage persistence; no flash on load
- **Accent color system** — Four accessible accent colors (red, blue, green, amber) that adapt per theme
- **Scroll progress indicator** — Fixed top bar tracks reading position across all pages
- **Tag filtering** — Project cards on the index can be filtered and sorted by methodology tag
- **Rotating hero headline** — Cycles through "Systems / Research / Design / Interaction" with a CSS transition
- **Accessible by default** — Skip link, ARIA labels, focus-visible outlines, reduced-motion support throughout
- **Self-hosted typography** — Nohemi loaded via `@font-face` with `font-display: swap`; Space Grotesk via Google Fonts

---

## Design System

All visual decisions live in CSS custom properties on `:root` and the `[data-theme]` attribute selectors. To change a color globally, update the token — no hunting through files.

| Token | Purpose |
|---|---|
| `--bg` | Page background |
| `--surface` | Card and panel backgrounds |
| `--text-primary` | Headings and primary body copy |
| `--muted` | Secondary copy, captions, metadata |
| `--line` | Borders and dividers |
| `--accent` | Interactive elements, eyebrows, highlights |
| `--font-heading` | Display typeface stack (Nohemi → Space Grotesk) |
| `--font-body` | Body typeface stack (Space Grotesk → Inter) |
| `--font-ui` | UI element typeface (Inter) |

---

## Adding a New Case Study

1. Duplicate `standardized-case-study-template.html` and rename it
2. Add your `--project-accent` and `--project-bg` as inline styles on `<body>` to give the study its own color personality
3. Drop assets into a new folder under `assets/projects/`
4. Add a project card to the `#work` grid in `index.html`
5. That's it — the shared stylesheet handles the rest

---

## Running Locally

No build tools needed. Open any `.html` file directly in a browser, or serve the project root with any static file server:

```bash
# Python
python -m http.server 8000

# Node (npx)
npx serve .
```

---

## Accessibility Notes

- WCAG 2.2 AA contrast is maintained across all theme and accent combinations
- All interactive elements are keyboard-navigable with visible focus styles
- Images include descriptive `alt` text throughout
- The scroll progress bar and rotating headline are marked `aria-hidden` so they don't interrupt screen reader flow
- Motion effects respect `prefers-reduced-motion` — all transitions and animations are disabled when the user preference is set

---

## Contact

**Erin King**
erink415@gmail.com
[linkedin.com/in/erin-n-king](https://www.linkedin.com/in/erin-n-king)
