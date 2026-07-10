# Context: Eric Friday Portfolio

## Domain glossary

**Layout Direction** — one of four selectable full-page presentations of the
same portfolio content: **Book** (single reading column, prose-first, most
literary), **Magazine** (colored hero band, asymmetric columns, most
expressive), **Merged** (the original live site - a hybrid combining pieces of
all four directions; see `docs/layouts/merged.md` for its section-by-section
spec),
and **Terminal** (a terminal-inspired presentation with light command
affordances, not a full command interpreter). Directions are documented as a
design system in `Portfolio - Design Specifications.html` (Part 1) and
specified per-layout as GitHub issues.

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
  `contact`), the scroll-reveal-on-view animation hook, the scroll-progress
  indicator, the design tokens, the theme-toggle
  mechanism (light/dark, independent of layout), and the outer `Section`
  wrapper (mono kicker + serif heading + intro paragraph) used for each
  Content Section's top-level heading.
- *Layout-specific*: how a Content Section's inner content actually renders
  (cards vs. prose vs. essay vs. scrollback transcript). Terminal reuses the
  shared layout switcher, theme toggle, content data, and normal scrolling,
  but has a motion exception: no count-up animation and no typewriter delays.
  Any reveal-on-scroll treatment in Terminal should feel instant and
  non-theatrical.

**Chapter** — Book's per-project device inside its Selected Work section: an
oversized serif number (48–56px, green) per project, distinct from the outer
`Section`'s own top-level numbering (01 Selected Work, 02 Skills, etc.).
Two numbering systems operate at two different nesting levels within Book.

**Colophon** — Book's treatment of its Contact section: a closing
signature-line block with links rendered as underlined runs of text (not
pill buttons), set in Newsreader. Distinct from Merged's Contact, which uses
pill-style link buttons.

**Command Affordance** — Terminal's use of shell-like prompts, command labels,
and section-jump controls as visible navigation and framing devices. Command
Affordances are decorative and navigational; they are not a requirement for
visitors to type commands in order to read the portfolio.

**Terminal Command Strip** — Terminal's visible set of clickable section-jump
commands: `help`, `work`, `skills`, `leadership`, `ledger`, `timeline`, and
`contact`. These commands label and navigate the canonical Content Sections;
they do not imply free-form command parsing.

**Scrollback Transcript** — Terminal's top-to-bottom Content Section model:
the page reads like a polished terminal session where each section is
introduced by a command line and followed by readable portfolio output. The
canonical mapping is `$ help` for Identity/Hero, `$ open work` for Selected
Work, `$ list skills` for Skills, `$ cat leadership` for Leadership & Review,
`$ query ledger` for Contribution Map, `$ history timeline` for Timeline, and
`$ contact --links` for Contact.

**Restrained Modern Developer Terminal** — Terminal's visual line: a crisp,
modern shell-inspired portfolio surface using the existing design tokens,
mono typography, clear borders, command prompts, muted status text, and
selective green/blue accents. Avoid retro CRT treatments, scanlines, fake
phosphor glow, heavy pixel effects, hacker-movie density, sound, startup boot
sequences, forced typing animations, fake loading delays, keyboard-only hidden
interactions, low-contrast green-on-black walls, ASCII art portraits, and
glitch effects. A cursor is acceptable only as a static visual accent or a
subtle non-essential blink that respects reduced-motion settings.

**Query Result Ledger** — Terminal's layout-specific treatment of the
Contribution Map: `$ query ledger` returns a compact table-like result using
the shared Contribution Map data. The output should emphasize scannable
columns such as `area`, `evidence`, `impact`, and `signal` instead of cards.

**Filesystem Work Listing** — Terminal's layout-specific treatment of Selected
Work: `$ open work` begins with project entries shaped like filesystem paths
such as `./work/project-name/`, then expands each entry inline into a readable
project record. Each record should preserve narrative context with fields such
as `role`, `problem`, `system`, `impact`, and `evidence`.

**Responsive Terminal Geometry** — Terminal's mobile rule: preserve prompts,
command labels, and shell-inspired framing, but let readability override fixed
terminal geometry. Tables may collapse into stacked rows, long paths may wrap,
and the Terminal Command Strip may become a horizontally scrollable link row;
do not require landscape orientation, fixed-width panes, or tiny mono text.

## Architecture decisions

See `docs/adr/`:
- [0001 — Route-based layout switching with cookie persistence](docs/adr/0001-route-based-layout-switching.md)
- [0002 — Terminal layout avoids theatrical terminal motion](docs/adr/0002-terminal-motion-exception.md)
