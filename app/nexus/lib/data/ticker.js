/**
 * lib/data/ticker.js
 *
 * WHY A SEPARATE DATA FILE?
 * In the original HTML, data arrays were defined inline inside <script>
 * tags right next to rendering logic. This fuses two concerns:
 *   1. WHAT the data is (its shape and values)
 *   2. HOW it's rendered (DOM manipulation, event listeners)
 *
 * Separating them means:
 *   - Data can be tested independently
 *   - Data can be swapped for real API responses without touching UI code
 *   - Multiple components can import the same data without re-defining it
 *
 * This is the "data layer." Today it's static. Tomorrow it's:
 *   export async function getTickerData() {
 *     const res = await fetch('https://api.nexus.com/v1/ticker')
 *     return res.json()
 *   }
 */

export const TICKER_DATA = [
  { icon: '₿',  name: 'BTC',       val: '$67,420',   chg: '+2.41%', dir: 'up', color: '#F7931A' },
  { type: 'div' },
  { icon: 'Ξ',  name: 'ETH',       val: '$3,218',    chg: '+1.87%', dir: 'up', color: '#627EEA' },
  { type: 'div' },
  { icon: '◎',  name: 'SOL',       val: '$184.50',   chg: '-0.63%', dir: 'dn', color: '#9945FF' },
  { type: 'div' },
  { icon: '◈',  name: 'Sentiment', val: '74 / 100',  chg: 'Greed',  dir: 'nu' },
  { type: 'div' },
  { icon: '⛽', name: 'Gas',       val: '18 gwei',   chg: 'Low',    dir: 'up' },
  { type: 'div' },
  { icon: '◇',  name: 'AI Score',  val: '84.7',      chg: '+12.3pts', dir: 'up' },
  { type: 'div' },
  { icon: '▲',  name: 'AVAX',      val: '$42.10',    chg: '+3.12%', dir: 'up', color: '#E84142' },
  { type: 'div' },
  { icon: '◻',  name: 'Vol 24h',   val: '$94.8B',    chg: '+8.1%',  dir: 'up' },
  { type: 'div' },
  { icon: '◉',  name: 'DeFi TVL',  val: '$118.4B',   chg: '-1.2%',  dir: 'dn' },
  { type: 'div' },
]
