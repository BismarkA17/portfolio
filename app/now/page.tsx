import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import More from "@/components/More";
import { site } from "@/lib";

export const metadata: Metadata = { title: "Now", description: "What Bismark is building and learning right now." };

const ROADMAP = [
  { phase: "1", name: "Fundamentals", text: "Python, Git, SQL and HTTP, relearned properly.", state: "In progress" },
  { phase: "2", name: "Foundations", text: "FastAPI, PostgreSQL, CRUD and auth.", state: "Next" },
  { phase: "3", name: "Version 1", text: "Applications moving through stages, companies, interviews, contacts, search and a stats dashboard.", state: "Planned" },
  { phase: "4", name: "Production", text: "Tests, Docker, CI/CD, and deployment to AWS with Terraform.", state: "Planned" },
];

export default function Now() {
  return (
    <>
      <Nav />
      <header className="wrap" style={{ paddingTop: 128 }}>
        <div className="label">Building now</div>
        <h1 className="display h-l" style={{ marginTop: 12 }}>ApplyPilot</h1>
        <p className="lede" style={{ marginTop: 24, maxWidth: 680 }}>
          A tracker for my own job search: companies, applications, interviews, deadlines and outcomes in one place.
          It’s also where I’m rebuilding my backend fundamentals from the ground up, without shortcuts.
        </p>
        <div style={{ marginTop: 24 }}><More href={site.applypilotRepo}>Follow along on GitHub</More></div>
      </header>

      <section className="wrap section" style={{ paddingTop: 112 }}>
        <h2 className="display h-s">Roadmap</h2>
        <div className="rule-top" style={{ marginTop: 32 }}>
          {ROADMAP.map((r) => (
            <div className="list-row" key={r.phase}>
              <div>
                <div className="tag" style={{ color: r.state === "In progress" ? "var(--accent)" : "var(--text-3)" }}>
                  phase {r.phase} · {r.state.toLowerCase()}
                </div>
                <h3 style={{ marginTop: 8 }}>{r.name}</h3>
              </div>
              <p className="body">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap section" style={{ paddingTop: 112 }}>
        <h2 className="display h-s">Also studying</h2>
        <div className="rule-top" style={{ marginTop: 32 }}>
          <div className="list-row">
            <h3>AWS Solutions Architect Associate</h3>
            <p className="body">On top of the Cloud Practitioner cert from September 2025.</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
