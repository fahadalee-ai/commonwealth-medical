import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/commonwealth-medical/")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
