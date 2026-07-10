import { useEffect, useRef } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  contact,
  identity,
  leadership,
  projects,
  skills,
  timeline,
} from "@portfolio/content";
import { contributionQueryOptions } from "@/lib/portfolio-data";
import { ContentsList } from "@/components/contents-list";
import { ScrollProgress } from "@/components/scroll-progress";
import { Section } from "@/components/section";
import { SiteHeader } from "@/components/site-header";
import { useReveal } from "@/components/use-reveal";

export function BookLayout() {
  useReveal();

  return (
    <>
      <ScrollProgress />
      <SiteHeader activeLayout="book" />
      <main>
        <BookHero />
        <BookSelectedWork />
        <BookSkills />
        <BookLeadership />
        <BookContributionMap />
        <BookTimeline />
        <BookContact />
      </main>
    </>
  );
}

function BookHero() {
  return (
    <section id="top" className="border-b border-[var(--line)] bg-[var(--paper)]">
      <div className="mx-auto max-w-[var(--content-max)] px-7 py-24 md:py-32">
        <div className="reveal is-visible mx-auto max-w-[760px] text-center">
          <h1 className="font-serif text-[clamp(52px,10vw,104px)] font-medium leading-[0.98] tracking-[-0.01em]">
            {identity.name}
          </h1>
          <p className="mx-auto mt-7 max-w-[620px] font-serif text-[clamp(18px,2.4vw,24px)] italic text-[var(--ink-soft)]">
            {identity.role}
          </p>
          <div className="mx-auto mt-8 h-px w-16 bg-[var(--green)]" />
        </div>
        <ContentsList />
      </div>
    </section>
  );
}

