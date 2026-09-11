import { Link, createFileRoute } from "@tanstack/react-router";
import { Heart, ShieldCheck, Clock, Timer, CarFront, MapPinned, FileCheck, CalendarCheck } from "lucide-react";
import { CMT } from "@/lib/cmt";
import { SERVICES } from "@/lib/services-data";

export const Route = createFileRoute("/website/")({
  component: WebsiteHome,
  head: () => ({
    meta: [
      { title: "Home · Commonwealth Medical Transportation" },
      { name: "description", content: CMT.tagline },
    ],
  }),
});

const values = [
  { icon: Heart, title: "Compassionate", text: "Every passenger is treated with dignity and respect." },
  { icon: ShieldCheck, title: "Reliable", text: "Dependable transportation you can count on." },
  { icon: Clock, title: "Safe", text: "Focused on passenger safety and comfort." },
  { icon: Timer, title: "Punctual", text: "Getting to appointments on time matters." },
];

const steps = [
  { icon: CarFront, title: "Ride", text: "Request a ride to an approved medical destination." },
  { icon: MapPinned, title: "Travel", text: "A trained driver picks you up and assists as needed." },
  { icon: FileCheck, title: "Authorization", text: "MassHealth/PT-1 or your broker confirms eligibility." },
  { icon: CalendarCheck, title: "Schedule", text: "We align pickup times with your appointment window." },
];

function WebsiteHome() {
  return (
    <main>
      <section className="bg-[#032558] text-white">
        <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/70">
              Commonwealth Medical Transportation
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Safe Transportation.
              <br />
              Trusted Care.
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/80">
              Dependable, compassionate non-emergency medical transportation for individuals who
              need reliable rides to medical appointments and approved healthcare destinations.
            </p>
            <Link
              to="/website/services"
              className="mt-8 inline-flex h-12 items-center bg-[#0a6bdb] px-6 text-sm font-bold"
            >
              Learn more
            </Link>
          </div>
          <img
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1400&q=80"
            alt="Professional driver with a white sedan"
            className="h-[320px] w-full object-cover md:h-[380px]"
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 py-16">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0a6bdb]">
          Why choose CMT
        </p>
        <div className="mt-4 grid gap-10 lg:grid-cols-2">
          <h2 className="text-3xl font-extrabold leading-tight md:text-4xl">
            A Reliable Part of the Healthcare Journey.
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="flex gap-3">
                <v.icon className="mt-0.5 h-5 w-5 flex-none text-[#0a6bdb]" />
                <div>
                  <p className="font-bold">{v.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#5C6B7A]">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F5F7FA] py-16">
        <div className="mx-auto max-w-[1180px] px-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0a6bdb]">Our services</p>
          <h2 className="mt-3 max-w-xl text-3xl font-extrabold leading-tight md:text-4xl">
            Non-Emergency Transportation Designed Around Your Needs
          </h2>
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=80"
              alt="Medical facility with transportation nearby"
              className="h-[340px] w-full object-cover"
            />
            <div className="grid gap-6 sm:grid-cols-2">
              {SERVICES.map((s) => (
                <div key={s.id} className="bg-white p-5 shadow-[0_8px_24px_rgba(3,37,88,0.06)]">
                  <s.icon className="h-5 w-5 text-[#0a6bdb]" />
                  <p className="mt-3 font-bold">{s.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#5C6B7A]">{s.short}</p>
                  <Link
                    to="/website/services"
                    className="mt-4 inline-flex text-sm font-bold text-[#0a6bdb]"
                  >
                    Learn more
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 py-16">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0a6bdb]">How it works</p>
        <h2 className="mt-3 text-3xl font-extrabold">How Transportation Is Arranged</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.title} className="bg-[#F5F7FA] p-6">
              <s.icon className="h-6 w-6 text-[#0a6bdb]" />
              <p className="mt-4 font-bold">{s.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#5C6B7A]">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#032558] text-white">
        <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-5 py-16 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/70">Support</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">
              A Transportation Partner You Can Count On
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80">
              Our dispatch team coordinates with your health plan, PT-1, or transportation broker
              so you can focus on your appointment.
            </p>
            <a
              href={`tel:${CMT.phoneTel}`}
              className="mt-8 inline-flex h-12 items-center bg-[#0a6bdb] px-6 text-sm font-bold"
            >
              Call {CMT.phone}
            </a>
          </div>
          <img
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=80"
            alt="Dispatch specialist wearing a headset"
            className="h-[320px] w-full object-cover"
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-[1180px] items-center gap-10 px-5 py-16 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-extrabold leading-tight md:text-4xl">
            Let&apos;s Get You Where You Need To Go.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#5C6B7A]">
            Reach out to CMT to learn about transportation eligibility and how services are
            arranged through your health plan, PT-1, or transportation broker.
          </p>
          <Link
            to="/website/contact"
            className="mt-8 inline-flex h-12 items-center bg-[#032558] px-6 text-sm font-bold text-white"
          >
            Contact Us
          </Link>
        </div>
        <img
          src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1400&q=80"
          alt="White sedan used for medical transportation"
          className="h-[300px] w-full object-cover"
        />
      </section>
    </main>
  );
}
