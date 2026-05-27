/**
 * lib/data/signals.js
 * Initial signal feed data. In production this would be fetched from
 * a WebSocket connection or a polling API endpoint at /api/signals.
 *
 * The shape here defines the contract between the data layer and
 * the SignalCard render component. Any API must return this shape.
 */

export const SIGNALS_DATA = [
  {
    id: 'sig-001',
    type: 'whale',
    chain: 'Base',
    text: 'Smart wallet entered <strong>Aerodrome USDC/ETH pool</strong> with $14.2M — whale-tier position opened.',
    time: '2m ago',
    tags: ['#base', '#aerodrome', '#defi'],
    signal: 94,
    isNew: false,
  },
  {
    id: 'sig-002',
    type: 'ai',
    chain: 'Ethereum',
    text: 'NEXUS AI detected <strong>correlated accumulation pattern</strong> across 7 wallets. Base + RWA narrative forming.',
    time: '5m ago',
    tags: ['#eth', '#rwa', '#ai'],
    signal: 89,
    isNew: false,
  },
  {
    id: 'sig-003',
    type: 'narrative',
    chain: 'Multi-chain',
    text: '<strong>AI × DeFi narrative</strong> heat score crossed 90 — 3-week accumulation phase confirmed by on-chain data.',
    time: '11m ago',
    tags: ['#narrative', '#ai', '#defi'],
    signal: 91,
    isNew: false,
  },
  {
    id: 'sig-004',
    type: 'whale',
    chain: 'Arbitrum',
    text: 'Whale cluster moved <strong>$8.7M ETH</strong> off Binance → ARB. Historical pattern: pre-protocol launch positioning.',
    time: '18m ago',
    tags: ['#arb', '#eth', '#exchange'],
    signal: 86,
    isNew: false,
  },
  {
    id: 'sig-005',
    type: 'defi',
    chain: 'Solana',
    text: '<strong>Jupiter DEX volume</strong> surged 340% in 4h — Solana-native narrative showing momentum.',
    time: '24m ago',
    tags: ['#sol', '#dex', '#volume'],
    signal: 78,
    isNew: false,
  },
  {
    id: 'sig-006',
    type: 'ai',
    chain: 'Base',
    text: 'Developer commit activity on <strong>3 unannounced protocols</strong> spiked 240% — Builder confidence high.',
    time: '31m ago',
    tags: ['#base', '#dev', '#builder'],
    signal: 83,
    isNew: false,
  },
]

/**
 * Filter configuration — defines available filter tabs for the signal feed.
 * WHY HERE? Because both the filter UI and the filter logic need this config.
 * Keeping it in data means you can add a new filter with zero UI code changes.
 */
export const SIGNAL_FILTERS = [
  { key: 'all',       label: 'All Signals', color: '#C7D2FE' },
  { key: 'whale',     label: 'Whale',       color: '#00F0FF' },
  { key: 'ai',        label: 'AI Signal',   color: '#9D4EDD' },
  { key: 'narrative', label: 'Narrative',   color: '#FBB224' },
  { key: 'defi',      label: 'DeFi',        color: '#22C55E' },
]

/**
 * Signal type styling config — maps a signal type → visual style tokens.
 * WHY NOT INLINE IN THE COMPONENT?
 * Because if you add a new signal type, you update data, not UI code.
 * This follows the Open/Closed Principle: open for extension, closed for modification.
 */
export const SIGNAL_TYPE_CONFIG = {
  whale:     { label: 'Whale Alert',      color: '#00F0FF', bg: 'rgba(0,240,255,.1)',   border: 'rgba(0,240,255,.25)',  icon: '◉' },
  ai:        { label: 'AI Signal',        color: '#9D4EDD', bg: 'rgba(157,78,221,.1)',  border: 'rgba(157,78,221,.25)', icon: '◈' },
  narrative: { label: 'Narrative',        color: '#FBB224', bg: 'rgba(251,178,36,.1)',  border: 'rgba(251,178,36,.25)', icon: '◇' },
  defi:      { label: 'DeFi Movement',    color: '#22C55E', bg: 'rgba(34,197,94,.1)',   border: 'rgba(34,197,94,.25)',  icon: '◻' },
}
