# دليل الوقف — Al Waqf Directory

دليل محلي عربي لمركز الوقف بمحافظة قنا، مبني على Master Dataset موثق ومقسم إلى حالات نشر.

## Stack
- Next.js 16 App Router
- React 19
- TypeScript
- Static-first pages + generated sitemap/robots
- RTL Arabic responsive design

## Data policy
The public UI only renders records where `publish_ready === true` and `status === "closed_ready"`. Caution/HOLD/conflict records remain in the master data for research and QA but are hidden from public directory results and client payloads.

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

Optional production URL:
```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```


## Production review

- Next.js 16.3.6, React 19.3.0, Arabic RTL and responsive navigation.
- `npm ci`, `npm run build`, `npm run verify`, `npm run typecheck`.
- `data/master.json` includes the original research records plus sourced additions (171 records total). Original records are retained; this public repository includes unpublished research material for editorial review.
- Only `publish_ready === true` AND `status === "closed_ready"` may appear on the public site (137 records). No HOLD/caution/conflict records enter pages, client payloads or sitemap.
- Server-only data module; explicit public field projection strips editorial notes.
- Four area pages, 23 sourced named locality pages, 137 place pages, robots and sitemap. Empty localities explicitly state coverage gaps; the names do not imply an administrative rank.
- «حاجر الجبل» is a sourced local name connected to the existing «الوقف الجديدة» page and search results. The directory does not assume formal boundaries or create a duplicate area page.
- JSON-LD uses Place for mixed public facilities/businesses and cites sources without claiming news articles are official business profiles.
- Canonical production origin defaults to https://alwaqf-directory.vercel.app. Override NEXT_PUBLIC_SITE_URL only if the assigned production domain differs.
- No API credentials, paid integrations, external database or required environment variables.
