export type Tab = "summary" | "competitors" | "replies";

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
    overall: 3.6,
    reviews: 359,
    recommend: 59,
    ceo: 80,
    ceoName: "John V. Oyler",
    outlook: 77,
    updates: 8,
    photos: 6,
    wlb: 3.2,
    culture: 3.4,
    management: 3.3,
    career: 3.5,
    comp: 4.3,
  },
  indeed: {
    name: "BeOne Medicines",
    url: "https://www.indeed.com/cmp/Beone-Medicines",
    overall: 3.4,
    reviews: 27,
    ceo: 79,
    ceoName: "John V. Oyler",
    wellbeing: 67,
    wellbeingLabel: "Below average",
    jobs: 122,
    newsUpdates: 3,
    wlb: 3.3,
    culture: 3.5,
    management: 3.4,
    career: 3.5,
    comp: 4.1,
  },
};

export const GLASSDOOR_ISSUES = [
  {
    issue: "Overall rating stuck at industry floor (3.6 vs AZ 4.0 / Amgen 3.8)",
    fix: "Treat Glassdoor as an active brand channel: claim/manage profile, respond to ≤2★ within 7 days, post weekly updates that prove WLB, recognition, and promo clarity.",
  },
  {
    issue: "Recommend-to-friend only 59% (AZ 79%, Amgen 65%, Gilead 62%)",
    fix: "Run post-onboarding and post-promotion pulse checks; close the gap between mission pride and day-to-day experience before asking for reviews.",
  },
  {
    issue: "Employer profile under-managed (Claim CTA; 8 updates / 6 photos vs peers with 65–440 updates)",
    fix: "Fully claim Employer Center access, replace BeiGene leftovers, expand photo library, match peer cadence (≥2 updates/week).",
  },
  {
    issue: "WLB 3.2 / senior management 3.3 / culture 3.4 — weakest categories",
    fix: "Operational fixes at Hopewell + San Carlos: manager coaching, recognition rituals, promo criteria published, workload/metric rationalization.",
  },
  {
    issue: "Jun–Jul 2026 1–2★ reviews dominate the first screen (Hopewell toxicity, layoffs, no promo)",
    fix: "Post measured employer responses now; pair with site-leadership action plans so replies are credible.",
  },
  {
    issue: "Comp is the only clear strength (4.3) and already −4% YoY",
    fix: "Protect pay narrative; communicate equity/bonus changes transparently so the last strong score doesn’t erode further.",
  },
];

export const INDEED_ISSUES = [
  {
    issue: "Overall 3.4 — below AZ/Amgen/BMS (~4.0–4.1) and thin sample (27 reviews)",
    fix: "Ethical experience-sharing after real wins; answer every new review; rebuild Why Join Us so the page doesn’t rely on 27 opinions.",
  },
  {
    issue: "2026 YTD average 1.0 from early 1★ reviews (culture dive, metrics overload)",
    fix: "Respond publicly within 7 days; invite private follow-up; show what changed on WLB, recognition, and planning.",
  },
  {
    issue: "Work wellbeing 67 (Below average) vs peers 73–76",
    fix: "Target Stress-free / Happiness drivers: meeting load, last-minute asks, recognition. Re-survey after 90 days of fixes.",
  },
  {
    issue: "122 open jobs vs weak employer content (3 news updates, revenue hidden)",
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
