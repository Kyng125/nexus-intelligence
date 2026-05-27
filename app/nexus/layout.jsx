/**
 * WHY A NESTED LAYOUT?
 * Next.js App Router supports nested layouts. This layout wraps only
 * the /nexus route (and any sub-routes like /nexus/dashboard,
 * /nexus/signals, etc. in the future).
 *
 * This is where you would eventually add:
 *   - An auth guard (redirect if not logged in)
 *   - A data provider (supply market data to all nexus pages)
 *   - A websocket provider (open WS connection once for all nexus pages)
 *   - An analytics context (page-level tracking for nexus routes)
 *
 * Today it's minimal — but the slot is intentionally reserved.
 */

export const metadata = {
  title: 'NEXUS // Intelligence',
  description: 'Real-time Web3 intelligence platform',
}

export default function NexusLayout({ children }) {
  return (
    <div className="nexus-root">
      {children}
    </div>
  )
}
