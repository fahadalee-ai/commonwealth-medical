import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState, type TouchEvent } from "react";
import { AppShell } from "@/components/arc/AppShell";
import { ArcButton } from "@/components/arc/Button";
import { markOnboarded } from "@/lib/cmt";
import welcomeImg from "@/assets/onboarding/welcome.jpg";
import facilityImg from "@/assets/onboarding/facility.jpg";
import vehicleImg from "@/assets/onboarding/vehicle.jpg";
import dispatchImg from "@/assets/onboarding/dispatch.jpg";

export const Route = createFileRoute("/onboarding")({
  component: Onboarding,
});

const slides = [
  {
    image: welcomeImg,
    heading: "Safe Transportation. Trusted Care.",
    subtext:
      "Dependable, compassionate non-emergency medical transportation for individuals who need reliable rides to medical appointments.",
  },
  {
    image: facilityImg,
    heading: "A Reliable Part of Your Healthcare Journey",
    subtext:
      "We work with MassHealth/PT-1 and approved transportation brokers to get you to your appointments on time, every time.",
  },
  {
    image: vehicleImg,
    heading: "Rides Designed Around Your Needs",
    subtext:
      "Medical appointments, healthcare facilities, treatment programs, and other approved destinations — all in one app.",
  },
  {
    image: dispatchImg,
    heading: "A Transportation Partner You Can Count On",
    subtext:
      "Book your ride, track your driver, and manage your appointments — all from your phone.",
  },
];

function Onboarding() {
  const [i, setI] = useState(0);
  const navigate = useNavigate();
  const isLast = i === slides.length - 1;
  const slide = slides[i];

  const goLogin = () => {
    markOnboarded();
    navigate({ to: "/login" });
  };

  const next = () => {
    if (isLast) goLogin();
    else setI(i + 1);
  };

  const startX = useRef<number | null>(null);
  const onTouchStart = (e: TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (startX.current == null) return;
    const delta = e.changedTouches[0].clientX - startX.current;
    startX.current = null;
    if (delta < -50) next();
    if (delta > 50 && i > 0) setI(i - 1);
  };

  return (
    <AppShell>
      <div
        className="relative flex min-h-dvh flex-col overflow-hidden bg-[#032558]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {!isLast && (
          <button
            onClick={goLogin}
            className="absolute right-4 top-4 z-20 min-h-11 rounded-full px-3 text-sm font-semibold text-white/90"
          >
            Skip
          </button>
        )}

        <div className="absolute inset-0">
          <img src={slide.image} alt="" className="h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#032558] via-[#032558]/45 to-transparent" />
        </div>

        <div className="relative z-10 mt-auto flex flex-col px-6 pb-10 pt-[48dvh]">
          <h2 className="text-[28px] font-extrabold leading-snug tracking-tight text-white">
            {slide.heading}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/85">{slide.subtext}</p>

          <div className="mt-8 flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === i ? "w-7 bg-[#0a6bdb]" : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>

          {isLast ? (
            <div className="mt-6 flex flex-col gap-3">
              <ArcButton block onClick={goLogin}>
                Get Started
              </ArcButton>
              <button
                onClick={goLogin}
                className="min-h-11 text-center text-sm text-white/85"
              >
                Already have an account?{" "}
                <span className="font-bold text-white">Log In</span>
              </button>
            </div>
          ) : (
            <div className="mt-6">
              <ArcButton block onClick={next}>
                Next
              </ArcButton>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
