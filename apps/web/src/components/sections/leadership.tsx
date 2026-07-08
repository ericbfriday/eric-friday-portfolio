// Starter render — the design spec calls for large italic pull-quotes (direction D). Extend as needed.
import { leadership } from "@portfolio/content";
import { Section } from "../section";

export function Leadership() {
  return (
    <Section
      id="leadership"
      no="03"
      title="Leadership & Review"
      intro="Commit counts measure authorship. The other half of the work is being the person other engineers route decisions through — de-facto tech lead across the MatchSync, PMT, SearchLite, and CIBMTR programs."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {leadership.map((item) => (
          <div
            key={item.title}
            className="reveal rounded-[var(--radius)] border border-[var(--line)] bg-[var(--card)] p-7"
          >
            <h3 className="font-serif text-[21px] font-medium">{item.title}</h3>
            {item.quote ? (
              <blockquote className="mt-4 border-l-2 border-[var(--green)] pl-4 font-serif text-[18px] italic leading-snug">
                “{item.quote}”
              </blockquote>
            ) : null}
            <p className="mt-4 text-[var(--ink-soft)]">{item.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
