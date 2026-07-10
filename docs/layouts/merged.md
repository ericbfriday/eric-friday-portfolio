# Merged Layout Specification

## Status

Merged is the hybrid layout direction that originally shipped as the live
portfolio presentation. It remains a first-class Layout Direction and is still
available at `/merged`, but Book is the current default direction after the
route-based layout switcher work.

This document specifies the shipped Merged presentation so it can be compared
with Book, Magazine, and Terminal as an interchangeable presentation of the
same portfolio content.

## Concept

Merged combines the strongest devices from the four design directions into one
conservative portfolio:

- Book contributes the centered literary hero and numbered Contents list.
- Editorial Sidebar contributes the persistent identity/navigation pattern,
  implemented here as a sticky top header rather than a left rail.
- Index/Ledger contributes the count-up stats, filterable Contribution Map,
  and typographic ledger table.
- Magazine contributes pull-quotes and the large closing contact statement,
  currently in a smaller and more restrained form.

Merged is not the shared contract every other direction must copy. It is one
layout-specific presentation of the shared content and infrastructure.

## Route And Data

The `/merged` route renders the shared header, scroll progress indicator, hero,
Selected Work, Skills, Leadership & Review, Contribution Map, Timeline, and
Contact sections. Its route loader prefetches `contributionQueryOptions` so the
Contribution Map has server-loaded data before render, and its route headers set
the `ebf-layout=merged` cookie.

All copy and facts come from `@portfolio/content` and the Contribution Map
query data:

- `identity`
- `nav`
- `projects`
- `skills`
- `leadership`
- `timeline`
- `contact`
- contribution rows, filters, and stats from `contributionQueryOptions`

## Section Specification

### Identity / Hero

The hero is the top content section (`top`). It uses the `--band` background,
a bottom border, and centered content constrained by `--content-max`.

The identity stack uses:

- mono kicker from `identity.kicker`
- serif name at `clamp(52px,10vw,104px)`
- a short 1px green divider
- italic serif role line from `identity.role`
- intro paragraph from `identity.intro`
- a hand-set numbered Contents list beneath the intro

The Contents list doubles as primary in-page navigation. It uses the canonical
section order, `01` through `06`, dotted leaders, and an arrow affordance.

### Header / Navigation

Merged uses the shared `SiteHeader` as a sticky top bar. It is intentionally
not Editorial Sidebar's left rail, even though it preserves that direction's
persistent identity concept.

The header includes:

- a compact identity link back to `#top`
- desktop section links derived from `nav`
- an IntersectionObserver-backed active-section dot
- the shared layout switcher
- the shared theme toggle
- a translucent `--paper` background with backdrop blur

### Selected Work

Selected Work (`work`) renders `projects` as bordered cards. Each card includes
a mono metadata line (`no` and `meta`), a serif project title, body copy,
optional italic pull-quote, tags, and an optional terminal-style output panel.

On desktop, each card uses a two-column composition with prose in the wider
column and the optional panel in the narrower column. The dark monospace panel
is Merged-specific prior art for Terminal, but it is not Terminal's interaction
model.

### Skills

Skills (`skills`) renders grouped badge lists from `skills`. Each group has a
mono green label and outline badges in a responsive two-to-three-column grid.

This is a shipped starter render. The Index/Ledger direction's fuller
typographic-cloud treatment is not implemented here and should not be treated
as complete Merged behavior.

### Leadership & Review

Leadership & Review (`leadership`) renders a two-column card grid from
`leadership`. Each item has a serif title, optional italic quote with a green
left rule, and supporting body copy.

This is also a shipped starter render. It borrows Magazine's pull-quote idea,
but it does not implement the large feature-quote treatment described by the
Magazine direction.

### Contribution Map

Contribution Map (`map`) is the clearest Index/Ledger section in Merged. It
uses `useSuspenseQuery(contributionQueryOptions)` and client-side filter state.

The section includes:

- a four-stat count-up row using green and blue accents
- a pill filter bar from the query's filter list
- a bordered ledger table
- rows filtered by domain
- project/domain/commit/latest columns
- animated width bars scaled against the highest commit count
- row hover highlighting

This treatment is Merged-specific. Other directions must render the same
underlying contribution data, but they do not need to copy the full ledger
table.

### Timeline

Timeline (`timeline`) renders a dense dated list from `timeline`, newest first.
It uses a left border rail, green-ringed dot markers, mono dates, serif titles,
and concise body copy.

This is a shipped starter render. It is intentionally simpler than Magazine's
woven year-node rail and should be documented as a plain vertical list until a
future Merged-specific timeline refinement is accepted.

### Contact

Contact (`contact`) renders the shared contact headline and blurb, then
pill-style links for email, GitHub, and LinkedIn. The email address is assembled
client-side from `contact.emailParts`.

The closing colophon credits ET Book, Newsreader, and IBM Plex Mono. This
differs from Book's colophon treatment, which renders contact links as
underlined prose runs rather than pills.

## Shared Infrastructure Contract

Merged reuses the shared infrastructure that every Layout Direction should use
unless an ADR or layout spec explicitly grants an exception:

- canonical section IDs: `top`, `work`, `skills`, `leadership`, `map`,
  `timeline`, and `contact`
- shared content data from `@portfolio/content`
- route-level layout cookie persistence through `ebf-layout`
- shared layout switcher placement and behavior
- shared theme toggle and `.dark` class on `html`
- `ebf-theme` localStorage persistence
- scroll progress top hairline
- design tokens from `@portfolio/config/tokens.css`
- ET Book / Newsreader serif typography and IBM Plex Mono labels
- `--content-max`, `--measure`, and consistent section padding
- `Section` wrapper semantics for numbered content sections where appropriate
- reveal-on-scroll behavior with reduced-motion fallback
- count-up-on-view behavior where a layout renders animated numeric stats

## Merged-Specific Presentation

These choices belong to Merged and are not mandatory for Book, Magazine, or
Terminal:

- sticky top header instead of a sidebar rail
- centered banded hero with Book-like Contents list
- selected-work cards with optional dark terminal-style panels
- grouped badge/chip Skills grid
- card-bound Leadership quotes
- full Index/Ledger-style Contribution Map with filters and commit bars
- simple vertical Timeline rail
- pill-style Contact links
- alternating `--paper` / `--paper-2` section bands

## Known Gaps

Skills, Leadership & Review, and Timeline are intentionally marked in code as
starter renders. This spec records the shipped behavior and the known
limitations; it does not authorize implementation work to finish those
treatments.

Future work may define separate issues for:

- replacing Skills with a fuller typographic cloud
- expanding Leadership into larger feature pull-quotes
- deciding whether Timeline should remain a plain vertical list or become a
  more expressive Merged-specific rail
