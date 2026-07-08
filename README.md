# Eric B. Friday — Portfolio (monorepo)

A calm, literary, engineering-credible personal site. pnpm workspace •
TanStack Start (Router + Query) • shadcn/ui • Tailwind v4 • Cloudflare Workers.

## Layout

```
apps/web              TanStack Start app (SSR → Cloudflare Workers)
packages/ui           Shared shadcn/ui primitives (Button, Card, Badge, cn)
packages/content      Typed portfolio dataset (projects, ledger, timeline, …)
packages/config       Shared tsconfig base + design tokens (tokens.css)
```

## Design

The merged "house style" from the design spec: A's book-cover hero + numbered
Contents, B's sticky nav + Selected-Work cards, C's count-up stats + filterable
Contribution-Map ledger (the fully wired example section, fed via a TanStack
Start server function + TanStack Query), and D's pull-quotes + closing Contact
statement. Type: Newsreader + IBM Plex Mono. Tokens live in
`packages/config/tokens.css`.

## Develop

```bash
pnpm install
pnpm dev                 # http://localhost:3000
pnpm typecheck
pnpm build               # vite build (client + SSR worker)
pnpm preview             # preview the built Worker locally
```

## Deploy to Cloudflare Workers

```bash
pnpm --filter @portfolio/web cf-typegen   # generate binding types (optional)
pnpm deploy                               # vite build && wrangler deploy
```

`apps/web/wrangler.jsonc` targets `@tanstack/react-start/server-entry` with
`nodejs_compat`. Add bindings (KV, R2, D1, Workers AI, service bindings,
Durable Objects) there, then re-run `cf-typegen`. The Contribution-Map server
function in `apps/web/src/lib/portfolio-data.ts` is the seam for swapping the
curated dataset for a live source later.

## Fill in next

Skills, Leadership, and Timeline ship as concise starter renders (data already
lives in `packages/content`). The design spec also outlines optional
Case-study detail pages, About, Testimonials, Writing, Now, Uses/Colophon,
and a CV link.
