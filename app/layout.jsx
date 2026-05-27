import './globals.css'

/**
 * WHY THIS FILE EXISTS:
 * In Next.js App Router, layout.jsx at the /app root is the outermost
 * shell of every page in the app. It renders once and persists across
 * navigations — it's NOT re-mounted on route changes. This makes it
 * the correct place for: fonts, global metadata, and providers that
 * wrap the entire app (auth, theme, state).
 *
 * WHY next/font INSTEAD OF A <link> TAG:
 * The old HTML used a Google Fonts <link> tag. That approach:
 *   1. Blocks rendering while the browser fetches the stylesheet
 *   2. Makes a third-party network request (privacy + performance concern)
 *   3. Causes layout shift (FOUT — flash of unstyled text)
 *
 * next/font downloads fonts at BUILD time, self-hosts them, and
 * injects them via CSS variables with zero layout shift.
 */

/**
 * WHY export const metadata?
 * App Router reads this exported object to generate <head> tags at
 * build time (SSG) or request time (SSR). It's type-safe and replaces
 * the need for react-helmet or manual <Head> tags. Each page can also
 * export its own metadata that merges/overrides this root metadata.
 */
export const metadata = {
  title: 'NEXUS // Intelligence Platform',
  description:
    'Real-time Web3 intelligence. Whale tracking, narrative detection, and AI-powered research — all in one cinematic interface.',
  keywords: ['Web3', 'DeFi', 'crypto intelligence', 'whale tracking', 'blockchain analytics'],
  openGraph: {
    title: 'NEXUS Intelligence Platform',
    description: 'Track the signals before the world notices.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
