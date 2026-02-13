# John Salako — Career Website

A multi-page academic career portfolio built with **HTML/CSS/JS**, powered by **Eleventy (11ty)** for static-site generation and **Sanity CMS** for content management.

## Project Structure

```
john-salako-career-site/
├── src/                        # Site source
│   ├── _data/
│   │   └── sanity.js           # Fetches content from Sanity at build time
│   ├── assets/
│   │   ├── style.css           # Global styles
│   │   ├── script.js           # Client-side rendering + UI interactions
│   │   ├── john.jpg            # Headshot
│   │   └── *.gif               # Animations
│   ├── downloads/              # PDFs, posters, reports
│   ├── generated-data.njk      # Template that outputs /assets/data.js
│   ├── index.html              # Home
│   ├── work.html               # Work history
│   ├── education.html          # Education + Awards
│   ├── current-projects.html   # Active research
│   ├── past-projects.html      # Completed projects + Web apps
│   ├── publications.html       # Scholarly + Media publications
│   ├── awards.html             # → redirects to education.html
│   ├── projects.html           # → redirects to past-projects.html
│   └── web-applications.html   # → redirects to past-projects.html
├── studio/                     # Sanity Studio (CMS)
│   ├── sanity.config.ts
│   ├── sanity.cli.ts
│   └── schemaTypes/            # 8 content schemas
├── scripts/
│   └── seed-sanity.mjs         # One-time data migration to Sanity
├── .eleventy.js                # 11ty build config
├── .env                        # Sanity credentials (not committed)
└── package.json
```

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)

### Install & Run

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:8080)
npm run dev

# Production build
npm run build
# Output goes to _site/
```

### Run Sanity Studio

```bash
cd studio
npm install
npx sanity dev
# Opens at http://localhost:3333
```

## How It Works

All site content lives in a single `window.SITE_DATA` object. The client-side `script.js` reads this object and renders every page.

**Without Sanity configured:** 11ty generates `assets/data.js` using the fallback dataset embedded in `src/_data/sanity.js`. The site works out of the box.

**With Sanity configured:** 11ty fetches content from Sanity via GROQ queries at build time, transforms it into the same `SITE_DATA` shape, and generates `assets/data.js`. Zero changes to HTML or client-side JS.

## Content Management with Sanity

### Initial Setup

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage)
2. Fill in `.env`:
   ```
   SANITY_PROJECT_ID=your_project_id
   SANITY_DATASET=production
   SANITY_TOKEN=your_write_token
   ```
3. Seed Sanity with existing content:
   ```bash
   npm run seed
   ```
4. Rebuild the site:
   ```bash
   npm run build
   ```

### Content Types

| Schema | Fields |
|--------|--------|
| **Site Settings** (singleton) | name, headline, location, email, links, skills |
| **Work Experience** | role, org, time, location, bullets, tags, order |
| **Education** | degree, school, time, details, order |
| **Award** | title, issuer, year, details, order |
| **Current Project** | title, description, tags, order |
| **Past Project** | title, year, description, links, tags, order |
| **Publication** | type (Scholarly/Media), items (title, venue, year, links), order |
| **Web Application** | title, description, URL, order |

## Deploying to Vercel

### Via CLI

```bash
npm i -g vercel
vercel
```

Set the build command to `npx @11ty/eleventy` and output directory to `_site`.

### Via GitHub

1. Push to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Set:
   - **Build Command:** `npx @11ty/eleventy`
   - **Output Directory:** `_site`
4. Add environment variables: `SANITY_PROJECT_ID` and `SANITY_DATASET`

## Adding Files

Place PDFs, posters, or other downloadable files in `src/downloads/` and reference them in Sanity (or the fallback data) as `downloads/filename.pdf`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start 11ty dev server with live reload |
| `npm run build` | Production build to `_site/` |
| `npm run seed` | Migrate existing data into Sanity |

## Tech Stack

- **[Eleventy](https://www.11ty.dev/)** — static site generator
- **[Sanity](https://www.sanity.io/)** — headless CMS
- **Vanilla JS** — client-side rendering, no frameworks
- **CSS** — custom properties, glassmorphism, responsive grid
