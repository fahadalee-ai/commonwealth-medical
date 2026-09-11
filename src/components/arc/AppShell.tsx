import type { ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  return <div className="arc-shell text-white">{children}</div>;
}