import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerOnlyFn } from "@tanstack/react-start";
import { LAYOUT_COOKIE_NAME, getLayoutById } from "@/lib/layouts";

const getPreferredLayout = createServerOnlyFn(async () => {
  const { getCookie } = await import("@tanstack/react-start/server");

  return getLayoutById(getCookie(LAYOUT_COOKIE_NAME));
});

export const Route = createFileRoute("/")({
  loader: async () => {
    const target = await getPreferredLayout();

    throw redirect({
      to: target.path,
      statusCode: 302,
    });
  },
});
