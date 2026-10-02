"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HomeIcon, InfoIcon, MapPinIcon, SearchIcon } from "./Icons";

export default function MobileNavigation() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);
  const current = pathname === "/about" ? "about"
    : pathname.startsWith("/areas/") || pathname.startsWith("/neighborhoods/") || (pathname === "/" && (hash === "#areas" || hash === "#neighborhoods")) ? "areas"
    : pathname === "/directory" || pathname.startsWith("/place/") ? "directory"
    : "home";

  const destinations = [
    { id: "home", href: "/", label: "الرئيسية", Icon: HomeIcon },
    { id: "directory", href: "/directory", label: "الدليل", Icon: SearchIcon },
    { id: "areas", href: "/#areas", label: "المناطق", Icon: MapPinIcon },
    { id: "about", href: "/about", label: "المشروع", Icon: InfoIcon },
  ] as const;

  return <nav className="mobile-dock" aria-label="التنقل السريع">
    <div className="mobile-dock-inner">
      {destinations.map(({ id, href, label, Icon }) => <Link key={id} href={href} className={`mobile-dock-link mobile-dock-${id}${current === id ? " is-active" : ""}`} aria-current={pathname === href ? "page" : current === id ? "location" : undefined}>
        <span className="mobile-dock-icon" aria-hidden="true"><Icon /></span><span className="mobile-dock-label">{label}</span>
      </Link>)}
    </div>
  </nav>;
}
