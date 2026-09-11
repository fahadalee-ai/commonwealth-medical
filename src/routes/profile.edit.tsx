import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Camera } from "lucide-react";
import { AppShell } from "@/components/arc/AppShell";
import { ScreenHeader } from "@/components/arc/ScreenHeader";
import { ArcInput } from "@/components/arc/Input";
import { ArcButton } from "@/components/arc/Button";

export const Route = createFileRoute("/profile/edit")({
  component: EditProfile,
});

function EditProfile() {
  const navigate = useNavigate();
  return (
    <AppShell>
      <ScreenHeader title="Edit Profile" backTo="/profile" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/profile" });
        }}
        className="flex flex-col gap-4 p-4 pb-32"
      >
        <div className="flex justify-center py-2">
          <div className="relative">
            <div className="h-24 w-24 overflow-hidden rounded-full bg-[#eef1f6]">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <button
              type="button"
              className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#0a6bdb] text-white"
            >
              <Camera className="h-4 w-4" />
            </button>
          </div>
        </div>

        <ArcInput label="Full Name" defaultValue="Alex Rivera" />
        <ArcInput label="Email Address" type="email" defaultValue="alex.rivera@email.com" />
        <ArcInput label="Phone Number" type="tel" defaultValue="(774) 555-0142" />
        <ArcInput label="Home Address" defaultValue="116 Wilson Ave, Spencer, MA 01562" />
        <ArcInput label="Insurance / Program" defaultValue="MassHealth/PT-1" />
        <ArcInput label="Member ID" defaultValue="MH-442918" />
        <ArcInput label="Mobility preference" defaultValue="Walker/Cane Assistance" />
        <ArcInput label="Emergency contact" defaultValue="Jordan Rivera · (774) 555-0199" />

        <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[420px] -translate-x-1/2 border-t border-[#dce3ec] bg-white p-4">
          <ArcButton type="submit" block>
            Save Changes
          </ArcButton>
        </div>
      </form>
    </AppShell>
  );
}
