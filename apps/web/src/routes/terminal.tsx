import { createFileRoute } from "@tanstack/react-router";
import { LayoutPlaceholder } from "@/components/layout-placeholder";
import { createLayoutCookie } from "@/lib/layouts";

export const Route = createFileRoute("/terminal")({
  headers: () => ({
    "Set-Cookie": createLayoutCookie("terminal"),
  }),
  component: Terminal,
});

function Terminal() {
  return <LayoutPlaceholder layout="terminal" />;
}
