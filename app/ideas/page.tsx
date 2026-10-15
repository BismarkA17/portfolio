import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/lib";

export const metadata: Metadata = { title: "Ideas", description: "Things Bismark wants to build next. Open to collaborators." };

// TODO(Bismark): replace these with your real ideas.
const IDEAS = [
  { name: "[Idea one]", text: "[One or two sentences: what it is and why it interests you.]" },
  { name: "[Idea two]", text: "[One or two sentences: what it is and why it interests you.]" },
  { name: "[Idea three]", text: "[One or two sentences: what it is and why it interests you.]" },
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
              <h3>{i.name}</h3>
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
