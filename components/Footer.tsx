import { site } from "@/lib";

export default function Footer({ left = "Bismark Attatsi, London" }: { left?: string }) {
  return (
    <footer className="wrap footer">
      <span>{left}</span>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <a href={site.github}>GitHub</a>
        <a href={site.linkedin}>LinkedIn</a>
      </div>
    </footer>
  );
}
