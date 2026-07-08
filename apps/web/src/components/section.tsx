import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  no: string;
  title: string;
  intro?: string;
  children?: ReactNode;
  alt?: boolean;
}

export function Section({ id, no, title, intro, children, alt }: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-16 border-b border-[var(--line)] ${
        alt ? "bg-[var(--paper-2)]" : "bg-[var(--paper)]"
      }`}
    >
      <div className="mx-auto max-w-[var(--content-max)] px-7 py-20 md:py-24">
        <div className="reveal mb-10 md:mb-14">
          <div className="mb-3 font-mono text-[13px] font-medium tracking-[2px] text-[var(--green)]">
            {no}
          </div>
          <h2 className="font-serif text-[clamp(30px,5vw,46px)] font-medium leading-[1.05] tracking-[-0.01em]">
            {title}
          </h2>
          {intro ? (
            <p className="mt-4 max-w-[var(--measure)] text-[var(--ink-soft)]">
              {intro}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
