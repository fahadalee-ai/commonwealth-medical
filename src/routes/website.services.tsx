import { Link, createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { CMT } from "@/lib/cmt";
import { SERVICES } from "@/lib/services-data";

export const Route = createFileRoute("/website/services")({
  component: WebsiteServices,
  head: () => ({
    meta: [{ title: "Services · Commonwealth Medical Transportation" }],
  }),
});

const approach = [
  "Professional sedans only",
  "Authorized broker programs",
  "Full caregiver support updates",
];

function WebsiteServices() {
  return (
    <main>
      <section className="bg-[#032558] text-white">
        <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-5 py-16 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/70">
              Our services
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight md:text-5xl">
              Our Transportation Services
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80">
              Ambulatory non-emergency medical transportation provided through authorized programs
              such as MassHealth/PT-1 and approved transportation brokers — designed around
              passenger comfort and schedule alignment.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1400&q=80"
            alt="Driver assisting a passenger at a white sedan"
            className="h-[320px] w-full object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 py-16">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0a6bdb]">What we do</p>
        <h2 className="mt-3 text-3xl font-extrabold">Specialized Care For Ambulatory Patients</h2>
        <img
          src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1600&q=80"
          alt="Healthcare facility interior"
          className="mt-8 h-[280px] w-full object-cover md:h-[360px]"
        />
      </section>

      <section className="bg-[#F5F7FA] py-16">
        <div className="mx-auto grid max-w-[1180px] items-start gap-12 px-5 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0a6bdb]">
              Our approach
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight">
              Door-To-Door Service Focused On Comfort
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#5C6B7A]">
              Unlike generic ride services, CMT provides personalized door-to-door assistance.
              Drivers are trained to help ambulatory patients from their residence to the vehicle,
              and from the vehicle to the healthcare entrance. We focus on stress reduction, clear
              communication, and punctuality.
            </p>
          </div>
          <ul className="space-y-4">
            {approach.map((item) => (
              <li key={item} className="flex items-start gap-3 bg-white p-4">
                <Check className="mt-0.5 h-5 w-5 flex-none text-[#0a6bdb]" strokeWidth={2.5} />
                <span className="font-semibold">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((s) => (
            <article key={s.id} className="bg-[#F5F7FA] p-6">
              <s.icon className="h-6 w-6 text-[#0a6bdb]" />
              <h3 className="mt-4 text-xl font-extrabold">{s.name}</h3>
              <p className="mt-1 text-sm font-extrabold text-[#0a6bdb]">
                From {s.pricing.from} <span className="font-semibold text-[#5C6B7A]">· {s.pricing.unit}</span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#5C6B7A]">{s.description}</p>
              <ul className="mt-4 space-y-2">
                {s.included.slice(0, 3).map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-[#032558]">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-[#1FA463]" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#F5F7FA] py-16">
        <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-5 lg:grid-cols-2">
          <WorcesterMap />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0a6bdb]">
              Service area
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight">
              Serving Worcester County & Surrounding Communities
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#5C6B7A]">
              CMT provides reliable transportation throughout Worcester County and surrounding
              communities in Massachusetts, connecting clients with clinics, physicians, treatment
              centers, and approved healthcare destinations through authorized programs.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1180px] flex-col items-start justify-between gap-6 px-5 py-16 md:flex-row md:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0a6bdb]">
            Transportation information
          </p>
          <h2 className="mt-3 text-3xl font-extrabold">
            Need Transportation To Your Next Appointment?
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#5C6B7A]">
            Reach out to CMT to learn about transportation eligibility and how services are
            arranged through your health plan, PT-1, or transportation broker.
          </p>
        </div>
        <Link
          to="/website/contact"
          className="inline-flex h-12 items-center bg-[#032558] px-6 text-sm font-bold text-white"
        >
          Contact Us
        </Link>
      </section>
    </main>
  );
}

function WorcesterMap() {
  return (
    <svg viewBox="0 0 320 280" className="w-full bg-white p-4" role="img" aria-label="Worcester County service area">
      <path
        d="M40 40 L150 28 L210 48 L250 80 L270 140 L240 210 L180 250 L110 240 L70 200 L48 140 Z"
        fill="#0a6bdb"
      />
      <text x="118" y="130" fill="white" fontSize="13" fontWeight="700">
        WORCESTER
      </text>
      <text x="128" y="150" fill="white" fontSize="13" fontWeight="700">
        COUNTY
      </text>
      <circle cx="108" cy="168" r="4" fill="white" />
      <text x="118" y="172" fill="white" fontSize="11">
        Spencer
      </text>
    </svg>
  );
}
