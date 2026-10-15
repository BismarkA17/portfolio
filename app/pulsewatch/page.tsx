import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import More from "@/components/More";
import CountUp from "@/components/CountUp";
import InView from "@/components/InView";
import { site } from "@/lib";

export const metadata: Metadata = {
  title: "PulseWatch",
  description: "Real-time anomaly detection and alerting pipeline. 96.9% of injected spikes caught, 0.21% false positives, zero messages lost.",
};

// Illustration only: a calm baseline with three spikes. The live version
// will replay real readings captured from the EC2 deployment.
const LINE =
  "0,158 25,152 50,160 75,149 100,156 125,151 150,162 175,150 200,155 225,148 240,40 255,150 280,157 305,152 330,159 355,147 380,154 405,150 430,161 455,149 480,155 505,151 530,158 555,150 570,30 585,153 610,148 635,156 660,151 685,160 710,149 735,155 760,152 785,158 810,147 835,154 850,52 865,151 890,157 915,150 940,155 965,149 1000,154";
const SPIKES = [
  { x: 240, y: 40, c: "s1" },
  { x: 570, y: 30, c: "s2" },
  { x: 850, y: 52, c: "s3" },
];

const STEPS = [
  { tag: "ingest", name: "Generator", text: "Emits latency readings and injects known spikes, so accuracy can be measured." },
  { tag: "queue", name: "Redis Streams", text: "Consumer groups hold each message until a worker acknowledges it." },
  { tag: "detect", name: "Python worker", text: "Rolling z-score per service. Flags readings more than 3 deviations high." },
  { tag: "store", name: "PostgreSQL", text: "Readings and incidents, with versioned schema migrations." },
  { tag: "respond", name: "FastAPI", text: "Incidents move open → acknowledged → resolved." },
];

const FAILURES = [
  { what: "kill the worker mid-batch", result: "Unacknowledged messages stay pending. The next worker claims them and carries on." },
  { what: "stop the database", result: "The worker backs off exponentially, reconnects, and writes everything it was holding." },
  { what: "send a malformed event", result: "It’s set aside as a poison message instead of jamming the stream." },
  { what: "reboot the server", result: "All five containers come back on their own." },
];

const SPECS = [
  { k: "Language and API", v: "Python, FastAPI with input validation and 404, 409, 422 handling" },
  { k: "Messaging", v: "Redis Streams, consumer groups, acknowledgements, pending-message recovery" },
  { k: "Storage", v: "PostgreSQL, Alembic migrations" },
  { k: "Deployment", v: "Docker Compose, 5 services, AWS EC2 t3.small in London" },
  { k: "Testing", v: "26 automated tests, 80% coverage gate in GitHub Actions" },
];

