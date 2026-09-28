# دليل الوقف — Al Waqf Directory

دليل محلي عربي لمركز الوقف بمحافظة قنا، مبني على Master Dataset موثق ومقسم إلى حالات نشر.

## Stack
- Next.js 16 App Router
- React 19
- TypeScript
- Static-first pages + generated sitemap/robots
- RTL Arabic responsive design

## Data policy
The public UI only renders records where `publish_ready === true`. Caution/HOLD/conflict records remain in the master data for research and QA but are hidden from public directory results.

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
- `data/master.json` is preserved byte-for-byte from the source ZIP (160 records). It is research source material, not an endpoint. As requested, this public repository retains the original dataset, including unpublished research records.
- Only `publish_ready === true` AND `status === "closed_ready"` may appear publicly (125 records). No HOLD/caution/conflict records enter pages, client payloads or sitemap.
- Server-only data module; explicit public field projection strips editorial notes.
- Four area pages, ten sourced neighborhood/locality pages, 125 place pages, robots and sitemap. Empty neighborhoods explicitly state coverage gaps.
- JSON-LD uses Place for mixed public facilities/businesses and cites sources without claiming news articles are official business profiles.
- Canonical production origin defaults to https://alwaqf-directory.vercel.app. Override NEXT_PUBLIC_SITE_URL only if the assigned production domain differs.
- No API credentials, paid integrations, external database or required environment variables.
