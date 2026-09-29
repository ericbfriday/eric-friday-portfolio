# Portfolio Content — Eric B. Friday

Copy you can drop into a personal site, LinkedIn, or a case-study deck. Everything here is grounded in your verified contribution data; nothing personal or speculative is included. Pick the bio length that fits each surface.

---

## Positioning & Taglines

Choose one as the site hero. All three are honest to the work:

1. **"Security-minded frontend engineering for high-stakes healthcare systems."**
2. **"I own the auth, ship the UI, and build the tools the rest of the team's AI agents depend on."**
3. **"Architecting identity, platform, and AI tooling across enterprise healthcare."**

Supporting line for under the tagline:
> Senior engineer at NMDP working where frontend, application security, and AI tooling meet — owning the login layer for mission-critical donor-matching systems and building the developer-productivity infrastructure around them.

---

## Bio

**One-liner**
Senior software engineer specializing in frontend platform, application security, and AI developer tooling for enterprise healthcare.

**Short (LinkedIn / site about)**
I'm a senior software engineer at NMDP (National Marrow Donor Program), where I work across most of the organization's product lines — donor matching, biotherapies, forms automation, and clinical reporting. My center of gravity is identity and application security: I owned NMDP's shared Okta/OIDC login platform through its retirement and lead auth-hardening work on SMART-on-FHIR healthcare apps. Alongside that, I've built a self-directed AI developer-productivity program — production Model Context Protocol servers, an API-discovery pipeline, and agent ecosystems — that's materially ahead of where most enterprises are. I tend to be the person teams route security and architecture decisions through.

**Long (portfolio landing)**
I build and secure the systems that healthcare runs on. At NMDP — the organization behind the world's largest marrow-donor registry — my work spans Biotherapies, MatchSync, MatchSource, CIBMTR clinical reporting, and the Gene/HLA domain. Three things define how I work:

I **own identity and application security.** I owned NMDP's Secure Enterprise Login library — the shared Okta-based SSO and token-management layer used across our single-page apps — through its deprecation and retirement, and I lead auth-hardening campaigns on SMART-on-FHIR clinical apps, where token storage, PKCE, session lifetime, and CSP aren't checkboxes but the difference between a transplant center being able to use the software or not.

I **build the platform and the tools around it.** That means production Angular and Next.js apps, but also an organization-wide npm supply-chain security program that audits 58+ repositories on schedule, and a growing layer of AI developer tooling — including a Model Context Protocol server published to our internal registry that exposes 89 tools to any AI agent on the team.

I **lead through the work.** I'm the designated security reviewer across several teams, an architecture advisor on modernization and micro-frontend decisions, and the person colleagues @mention when a pattern decision needs to be made — and I route junior engineers through review deliberately, as a way to transfer what I know.

---

## Case Studies

### 1. Owning Identity for Mission-Critical Healthcare Apps

**The problem.** NMDP runs dozens of single-page apps across donor matching, biotherapies, and clinical reporting. Each one needs SSO, session management, and token handling — and in a healthcare context, getting auth wrong isn't a UX bug, it's a compliance and safety problem.

**What I did.** I owned **Secure Enterprise Login (SEL)**, the shared Okta/OIDC library that standardized authentication across NMDP's SPAs. I rewrote the core wrapper in TypeScript with modern bundling and Nx integration, carried the library through Angular 18 → 19 migrations, and authored the canonical internal guidance that other teams treated as "how to do auth at NMDP." In 2026 I carried out the deprecation analysis; SEL is now fully retired and every application in the organization has been migrated off it.

On the **CIBMTR Reporting App** — a SMART-on-FHIR app that reads and writes patient data against an EHR — I ran a phased hardening campaign: moving tokens out of `localStorage` into namespaced `sessionStorage`, adding **PKCE** to the SMART authorization flow, enforcing idle-timeout and absolute session-lifetime caps, validating token issuers before metadata discovery, replacing loose origin checks with a strict allowlist, and adding cross-tab session synchronization — all under comprehensive auth test coverage.

