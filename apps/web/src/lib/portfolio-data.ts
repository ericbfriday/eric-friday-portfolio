import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { ledger, ledgerFilters, stats } from "@portfolio/content";

/**
 * Server function — runs on the Worker (SSR) and is the seam for a future
 * live data source (e.g. a Cloudflare D1 table or a GitHub contributions API)
 * without touching the component. Today it returns the curated dataset.
 */
export const getContributionData = createServerFn().handler(async () => {
  const totalCommits = ledger.reduce((sum, row) => sum + row.commits, 0);
  return {
    rows: ledger,
    filters: ledgerFilters,
    stats,
    totalCommits,
    generatedAt: new Date().toISOString(),
  };
});

export const contributionQueryOptions = queryOptions({
  queryKey: ["contribution-map"],
  queryFn: () => getContributionData(),
});
