"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib";

const links = [
  { href: "/pulsewatch", label: "PulseWatch" },
  { href: "/now", label: "Now" },
  { href: "/ideas", label: "Ideas" },
];

export default function Nav() {
  const path = usePathname();
  return (
    <nav className="wrap nav">
      <Link href="/" className="nav-name">Bismark</Link>
      <div className="nav-links">
        {links.map((l) => (
          <Link key={l.href} href={l.href} aria-current={path === l.href ? "page" : undefined}>
            {l.label}
          </Link>
        ))}
        <a href={site.cv} target="_blank" rel="noopener">CV</a>
      </div>
    </nav>
  );
}
