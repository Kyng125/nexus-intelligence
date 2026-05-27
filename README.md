# NEXUS Intelligence — Next.js Migration

> From a single HTML prototype to a scalable, production-grade Next.js application.

---

## Quick Start

```bash
npm install
npm run dev
# → http://localhost:3000 (redirects to /nexus)
```

---

## Deploy to Vercel (3 steps)

```bash
# 1. Push to GitHub
git init && git add . && git commit -m "NEXUS v1.0 — Next.js migration"
gh repo create nexus-intelligence --public --push

# 2. Connect to Vercel
# Go to vercel.com → New Project → Import your GitHub repo
# Framework: Next.js (auto-detected)
# No env vars needed for initial deploy

# 3. Click Deploy
# Your app is live in ~60 seconds.
```

**Future env vars to add in Vercel dashboard:**
```
ANTHROPIC_API_KEY=sk-ant-...     # When you add real AI
DATABASE_URL=postgresql://...     # When you add a DB
NEXTAUTH_SECRET=...               # When you add auth
RESEND_API_KEY=...                # When you add email
```

---

## Architecture Overview

```
nexus-app/
├── app/
│   ├── layout.jsx              # Root shell — fonts, metadata, global providers
│   ├── globals.css             # Design tokens, resets, shared keyframes
│   ├── page.jsx                # Root → redirects to /nexus
│   │
│   ├── api/                    # Server-side API routes (run on server, never in browser)
│   │   ├── signals/route.js    # GET /api/signals — ready for real DB
│   │   ├── research/route.js   # POST /api/research — ready for real AI
│   │   └── newsletter/route.js # POST /api/newsletter — ready for email service
│   │
│   └── nexus/
│       ├── layout.jsx          # Nexus route shell (future: auth guard, providers)
│       ├── page.jsx            # Server component — orchestrates all sections
│       │
│       ├── components/         # RENDER LAYER — what the user sees
│       │   ├── ui/             # Shared atomic components (loader, cursor, ambient)
│       │   ├── nav/            # NavBar
│       │   ├── hero/           # HeroSection + OrbCanvas (Three.js)
│       │   ├── ticker/         # Live market ticker
│       │   ├── ecosystem/      # Multi-chain explorer cards
│       │   ├── signals/        # Live signal feed
│       │   ├── research/       # AI chat panel
│       │   ├── features/       # Bento feature grid
│       │   ├── timeline/       # Historical timeline
│       │   ├── testimonials/   # Social proof cards
│       │   ├── cta/            # Call to action section
│       │   └── footer/         # Footer with newsletter
│       │
│       ├── hooks/              # INTERACTION LAYER — logic and state
│       │   ├── useNexusScroll.js        # Scroll detection + progress
│       │   ├── useTiltCard.js           # 3D card hover effect
│       │   ├── useIntersectionObserver.js # Scroll-triggered reveals
│       │   ├── useSignalFeed.js         # Signal filtering + live injection
│       │   └── useNexusResearch.js      # AI chat state machine
│       │
│       └── lib/                # DATA LAYER — what the app knows
│           └── data/
│               ├── ticker.js
│               ├── chains.js
│               ├── signals.js
│               ├── features.js
│               ├── timeline.js
│               └── testimonials.js
```

---

## The Four Layers (Why This Structure)

### 1. Data Layer (`lib/data/`)
**What:** Raw data arrays — no rendering logic, no React.  
**Why:** Data can be tested without a browser. It defines the "contract" that components depend on. When you add a database, you replace these files with async functions — zero UI changes needed.

### 2. Interaction Layer (`hooks/`)
**What:** Custom React hooks — state, event listeners, timers, effects.  
**Why:** All the "what happens when X" logic lives here, separate from "what it looks like." Each hook has one job. `useSignalFeed` doesn't know what a signal card looks like. `useTiltCard` doesn't know what it's tilting.

### 3. Render Layer (`components/`)
**What:** React components — JSX, CSS Modules, visual structure.  
**Why:** Components call hooks and render data. They don't contain business logic. A component should be readable: "I take this data, I use this hook, I render this structure."

### 4. API Layer (`app/api/`)
**What:** Next.js Route Handlers — run server-side only.  
**Why:** Sensitive keys (database passwords, AI API keys) never reach the browser. Server routes are the bridge between your frontend and any external service.

---

## Key Migration Decisions Explained

### "use client" vs Server Components
```
Server Component (default): 
  - Runs on server, HTML sent to browser
  - Cannot: useState, useEffect, window, document
  - Use for: page.jsx, layout.jsx, static sections

Client Component ("use client"):
  - Runs in browser after hydration
  - Can: all React hooks, browser APIs, event handlers
  - Use for: everything interactive
```

The rule: **push "use client" as far down the component tree as possible.**  
`page.jsx` is a server component. It imports client components like `<NavBar />` which are the first point of "use client." This gives you maximum SSR benefit.

