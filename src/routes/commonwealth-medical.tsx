import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/commonwealth-medical")({
  component: () => <Outlet />,
});
