import { identity, nav } from "@portfolio/content";

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
        <ol className="reveal mx-auto mt-16 max-w-[560px] space-y-0">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="group flex items-baseline gap-3 border-t border-[var(--line)] py-3.5 transition-colors last:border-b hover:text-[var(--green)]"
              >
                <span className="font-mono text-[12px] text-[var(--muted)]">
                  {item.no}
                </span>
                <span className="font-serif text-[19px]">{item.label}</span>
                <span className="mx-2 flex-1 self-center border-b border-dotted border-[var(--line)]" />
                <span className="font-mono text-[12px] text-[var(--muted)] transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
