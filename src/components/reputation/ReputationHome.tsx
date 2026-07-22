"use client";

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
  TRENDS,
  type HomeTab,
} from "@/lib/reputation/data";
import { RatingTrendsSection } from "./RatingTrendsSection";
import { CompetitorsTab } from "./CompetitorsPage";
import { CopyReply, SortableHead, useSortedRows, type SortColumn } from "./shared";

const GLASSDOOR_REVIEW_COLUMNS: SortColumn<(typeof BEONE.glassdoor.recentReviews)[number]>[] = [
  { key: "date", label: "Date", type: "string" },
  { key: "rating", label: "Rating", type: "number" },
  { key: "role", label: "Role", type: "string" },
  { key: "title", label: "Headline", type: "string" },
  { key: "summary", label: "Core message", type: "string" },
];

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
          Company 3.1 → 3.9 → 3.6 · CEO 74% → 86% → 80% · Wayback + live
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

export function ReputationHome({ tab }: { tab: HomeTab }) {
  return (
    <div className="reputation-shell">
      <div className="page">
        <header className="hero">
          <div className="hero-top">
            <p className="eyebrow">Employer brand audit</p>
          </div>
          <h1>BeOne Reputation</h1>
          <p className="lede">
            Glassdoor & Indeed issues, ratings, and copyable review replies for BeOne
            Medicines. Data captured Jul 22, 2026.
          </p>
        </header>

        <main>
          {tab === "overview" && <OverviewTab />}
          {tab === "glassdoor" && <GlassdoorTab />}
          {tab === "indeed" && <IndeedTab />}
          {tab === "competitors" && <CompetitorsTab />}
          {tab === "replies" && <RepliesTab />}
        </main>

        <footer className="footer">
          BeOne Medicines · formerly BeiGene · Data captured Jul 22, 2026
        </footer>
      </div>
    </div>
  );
}
