import { useMemo, useState, type ReactNode } from "react";
import { Link, Route, Routes } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BEONE,
  GLASSDOOR_ISSUES,
  INDEED_ISSUES,
  PLAN,
  REPLIES,
  SCORECARD,
  TRENDS,
  type HomeTab,
  type ReplyDraft,
} from "./data";
import "./App.css";

type SortDir = "asc" | "desc";

type SortColumn<T> = {
  key: keyof T;
  label: string;
  type?: "string" | "number";
};

function compareValues(a: unknown, b: unknown, type: "string" | "number") {
  if (type === "number") {
    return Number(a ?? 0) - Number(b ?? 0);
  }
  return String(a ?? "").localeCompare(String(b ?? ""), undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

function useSortedRows<T>(rows: T[], columns: SortColumn<T>[], initialKey?: keyof T) {
  const [sortKey, setSortKey] = useState<keyof T | null>(initialKey ?? null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const sorted = useMemo(() => {
    if (sortKey == null) return rows;
    const col = columns.find((c) => c.key === sortKey);
    const type = col?.type ?? "string";
    const copy = [...rows];
    copy.sort((left, right) => {
      const result = compareValues(left[sortKey], right[sortKey], type);
      return sortDir === "asc" ? result : -result;
    });
    return copy;
  }, [rows, columns, sortKey, sortDir]);

  const toggle = (key: keyof T) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setSortDir("asc");
  };

  return { sorted, sortKey, sortDir, toggle };
}

function SortableHead<T>({
  columns,
  sortKey,
  sortDir,
  onSort,
}: {
  columns: SortColumn<T>[];
  sortKey: keyof T | null;
  sortDir: SortDir;
  onSort: (key: keyof T) => void;
}) {
  return (
    <thead>
      <tr>
        {columns.map((col) => {
          const active = sortKey === col.key;
          const arrow = !active ? "↕" : sortDir === "asc" ? "↑" : "↓";
          return (
            <th key={String(col.key)} scope="col">
              <button
                type="button"
                className={`sort-btn${active ? " active" : ""}`}
                onClick={() => onSort(col.key)}
                aria-label={`Sort by ${col.label}`}
              >
                <span>{col.label}</span>
                <span className="sort-arrow" aria-hidden="true">
                  {arrow}
                </span>
              </button>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

function CopyReply({ reply }: { reply: ReplyDraft }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(reply.body);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <article className="reply-card">
      <header className="reply-header">
        <div>
          <h3>{reply.title}</h3>
          <p className="meta">{reply.meta}</p>
        </div>
        <div className="reply-actions">
          <span className={`pill ${reply.platform === "Glassdoor" ? "pill-info" : "pill-warn"}`}>
            {reply.platform}
          </span>
          <button type="button" className="btn-primary" onClick={copy}>
            {copied ? "Copied" : "Copy reply"}
          </button>
        </div>
      </header>
      <pre className="reply-body">{reply.body}</pre>
    </article>
  );
}

const GLASSDOOR_TREND_COLUMNS: SortColumn<(typeof TRENDS.glassdoor)[number]>[] = [
  { key: "label", label: "Snapshot", type: "string" },
  { key: "company", label: "Company ★", type: "number" },
  { key: "ceo", label: "CEO approval", type: "number" },
  { key: "recommend", label: "Recommend", type: "number" },
];

const INDEED_TREND_COLUMNS: SortColumn<(typeof TRENDS.indeedCompanyByYear)[number]>[] = [
  { key: "period", label: "Year", type: "string" },
  { key: "company", label: "Company avg ★", type: "number" },
];

const GLASSDOOR_REVIEW_COLUMNS: SortColumn<(typeof BEONE.glassdoor.recentReviews)[number]>[] = [
  { key: "date", label: "Date", type: "string" },
  { key: "rating", label: "Rating", type: "number" },
  { key: "role", label: "Role", type: "string" },
  { key: "title", label: "Headline", type: "string" },
  { key: "summary", label: "Core message", type: "string" },
];

function ChartPanel({
  platform,
  subtitle,
  children,
}: {
  platform: "Glassdoor" | "Indeed";
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="chart-panel">
      <div className="chart-panel-head">
        <h3 className="chart-platform-name">{platform}</h3>
        <p className="muted chart-subtitle">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function RatingTrendsSection() {
  const glassdoorChart = TRENDS.glassdoor.map((d) => ({
    period: d.label,
    company: d.company,
    ceo: d.ceo,
  }));

  const glassdoorSort = useSortedRows(TRENDS.glassdoor, GLASSDOOR_TREND_COLUMNS);
  const indeedSort = useSortedRows(TRENDS.indeedCompanyByYear, INDEED_TREND_COLUMNS);

  return (
    <section className="stack tight">
      <h2>Rating trends — company & CEO</h2>
      <p className="muted">
        Named charts below: <strong>Glassdoor</strong> (point-in-time snapshots) and{" "}
        <strong>Indeed</strong> (yearly company averages). Click any column header to sort.
      </p>

      <div className="chart-stack">
        <ChartPanel platform="Glassdoor" subtitle="Company rating & CEO approval over time">
          <div className="chart" aria-label="Glassdoor rating trend chart">
            <ResponsiveContainer width="100%" height={320}>
              <ComposedChart data={glassdoorChart} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3344" />
                <XAxis dataKey="period" stroke="#9aa4b2" />
                <YAxis
                  yAxisId="company"
                  domain={[0, 5]}
                  stroke="#f0a202"
                  label={{ value: "Company (★)", angle: -90, position: "insideLeft", fill: "#9aa4b2" }}
                />
                <YAxis
                  yAxisId="ceo"
                  orientation="right"
                  domain={[50, 100]}
                  stroke="#4f8cff"
                  label={{ value: "CEO %", angle: 90, position: "insideRight", fill: "#9aa4b2" }}
                />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="company"
                  type="monotone"
                  dataKey="company"
                  name="Company rating"
                  stroke="#f0a202"
                  strokeWidth={2.5}
                  dot={{ r: 5 }}
                />
                <Line
                  yAxisId="ceo"
                  type="monotone"
                  dataKey="ceo"
                  name="CEO approval %"
                  stroke="#4f8cff"
                  strokeWidth={2.5}
                  dot={{ r: 5 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <p className="muted">
            Company: 3.1 → 3.9 → 3.6. CEO: 74% → 86% → 80%. Recommend: 51% → 73% → 59%.
          </p>
          <div className="table-wrap">
            <table aria-label="Glassdoor rating trend data">
              <SortableHead
                columns={GLASSDOOR_TREND_COLUMNS}
                sortKey={glassdoorSort.sortKey}
                sortDir={glassdoorSort.sortDir}
                onSort={glassdoorSort.toggle}
              />
              <tbody>
                {glassdoorSort.sorted.map((row) => (
                  <tr key={`gd-${row.period}`}>
                    <td>{row.label}</td>
                    <td>{row.company.toFixed(1)}</td>
                    <td>{row.ceo}%</td>
                    <td>{row.recommend}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartPanel>

        <ChartPanel platform="Indeed" subtitle="Company rating by year">
          <div className="chart" aria-label="Indeed rating trend chart">
            <ResponsiveContainer width="100%" height={320}>
              <ComposedChart data={TRENDS.indeedCompanyByYear}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3344" />
                <XAxis dataKey="period" stroke="#9aa4b2" />
                <YAxis domain={[0, 5]} stroke="#9aa4b2" />
                <Tooltip />
                <Legend />
                <ReferenceLine y={3.4} stroke="#9aa4b2" strokeDasharray="4 4" label="Current overall" />
                <Bar dataKey="company" name="Company avg (★)" fill="#4f8cff" radius={4} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <p className="muted">
            Year buckets from Indeed’s rating overview: 2.33 → 3.20 → 3.25 → 4.50 → 1.00 (2026
            YTD, thin sample). Current CEO approval is {TRENDS.indeedCeoCurrent}% — not tied to a
            year.
          </p>
          <div className="table-wrap">
            <table aria-label="Indeed rating trend data">
              <SortableHead
                columns={INDEED_TREND_COLUMNS}
                sortKey={indeedSort.sortKey}
                sortDir={indeedSort.sortDir}
                onSort={indeedSort.toggle}
              />
              <tbody>
                {indeedSort.sorted.map((row) => (
                  <tr key={`in-${row.period}`}>
                    <td>{row.period}</td>
                    <td>{row.company.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="muted">
            CEO approval (current only): <strong>{TRENDS.indeedCeoCurrent}%</strong>
          </p>
        </ChartPanel>
      </div>
    </section>
  );
}

function OverviewTab() {
  return (
    <div className="stack">
      <div className="callout callout-warn">
        <strong>Bottom line</strong>
        <p>
          BeOne sits near industry average on Glassdoor (3.6) and weaker on Indeed
          (3.4). Comp is the clear strength; WLB, management trust, unanswered 2026
          negatives, and thin employer-page content are the priorities.
        </p>
      </div>

      <div className="stats">
        <div className="stat">
          <div className="stat-value warn">{BEONE.glassdoor.overall}</div>
          <div className="stat-label">Glassdoor overall · {BEONE.glassdoor.reviews} ratings</div>
        </div>
        <div className="stat">
          <div className="stat-value warn">{BEONE.indeed.overall}</div>
          <div className="stat-label">Indeed overall · {BEONE.indeed.reviews} reviews</div>
        </div>
        <div className="stat">
          <div className="stat-value warn">{BEONE.glassdoor.ceo}%</div>
          <div className="stat-label">Glassdoor CEO approval</div>
        </div>
        <div className="stat">
          <div className="stat-value warn">{BEONE.indeed.wellbeing}</div>
          <div className="stat-label">Indeed wellbeing · {BEONE.indeed.wellbeingLabel}</div>
        </div>
      </div>

      <RatingTrendsSection />

      <section>
        <h2>Glassdoor — main issues & fixes</h2>
        <p className="muted">
          <a href={BEONE.glassdoor.url} target="_blank" rel="noreferrer">
            Open Glassdoor profile
          </a>{" "}
          · Jul 22, 2026
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Main issue</th>
                <th>How to fix</th>
              </tr>
            </thead>
            <tbody>
              {GLASSDOOR_ISSUES.map((row) => (
                <tr key={row.issue}>
                  <td>{row.issue}</td>
                  <td>{row.fix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Indeed — main issues & fixes</h2>
        <p className="muted">
          <a href={BEONE.indeed.url} target="_blank" rel="noreferrer">
            Open Indeed company page
          </a>{" "}
          · Jul 22, 2026
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Main issue</th>
                <th>How to fix</th>
              </tr>
            </thead>
            <tbody>
              {INDEED_ISSUES.map((row) => (
                <tr key={row.issue}>
                  <td>{row.issue}</td>
                  <td>{row.fix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>30-day fix order</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Week</th>
                <th>Focus</th>
                <th>Done when</th>
              </tr>
            </thead>
            <tbody>
              {PLAN.map((row) => (
                <tr key={row.week}>
                  <td>{row.week}</td>
                  <td>{row.focus}</td>
                  <td>{row.done}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function GlassdoorTab() {
  const cats = [...BEONE.glassdoor.categories].reverse();
  const glassdoorReviewSort = useSortedRows(BEONE.glassdoor.recentReviews, GLASSDOOR_REVIEW_COLUMNS);

  return (
    <div className="stack">
      <div className="pill-row">
        <span className="pill pill-info">Listed as BeOne</span>
        <span className="pill pill-warn">Comp −4% YoY</span>
        <span className="pill">CEO: {BEONE.glassdoor.ceoName}</span>
      </div>

      <div className="stats">
        <div className="stat">
          <div className="stat-value warn">{BEONE.glassdoor.overall}</div>
          <div className="stat-label">Company rating</div>
        </div>
        <div className="stat">
          <div className="stat-value warn">{BEONE.glassdoor.ceo}%</div>
          <div className="stat-label">CEO approval</div>
        </div>
        <div className="stat">
          <div className="stat-value warn">{BEONE.glassdoor.recommend}%</div>
          <div className="stat-label">Recommend to a friend</div>
        </div>
        <div className="stat">
          <div className="stat-value">{BEONE.glassdoor.outlook}%</div>
          <div className="stat-label">Positive business outlook</div>
        </div>
      </div>

      <div className="stats stats-3">
        <div className="stat">
          <div className="stat-value">{BEONE.glassdoor.jobs}</div>
          <div className="stat-label">US jobs listed</div>
        </div>
        <div className="stat">
          <div className="stat-value">{BEONE.glassdoor.updates}</div>
          <div className="stat-label">Company updates</div>
        </div>
        <div className="stat">
          <div className="stat-value">{BEONE.glassdoor.photos}</div>
          <div className="stat-label">Photos on profile</div>
        </div>
      </div>

      <section>
        <h2>Ratings by category</h2>
        <div className="chart">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={cats} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3344" />
              <XAxis type="number" domain={[0, 5]} stroke="#9aa4b2" />
              <YAxis type="category" dataKey="name" width={160} stroke="#9aa4b2" />
              <Tooltip />
              <Bar dataKey="score" name="Score" fill="#f0a202" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="muted">
          Industry average ~{BEONE.glassdoor.industryAvg}. Softest: work/life balance.
        </p>
      </section>

      <section>
        <h2>Last 20 Glassdoor reviews</h2>
        <p className="muted">Most recent, sorted by date on Glassdoor · captured Jul 22, 2026</p>
        <div className="table-wrap">
          <table aria-label="Last 20 Glassdoor reviews">
            <SortableHead
              columns={GLASSDOOR_REVIEW_COLUMNS}
              sortKey={glassdoorReviewSort.sortKey}
              sortDir={glassdoorReviewSort.sortDir}
              onSort={glassdoorReviewSort.toggle}
            />
            <tbody>
              {glassdoorReviewSort.sorted.map((r) => (
                <tr key={`${r.date}-${r.title}`}>
                  <td>{r.date}</td>
                  <td>{r.rating.toFixed(1)}</td>
                  <td>{r.role}</td>
                  <td>{r.title}</td>
                  <td>{r.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="callout callout-warn">
        <strong>Profile engagement gap</strong>
        <p>
          “Claim your free Employer Profile” still appears. Some culture videos still
          brand as BeiGene. Interview experience is only{" "}
          {BEONE.glassdoor.interviewPositivePct}% positive (difficulty{" "}
          {BEONE.glassdoor.interviewDifficulty}/5).
        </p>
      </div>

      <section>
        <h2>Glassdoor</h2>
        <p className="muted">Company rating & CEO approval over time</p>
        <div className="chart" aria-label="Glassdoor rating trend chart">
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart
              data={TRENDS.glassdoor.map((d) => ({
                period: d.label,
                company: d.company,
                ceo: d.ceo,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3344" />
              <XAxis dataKey="period" stroke="#9aa4b2" />
              <YAxis yAxisId="company" domain={[0, 5]} stroke="#f0a202" />
              <YAxis yAxisId="ceo" orientation="right" domain={[50, 100]} stroke="#4f8cff" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="company"
                type="monotone"
                dataKey="company"
                name="Company rating"
                stroke="#f0a202"
                strokeWidth={2.5}
                dot={{ r: 5 }}
              />
              <Line
                yAxisId="ceo"
                type="monotone"
                dataKey="ceo"
                name="CEO approval %"
                stroke="#4f8cff"
                strokeWidth={2.5}
                dot={{ r: 5 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <p className="muted">
          Company 3.1 → 3.9 → 3.6 · CEO 74% → 86% → 80% · Sources: Wayback + live
        </p>
      </section>
    </div>
  );
}

function IndeedTab() {
  const cats = [...BEONE.indeed.categories].reverse();

  return (
    <div className="stack">
      <div className="pill-row">
        <span className="pill pill-info">Listed as BeOne Medicines</span>
        <span className="pill pill-danger">2026 YTD 1.0★</span>
        <span className="pill pill-warn">Wellbeing {BEONE.indeed.wellbeing}</span>
      </div>

      <div className="stats">
        <div className="stat">
          <div className="stat-value warn">{BEONE.indeed.overall}</div>
          <div className="stat-label">Company rating · {BEONE.indeed.reviews} reviews</div>
        </div>
        <div className="stat">
          <div className="stat-value warn">{BEONE.indeed.ceo}%</div>
          <div className="stat-label">CEO approval</div>
        </div>
        <div className="stat">
          <div className="stat-value">{BEONE.indeed.jobs}</div>
          <div className="stat-label">Open jobs · {BEONE.indeed.salaries} salaries</div>
        </div>
        <div className="stat">
          <div className="stat-value">{BEONE.indeed.qa}</div>
          <div className="stat-label">Q&A threads</div>
        </div>
      </div>

      <div className="two-col">
        <section>
          <h2>Category ratings</h2>
          <div className="chart">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={cats} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3344" />
                <XAxis type="number" domain={[0, 5]} stroke="#9aa4b2" />
                <YAxis type="category" dataKey="name" width={170} stroke="#9aa4b2" />
                <Tooltip />
                <Bar dataKey="score" fill="#f0a202" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
        <section>
          <h2>Indeed</h2>
          <p className="muted">Company rating by year</p>
          <div className="chart" aria-label="Indeed rating trend chart">
            <ResponsiveContainer width="100%" height={260}>
              <ComposedChart data={TRENDS.indeedCompanyByYear}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3344" />
                <XAxis dataKey="period" stroke="#9aa4b2" />
                <YAxis domain={[0, 5]} stroke="#9aa4b2" />
                <Tooltip />
                <Legend />
                <ReferenceLine y={3.4} stroke="#9aa4b2" strokeDasharray="4 4" label="Current overall" />
                <Bar dataKey="company" name="Company avg (★)" fill="#4f8cff" radius={4} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <p className="muted">
            Company climbed to 4.5 in 2025, then 2026 YTD fell to 1.0. CEO approval is currently{" "}
            {BEONE.indeed.ceo}% (Indeed does not publish a yearly CEO series).
          </p>
        </section>
      </div>

      <section>
        <h2>Ratings by job title</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Job title</th>
                <th>Avg rating</th>
              </tr>
            </thead>
            <tbody>
              {BEONE.indeed.byTitle.map((r) => (
                <tr key={r.title}>
                  <td>{r.title}</td>
                  <td>{r.score.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Recent reviews</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Rating</th>
                <th>Role</th>
                <th>Headline</th>
                <th>Core message</th>
              </tr>
            </thead>
            <tbody>
              {BEONE.indeed.recentReviews.map((r) => (
                <tr key={`${r.date}-${r.title}`}>
                  <td>{r.date}</td>
                  <td>{r.rating.toFixed(1)}</td>
                  <td>{r.role}</td>
                  <td>{r.title}</td>
                  <td>{r.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function RepliesTab() {
  return (
    <div className="stack">
      <div className="callout callout-info">
        <strong>How to use</strong>
        <p>
          Click Copy reply, then paste into the Glassdoor or Indeed employer response
          box. Have Legal/HR review replies that touch compliance, layoffs, or named
          leadership before posting.
        </p>
      </div>

      <section>
        <h2>Glassdoor drafts</h2>
        <div className="stack tight">
          {REPLIES.filter((r) => r.platform === "Glassdoor").map((r) => (
            <CopyReply key={r.id} reply={r} />
          ))}
        </div>
      </section>

      <section>
        <h2>Indeed drafts</h2>
        <div className="stack tight">
          {REPLIES.filter((r) => r.platform === "Indeed").map((r) => (
            <CopyReply key={r.id} reply={r} />
          ))}
        </div>
      </section>
    </div>
  );
}

function HomePage() {
  const [tab, setTab] = useState<HomeTab>("overview");

  return (
    <div className="page">
      <header className="hero">
        <div className="hero-top">
          <p className="eyebrow">Employer brand audit</p>
          <Link className="nav-link" to="/competitors">
            View competitors →
          </Link>
        </div>
        <h1>BeOne Reputation</h1>
        <p className="lede">
          Glassdoor & Indeed issues, ratings, and copyable review replies for BeOne
          Medicines. Data captured Jul 22, 2026.
        </p>
        <nav className="tabs" aria-label="BeOne sections">
          {(
            [
              ["overview", "Issues & fixes"],
              ["glassdoor", "Glassdoor"],
              ["indeed", "Indeed"],
              ["replies", "Copy replies"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={tab === id ? "tab active" : "tab"}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      <main>
        {tab === "overview" && <OverviewTab />}
        {tab === "glassdoor" && <GlassdoorTab />}
        {tab === "indeed" && <IndeedTab />}
        {tab === "replies" && <RepliesTab />}
      </main>

      <footer className="footer">
        BeOne Medicines · formerly BeiGene ·{" "}
        <Link to="/competitors">Competitor benchmarks</Link>
      </footer>
    </div>
  );
}

function CompetitorsPage() {
  const gdChart = [
    { name: "BeOne", score: 3.6 },
    { name: "Gilead", score: 3.5 },
    { name: "BMS", score: 3.7 },
    { name: "Amgen", score: 3.8 },
    { name: "AstraZeneca", score: 4.0 },
  ];
  const indeedChart = [
    { name: "BeOne", score: 3.4 },
    { name: "Gilead", score: 3.5 },
    { name: "AstraZeneca", score: 4.0 },
    { name: "Amgen", score: 4.0 },
    { name: "BMS", score: 4.1 },
  ];
  const categoryGap = [
    { name: "Comp", BeOne: 4.3, AstraZeneca: 4.1 },
    { name: "Culture", BeOne: 3.4, AstraZeneca: 3.9 },
    { name: "Career", BeOne: 3.5, AstraZeneca: 3.7 },
    { name: "Management", BeOne: 3.3, AstraZeneca: 3.5 },
    { name: "WLB", BeOne: 3.2, AstraZeneca: 3.8 },
  ];

  return (
    <div className="page">
      <header className="hero">
        <div className="hero-top">
          <p className="eyebrow">Peer benchmarks</p>
          <Link className="nav-link" to="/">
            ← Back to BeOne
          </Link>
        </div>
        <h1>Competitors</h1>
        <p className="lede">
          AstraZeneca, Amgen, Bristol Myers Squibb, and Gilead vs BeOne. Public
          Glassdoor & Indeed data · Jul 22, 2026.
        </p>
      </header>

      <main className="stack">
        <section>
          <h2>Overall rating — Glassdoor</h2>
          <div className="chart">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={gdChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3344" />
                <XAxis dataKey="name" stroke="#9aa4b2" />
                <YAxis domain={[0, 5]} stroke="#9aa4b2" />
                <Tooltip />
                <Bar dataKey="score" name="Glassdoor overall" fill="#f0a202" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section>
          <h2>Overall rating — Indeed</h2>
          <div className="chart">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={indeedChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3344" />
                <XAxis dataKey="name" stroke="#9aa4b2" />
                <YAxis domain={[0, 5]} stroke="#9aa4b2" />
                <Tooltip />
                <Bar dataKey="score" name="Indeed overall" fill="#4f8cff" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section>
          <h2>Scorecard</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>GD overall</th>
                  <th>GD CEO %</th>
                  <th>GD recommend %</th>
                  <th>Indeed overall</th>
                  <th>Indeed CEO %</th>
                  <th>Indeed wellbeing</th>
                  <th>GD updates / photos</th>
                </tr>
              </thead>
              <tbody>
                {SCORECARD.map((row) => (
                  <tr key={row.company} className={`row-${row.highlight}`}>
                    <td>{row.company}</td>
                    <td>{row.gd}</td>
                    <td>{row.gdCeo}</td>
                    <td>{row.gdRec}</td>
                    <td>{row.indeed}</td>
                    <td>{row.indeedCeo}</td>
                    <td>{row.wellbeing}</td>
                    <td>{row.updates}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="two-col">
          <article className="card">
            <h3>AstraZeneca / Amgen pattern</h3>
            <p>
              Engaged Employer badge, awards surface, rich Why Work With Us modules,
              high update volume, large photo libraries.
            </p>
            <p className="muted">
              Stronger recommend rates and Indeed wellbeing even when category scores
              aren’t perfect.
            </p>
          </article>
          <article className="card">
            <h3>Gilead pattern (closer peer)</h3>
            <p>
              Similar overall (~3.5) and WLB pressure, but 2K+ Glassdoor reviews, 122
              updates, structured EVP tabs, and Engaged Employer management.
            </p>
            <p className="muted">
              BeOne’s CEO approval (80% GD / 79% Indeed) is stronger than Gilead/BMS —
              use that while fixing culture operations.
            </p>
          </article>
        </div>

        <section>
          <h2>Glassdoor category gap vs AstraZeneca</h2>
          <div className="chart">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={categoryGap}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3344" />
                <XAxis dataKey="name" stroke="#9aa4b2" />
                <YAxis domain={[0, 5]} stroke="#9aa4b2" />
                <Tooltip />
                <Legend />
                <Bar dataKey="BeOne" fill="#f0a202" radius={4} />
                <Bar dataKey="AstraZeneca" fill="#3ecf8e" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="muted">
            BeOne leads on comp; trails AZ on culture, career, management, and WLB.
          </p>
        </section>
      </main>

      <footer className="footer">
        <Link to="/">← Back to BeOne Reputation</Link>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/competitors" element={<CompetitorsPage />} />
    </Routes>
  );
}
