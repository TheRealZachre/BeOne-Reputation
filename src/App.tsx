import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
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
  type HomeTab,
  type ReplyDraft,
} from "./data";
import "./App.css";

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
        <h2>Most recent reviews</h2>
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
              {BEONE.glassdoor.recentReviews.map((r) => (
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
          <h2>Average rating by year</h2>
          <div className="chart">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={BEONE.indeed.yearly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3344" />
                <XAxis dataKey="year" stroke="#9aa4b2" />
                <YAxis domain={[0, 5]} stroke="#9aa4b2" />
                <Tooltip />
                <ReferenceLine y={3.4} stroke="#9aa4b2" strokeDasharray="4 4" label="Current" />
                <Line
                  type="monotone"
                  dataKey="score"
                  name="Indeed avg"
                  stroke="#ff6b6b"
                  strokeWidth={2}
                  dot
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="muted">2025 peak then 2026 YTD collapse from early 1★ reviews.</p>
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
