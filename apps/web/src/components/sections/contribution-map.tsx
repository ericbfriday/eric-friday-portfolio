import { useMemo, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Badge } from "@portfolio/ui/components/badge";
import { contributionQueryOptions } from "@/lib/portfolio-data";
import { Section } from "../section";
import { useCountUp } from "../use-count-up";

function Stat({
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
      <div className="font-serif text-[clamp(30px,5vw,44px)] font-medium leading-none">
        <span ref={ref} style={{ color }}>
          {shown}
        </span>
        {suffix ? <span style={{ color }}>{suffix}</span> : null}
      </div>
      <div className="mt-2 font-mono text-[11px] uppercase tracking-[1.5px] text-[var(--muted)]">
        {label}
      </div>
    </div>
  );
}

export function ContributionMap() {
  const { data } = useSuspenseQuery(contributionQueryOptions);
  const [filter, setFilter] = useState<string>("All");

  const rows = useMemo(
    () =>
      filter === "All"
        ? data.rows
        : data.rows.filter((r) => r.domain === filter),
    [data.rows, filter],
  );
  const max = useMemo(
    () => Math.max(...data.rows.map((r) => r.commits)),
    [data.rows],
  );

  return (
    <Section
      id="map"
      no="04"
      title="Contribution Map"
      intro="Authored commits across NMDP's product lines — a proxy for sustained effort, deduped by upstream. Filter by domain. (The AI/MCP work is local R&D — authorship-of-record rather than a commit count — so it sits outside this ledger.)"
      alt
    >
      {/* Count-up stats (direction C) */}
      <div className="reveal mb-12 grid grid-cols-2 gap-6 md:grid-cols-4">
        {data.stats.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </div>

      {/* Pill filter bar */}
      <div className="reveal mb-6 flex flex-wrap gap-2">
        {data.filters.map((f) => {
          const isActive = filter === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-1.5 font-mono text-[11px] leading-none uppercase tracking-[1px] transition-colors ${
                isActive
                  ? "border-[var(--green)] bg-[var(--green-soft)] text-[var(--green)]"
                  : "border-[var(--line)] text-[var(--ink-soft)] hover:border-[var(--green)]"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Typographic ledger */}
      <div className="reveal overflow-hidden rounded-[var(--radius)] border border-[var(--line)]">
        <div
          className="grid items-center gap-4 border-b border-[var(--ink)] px-5 py-2.5 font-mono text-[10.5px] uppercase tracking-[1.5px] text-[var(--muted)]"
          style={{ gridTemplateColumns: "1.7fr 0.85fr 2fr 0.62fr" }}
        >
          <span>Project</span>
          <span>Domain</span>
          <span>Commits</span>
          <span className="text-right">Latest</span>
        </div>
        {rows.map((r) => (
          <div
            key={r.name}
            className="grid items-center gap-4 border-b border-[var(--line)] px-5 py-3 transition-colors last:border-b-0 hover:bg-[var(--paper)]"
            style={{ gridTemplateColumns: "1.7fr 0.85fr 2fr 0.62fr" }}
          >
            <span className="font-serif text-[15px]">{r.name}</span>
            <Badge variant={r.domain === "AppSec" ? "green" : "blue"}>
              {r.domain}
            </Badge>
            <div className="flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--line)]">
                <div
                  className="h-full rounded-full bg-[var(--green)] transition-[width] duration-700 ease-out"
                  style={{ width: `${(r.commits / max) * 100}%` }}
                />
              </div>
              <span className="w-8 text-right font-mono text-[12px] text-[var(--ink-soft)]">
                {r.commits}
              </span>
            </div>
            <span className="text-right font-mono text-[12px] text-[var(--muted)]">
              {r.latest}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}
