import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/arc/AppShell";
import { ScreenHeader } from "@/components/arc/ScreenHeader";
import { ArcInput } from "@/components/arc/Input";
import { ArcButton } from "@/components/arc/Button";

export const Route = createFileRoute("/profile/change-password")({
  component: ChangePassword,
});

function ChangePassword() {
  const navigate = useNavigate();
  return (
    <AppShell>
      <ScreenHeader title="Change Password" backTo="/profile" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/profile" });
        }}
        className="flex flex-col gap-4 p-4 pb-32"
      >
        <ArcInput label="Current Password" type="password" placeholder=" " />
        <ArcInput label="New Password" type="password" placeholder=" " />
        <ArcInput label="Confirm New Password" type="password" placeholder=" " />
        <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[420px] -translate-x-1/2 border-t border-[#dce3ec] bg-white p-4">
          <ArcButton type="submit" block>
            Update Password
          </ArcButton>
        </div>
      </form>
    </AppShell>
  );
}
