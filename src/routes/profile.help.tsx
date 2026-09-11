import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/profile/help")({
  component: HelpRedirect,
});

function HelpRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate({ to: "/support" });
  }, [navigate]);
  return null;
}
