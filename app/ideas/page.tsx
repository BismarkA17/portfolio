import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/lib";

export const metadata: Metadata = { title: "Ideas", description: "Things Bismark wants to build next. Open to collaborators." };

const IDEAS = [
  {
    tag: "monitoring",
    name: "Detection that learns what normal looks like",
    text: "PulseWatch uses a rolling z-score, which works but treats every hour the same. I want to try baselines that account for daily and weekly patterns, so a busy Monday morning isn’t mistaken for an incident.",
  },
  {
    tag: "job search",
    name: "A job-search copilot",
    text: "A browser extension that saves a listing in one click, then keeps its status up to date from recruiter emails. The natural next step for ApplyPilot once the core is solid.",
  },
  {
    tag: "matching",
    name: "CV and job description matching",
    text: "Show which requirements in a listing a CV actually covers, and where the gaps are, with reasons instead of a single score.",
  },
  {
    tag: "cloud",
    name: "Side projects that cost almost nothing to run",
    text: "Infrastructure as code that spins a whole AWS environment up for a demo and tears it down after, so portfolio projects stay live without a monthly bill.",
  },
  {
    tag: "machine learning",
    name: "Brain signals to text",
    text: "At university I worked on aligning EEG recordings with text embeddings. It’s early-stage research, but I’d like to keep exploring it.",
  },
];

export default function Ideas() {
  return (
    <>
      <Nav />
      <header className="wrap" style={{ paddingTop: 128 }}>
        <h1 className="display h-l">Things I want<br />to build next.</h1>
        <p className="lede" style={{ marginTop: 24, maxWidth: 640 }}>
          Half-formed on purpose. If one overlaps with something you’re working on, or you think it’s a bad idea, I’d like to hear it.
        </p>
      </header>

      <section className="wrap section" style={{ paddingTop: 112 }}>
        <div className="rule-top">
          {IDEAS.map((i) => (
            <div className="list-row" key={i.name}>
              <div>
                <div className="tag">{i.tag}</div>
                <h3 style={{ marginTop: 8 }}>{i.name}</h3>
              </div>
              <p className="body">{i.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap section" style={{ textAlign: "center" }}>
        <h2 className="display h-m" style={{ fontSize: "clamp(32px, 5vw, 48px)" }}>Want to build one together?</h2>
        <div style={{ marginTop: 32 }}>
          <a className="btn btn-accent" href={`mailto:${site.email}?subject=Idea%20from%20your%20site`}>Email me</a>
        </div>
      </section>

      <Footer />
    </>
  );
}
