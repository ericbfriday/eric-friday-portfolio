# Eric B. Friday
**Senior Software Engineer — Frontend Platform · Application Security · AI Tooling**

[City, State]  ·  [email]  ·  [phone]  ·  [linkedin.com/in/...]  ·  [github.com/ericbfriday]  ·  [portfolio URL]

> *Placeholders above are the only standard fields missing from your scraped data — fill in contact details, then see the "What to add" notes at the bottom for the few numbers that would make this materially stronger.*

---

## Summary

Senior frontend and application-security engineer with sustained, cross-portfolio impact on enterprise healthcare systems at NMDP (National Marrow Donor Program / Be The Match) and CIBMTR. Owned NMDP's shared identity library through its retirement and leads authentication hardening (Okta/OIDC/SMART-on-FHIR), ships production Angular and Next.js at scale, and has built a self-directed AI developer-productivity program — including production Model Context Protocol (MCP) servers and agent ecosystems. Operates as a de-facto technical lead: the designated security/CSP reviewer, the pattern-decider colleagues route decisions through, and an architecture advisor on modernization, micro-frontend, and FHIR/Epic integration decisions.

---

## Core Competencies

**Languages & Frameworks:** TypeScript, JavaScript, Angular (AngularJS → 19), React, Next.js, Node.js, HTML/CSS
**Architecture & Tooling:** Nx monorepos, tRPC, Prisma, Zod, micro-frontends (Module Federation 2.0, Angular Native Federation, single-spa), design systems
**Identity & Security:** Okta, OIDC, OAuth2, PKCE, SMART-on-FHIR auth, CSP, session/token hardening, Better Auth, npm supply-chain security
**AI / LLM Engineering:** Model Context Protocol (MCP) server design, AWS Bedrock, Claude / Kiro agent ecosystems, semantic search
**Cloud & DevOps:** Docker, Kubernetes / Helm, GitLab CI, Azure DevOps, AWS (Bedrock, S3, EKS)
**Testing:** Playwright, Vitest, contract & property-based testing (Schemathesis, fast-check)
**Domain:** HealthTech, FHIR R4, SMART-on-FHIR, Epic integration patterns, HLA / immunogenetics, HIPAA-aligned patterns

---

## Experience

### NMDP (National Marrow Donor Program / Be The Match) — Senior Software Engineer
*[Month Year] – Present · [Location / Remote]*

Contributor and maintainer across most of NMDP's product lines — Biotherapies, MatchSync, MatchSource, CIBMTR, and Gene/HLA — with four areas of concentrated ownership:

**Identity & Application Security**
- Owned NMDP's **Secure Enterprise Login (SEL)** — the shared Okta-based SSO, session, and token-management library used across the organization's single-page apps. Rewrote the core wrapper in TypeScript with `tsup` bundling and Nx integration, and led Angular 18 → 19 migrations across the library set. Carried out the **deprecation analysis** (2026); SEL is now fully retired and all applications in the organization have been migrated.
- Authored the canonical OIDC/auth guidance — the internal reference for "how to do authentication at NMDP."
- Led a phased **auth-hardening campaign on the CIBMTR Reporting App** (SMART-on-FHIR): moved OIDC and EHR tokens out of `localStorage` into namespaced `sessionStorage`, added **PKCE** to the SMART authorization flow, enforced idle-timeout and absolute session-lifetime caps, added issuer validation and an API-origin allowlist (replacing loose substring checks), and implemented cross-tab session sync — backed by comprehensive auth test coverage, a written auth security review, and a phased implementation plan.
- Performed an **OAuth 2.0 / PKCE security review of MatchSource** (Sep 2026): analyzed the implementation and token-storage approach and produced release-readiness summaries for engineering.
- Built and own an organization-wide **npm supply-chain security program**: a package-manager-aware compliance auditor (npm / yarn / pnpm) running adaptive PASS/WARN/FAIL checks across **58+ repositories** on scheduled CI, plus standards research and formal ADRs linking each check to its rationale. Continued registry-governance and GitLab automation work with DevOps and platform stakeholders through June 2026.

**Frontend Platform Engineering**
- Most prolific contributor to the **Biotherapies "Unite"** Angular application (cell-collection / donor-order workflow): delivered order-cart logic, day-of-collection task handling, ISBT-128 field support, and cancellation flows; drove AngularJS → Angular modernization.
- **International Forms Automation** (Next.js / Nx): led the Next.js 14 → 15 upgrade, built OIDC relying-party and auth-config libraries, added CSP reporting and security-header fixes, and remediated SonarQube findings.
- **Property Management Tool** (Next.js 15 / React 19 / Nx): integrated **Better Auth** with role-based tRPC procedures, session-termination detection, and admin impersonation controls.
- Targeted feature work on the large, long-lived **MatchSource** Angular monorepo.

