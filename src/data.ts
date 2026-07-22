export type HomeTab = "overview" | "glassdoor" | "indeed" | "replies";

export type ReplyDraft = {
  id: string;
  platform: "Glassdoor" | "Indeed";
  meta: string;
  title: string;
  body: string;
};

export const BEONE = {
  glassdoor: {
    name: "BeOne",
    url: "https://www.glassdoor.com/Overview/Working-at-BeOne-EI_IE449972.11,16.htm",
    reviewsUrl: "https://www.glassdoor.com/Reviews/BeOne-Reviews-E449972.htm",
    overall: 3.6,
    reviews: 359,
    recommend: 59,
    ceo: 80,
    ceoName: "John V. Oyler",
    outlook: 77,
    updates: 8,
    photos: 6,
    jobs: 122,
    interviewPositivePct: 52,
    interviewDifficulty: 2.8,
    industryAvg: 3.5,
    compYoYChangePct: -4,
    categories: [
      { name: "Compensation & benefits", score: 4.3 },
      { name: "Diversity & inclusion", score: 3.6 },
      { name: "Career opportunities", score: 3.5 },
      { name: "Culture & values", score: 3.4 },
      { name: "Senior management", score: 3.3 },
      { name: "Work/Life balance", score: 3.2 },
    ],
    recentReviews: [
      {
        date: "Jul 1, 2026",
        rating: 2.0,
        role: "Anonymous · former · Hopewell, NJ",
        title: "Not a great place to work",
        summary: "Decent pay; overwork, no promo, micromanagement, toxic senior mgmt",
      },
      {
        date: "Jun 24, 2026",
        rating: 1.0,
        role: "Anonymous · former · Hopewell, NJ",
        title: "Toxic culture and poor work life balance",
        summary: "Competitive package; toxic site leadership; corners cut for timelines",
      },
      {
        date: "Jun 23, 2026",
        rating: 1.0,
        role: "Senior manager · current · San Carlos",
        title: "Chaotic leadership with no real direction",
        summary: "Overwork, no recognition, thin equity, layoffs, zero culture",
      },
    ],
  },
  indeed: {
    name: "BeOne Medicines",
    url: "https://www.indeed.com/cmp/Beone-Medicines",
    reviewsUrl: "https://www.indeed.com/cmp/Beone-Medicines/reviews",
    overall: 3.4,
    reviews: 27,
    ceo: 79,
    ceoName: "John V. Oyler",
    wellbeing: 67,
    wellbeingLabel: "Below average",
    jobs: 122,
    salaries: 412,
    qa: 21,
    newsUpdates: 3,
    categories: [
      { name: "Compensation & benefits", score: 4.1 },
      { name: "Culture", score: 3.5 },
      { name: "Job security & advancement", score: 3.5 },
      { name: "Management", score: 3.4 },
      { name: "Work & life balance", score: 3.3 },
    ],
    yearly: [
      { year: "2022", score: 2.33 },
      { year: "2023", score: 3.2 },
      { year: "2024", score: 3.25 },
      { year: "2025", score: 4.5 },
      { year: "2026", score: 1.0 },
    ],
    byTitle: [
      { title: "Executive Director", score: 5.0 },
      { title: "Director", score: 3.7 },
      { title: "Associate Director", score: 2.7 },
      { title: "Manager", score: 2.5 },
    ],
    recentReviews: [
      {
        date: "Jul 1, 2026",
        rating: 1.0,
        role: "Sr. Manager · San Carlos",
        title: "Culture took a dive",
        summary: "No WLB/recognition; promo blocked; equity/bonus cuts; layoffs",
      },
      {
        date: "Jun 16, 2026",
        rating: 1.0,
        role: "CRA · Australia",
        title: "Excessive metrics focus",
        summary: "CRO-like metrics burden; last-minute asks; career/equity cuts",
      },
      {
        date: "Jun 27, 2025",
        rating: 5.0,
        role: "Executive Director · Remote",
        title: "Excited to be at BeOne Medicines",
        summary: "Warm welcome; impressed with management & culture",
      },
      {
        date: "Jun 18, 2025",
        rating: 4.0,
        role: "Associate Director · San Carlos",
        title: "Opportunity for impact",
        summary: "Hardworking/caring culture; fantastic benefits",
      },
    ],
  },
};

