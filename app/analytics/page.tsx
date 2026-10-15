import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import More from "@/components/More";
import CountUp from "@/components/CountUp";
import InView from "@/components/InView";
import RevenueBars from "@/components/RevenueBars";
import { asset, site } from "@/lib";

export const metadata: Metadata = {
  title: "Retail Analytics",
  description: "SQL analysis of 1.07 million real retail transactions: customer concentration, churn risk, retention, seasonality and returns.",
};

const FINDINGS = [
  { n: "31%", what: "of revenue comes from the top 1% of customers", so: "The top 20% bring in 77%. Losing a few key accounts would hurt more than losing thousands of small ones, so they need account management, not generic marketing." },
  { n: "£1.67M", what: "of past revenue sits with 1,206 customers who’ve gone quiet", so: "They used to order regularly, but their median last order was over a year ago. Winning back even 1 in 10 would recover around £170k at their past spend." },
  { n: "21%", what: "of new customers order again the next month", so: "28% only ever ordered once. Getting a second order looks like the cheapest growth lever the business has." },
  { n: "37.5%", what: "of a year’s revenue lands in September to November", so: "Outside the pre-Christmas run, revenue was flat year on year (+1.9%). Stock, staff and cash flow have to be planned around three months." },
  { n: "1 in 3", what: "pounds of “returns” came from two typing mistakes", so: "One order for 80,995 units (£168k) was cancelled 12 minutes later. That’s a data-quality problem, not unhappy customers. A simple quantity check would catch it." },
];

const STEPS = [
  { tag: "extract", name: "UCI dataset", text: "1,067,371 real line items from a UK online gift wholesaler, Dec 2009 to Dec 2011." },
  { tag: "clean", name: "Python ETL", text: "Duplicates, postage, fees and bad prices removed, with a count for every rule." },
  { tag: "store", name: "Parquet", text: "1,021,128 clean rows, compressed to 7 MB." },
  { tag: "analyse", name: "SQL on DuckDB", text: "One query per question: cohorts, RFM scoring, Pareto curve, returns." },
  { tag: "present", name: "Streamlit", text: "Five-tab dashboard. Every finding updates as you filter." },
];

const SPECS = [
  { k: "Analysis", v: "SQL: CTEs, window functions (CUME_DIST, FIRST_VALUE, running totals), FILTER clauses, table macros" },
  { k: "Data engineering", v: "Python and pandas ETL, Parquet, DuckDB, a cleaning report showing rows removed per rule" },
  { k: "Customer analytics", v: "RFM segmentation, monthly cohort retention, customer concentration (Pareto)" },
  { k: "Dashboard", v: "Streamlit and Plotly, KPIs compared with the previous period, works in light and dark mode" },
  { k: "Testing", v: "Every query checked against hand-calculated answers, plus an app smoke test, in GitHub Actions CI" },
];

export default function Analytics() {
  return (
    <>
      <div className="subnav">
        <div className="wrap inner">
          <Link href="/" className="title">Retail Analytics</Link>
          <div className="links">
            <a href="#findings">Findings</a>
            <a href="#how">How it works</a>
            <a href="#specs">Specs</a>
            <a className="btn btn-accent btn-sm" href={site.analyticsRepo}>View code</a>
          </div>
        </div>
      </div>

      <header className="wrap" style={{ paddingTop: 136, textAlign: "center" }}>
        <h1 className="display h-xl" style={{ letterSpacing: "-0.05em" }}>Retail Analytics</h1>
        <p style={{ margin: "24px auto 0", maxWidth: 760, fontSize: "clamp(22px, 3vw, 32px)", lineHeight: 1.25, fontWeight: 500, letterSpacing: "-0.02em", color: "var(--text-2)" }}>
          A million real orders.<br />Who really pays the bills, and where the money leaks.
        </p>
      </header>

      <section className="wrap" style={{ paddingTop: 96 }}>
        <div className="chart-card">
          <RevenueBars height={220} />
          <div className="mono" style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "space-between", fontSize: 12, color: "var(--text-3)" }}>
            <span>net revenue by month, Dec 2009 – Nov 2011</span>
            <span style={{ color: "var(--accent)" }}>September–November</span>
          </div>
        </div>
      </section>

      <section className="wrap section" style={{ textAlign: "center" }}>
        <p className="lede" style={{ fontSize: "clamp(20px, 2.6vw, 28px)" }}>Out of 5,852 customers,</p>
        <div className="giant" style={{ marginTop: 8 }}><CountUp to={1} suffix="%" duration={1200} /></div>
        <p className="lede" style={{ marginTop: 16, fontSize: "clamp(20px, 2.6vw, 28px)" }}>bring in almost a third of all revenue.</p>
        <div style={{ margin: "96px auto 0", maxWidth: 820, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 48, textAlign: "left" }}>
          <div>
            <div className="big-n"><CountUp to={1021128} /></div>
            <p className="body" style={{ marginTop: 8 }}>real transactions cleaned and analysed, worth £18.9M.</p>
          </div>
          <div>
            <div className="big-n"><CountUp to={10} /></div>
            <p className="body" style={{ marginTop: 8 }}>SQL queries, each answering one business question, each tested.</p>
          </div>
        </div>
      </section>

      <section id="findings" className="wrap section">
        <h2 className="display h-m">Five findings.<br /><span className="dim">Each one is a decision.</span></h2>
        <div className="rule-top" style={{ marginTop: 64 }}>
          {FINDINGS.map((f) => (
            <div className="fail-row" key={f.n}>
              <div>
                <div className="big-n" style={{ color: "var(--accent)", fontSize: 44 }}>{f.n}</div>
                <div style={{ marginTop: 8, fontSize: 19 }}>{f.what}</div>
              </div>
              <div style={{ color: "var(--text-2)" }}>{f.so}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap section">
        <h2 className="display h-m">The dashboard.<br /><span className="dim">Filter it, and the findings follow.</span></h2>
        <div style={{ marginTop: 64 }}>
          <img className="shot" src={asset("/analytics/revenue.png")} alt="Dashboard revenue tab: KPIs and monthly revenue chart" loading="lazy" />
          <p className="shot-cap">Revenue tab: KPIs against the previous period, with the seasonal peak called out.</p>
        </div>
        <div style={{ marginTop: 48 }}>
          <img className="shot" src={asset("/analytics/customers.png")} alt="Dashboard customers tab: RFM segments and customer concentration curve" loading="lazy" />
          <p className="shot-cap">Customers tab: RFM segments and the concentration curve.</p>
        </div>
      </section>

      <section id="how" className="wrap section">
        <h2 className="display h-m">Raw spreadsheet to answers.<br /><span className="dim">The logic lives in SQL.</span></h2>
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

      <section className="wrap section">
        <h2 className="display h-m">Version one was weak.<br /><span className="dim">So I rebuilt it.</span></h2>
        <p className="body" style={{ marginTop: 24, maxWidth: 640, fontSize: 21 }}>
          The first version ran on randomly generated sales. It looked like a dashboard, but every filter showed the same
          thing, because random data has nothing to find. Version two uses real orders, puts the analysis in tested SQL,
          and starts from questions a business would actually ask.
        </p>
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
        <h2 className="display h-m" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>Read the queries.</h2>
        <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: "16px 32px", justifyContent: "center", alignItems: "center" }}>
          <a className="btn btn-accent" href={site.analyticsRepo}>Open on GitHub</a>
          <More href="/">Back to home</More>
        </div>
      </section>

      <Footer left="Retail Analytics · data: UCI Online Retail II (CC BY 4.0)" />
    </>
  );
}