**AI / Developer-Productivity Engineering**
- Designed and **published `@nmdp/jira-mcp` to the internal Nexus registry** — a production Model Context Protocol server bundling **89 tools across 5 domain servers** (issue CRUD, search, agile boards/sprints, dev workflows, session context), making Jira queryable and operable by any MCP-aware AI agent (Claude, Kiro, Cursor). TypeScript, ESM-only, Zod-validated, with secret-detection CI.
- Built an end-to-end **API-discovery pipeline** as 5 cooperating MCP servers (capture → infer → validate → mock → document) driven by a supervisor state machine with a validation/refinement feedback loop.
- Prototyped **HLA typing-data extraction from medical documents on AWS Bedrock**, with multi-model comparison, confidence scoring, and a human-validation workflow.
- Re-implemented the CIBMTR Reporting App in Next.js via an AI-assisted (Kiro) workflow as proof that the SSR migration thesis was deliverable, not just proposed.

**Architecture, Migration & Technical Leadership**
- Led an **SSR-viability engagement**: authored an SBAR recommendation and enterprise-architecture review, evaluated 7 SSR frameworks, and delivered three working Dockerized POCs plus framework-agnostic shared libraries (AES-256-GCM server-side sessions, FHIR R4 Zod schemas, React ports, a Playwright e2e suite) — moving FHIR calls server-side to eliminate CORS/CSP/iframe failures at transplant centers and keep tokens off the browser.
- **AI governance & policy review** (Aug 2026): audit-style review of organizational AI usage — built a timeline of AI policy changes, examined governance materials across Microsoft 365, and synthesized findings on controls, policy alignment, and training posture.
- **Legacy-application modernization advisory** (Apr 2026): architecture review covering rewrite-vs-migrate, TypeScript modernization, security vulnerabilities, testing strategy, and Kubernetes / GitLab CI/CD adoption.
- **Micro-frontend maturity evaluation** (Jul 2026): assessed Module Federation 2.0, Angular Native Federation, single-spa, and Nx on AWS; recommended a staged path — enforce Nx module boundaries first, modularize backends in parallel, and pilot a vertical-split MFE only once multi-team autonomy needs it.
- **FHIR / Epic architecture responses** (Jul–Aug 2026): consolidated partner-team questions on SMART-on-FHIR and Epic integration, including SSR implications, into review-ready response documents.
- **Designated security / CSP reviewer** across teams and the **pattern-decider** colleagues @mention for architectural and React-pattern decisions (e.g., a `readonly` + `asObservable` service pattern adopted across services on guidance).
- **Mentor-through-review:** deliberately routes junior engineers through code review as a knowledge-transfer mechanism.
- Member, **Architecture Review Board** — Front End Tools & Technologies working group.

---

## Selected Projects

- **`@nmdp/jira-mcp`** — Production MCP server (89 tools, 5 domain servers) published to the internal Nexus registry. *TypeScript · ESM · Zod · pnpm*
- **API Discovery Pipeline** — 5-server MCP system automating capture → spec inference → validation → mock generation → docs. *Bun · Effect · Schemathesis · WireMock*
- **SEL — Secure Enterprise Login** — Org-wide Okta/OIDC identity library for NMDP SPAs; deprecation analysis completed and library retired with all apps migrated (2026). *TypeScript · Angular · OIDC · PKCE*
- **Frontend Security Audit** — Scheduled-CI compliance auditor across 58+ repositories. *Node · CI · ADRs*
- **CRA SSR Engagement** — Architecture recommendation + 3 framework POCs + shared FHIR/session libraries. *Next.js · Hono · React Router 7 · Better Auth*
- **Architecture Advisory (Apr–Sep 2026)** — Modernization review, staged micro-frontend recommendation, FHIR/Epic partner responses, MatchSource OAuth/PKCE review. *Nx · Module Federation · FHIR · OAuth*

---

## Education & Certifications

- [Degree, Institution, Year] — *placeholder*
- [Relevant certifications, if any] — *placeholder*

---

### What to add to make this stronger (delete this section before sending)

The scraped data is rich on *scope* but thin on *quantified outcomes*. A few real numbers will sharpen the strongest bullets. Consider adding, where you can state them honestly:
- How many apps / teams migrated off the SEL auth library during its retirement.
- Adoption of `@nmdp/jira-mcp` (engineers or agents using it) and any time saved.
- Before/after on the CRA auth hardening (vulnerabilities closed, audit findings resolved).
- Years of experience and any roles prior to NMDP.
- Education, certifications, and exact employment dates.
