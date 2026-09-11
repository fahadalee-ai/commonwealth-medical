import { Outlet, createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/website/SiteHeader";
import { SiteFooter } from "@/components/website/SiteFooter";

export const Route = createFileRoute("/website")({
  component: WebsiteLayout,
  head: () => ({
    meta: [{ title: "Commonwealth Medical Transportation" }],
  }),
});

function WebsiteLayout() {
  return (
    <div className="min-h-dvh bg-white text-[#032558]">
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </div>
  );
}
