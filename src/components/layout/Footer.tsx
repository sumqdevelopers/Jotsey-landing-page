import Container from "@/components/ui/Container"
import { complianceBadges, footerLinkGroups } from "@/data/navigation"
import { asset } from "@/lib/asset"

export default function Footer() {
  return (
    <footer className="bg-brand-navy py-16 text-white">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <img
              className="h-12 w-auto"
              src={asset("/brand/jotsey-logo-dark.svg")}
              alt="Jotsey"
              width={113}
              height={48}
            />
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/60">
              Ambient clinical intelligence that protects provider attention and
              returns time to care.
            </p>
            <ul className="mt-7 flex gap-2 text-[10px] text-white/55" aria-label="Certifications">
              {complianceBadges.map((badge) => (
                <li
                  className="rounded border border-white/15 px-2 py-1 font-medium"
                  key={badge}
                >
                  {badge}
                </li>
              ))}
            </ul>
          </div>
          {footerLinkGroups.map((group) => (
            <nav aria-label={group.title} key={group.title}>
              <h3 className="text-sm font-semibold">{group.title}</h3>
              <ul className="mt-5 flex flex-col gap-3 text-sm text-white/55">
                {group.links.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row">
          <p>© 2026 Jotsey, Inc. All rights reserved.</p>
          <p>
            <span
              className="mr-2 inline-block size-2 rounded-full bg-accent-cyan"
              aria-hidden="true"
            />
            All services are online
          </p>
        </div>
      </Container>
    </footer>
  )
}