export const GLASSDOOR_ISSUES = [
  {
    issue: "Overall rating at 3.6 — only ~industry average (3.5)",
    fix: "Treat Glassdoor as an active brand channel: claim/manage profile, respond to ≤2★ within 7 days, post weekly updates that prove WLB, recognition, and promo clarity.",
  },
  {
    issue: "Only 59% would recommend BeOne to a friend",
    fix: "Run post-onboarding and post-promotion pulse checks; close the gap between mission pride and day-to-day experience before asking for reviews.",
  },
  {
    issue: "Employer profile under-managed (Claim CTA; only 8 updates / 6 photos)",
    fix: "Fully claim Employer Center access, replace BeiGene leftovers, expand photo library, post ≥2 updates/week.",
  },
  {
    issue: "WLB 3.2 / senior management 3.3 / culture 3.4 — weakest categories",
    fix: "Operational fixes at Hopewell + San Carlos: manager coaching, recognition rituals, promo criteria published, workload/metric rationalization.",
  },
  {
    issue: "Jun–Jul 2026 1–2★ reviews dominate the first screen",
    fix: "Post measured employer responses now; pair with site-leadership action plans so replies are credible.",
  },
  {
    issue: "Comp is the only clear strength (4.3) and already −4% YoY",
    fix: "Protect pay narrative; communicate equity/bonus changes transparently so the last strong score doesn’t erode further.",
  },
];

export const INDEED_ISSUES = [
  {
    issue: "Overall 3.4 with a thin sample (27 reviews vs 122 open jobs)",
    fix: "Ethical experience-sharing after real wins; answer every new review; rebuild Why Join Us so the page doesn’t rely on 27 opinions.",
  },
  {
    issue: "2026 YTD average 1.0 from early 1★ reviews",
    fix: "Respond publicly within 7 days; invite private follow-up; show what changed on WLB, recognition, and planning.",
  },
  {
    issue: "Work wellbeing 67 (Below average); Stress-free rated Low",
    fix: "Target Stress-free / Happiness drivers: meeting load, last-minute asks, recognition. Re-survey after 90 days of fixes.",
  },
  {
    issue: "Why Join Us underbuilt (3 news updates, revenue hidden)",
    fix: "Enrich Why Join Us with benefits grid, EVP, photos, employee quotes; publish monthly updates; un-hide revenue band.",
  },
  {
    issue: "Mid-level titles rate poorly (Manager 2.5, Assoc. Director 2.7)",
    fix: "Focus people programs on manager/AD layers — promo windows, recognition, workload — where talent attrition risk is highest.",
  },
  {
    issue: "Q&A thin on promo / raises / vacation",
    fix: "Official employer answers on those threads so candidates aren’t left with rumor-only guidance.",
  },
];

export const SCORECARD = [
  {
    company: "BeOne",
    gd: "3.6",
    gdCeo: "80",
    gdRec: "59",
    indeed: "3.4",
    indeedCeo: "79",
    wellbeing: "67 · Below avg",
    updates: "8 / 6",
    highlight: "beone" as const,
  },
  {
    company: "AstraZeneca",
    gd: "4.0",
    gdCeo: "89",
    gdRec: "79",
    indeed: "4.0",
    indeedCeo: "68",
    wellbeing: "74 · Above avg",
    updates: "65 / 51",
    highlight: "peer" as const,
  },
  {
    company: "Amgen",
    gd: "3.8",
    gdCeo: "76",
    gdRec: "65",
    indeed: "4.0",
    indeedCeo: "69",
    wellbeing: "76 · High",
    updates: "440 / 79",
    highlight: "peer" as const,
  },
  {
    company: "Bristol Myers Squibb",
    gd: "3.7",
    gdCeo: "67",
    gdRec: "67",
    indeed: "4.1",
    indeedCeo: "57",
    wellbeing: "75 · Above avg",
    updates: "Engaged peer",
    highlight: "peer" as const,
  },
  {
    company: "Gilead Sciences",
    gd: "3.5",
    gdCeo: "70",
    gdRec: "62",
    indeed: "3.5",
    indeedCeo: "59",
    wellbeing: "73 · Above avg",
    updates: "122 / 29",
    highlight: "close" as const,
  },
];

