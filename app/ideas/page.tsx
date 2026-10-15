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
    tag: "music",
    name: "An app that connects fans through music",
    text: "I’m a big fan of The Weeknd, and half the fun of a new album is talking about it with other people. I’d like to build something that connects fans through what they actually listen to: shared listening rooms for release nights, and a way to find people near you who are going to the same show.",
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
