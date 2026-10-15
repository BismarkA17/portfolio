import InView from "@/components/InView";

// Real monthly net revenue (£k) from the UCI Online Retail II dataset,
// Dec 2009 – Nov 2011 (the partial final month is left out).
const MONTHS = [
  778, 605, 525, 752, 636, 606, 670, 616, 662, 842, 1069, 1394,
  758, 579, 499, 679, 482, 731, 724, 677, 701, 1011, 1062, 1427,
];
const PEAK = new Set([9, 10, 11, 21, 22, 23]); // Sep–Nov each year
const MAX = 1450;

export default function RevenueBars({ height = 200 }: { height?: number }) {
  const w = 1000;
  const gap = 10;
  const bw = (w - gap * (MONTHS.length - 1)) / MONTHS.length;
  return (
    <InView className="bars" onClass="bars-on">
      <svg viewBox={`0 0 ${w} ${height}`} role="img"
        aria-label="Monthly revenue, December 2009 to November 2011, peaking every September to November"
        style={{ width: "100%", height: "auto", display: "block" }}>
        {MONTHS.map((v, i) => {
          const h = (v / MAX) * height;
          return (
            <rect key={i} className="bar" x={i * (bw + gap)} y={height - h} width={bw} height={h} rx={4}
              fill={PEAK.has(i) ? "var(--accent)" : "var(--line)"}
              style={{ transitionDelay: `${i * 45}ms` }} />
          );
        })}
      </svg>
    </InView>
  );
}