export const REPLIES: ReplyDraft[] = [
  {
    id: "gd-hopewell-jul",
    platform: "Glassdoor",
    meta: "2.0★ · Jul 1, 2026 · Hopewell, NJ",
    title: "Not a great place to work",
    body: `Thank you for sharing this feedback — we’re sorry your experience included overwork, limited development, and a lack of respect from leadership. Those are not the standards we hold for BeOne. Recognition, promotion clarity, and how managers give feedback are active focus areas with our People and site leadership teams. If you’re willing to share more confidentially, please contact employer-brand@beonemedicines.com. — BeOne Medicines People Team`,
  },
  {
    id: "gd-hopewell-jun24",
    platform: "Glassdoor",
    meta: "1.0★ · Jun 24, 2026 · Hopewell, NJ",
    title: "Toxic culture and poor work life balance",
    body: `Thank you for taking the time to write this. We’re glad the compensation package was competitive, and we’re concerned by what you describe about site culture, work-life balance, and pressure on timelines. Quality and integrity are non-negotiable for us, and we are reviewing this feedback with Hopewell leadership and HR. Anyone with related concerns can also use our confidential reporting channels. Contact employer-brand@beonemedicines.com if you’d like a private conversation. — BeOne Medicines`,
  },
  {
    id: "gd-sancarlos-jun23",
    platform: "Glassdoor",
    meta: "1.0★ · Jun 23, 2026 · Senior manager · San Carlos",
    title: "Chaotic leadership with no real direction",
    body: `We’re sorry this has been your experience, and we hear the frustration around workload, recognition, equity, and job security. Feedback like this is hard — and necessary. Our People team is sharing these themes with leadership as we work on clearer advancement paths, more consistent recognition, and transparent communication about organizational changes. If you’d like to talk confidentially, reach employer-brand@beonemedicines.com. — BeOne Medicines People Team`,
  },
  {
    id: "in-culture-dive",
    platform: "Indeed",
    meta: "1.0★ · Jul 1, 2026 · Sr. Manager · San Carlos",
    title: "Culture took a dive",
    body: `Thank you for sharing this feedback — we’re sorry your experience fell short of what BeOne should be. Comments about recognition, promotion clarity, and how equity and bonus changes were communicated are being reviewed with our People and Leadership teams. Trust is earned through action. If you’re open to a confidential conversation, please reach employer-brand@beonemedicines.com. — BeOne Medicines People Team`,
  },
  {
    id: "in-metrics",
    platform: "Indeed",
    meta: "1.0★ · Jun 16, 2026 · CRA · Australia",
    title: "Excessive metrics focus",
    body: `Thank you for this detailed perspective. Feedback about metric load, last-minute requests, and career investment matters — especially in clinical operations where quality and planning are critical. We’re sharing these themes with Global Clinical Operations and People leaders. We’d welcome a private discussion: employer-brand@beonemedicines.com. — BeOne Medicines`,
  },
  {
    id: "in-excited",
    platform: "Indeed",
    meta: "5.0★ · Jun 27, 2025 · Executive Director",
    title: "Excited to be at BeOne Medicines",
    body: `Welcome — and thank you for sharing your early experience. We’re glad your team made you feel at home and that our patient mission is coming through. We’re excited about the impact you’ll make. — BeOne Medicines`,
  },
];

export const PLAN = [
  {
    week: "1",
    focus:
      "Claim/manage Glassdoor; scrub BeiGene media; reply to all Jun–Jul ≤2★ on both sites",
    done: "No unanswered 2026 negatives; Claim CTA gone / profile owned",
  },
  {
    week: "2",
    focus:
      "Hopewell + San Carlos leadership actions on culture, recognition, promo clarity",
    done: "Written action plan shared internally; 1 public update posted",
  },
  {
    week: "3",
    focus:
      "Rebuild Indeed Why Join Us; answer promo/raise/vacation Q&A; un-hide revenue",
    done: "Benefits + photos + EVP live; FAQ answered",
  },
  {
    week: "4",
    focus:
      "Weekly Glassdoor updates; mid-level manager program kickoff; follower tracking",
    done: "Cadence running; Employer Center dashboards reviewed",
  },
];

/** Verified public snapshots / yearly averages */
export const TRENDS = {
  glassdoor: [
    {
      period: "Mar 2022",
      label: "Mar 2022",
      company: 3.1,
      ceo: null as number | null,
      recommend: null as number | null,
      source: "Wayback · BeiGene overview",
    },
    {
      period: "Feb 2026",
      label: "Feb 2026",
      company: 3.9,
      ceo: 86,
      recommend: 73,
      source: "Wayback · BeOne overview",
    },
    {
      period: "Jul 2026",
      label: "Jul 2026",
      company: 3.6,
      ceo: 80,
      recommend: 59,
      source: "Live · BeOne overview",
    },
  ],
  indeedCompanyByYear: [
    { period: "2022", company: 2.33 },
    { period: "2023", company: 3.2 },
    { period: "2024", company: 3.25 },
    { period: "2025", company: 4.5 },
    { period: "2026", company: 1.0 },
  ],
  indeedCeo: [
    { period: "Jul 2026", ceo: 79 },
  ],
};
