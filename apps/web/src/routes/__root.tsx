import type { ReactNode } from "react";
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import type { RouterContext } from "../router";
import appCss from "../styles/app.css?url";

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title: "Eric B. Friday — Senior Frontend & Application Security Engineer",
      },
      {
        name: "description",
        content:
          "Portfolio of Eric B. Friday — frontend platform engineering, application security & identity, and AI/MCP developer tooling for enterprise healthcare.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        {/* Prevent theme flash: set .dark before first paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('ebf-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-[var(--ink)] px-4 py-2 font-mono text-sm text-[var(--paper)] shadow-lg transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
