import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/commonwealth-medical/$")({
  beforeLoad: ({ params }) => {
    const splat = params._splat?.replace(/^\/+/, "") ?? "";
    throw redirect({ href: splat ? `/${splat}` : "/" });
  },
});
