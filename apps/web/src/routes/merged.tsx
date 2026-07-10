import { createFileRoute } from "@tanstack/react-router";
import { contributionQueryOptions } from "@/lib/portfolio-data";
import { createLayoutCookie } from "@/lib/layouts";
import { SiteHeader } from "@/components/site-header";
import { ScrollProgress } from "@/components/scroll-progress";
import { Hero } from "@/components/hero";
import { SelectedWork } from "@/components/sections/selected-work";
import { Skills } from "@/components/sections/skills";
import { Leadership } from "@/components/sections/leadership";
import { ContributionMap } from "@/components/sections/contribution-map";
import { Timeline } from "@/components/sections/timeline";
import { Contact } from "@/components/sections/contact";
import { useReveal } from "@/components/use-reveal";

export const Route = createFileRoute("/merged")({
  // Prefetch the ledger on the server so the Contribution Map renders with data.
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(contributionQueryOptions),
  headers: () => ({
    "Set-Cookie": createLayoutCookie("merged"),
  }),
  component: Merged,
});

function Merged() {
  useReveal();
  return (
    <>
      <ScrollProgress />
      <SiteHeader activeLayout="merged" />
      <main>
        <Hero />
        <SelectedWork />
        <Skills />
        <Leadership />
        <ContributionMap />
        <Timeline />
        <Contact />
      </main>
    </>
  );
}
