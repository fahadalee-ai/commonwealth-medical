import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/arc/AppShell";
import { ArcButton } from "@/components/arc/Button";

export const Route = createFileRoute("/onboarding")({
  component: Onboarding,
});

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
    heading: "Trusted Electrical Experts.",
    subtext:
      "Licensed and insured professionals for every residential and commercial electrical need.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1200&q=80",
    heading: "Book in Just a Few Taps.",
    subtext:
      "Choose your service, pick a time that works for you, and we'll take care of the rest.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80",
    heading: "Stay Updated, Every Step.",
    subtext:
      "Get instant confirmations, reminders, and live status updates on all your appointments.",
  },
];

function Onboarding() {
  const [i, setI] = useState(0);
  const navigate = useNavigate();
  const isLast = i === slides.length - 1;
  const slide = slides[i];

  const next = () => {
    if (isLast) navigate({ to: "/login" });
    else setI(i + 1);
  };

  return (
    <AppShell>
      <div className="relative flex min-h-dvh flex-col bg-[#0D0D0D]">
        <button
          onClick={() => navigate({ to: "/login" })}
          className="absolute right-4 top-4 z-20 text-xs font-bold uppercase tracking-widest text-[#FFC107]"
        >
          Skip
        </button>

        <div className="relative h-[55dvh] w-full">
          <img
            src={slide.image}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D0D0D]/40 to-[#0D0D0D]" />
        </div>

        <div className="flex flex-1 flex-col justify-between px-6 pb-8 pt-4">
          <div>
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white">
              {slide.heading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#8A8A8A]">
              {slide.subtext}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              {slides.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 ${idx === i ? "w-8 bg-[#E31E24]" : "w-4 bg-[#2A2A2A]"}`}
                />
              ))}
            </div>
            <ArcButton block onClick={next}>
              {isLast ? "Get Started" : "Next"}
            </ArcButton>
          </div>
        </div>
      </div>
    </AppShell>
  );
}