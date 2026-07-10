import { useEffect, useMemo, useRef } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  contact,
  identity,
  leadership,
  projects,
  skills,
  stats,
  timeline,
} from "@portfolio/content";
import { contributionQueryOptions } from "@/lib/portfolio-data";
import { ScrollProgress } from "@/components/scroll-progress";
import { Section } from "@/components/section";
import { SiteHeader } from "@/components/site-header";
import { useCountUp } from "@/components/use-count-up";
import { useReveal } from "@/components/use-reveal";

export function MagazineLayout() {
  useReveal();

  return (
    <>
      <ScrollProgress />
      <SiteHeader activeLayout="magazine" />
      <main>
        <MagazineHero />
        <MagazineSelectedWork />
        <MagazineSkills />
        <MagazineLeadership />
        <MagazineContributionMap />
        <MagazineTimeline />
        <MagazineContact />
      </main>
    </>
  );
}

function MagazineHero() {
  const heroTags = identity.kicker.split(" · ").slice(1);

  return (
    <section
      id="top"
      className="border-y-2 border-[var(--ink)] bg-[var(--band)]"
    >
      <div className="mx-auto grid max-w-[var(--content-max)] gap-10 px-7 py-20 md:grid-cols-[1.7fr_0.9fr] md:items-end md:py-28">
        <div className="reveal is-visible">
          <p className="font-mono text-[11px] uppercase tracking-[2px] text-[var(--green)]">
            {identity.kicker}
          </p>
          <h1 className="mt-6 font-serif text-[clamp(64px,13vw,142px)] font-medium leading-[0.86] text-[var(--ink)]">
            {identity.name}
          </h1>
          <p className="mt-7 max-w-[760px] font-serif text-[clamp(22px,3vw,34px)] italic leading-tight text-[var(--ink-soft)]">
            {identity.role}
          </p>
        </div>
        <aside className="reveal border-t border-[var(--ink)] pt-5 md:border-l md:border-t-0 md:pl-7">
          <p className="font-serif text-[22px] leading-8 text-[var(--ink)]">
            {identity.intro}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {heroTags.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[var(--ink)] px-3 py-1 font-mono text-[10px] uppercase tracking-[1.5px]"
              >
                {item}
              </span>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

function MagazineSelectedWork() {
  const leadProject = projects[0];
  const sidebarProjects = projects
    .slice(1, 3)
    .filter((project): project is (typeof projects)[number] => Boolean(project));
  const remainingProjects = projects.slice(3);
  const timelineRail = timeline.slice(0, 5);

  if (!leadProject) {
    return null;
  }

  return (
    <Section
      id="work"
      no="01"
      title="Selected Work"
      intro="An editorial pass through the same portfolio evidence: security programs, identity platforms, healthcare workflows, and AI developer tooling."
    >
      <div className="grid gap-8 lg:grid-cols-[1.9fr_1fr_60px]">
        <article className="reveal border-y-2 border-[var(--ink)] py-7">
          <div className="font-mono text-[11px] uppercase tracking-[1.5px] text-[var(--green)]">
            Featured / {leadProject.meta}
          </div>
          <h3 className="mt-4 font-serif text-[clamp(36px,6vw,64px)] font-medium leading-[0.95]">
            {leadProject.title}
          </h3>
          <p className="mt-6 text-[20px] leading-8 text-[var(--ink-soft)]">
            {leadProject.body}
          </p>
          {leadProject.pull ? (
            <blockquote className="mt-8 max-w-[780px] border-l-4 border-[var(--green)] pl-5 font-serif text-[clamp(25px,4vw,38px)] italic leading-tight text-[var(--ink)]">
              {leadProject.pull}
            </blockquote>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-2">
            {leadProject.tags.map((tag) => (
              <span
                key={tag}
                className="border border-[var(--line)] px-3 py-1 font-mono text-[10.5px] uppercase tracking-[1px] text-[var(--ink-soft)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </article>

        <div className="grid gap-5">
          {sidebarProjects.map((project) => (
            <article
              key={project.no}
              className="reveal border-t border-[var(--line)] pt-5 first:border-t-0 first:pt-0"
            >
              <div className="font-mono text-[10.5px] uppercase tracking-[1.5px] text-[var(--muted)]">
                {project.no} / {project.meta}
              </div>
              <h3 className="mt-3 font-serif text-[28px] font-medium leading-tight">
                {project.title}
              </h3>
              <p className="mt-3 leading-7 text-[var(--ink-soft)]">
                {project.body}
              </p>
              {project.pull ? (
                <blockquote className="mt-4 font-serif text-[20px] italic leading-7 text-[var(--ink)]">
                  {project.pull}
                </blockquote>
              ) : null}
            </article>
          ))}
        </div>

        <ol className="reveal hidden border-l border-[var(--line)] pl-4 lg:block">
          {timelineRail.map((entry) => (
            <li key={`${entry.when}-${entry.title}`} className="mb-7 last:mb-0">
              <div className="font-mono text-[10px] uppercase tracking-[2px] text-[var(--green)] [writing-mode:vertical-rl]">
                {entry.when}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {remainingProjects.map((project) => (
          <article
            key={project.no}
            className="reveal border-t border-[var(--line)] pt-5"
          >
            <div className="font-mono text-[10.5px] uppercase tracking-[1.5px] text-[var(--muted)]">
              {project.no} / {project.meta}
            </div>
            <h3 className="mt-3 font-serif text-[24px] font-medium leading-tight">
              {project.title}
            </h3>
            <p className="mt-3 text-[15.5px] leading-7 text-[var(--ink-soft)]">
              {project.body}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function MagazineSkills() {
  const skillItems = skills.flatMap((group) =>
    group.items.map((item) => ({ group: group.label, item })),
  );

  return (
    <Section
      id="skills"
      no="02"
      title="Skills & Competencies"
      intro="A horizontal rail of the operating vocabulary behind the work."
      alt
    >
      <div className="reveal -mx-7 overflow-x-auto px-7 pb-2">
        <div className="flex min-w-max gap-3">
          {skillItems.map(({ group, item }) => (
            <span
              key={`${group}-${item}`}
              className="rounded-full border border-[var(--ink)] bg-[var(--paper)] px-4 py-2 font-mono text-[11px] uppercase tracking-[1px] text-[var(--ink)]"
              title={group}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}

function MagazineLeadership() {
  return (
    <Section
      id="leadership"
      no="03"
      title="Leadership & Review"
      intro="Review authority and technical judgment rendered as feature quotes."
    >
      <div className="grid gap-7 md:grid-cols-2">
        {leadership.map((item, index) => {
          const quote = item.quote ?? item.body;
          const supporting = item.quote ? item.body : null;
          return (
            <article
              key={item.title}
              className={`reveal border-t-2 border-[var(--ink)] pt-6 ${
                index === 0 ? "md:col-span-2" : ""
              }`}
            >
              <blockquote
                className={`font-serif italic leading-tight text-[var(--ink)] ${
                  index === 0
                    ? "text-[clamp(32px,5vw,54px)]"
                    : "text-[clamp(24px,3vw,34px)]"
                }`}
              >
                {quote}
              </blockquote>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[1.5px] text-[var(--green)]">
                {item.title}
              </p>
              {supporting ? (
                <p className="mt-3 max-w-[var(--measure)] leading-7 text-[var(--ink-soft)]">
                  {supporting}
                </p>
              ) : null}
            </article>
          );
        })}
      </div>
    </Section>
  );
}

function MagazineContributionMap() {
  const { data } = useSuspenseQuery(contributionQueryOptions);
  const max = useMemo(
    () => Math.max(...data.rows.map((row) => row.commits)),
    [data.rows],
  );
  const rows = data.rows;

  return (
    <Section
      id="map"
      no="04"
      title="Contribution Map"
      intro="A compact figure for authored commits across the shared dataset, kept subordinate to the editorial sections."
      alt
    >
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.6fr] lg:items-start">
        <div className="reveal grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <MagazineStat key={stat.label} {...stat} />
          ))}
        </div>
        <figure className="reveal border-y-2 border-[var(--ink)] py-5">
          <figcaption className="mb-5 font-mono text-[11px] uppercase tracking-[1.5px] text-[var(--muted)]">
            Commit footprints
          </figcaption>
          <div className="space-y-4">
            {rows.map((row) => (
              <div
                key={row.name}
                className="grid gap-3 md:grid-cols-[1.2fr_2fr_68px] md:items-baseline"
              >
                <div>
                  <div className="font-serif text-[17px] leading-tight">
                    {row.name}
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[1.2px] text-[var(--muted)]">
                    {row.domain} / {row.latest}
                  </div>
                </div>
                <div className="h-1.5 bg-[var(--line)]">
                  <div
                    className="h-full bg-[var(--green)]"
                    style={{ width: `${(row.commits / max) * 100}%` }}
                  />
                </div>
                <div className="font-mono text-[11px] text-[var(--ink-soft)] md:text-right">
                  {row.commits}
                </div>
              </div>
            ))}
          </div>
        </figure>
      </div>
    </Section>
  );
}

function MagazineTimeline() {
  return (
    <Section
      id="timeline"
      no="05"
      title="Timeline"
      intro="Recent milestones woven as a dated editorial rail."
    >
      <div className="grid gap-8 lg:grid-cols-[60px_1fr]">
        <ol className="reveal hidden border-l border-[var(--line)] pl-4 lg:block">
          {timeline.map((entry) => (
            <li key={`${entry.when}-${entry.title}`} className="mb-8 last:mb-0">
              <div className="font-mono text-[10px] uppercase tracking-[2px] text-[var(--green)] [writing-mode:vertical-rl]">
                {entry.when}
              </div>
            </li>
          ))}
        </ol>
        <ol className="grid gap-x-7 gap-y-8 md:grid-cols-2">
          {timeline.map((entry, index) => (
            <li
              key={`${entry.when}-${entry.title}`}
              className={`reveal border-t-2 border-[var(--ink)] pt-5 ${
                index === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div className="font-mono text-[11px] uppercase tracking-[1.5px] text-[var(--green)]">
                {entry.when}
              </div>
              <h3
                className={`mt-3 font-serif font-medium leading-tight ${
                  index === 0
                    ? "text-[clamp(30px,5vw,52px)]"
                    : "text-[25px]"
                }`}
              >
                {entry.title}
              </h3>
              <p className="mt-3 max-w-[var(--measure)] text-[16px] leading-7 text-[var(--ink-soft)]">
                {entry.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

function MagazineContact() {
  const emailRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const address = contact.emailParts.join("");
    if (emailRef.current) {
      emailRef.current.setAttribute("href", `mailto:${address}`);
      emailRef.current.textContent = address;
    }
  }, []);

  return (
    <Section id="contact" no="06" title="Contact" alt>
      <div className="reveal border-y-2 border-[var(--ink)] py-8">
        <p className="max-w-[900px] font-serif text-[clamp(38px,8vw,82px)] leading-[0.95] text-[var(--ink)]">
          {contact.headline}
        </p>
        <p className="mt-5 max-w-[var(--measure)] text-[18px] leading-8 text-[var(--ink-soft)]">
          {contact.blurb}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            ref={emailRef}
            href="#"
            className="rounded-full border border-[var(--ink)] px-5 py-2.5 font-mono text-[12px] uppercase tracking-[1px] transition-colors hover:border-[var(--green)] hover:text-[var(--green)]"
          >
            email me
          </a>
          {contact.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[var(--ink)] px-5 py-2.5 font-mono text-[12px] uppercase tracking-[1px] transition-colors hover:border-[var(--green)] hover:text-[var(--green)]"
            >
              {link.label} / {link.value}
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}

function MagazineStat({
  value,
  suffix,
  label,
  accent,
}: {
  value: number;
  suffix?: string;
  label: string;
  accent: "green" | "blue";
}) {
  const { ref, value: shown } = useCountUp(value);
  const color = accent === "green" ? "var(--green)" : "var(--blue)";

  return (
    <div className="border-t-2 pt-3" style={{ borderColor: color }}>
      <div className="font-serif text-[clamp(32px,5vw,52px)] leading-none">
        <span ref={ref} style={{ color }}>
          {shown}
        </span>
        {suffix ? <span style={{ color }}>{suffix}</span> : null}
      </div>
      <div className="mt-2 font-mono text-[10px] uppercase tracking-[1.2px] text-[var(--muted)]">
        {label}
      </div>
    </div>
  );
}
