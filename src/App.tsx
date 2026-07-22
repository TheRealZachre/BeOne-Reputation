import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
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
  type ReplyDraft,
  type Tab,
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

function SummaryTab() {
  return (
    <div className="stack">
      <div className="callout callout-warn">
        <strong>Bottom line</strong>
        <p>
          BeOne trails AstraZeneca, Amgen, and BMS on overall ratings and employer-page
          maturity. Comp remains a relative strength; WLB, management trust, review
          response, and profile content are the gaps to close first.
        </p>
      </div>

      <div className="stats">
        <div className="stat">
          <div className="stat-value warn">3.6</div>
          <div className="stat-label">Glassdoor BeOne</div>
        </div>
        <div className="stat">
          <div className="stat-value warn">3.4</div>
          <div className="stat-label">Indeed BeOne</div>
        </div>
        <div className="stat">
          <div className="stat-value ok">4.0</div>
          <div className="stat-label">AZ Glassdoor / Indeed</div>
        </div>
        <div className="stat">
          <div className="stat-value warn">67</div>
          <div className="stat-label">BeOne wellbeing (Indeed)</div>
        </div>
      </div>

      <section>
        <h2>Glassdoor — main issues & fixes</h2>
        <p className="muted">
          Live profile: BeOne ·{" "}
          <a href={BEONE.glassdoor.url} target="_blank" rel="noreferrer">
            open page
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
          Live profile: BeOne Medicines ·{" "}
          <a href={BEONE.indeed.url} target="_blank" rel="noreferrer">
            open page
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

function CompetitorsTab() {
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
    <div className="stack">
      <p className="muted">
        Peer set for oncology talent competition: AstraZeneca, Amgen, Bristol Myers
        Squibb, Gilead. Pulled Jul 22, 2026 from public Glassdoor + Indeed pages.
      </p>

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
            Result: stronger recommend rates and Indeed wellbeing even when category
            scores aren’t perfect.
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
          box. Have Legal/HR review any reply that touches compliance, layoffs
          process, or named leadership before posting.
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

export default function App() {
  const [tab, setTab] = useState<Tab>("summary");

  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">Employer brand audit</p>
        <h1>BeOne Reputation</h1>
        <p className="lede">
          Glassdoor & Indeed issues, fixes, competitor benchmarks, and copyable
          review replies. Data captured Jul 22, 2026.
        </p>
        <nav className="tabs" aria-label="Sections">
          {(
            [
              ["summary", "Issues & fixes"],
              ["competitors", "Competitors"],
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
        {tab === "summary" && <SummaryTab />}
        {tab === "competitors" && <CompetitorsTab />}
        {tab === "replies" && <RepliesTab />}
      </main>

      <footer className="footer">
        BeOne Medicines · formerly BeiGene · public Glassdoor & Indeed data
      </footer>
    </div>
  );
}
