# BeOne Reputation

Employer-brand audit for **BeOne Medicines** covering Glassdoor and Indeed:

- Main issues and fixes per platform
- Competitor benchmarks (AstraZeneca, Amgen, BMS, Gilead)
- Copyable review reply drafts
- **Platform Admin** — create/list/delete user accounts (admin-only)

Data snapshot: July 22, 2026 (public pages).

## Develop

```bash
cp .env.example .env.local   # set AUTH_SECRET
npm install
npm run dev
```

Open http://localhost:3000 — you’ll be prompted to sign in.

### Seed admin

| Field | Value |
|-------|-------|
| Username | `admin` |
| Email | `admin@beone.com` |
| Password | `BeOneAdmin1!` |

Change this password after first login in production.

## Routes

| Path | Access |
|------|--------|
| `/login` | Public |
| `/` Overview | Signed in |
| `/glassdoor` · `/indeed` · `/replies` · `/competitors` | Signed in |
| `/admin` | Admin role only |

## Build

```bash
npm run build
npm start
```

## Deploy (Cloudflare Workers + OpenNext)

```bash
npm run deploy
```

Production URL: https://beonereputation.vibecodeflow.com

Requires Wrangler authenticated (`npx wrangler login`) and `AUTH_SECRET` set as a Worker secret:

```bash
echo "<secret>" | npx wrangler secret put AUTH_SECRET
```