function BookSelectedWork() {
  return (
    <Section
      id="work"
      no="01"
      title="Selected Work"
      intro="Engagements that map the threads of my work: securing identity and the supply chain, delivering frontend platforms at scale, and building the AI/MCP tooling other developers' agents depend on."
    >
      <div className="mx-auto max-w-[760px]">
        {projects.map((project, index) => (
          <article
            key={project.no}
            className="reveal grid gap-5 border-t border-[var(--line)] py-10 first:border-t-0 first:pt-0 md:grid-cols-[96px_1fr]"
          >
            <div className="font-serif text-[clamp(48px,8vw,56px)] leading-none text-[var(--green)]">
              {project.no}
            </div>
            <div>
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[1.5px] text-[var(--muted)]">
                Chapter {index + 1} · {project.meta}
              </div>
              <h3 className="font-serif text-[clamp(26px,4vw,36px)] font-medium leading-tight">
                {project.title}
              </h3>
              <p className="mt-4 text-[18px] leading-8 text-[var(--ink-soft)]">
                {project.body}
              </p>
              {project.pull ? (
                <blockquote className="mt-6 border-l-2 border-[var(--green)] pl-5 font-serif text-[20px] italic leading-8 text-[var(--ink)]">
                  {project.pull}
                </blockquote>
              ) : null}
              <p className="mt-5 font-mono text-[12px] leading-6 text-[var(--muted)]">
                {project.tags.join(" / ")}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function BookSkills() {
  return (
    <Section
      id="skills"
      no="02"
      title="Skills & Competencies"
      intro="Disciplines that meet at the browser: frontend platforms, identity and supply-chain security, healthcare workflows, and AI developer tooling."
    >
      <div className="reveal mx-auto max-w-[var(--measure)] space-y-6 font-serif text-[20px] leading-8 text-[var(--ink-soft)]">
        {skills.map((group) => (
          <p key={group.label}>
            <span className="text-[var(--ink)]">{group.label}</span>{" "}
            is practiced through{" "}
            {group.items.map((item, index) => (
              <InlineTerm key={item} trailing={index < group.items.length - 1}>
                {item}
              </InlineTerm>
            ))}
            .
          </p>
        ))}
      </div>
    </Section>
  );
}

function BookLeadership() {
  return (
    <Section
      id="leadership"
      no="03"
      title="Leadership & Review"
      intro="The work is not only implementation. It is also the judgment other teams route through security reviews, architectural notes, and code review."
    >
      <div className="mx-auto max-w-[var(--measure)] space-y-8">
        {leadership.map((item) => (
          <article key={item.title} className="reveal">
            <h3 className="font-serif text-[24px] font-medium">{item.title}</h3>
            {item.quote ? (
              <blockquote className="mt-3 border-l-2 border-[var(--green)] pl-5 font-serif text-[21px] italic leading-8">
                "{item.quote}"
              </blockquote>
            ) : null}
            <p className="mt-4 text-[18px] leading-8 text-[var(--ink-soft)]">
              {item.body}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function BookContributionMap() {
  const { data } = useSuspenseQuery(contributionQueryOptions);
  const max = Math.max(...data.rows.map((row) => row.commits));

  return (
    <Section
      id="map"
      no="04"
      title="Contribution Map"
      intro="A compact ledger of authored commits across the shared dataset, kept subordinate to the narrative."
      alt
    >
      <figure className="reveal mx-auto max-w-[760px]">
        <div className="space-y-4">
          {data.rows.map((row) => (
            <div
              key={row.name}
              className="grid items-baseline gap-3 md:grid-cols-[1.35fr_2fr_76px]"
            >
              <div className="font-serif text-[17px] leading-snug">
                {row.name}
                <span className="ml-2 font-mono text-[10.5px] uppercase tracking-[1px] text-[var(--muted)]">
                  {row.domain}
                </span>
              </div>
              <div className="h-px bg-[var(--line)]">
                <div
                  className="h-px bg-[var(--green)]"
                  style={{ width: `${(row.commits / max) * 100}%` }}
                />
              </div>
              <div className="font-mono text-[11px] text-[var(--muted)] md:text-right">
                {row.commits} · {row.latest}
              </div>
            </div>
          ))}
        </div>
      </figure>
    </Section>
  );
}

function BookTimeline() {
  return (
    <Section
      id="timeline"
      no="05"
      title="Timeline"
      intro="Recent milestones, newest first."
    >
      <ol className="mx-auto max-w-[var(--measure)] space-y-7">
        {timeline.map((entry) => (
          <li
            key={`${entry.when}-${entry.title}`}
            className="reveal border-t border-[var(--line)] pt-5 first:border-t-0 first:pt-0"
          >
            <div className="font-mono text-[11px] uppercase tracking-[1.5px] text-[var(--green)]">
              {entry.when}
            </div>
            <h3 className="mt-2 font-serif text-[22px] font-medium">
              {entry.title}
            </h3>
            <p className="mt-2 text-[17px] leading-7 text-[var(--ink-soft)]">
              {entry.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function BookContact() {
  const emailRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const address = contact.emailParts.join("");
    if (emailRef.current) {
      emailRef.current.setAttribute("href", `mailto:${address}`);
      emailRef.current.textContent = address;
    }
  }, []);

  return (
    <Section id="contact" no="06" title={contact.headline} alt>
      <div className="reveal mx-auto max-w-[var(--measure)] font-serif text-[20px] leading-8 text-[var(--ink-soft)]">
        <p>{contact.blurb}</p>
        <p className="mt-8">
          Write to{" "}
          <a
            ref={emailRef}
            href="#"
            className="underline decoration-[var(--green)] underline-offset-4 transition-colors hover:text-[var(--green)]"
          >
            email me
          </a>
          {contact.links.map((link) => (
            <span key={link.label}>
              {", "}
              visit{" "}
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-[var(--green)] underline-offset-4 transition-colors hover:text-[var(--green)]"
              >
                {link.label}
              </a>
            </span>
          ))}
          .
        </p>
        <p className="mt-12 border-t border-[var(--line)] pt-6 italic text-[var(--ink)]">
          Eric B. Friday
        </p>
        <p className="mt-8 font-mono text-[11px] uppercase tracking-[1.5px] text-[var(--muted)]">
          Colophon · Set in ET Book, Newsreader &amp; IBM Plex Mono · 2026
        </p>
      </div>
    </Section>
  );
}

function InlineTerm({
  children,
  trailing,
}: {
  children: string;
  trailing: boolean;
}) {
  return (
    <>
      <code className="font-mono text-[0.72em] text-[var(--ink)]">
        {children}
      </code>
      {trailing ? ", " : ""}
    </>
  );
}
