import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send } from "lucide-react";
import { AppShell } from "@/components/arc/AppShell";
import { ScreenHeader } from "@/components/arc/ScreenHeader";
import { getAppointment } from "@/lib/appointments-data";
import { getMessages, sendMessage } from "@/lib/chat-store";

export const Route = createFileRoute("/support/$bookingId")({
  component: BookingChat,
  head: () => ({ meta: [{ title: "Chat · CMT" }] }),
});

function BookingChat() {
  const { bookingId } = Route.useParams();
  const ride = getAppointment(bookingId);
  const [messages, setMessages] = useState(() => getMessages(bookingId));
  const [draft, setDraft] = useState("");

  const title = ride?.reference ?? bookingId;
  const subtitle = ride ? `${ride.destination} · ${ride.date}` : "CMT Dispatch";

  return (
    <AppShell>
      <ScreenHeader title={title} backTo="/support" />
      <p className="border-b border-[#dce3ec] bg-white px-4 py-2 text-xs text-[#5C6B7A]">{subtitle}</p>

      <div className="flex min-h-[calc(100dvh-132px)] flex-col">
        <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {messages.map((m, i) => (
            <div
              key={`${m.time}-${i}`}
              className={`max-w-[82%] px-3 py-2 text-sm leading-relaxed ${
                m.from === "cmt"
                  ? "bg-white text-[#032558] shadow-[0_8px_24px_rgb(3_37_88_/_6%)]"
                  : "ml-auto bg-[#0a6bdb] text-white"
              }`}
            >
              <p>{m.text}</p>
              <p className={`mt-1 text-[10px] font-semibold ${m.from === "cmt" ? "text-[#5C6B7A]" : "text-white/75"}`}>
                {m.time}
              </p>
            </div>
          ))}
        </div>

        <form
          className="sticky bottom-0 flex gap-2 border-t border-[#dce3ec] bg-white p-3"
          onSubmit={(e) => {
            e.preventDefault();
            const text = draft.trim();
            if (!text) return;
            setMessages(sendMessage(bookingId, text));
            setDraft("");
          }}
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Message dispatch"
            className="h-12 flex-1 bg-[#eef1f6] px-4 text-sm text-[#032558] focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Send"
            className="flex h-12 w-12 items-center justify-center bg-[#0a6bdb] text-white"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </AppShell>
  );
}
