# Manuel Perez Gil — Portfolio

Personal portfolio built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel (recommended)

**Option A — Vercel CLI:**
```bash
npm i -g vercel
vercel
```

**Option B — GitHub integration:**
1. Push this repo to GitHub
2. Import it at [vercel.com/new](https://vercel.com/new)
3. Click **Deploy** — zero config needed

## Deploy to GitHub Pages

1. Add the following to `next.config.mjs`:
```js
const nextConfig = {
  output: "export",
  basePath: "/portfoliomapg", // your repo name if not a user/org page
  images: { unoptimized: true },
};
```

2. Build and push the `out/` directory:
```bash
npm run build
# then deploy the out/ folder via GitHub Pages settings
```

Or use the official [Next.js GitHub Actions workflow](https://github.com/actions/starter-workflows/blob/main/pages/nextjs.yml).

## Project Structure

```
portfoliomapg/
├── app/
│   ├── layout.tsx      # Root layout, fonts, metadata
│   ├── page.tsx        # Page composition
│   └── globals.css     # Tailwind base + custom utilities
├── components/
│   ├── Nav.tsx         # Floating pill navigation
│   ├── Hero.tsx        # Full-viewport intro
│   ├── Projects.tsx    # 2×2 project card grid
│   ├── Experience.tsx  # Timeline
│   ├── Skills.tsx      # Categorized skill tags
│   ├── Certifications.tsx
│   └── Footer.tsx      # CTA + links
├── lib/
│   └── data.ts         # All content — edit here to update copy
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## Updating Content

All copy lives in `lib/data.ts`. Edit the exported arrays (`projects`, `experience`, `skills`, `certs`) — no component changes needed.