**Why it matters.** Identity is the one layer every other team depends on and the one with the least margin for error. Owning it end-to-end — library, migrations, hardening, and documentation — is the kind of dual depth (security *and* production frontend) that's genuinely hard to hire for.

In September 2026 I extended the same review discipline to **MatchSource**, running an OAuth 2.0 / PKCE security review and producing release-readiness summaries for engineering.

*Stack: TypeScript · Angular · Okta · OIDC · PKCE · SMART-on-FHIR · Nx*

---

### 2. The SSR Migration: From Research to Working Proof

**The problem.** Transplant centers were hitting CORS, CSP, and iframe failures with browser-side FHIR calls in the clinical reporting app — friction that made onboarding new centers harder and kept sensitive tokens in the browser.

**What I did.** I led an SSR-viability engagement from thesis to proof. I authored an **SBAR recommendation** and a full enterprise-architecture review, evaluated **7 SSR frameworks**, and built **three working, Dockerized POCs** (Next.js + iron-session; Hono + React Router 7; Next.js + Better Auth + Okta). The substantive engineering was in the **shared libraries** I extracted from the existing Angular code into framework-agnostic TypeScript: AES-256-GCM server-side sessions, FHIR R4 Zod schemas and HTTP clients, React ports, and a Playwright e2e suite covering SMART launch, CSP/iframe, dual-auth, and session security. I then re-implemented the app in Next.js via an AI-assisted (Kiro) workflow to prove the recommendation was deliverable — not just a slide.

**Why it matters.** This is the full arc: deep technical research, an executive-readable recommendation, a multi-team migration thesis, *and* the working code to back it. Moving FHIR calls server-side locks CSP to `'self'`, keeps tokens off the browser, and simplifies center onboarding.

*Stack: Next.js · Hono · React Router 7 · Better Auth · Zod · Redis · Docker · K8s/Helm · Playwright*

---

### 3. Building the AI Layer the Team Depends On

**The problem.** AI coding agents are only as useful as their access to internal systems. Most enterprise teams in 2026 are still at "we use Copilot." NMDP's tools — Jira, internal APIs — weren't reachable by agents.

**What I did.** I designed and **published `@nmdp/jira-mcp` to our internal Nexus registry** — a production Model Context Protocol server bundling **89 tools across 5 domain servers** (issue CRUD, search, agile boards and sprints, dev workflows, and session context), so any MCP-aware agent (Claude, Kiro, Cursor) can query and operate Jira. It's built with real discipline: TypeScript, ESM-only, Zod validation, pnpm-enforced, secret-detection CI. I also built an **API-discovery pipeline** as 5 cooperating MCP servers that run capture → spec inference → validation → mock generation → docs through a supervisor state machine, and a Bedrock-based PoC that extracts HLA typing data from medical documents with multi-model comparison and a human-validation workflow.

**Why it matters.** This isn't "used an AI tool" — it's building the infrastructure other developers' AI agents run on. It's a self-directed program that's ahead of the enterprise curve, and it connects directly to the domain (HLA extraction) and to real security discipline.

*Stack: TypeScript · Bun · Effect · MCP · AWS Bedrock · Zod · WireMock · Schemathesis*

---

### 4. An Org-Wide Supply-Chain Security Program

**The problem.** With dozens of frontend repos and a wave of npm supply-chain attacks (worms, backdoored packages), "is our dependency hygiene actually safe?" had no systematic answer.

**What I did.** I built the answer as a complete program, not just a script: standards research (threat-landscape analysis, dependency-bloat deep-dives with citations), an operational **package-manager-aware compliance auditor** that runs adaptive PASS/WARN/FAIL checks (lockfile health, registry config, deterministic install, version pinning) across **58+ repositories on scheduled CI with email notifications**, formal ADRs linking each check back to the research, and AI agents to automate remediation.

**Why it matters.** This is staff-level scope of impact — organization-wide standards, enforcement, and automation — executed as an individual contributor.

*Stack: Node · GitLab CI · ADRs · OpenAgent automation*

---

### 5. Architecture Advisory: Modernize Deliberately

**The problem.** Teams facing aging applications and a growing app portfolio ask the same questions: rewrite or migrate? Is a micro-frontend architecture worth it? What do our partners' FHIR and Epic integrations require of us?

