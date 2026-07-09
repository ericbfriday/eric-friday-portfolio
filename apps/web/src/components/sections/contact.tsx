import { useEffect, useRef } from "react";
import { contact } from "@portfolio/content";
import { Section } from "../section";

export function Contact() {
  const emailRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const addr = contact.emailParts.join("");
    if (emailRef.current) {
      emailRef.current.setAttribute("href", `mailto:${addr}`);
      emailRef.current.textContent = addr;
    }
  }, []);

  return (
    <Section id="contact" no="06" title={contact.headline} alt>
      <p className="reveal mb-8 max-w-[var(--measure)] text-[var(--ink-soft)]">
        {contact.blurb}
      </p>
      <div className="reveal flex flex-wrap gap-3">
        <a
          ref={emailRef}
          href="#"
          className="rounded-full border border-[var(--line)] px-4 py-2 font-mono text-[12px] tracking-[0.5px] transition-colors hover:border-[var(--green)] hover:text-[var(--green)]"
        >
          email me
        </a>
        {contact.links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[var(--line)] px-4 py-2 font-mono text-[12px] tracking-[0.5px] transition-colors hover:border-[var(--green)] hover:text-[var(--green)]"
          >
            {l.label} {l.value} ↗
          </a>
        ))}
      </div>
      <p className="mt-16 font-mono text-[11px] uppercase tracking-[1.5px] text-[var(--muted)]">
        © 2026 Eric B. Friday — Set in{" "}
        <a
          href="https://edwardtufte.github.io/et-book/"
          target="_blank"
          rel="noreferrer"
          className="transition-colors hover:text-[var(--green)]"
        >
          ET Book
        </a>
        , Newsreader &amp; IBM Plex Mono
      </p>
    </Section>
  );
}