export default function PulseWatch() {
  return (
    <>
      <div className="subnav">
        <div className="wrap inner">
          <Link href="/" className="title">PulseWatch</Link>
          <div className="links">
            <a href="#how">How it works</a>
            <a href="#tuning">Tuning</a>
            <a href="#failure">Failure tests</a>
            <a href="#specs">Specs</a>
            <a className="btn btn-accent btn-sm" href={site.pulsewatchRepo}>View code</a>
          </div>
        </div>
      </div>

      <header className="wrap" style={{ paddingTop: 136, textAlign: "center" }}>
        <h1 className="display h-xl" style={{ letterSpacing: "-0.05em" }}>PulseWatch</h1>
        <p style={{ margin: "24px auto 0", maxWidth: 720, fontSize: "clamp(22px, 3vw, 32px)", lineHeight: 1.25, fontWeight: 500, letterSpacing: "-0.02em", color: "var(--text-2)" }}>
          Spots the spike. Raises the alert.<br />Loses nothing on the way.
        </p>
      </header>

      <section className="wrap" style={{ paddingTop: 96 }}>
        <InView className="chart-card" onClass="chart-on">
          <svg viewBox="0 0 1000 220" role="img" aria-label="Latency over time with three spikes flagged" style={{ width: "100%", height: "auto", display: "block" }}>
            {[170, 110, 50].map((y) => (
              <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="var(--line-soft)" strokeWidth="1" />
            ))}
            <polyline className="chart-line" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinejoin="round" points={LINE} />
            {SPIKES.map((s) => (
              <g key={s.x} className={`chart-spike ${s.c}`}>
                <circle cx={s.x} cy={s.y} r="6" fill="var(--accent)" />
                <circle className="ring" cx={s.x} cy={s.y} r="6" fill="none" stroke="var(--accent)" strokeWidth="2" />
              </g>
            ))}
          </svg>
          <div className="mono" style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "space-between", fontSize: 12, color: "var(--text-3)" }}>
            <span>latency_ms, one service</span>
            <span>Illustration. Real readings replay coming soon.</span>
          </div>
        </InView>
      </section>

      <section className="wrap section" style={{ textAlign: "center" }}>
        <p className="lede" style={{ fontSize: "clamp(20px, 2.6vw, 28px)" }}>Out of 4,812 spikes injected over 22.7 hours,</p>
        <div className="giant" style={{ marginTop: 8 }}><CountUp to={96.9} decimals={1} suffix="%" duration={1800} /></div>
        <p className="lede" style={{ marginTop: 16, fontSize: "clamp(20px, 2.6vw, 28px)" }}>were caught. That’s 4,664 alerts that mattered.</p>
        <div style={{ margin: "96px auto 0", maxWidth: 820, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 48, textAlign: "left" }}>
          <div>
            <div className="big-n"><CountUp to={244668} /></div>
            <p className="body" style={{ marginTop: 8 }}>readings streamed and scored on a live AWS server.</p>
          </div>
          <div>
            <div className="big-n"><CountUp to={0.21} decimals={2} suffix="%" /></div>
            <p className="body" style={{ marginTop: 8 }}>of normal readings flagged by mistake. 496 out of 239,856.</p>
          </div>
        </div>
      </section>

      <section id="how" className="wrap section">
        <h2 className="display h-m">Five services.<br /><span className="dim">One path for every reading.</span></h2>
        <InView className="steps">
          {STEPS.map((s) => (
            <div className="step" key={s.name}>
              <div className="tag">{s.tag}</div>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </InView>
      </section>

      <section id="tuning" className="wrap section">
        <h2 className="display h-m">Half the false alarms<br /><span className="dim">were good news.</span></h2>
        <p className="body" style={{ marginTop: 24, maxWidth: 640, fontSize: 21 }}>
          After the first 12 hours I went through every false positive. 244 of 496 were readings that were unusually{" "}
          <span style={{ color: "var(--text)" }}>fast</span>. Nobody gets paged for that. So the detector now only looks upward.
        </p>
        <div className="grid-2" style={{ marginTop: 64 }}>
          <div className="compare">
            <div className="label">Before · two-sided · first 12h</div>
            <div className="n" style={{ color: "var(--text-2)" }}>0.39%</div>
            <div className="label dim">false-positive rate</div>
            <div className="row" style={{ color: "var(--text-2)" }}><span>Spikes caught</span><span>96.8%</span></div>
            <div className="row" style={{ color: "var(--text-2)" }}><span>Alerts that were real</span><span>83.5%</span></div>
          </div>
          <div className="compare">
            <div className="label">After · one-sided, z &gt; 3 · next 22.7h</div>
            <div className="n" style={{ color: "var(--accent)" }}>0.21%</div>
            <div className="label dim">false-positive rate, down 46%</div>
            <div className="row"><span style={{ color: "var(--text-2)" }}>Spikes caught</span><span>96.9%</span></div>
            <div className="row"><span style={{ color: "var(--text-2)" }}>Alerts that were real</span><span>90.4%</span></div>
          </div>
        </div>
      </section>

      <section id="failure" className="wrap section">
        <h2 className="display h-m">I tried to break it.<br /><span className="dim">It didn’t lose a thing.</span></h2>
        <div className="rule-top" style={{ marginTop: 64 }}>
          {FAILURES.map((f) => (
            <div className="fail-row" key={f.what}>
              <div className="mono">{f.what}</div>
              <div style={{ color: "var(--text-2)" }}>{f.result}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="specs" className="wrap section">
        <h2 className="display h-s">Specs</h2>
        <div className="specs">
          {SPECS.map((s) => (
            <div className="spec" key={s.k}>
              <div className="label dim">{s.k}</div>
              <div>{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap section" style={{ textAlign: "center" }}>
        <h2 className="display h-m" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>Read the code.</h2>
        <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: "16px 32px", justifyContent: "center", alignItems: "center" }}>
          <a className="btn btn-accent" href={site.pulsewatchRepo}>Open on GitHub</a>
          <More href="/">Back to home</More>
        </div>
      </section>

      <Footer left="PulseWatch · measured October 2026" />
    </>
  );
}
