import Link from "next/link";

export default function More({ href, children }: { href: string; children: React.ReactNode }) {
  const inner = (<>{children} <span className="chev" aria-hidden="true">›</span></>);
  return href.startsWith("/") ? (
    <Link href={href} className="more">{inner}</Link>
  ) : (
    <a href={href} className="more">{inner}</a>
  );
}
