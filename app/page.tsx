import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import More from "@/components/More";
import CountUp from "@/components/CountUp";
import RevenueBars from "@/components/RevenueBars";
import { site } from "@/lib";

export default function Home() {
  return (
    <>
      <Nav />

      <header className="wrap" style={{ paddingTop: 128, paddingBottom: 112 }}>
        <h1 className="display h-l">Hi, I’m Bismark.</h1>
        <p className="lede" style={{ marginTop: 32, maxWidth: 700 }}>
          Aspiring software engineer and Computer Science graduate from the University of Surrey, based in London.
          I’m most interested in backend systems, data pipelines and cloud infrastructure: software that has to keep
          working when things go wrong.
        </p>
        <p className="lede" style={{ marginTop: 20, maxWidth: 700 }}>
          My flagship project, PulseWatch, is a real-time anomaly detection pipeline I designed, deployed on AWS and
          tested by deliberately breaking it. Alongside it, I analysed over a million real retail orders in SQL to find
          where a business’s revenue comes from and where it leaks.
        </p>
        <div style={{ marginTop: 28 }}><More href="/pulsewatch">Take a look at PulseWatch</More></div>
      </header>

      <section className="wrap">
        <div className="tile" style={{ paddingTop: 80, paddingBottom: 64, textAlign: "center" }}>
          <h2 className="display h-m">PulseWatch</h2>
          <p className="lede" style={{ margin: "16px auto 0", maxWidth: 560 }}>
            Catches latency spikes as they happen. Never drops a message, even mid-crash.
          </p>
          <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: "12px 32px", justifyContent: "center" }}>
            <More href="/pulsewatch">Learn more</More>
            <More href={site.pulsewatchRepo}>View the code</More>
          </div>

          <div className="pipe" aria-hidden="true">
            <div className="pipe-track"><span className="pipe-dot" /></div>
            <div className="pipe-labels">
              <span>metrics</span><span>redis streams</span><span>detector</span><span>postgres</span><span>alerts</span>
            </div>
          </div>

          <div className="stats" style={{ marginTop: 72 }}>
            <div>
              <div className="stat-n"><CountUp to={96.9} decimals={1} suffix="%" /></div>
              <div className="label" style={{ marginTop: 4 }}>of injected spikes caught</div>
            </div>
            <div>
              <div className="stat-n"><CountUp to={0.21} decimals={2} suffix="%" /></div>
              <div className="label" style={{ marginTop: 4 }}>false-positive rate</div>
            </div>
            <div>
              <div className="stat-n">0</div>
              <div className="label" style={{ marginTop: 4 }}>messages lost</div>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ marginTop: 16 }}>
        <div className="tile" style={{ paddingTop: 80, paddingBottom: 64, textAlign: "center" }}>
          <h2 className="display h-m">Retail Analytics</h2>
          <p className="lede" style={{ margin: "16px auto 0", maxWidth: 560 }}>
            A million real orders. Who really pays the bills, and where the money leaks.
          </p>
          <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: "12px 32px", justifyContent: "center" }}>
            <More href="/analytics">Learn more</More>
            <More href={site.analyticsRepo}>View the code</More>
          </div>

          <div style={{ margin: "72px auto 0", maxWidth: 840 }}>
            <RevenueBars height={160} />
            <div className="mono" style={{ marginTop: 16, display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--text-3)" }}>
              <span>monthly revenue, 2010–2011</span><span style={{ color: "var(--accent)" }}>sep–nov peak</span>
            </div>
          </div>

          <div className="stats" style={{ marginTop: 72 }}>
            <div>
              <div className="stat-n"><CountUp to={1.07} decimals={2} suffix="M" /></div>
              <div className="label" style={{ marginTop: 4 }}>real transactions cleaned</div>
            </div>
            <div>
              <div className="stat-n"><CountUp to={31} suffix="%" /></div>
              <div className="label" style={{ marginTop: 4 }}>of revenue from the top 1% of customers</div>
            </div>
            <div>
              <div className="stat-n">£1.67M</div>
              <div className="label" style={{ marginTop: 4 }}>past revenue from customers who’ve gone quiet</div>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap grid-2" style={{ marginTop: 16 }}>
        <div className="tile" style={{ minHeight: 280, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 32 }}>
          <div>
            <div className="label">Building now</div>
            <h3 className="display h-s" style={{ marginTop: 8 }}>ApplyPilot</h3>
            <p className="body" style={{ marginTop: 12, maxWidth: 400, fontSize: 18 }}>
              A tracker for my own job search. Half tool, half excuse to get sharper at backend basics.
            </p>
          </div>
          <More href="/now">See progress</More>
        </div>
        <div className="tile" style={{ minHeight: 280, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 32 }}>
          <div>
            <div className="label">Ideas</div>
            <h3 className="display h-s" style={{ marginTop: 8 }}>Things I want to build next.</h3>
            <p className="body" style={{ marginTop: 12, maxWidth: 400, fontSize: 18 }}>
              If one of them overlaps with something you’re working on, I’d like to hear about it.
            </p>
          </div>
          <More href="/ideas">Read the list</More>
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: 128, textAlign: "center" }}>
        <h3 className="display h-m" style={{ fontSize: "clamp(32px, 5vw, 48px)" }}>Hiring a graduate backend engineer?</h3>
        <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", alignItems: "center" }}>
          <a className="btn btn-light" href={site.cv} target="_blank" rel="noopener">Download CV</a>
          <a className="more" href={`mailto:${site.email}`} style={{ padding: "16px 8px" }}>
            Email me <span className="chev" aria-hidden="true">›</span>
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