**What I did.** In April 2026 I reviewed a legacy application and advised on rewrite-vs-migrate, TypeScript modernization, security vulnerabilities, testing strategy, and Kubernetes / GitLab CI/CD adoption. In July I evaluated micro-frontend maturity across the NMDP portfolio (Module Federation 2.0, Angular Native Federation, single-spa, Nx, AWS deployment) and recommended a staged path: enforce Nx module boundaries first, modularize backends in parallel, and pilot a vertical-split MFE only when real multi-team autonomy needs arise. Through July and August I consolidated partner-team questions on SMART-on-FHIR and Epic integration — including SSR implications — into review-ready architecture responses.

**Why it matters.** The advice is deliberately unglamorous: the cheapest architecture that meets the need, with a clear trigger for when to spend more. It's the same evidence-first habit as the SSR engagement, applied as an advisor rather than an implementer.

I also ran an audit-style **AI governance and policy review** in August 2026: a timeline of AI policy changes, a review of governance materials across Microsoft 365, and synthesized findings on controls, policy alignment, and training posture.

*Stack: Nx · Module Federation 2.0 · Angular · FHIR / SMART · Kubernetes · GitLab CI/CD · Microsoft 365*

---

## Skills & Stack (site section)

- **Frontend:** Angular (AngularJS → 19), React, Next.js, TypeScript, Nx monorepos, micro-frontend architecture
- **Identity & Security:** Okta, OIDC, OAuth2, PKCE, SMART-on-FHIR, CSP, Better Auth, token/session hardening
- **AI / LLM:** Model Context Protocol (MCP) servers, AWS Bedrock, Claude / Kiro agents, semantic search
- **Backend & Data:** Node.js, tRPC, Prisma, Zod, Effect
- **Cloud & DevOps:** Docker, Kubernetes / Helm, GitLab CI, AWS (Bedrock, S3, EKS)
- **Testing:** Playwright, Vitest, contract / property-based testing
- **Domain:** Healthcare, FHIR R4, Epic integration, HLA / immunogenetics, HIPAA-aligned architecture

---

## Suggested Site Map

| Section | Content |
|---|---|
| **Hero** | Tagline + one supporting line + CTA to case studies |
| **About** | Long bio above |
| **Work / Case Studies** | The 5 case studies, each as its own page or card |
| **Stack** | Skills section above, optionally as an interactive grid |
| **Writing** *(optional)* | Repurpose your internal auth guidance or supply-chain research as public posts |
| **Contact** | Email / LinkedIn / GitHub |

---

## How to Strengthen This Further

A few honest notes on the underlying data, so the portfolio holds up under scrutiny:

1. **Add quantified outcomes.** The data is strong on scope and weak on numbers. The most credible additions: how many apps/teams were migrated off SEL, adoption of `@nmdp/jira-mcp`, audit findings closed on the CRA hardening, repos protected (58+ is already a good one — keep it).
2. **The metrics in your scraped docs are proxies.** Commit counts and "owns" labels came from a git/filesystem analysis that itself flags caveats (AI-assisted commits included, some projects local-only). I've translated them into qualitative claims ("most prolific contributor," "own SEL") rather than citing raw counts — sanity-check that those framings feel fair to you before publishing.
3. **Several of your best AI projects are local-only.** The jira-mcp work is published; the API-discovery pipeline, HLA PoC, and document-intelligence platform aren't. Writing them up as case studies (as done above) is the cleanest way to make invisible work visible without exposing internal code.
4. **Personal material was excluded by design.** The oldest planning doc suggested an "About: The Human" section featuring your home renovation, EVE Online, etc. For a public professional site I'd keep family, financial, and home details out entirely. If you want a touch of personality, a single tasteful line ("Outside work: [hobby]") is plenty — happy to draft one.
5. **The leadership evidence supports a staff/lead narrative.** You hold a "Senior" title, but the reviewer/pattern-decider/mentor evidence reads as de-facto tech lead. I've positioned it that way without claiming a title you don't have — useful framing for a promotion case or a staff-track job search.