### CSS Modules vs Global CSS
```
globals.css → design tokens, resets, shared keyframes
*.module.css → everything else (component-scoped)
```

CSS Modules automatically scope class names (`.title` in NavBar becomes `.NavBar_title__abc123`). This means no CSS naming conflicts and no cascade pollution.

**Exception:** `@keyframe` names cannot be scoped — they live in `globals.css`.

### next/dynamic with ssr: false
The Three.js orb uses browser-only APIs (WebGL, `window`). If Next.js tried to render it on the server, it would crash.

```js
const OrbCanvas = dynamic(() => import('./OrbCanvas'), { ssr: false })
```

This tells Next.js: "Load this file only in the browser, after hydration." The component is excluded from the server render entirely.

### Data Passed as Props (Not Imported in Components)
```jsx
// page.jsx (server)
import { CHAINS_DATA } from './lib/data/chains'
// ...
<EcosystemSection chains={CHAINS_DATA} />
```

Data flows from the server page → down through props to client components. This means:
1. Data loading happens server-side (future: async/await, DB queries)
2. Components are "dumb" — they render whatever data they receive
3. Easy to test: pass mock data in tests, component renders predictably

---

## Future Upgrade Roadmap

### Phase 1 — Real Data (1-2 weeks)
```
1. Add CoinGecko/CoinMarketCap API for live prices
   → Replace TICKER_DATA with fetch() in page.jsx
   → Add revalidate: 30 for ISR (Incremental Static Regeneration)

2. Add WebSocket for live signals
   → Replace setInterval in useSignalFeed with:
      const ws = new WebSocket('wss://api.nexus.com/signals')
      ws.onmessage = (e) => addSignal(JSON.parse(e.data))
```

### Phase 2 — Real AI (1 week)
```
1. Add ANTHROPIC_API_KEY to Vercel env vars
2. Update app/api/research/route.js:
   import Anthropic from '@anthropic-ai/sdk'
   const response = await client.messages.create({ model: 'claude-opus-4-5', ... })
3. Update useNexusResearch to fetch('/api/research') instead of local lookup
4. Add streaming for real-time typing effect
```

### Phase 3 — Authentication (1 week)
```
npm install next-auth
# Add: app/api/auth/[...nextauth]/route.js
# Wrap nexus/layout.jsx with SessionProvider
# Gate /nexus behind auth check
```

### Phase 4 — Database (1-2 weeks)
```
npm install @prisma/client prisma
# Define schema: User, Signal, Subscription
# Replace lib/data/*.js with db.model.findMany()
# Add Vercel Postgres or PlanetScale via Vercel dashboard
```

### Phase 5 — Real-time Collaboration (future)
```
# Pusher or Ably for WebSocket infrastructure
# Or: Vercel Edge Functions with Server-Sent Events
# Users see the same live signal feed in real-time
```

---

## What Each File Is Responsible For

| File | Responsibility |
|------|----------------|
| `app/layout.jsx` | Fonts, `<html>`, global metadata |
| `app/globals.css` | Design tokens (CSS variables), resets, keyframes |
| `app/nexus/page.jsx` | Compose sections, pass data as props |
| `app/nexus/layout.jsx` | Nexus-scoped providers (future: auth, theme) |
| `hooks/useNexusScroll.js` | Scroll position, scroll progress |
| `hooks/useTiltCard.js` | 3D hover tilt transform |
| `hooks/useIntersectionObserver.js` | Viewport-triggered reveals |
| `hooks/useSignalFeed.js` | Filter state, live signal injection |
| `hooks/useNexusResearch.js` | AI chat state, response simulation |
| `lib/data/*.js` | Static data (future: replaced by API calls) |
| `api/signals/route.js` | Server endpoint for signal data |
| `api/research/route.js` | Server endpoint for AI responses |
| `api/newsletter/route.js` | Server endpoint for email subscription |

---

## Learning Notes

### Why useState over direct DOM manipulation?
When you write `element.style.color = 'red'`, React doesn't know about it.  
The next time React re-renders, it'll overwrite your change.  
`useState` tells React "this value can change, manage it for me."

### Why useEffect for event listeners?
React runs `useEffect` after the component mounts (appears in DOM).  
The cleanup function runs before the component unmounts (disappears).  
Without cleanup, listeners pile up → memory leaks.

### Why CSS Modules?
CSS is global by default. `.title` in one file affects `.title` everywhere.  
CSS Modules scope styles to the file they're defined in.  
`import styles from './NavBar.module.css'` → `styles.title` is unique to NavBar.

### Why next/font?
Google Fonts via `<link>` blocks render and makes third-party requests.  
next/font self-hosts fonts at build time → zero network request at runtime.

---

Built with Next.js 14 App Router · React 18 · Three.js · CSS Modules
