import { identity } from "@portfolio/content";
import { ContentsList } from "./contents-list";

export function Hero() {
  return (
    <section
      id="top"
      className="relative border-b border-[var(--line)] bg-[var(--band)]"
    >
      <div className="mx-auto max-w-[var(--content-max)] px-7 py-24 md:py-32">
        <div className="reveal is-visible mx-auto max-w-[760px] text-center">
          <p className="kicker mb-8">{identity.kicker}</p>
          <h1 className="font-serif text-[clamp(52px,10vw,104px)] font-medium leading-[0.98] tracking-[-0.02em]">
            {identity.name}
          </h1>
          <div className="mx-auto my-7 h-px w-16 bg-[var(--green)]" />
          <p className="mx-auto max-w-[560px] font-serif text-[clamp(18px,2.4vw,23px)] italic text-[var(--ink-soft)]">
            {identity.role}
          </p>
          <p className="mx-auto mt-8 max-w-[var(--measure)] text-left text-[var(--ink-soft)] md:text-center">
            {identity.intro}
          </p>
        </div>

        {/* Hand-set Contents list — doubles as primary nav (direction A). */}
        <ContentsList />
      </div>
    </section>
  );
}
