# 0001 — Route-based layout switching with cookie persistence

## Status

Accepted (decided during triage grilling of issue #1).

## Context

The site needs to support four selectable Layout Directions (Book, Magazine,
Merged, Terminal — see `CONTEXT.md`) with a control near the theme toggle to
switch between them. The app runs on TanStack Start with SSR, deployed to
Cloudflare Workers.

## Decision

- Each Layout Direction is a distinct route at a symmetric named path (not
  query params, not a single route with client-side layout state).
- The root path (`/`) has no content of its own — it is a pure redirect
  layer. Its route loader reads an `ebf-layout` cookie **server-side** and
  throws a server-side redirect to the matching layout route before any HTML
  renders. No client-side/post-hydration redirect.
- If the cookie is absent or unrecognized, `/` redirects to a **temporary
  default** (Merged, until the Book layout issue closes and flips the
  default to Book — tracked as an acceptance criterion on that issue, not a
  fixed constant to hardcode in multiple places).
- Every layout route's loader sets the `ebf-layout` cookie server-side
  (`Set-Cookie` response header) unconditionally on every load —
  `Path=/`, `SameSite=Lax`, ~1 year max-age. This is the source of truth;
  it's not conditional on how the visitor arrived (popout click, direct
  link, bookmark, back button all count).
- The layout-switcher control is a single shared, layout-agnostic component
  (fixed position, identical placement) rendered on all four layout routes
  — not customized per layout's own header/nav idiom — kept separate from
  the existing `ThemeToggle` (theme stays an instant single-click toggle;
  layout selection opens a popout).
- Selecting an option in the popout performs a client-side route transition
  (no full reload); the cookie write for that in-session pick may also
  happen client-side as a fast path, but the server-side write on the
  destination route's loader remains authoritative.
- Layout routes not yet fully built render a minimal placeholder (shared
  switcher present, brief in-progress message, link to the Merged route).

## Consequences

- Avoids the flash-of-wrong-layout problem that dynamic client-side
  switching would introduce under SSR (mirrors the existing pre-hydration
  `.dark`-class pattern used for theme, generalized to a server-side
  redirect instead of an inline script, since a redirect can't be done
  safely from an inline script without a flash).
- Each Layout Direction is independently linkable/shareable/bookmarkable.
- Introduces a real (temporary) coupling: `/`'s default redirect target
  must change when the Book layout issue closes. This is called out
  explicitly wherever the default is implemented so it isn't missed.
