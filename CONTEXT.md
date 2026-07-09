# Context: Eric Friday Portfolio

## Domain glossary

**Layout Direction** — one of four selectable full-page presentations of the
same portfolio content: **Book** (single reading column, prose-first, most
literary), **Magazine** (colored hero band, asymmetric columns, most
expressive), **Merged** (the current live site — a hybrid combining pieces of
all four directions; see its section-by-section spec on the issue tracker),
and **Terminal** (unspecified as of this writing — a planned monospace/
command-line-emulating direction). Directions are documented as a design
system in `Portfolio - Design Specifications.html` (Part 1) and specified
per-layout as GitHub issues.

**Content Section** — one of the seven canonical blocks every Layout
Direction re-composes: Identity/Hero, Selected Work, Skills, Leadership &
Review, Contribution Map, Timeline, Contact. All directions render the same
underlying content data and section order; only the presentational markup
per section differs between directions.

**Shared infra** vs **layout-specific presentation** — the load-bearing
distinction between what every Layout Direction must reuse and what each is
free to define for itself:
- *Shared* (reuse across all directions by default): the `@portfolio/content`
  data (`identity`, `nav`, `projects`, `skills`, `leadership`, `timeline`,
  `contact`), the scroll-reveal-on-view and count-up-on-view animation
  hooks, the scroll-progress indicator, the design tokens, the theme-toggle
  mechanism (light/dark, independent of layout), and the outer `Section`
  wrapper (mono kicker + serif heading + intro paragraph) used for each
  Content Section's top-level heading.
- *Layout-specific*: how a Content Section's inner content actually renders
  (cards vs. prose vs. essay vs. whatever Terminal turns out to want).
  Terminal is expected to request exceptions to some shared animation/motion
  infra once its own visual vocabulary is specified — that's an open
  exception, not yet exercised.

**Chapter** — Book's per-project device inside its Selected Work section: an
oversized serif number (48–56px, green) per project, distinct from the outer
`Section`'s own top-level numbering (01 Selected Work, 02 Skills, etc.).
Two numbering systems operate at two different nesting levels within Book.

**Colophon** — Book's treatment of its Contact section: a closing
signature-line block with links rendered as underlined runs of text (not
pill buttons), set in Newsreader. Distinct from Merged's Contact, which uses
pill-style link buttons.

## Architecture decisions

See `docs/adr/`:
- [0001 — Route-based layout switching with cookie persistence](docs/adr/0001-route-based-layout-switching.md)
