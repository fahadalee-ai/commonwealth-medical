import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/arc/Logo";
import { CMT } from "@/lib/cmt";

export function SiteFooter() {
  return (
    <footer className="bg-[#032558] text-white">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <Logo variant="white" size={200} />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/75">
            Safe, dependable, and compassionate non-emergency medical transportation to medical
            appointments and approved healthcare destinations.
          </p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wide">Services</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <Link to="/website/services">Medical Appointments</Link>
            </li>
            <li>
              <Link to="/website/services">Healthcare Facilities</Link>
            </li>
            <li>
              <Link to="/website/services">Treatment Programs</Link>
            </li>
            <li>
              <Link to="/website/services">Approved Destinations</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wide">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>{CMT.address}</li>
            <li>
              <a href={`tel:${CMT.phoneTel}`}>{CMT.phone}</a>
            </li>
            <li>
              <a href={`mailto:${CMT.email}`}>{CMT.email}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-4 text-center text-xs text-white/55">
        © {new Date().getFullYear()} Commonwealth Medical Transportation, LLC
      </div>
    </footer>
  );
}
