# Tree Politics — Frontend

[![CI](https://github.com/ag-tech-group/treepolitics-web/actions/workflows/ci.yml/badge.svg)](https://github.com/ag-tech-group/treepolitics-web/actions/workflows/ci.yml)

The frontend for [treepolitics.net](https://treepolitics.net) — a political ecology blog exploring the use and abuse of trees in history.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — Build tool and dev server
- **TanStack Router** — Type-safe file-based routing
- **TanStack Query** — Data fetching and caching
- **shadcn/ui** + **Radix UI** — Component library
- **Tailwind CSS v4** — Styling
- **Ghost Content API** — Blog content (headless CMS)

## Architecture

```
treepolitics.net (Netlify)
         │
         ├── Ghost Content API (content.treepolitics.net)
         │     └── Blog posts, tags, authors
         │
         └── FastAPI (api.treepolitics.net)
               └── Backend services
```

## Getting Started

### Prerequisites

- Node.js 24+
- pnpm
- Local Ghost instance (see infrastructure docs)

### Setup

```bash
pnpm install
cp .env.example .env.local  # Edit with your Ghost URL and Content API key
pnpm dev
```

### Environment Variables

| Variable                 | Description           | Default                 |
| ------------------------ | --------------------- | ----------------------- |
| `VITE_GHOST_URL`         | Ghost CMS URL         | `http://localhost:2368` |
| `VITE_GHOST_CONTENT_KEY` | Ghost Content API key | (from Ghost admin)      |
| `VITE_API_URL`           | FastAPI backend URL   | `http://localhost:8000` |

### Build

```bash
pnpm build
```

Output goes to `dist/`. Deployed to Netlify with SPA redirects via `public/_redirects`.

## Project Structure

```
src/
├── api/              # Ghost Content API client
├── components/
│   ├── ui/           # shadcn/ui components (Button, Card, Input, Select, etc.)
│   ├── layout/       # Header, footer, site layout
│   ├── author-bio.tsx
│   ├── blog-toolbar.tsx
│   └── social-links.tsx
├── lib/
│   ├── use-ghost.ts  # React Query hooks for Ghost
│   ├── ghost-filters.ts
│   ├── constants.ts  # Shared data (social links)
│   └── sanitize.ts   # DOMPurify for Ghost HTML
├── pages/
│   ├── home/         # Homepage (hero, recent posts, author bio)
│   ├── blog/         # Blog listing + individual post pages
│   ├── about/        # Mission + author
│   └── contact/      # Social links + contact form
└── routes/           # TanStack Router file-based routes
```

## Pages

- **Home** — Hero, recent posts, about the author
- **Blog** — Post listing with search, tag filters, date navigation, sort
- **Blog Post** — Full article with Ghost author bio
- **About** — Mission statement + author bio
- **Contact** — Social media links + contact form (email sending TBD)

## Deployment

Hosted on **Netlify** with automatic deploys from the `main` branch.

Production environment variables are configured in the Netlify dashboard.
