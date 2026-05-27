/**
 * lib/data/chains.js
 * Ecosystem chain data — the "data contract" for EcosystemSection.
 * Shape: each chain has display info + stats + hidden deep-signal overlay.
 */

export const CHAINS_DATA = [
  {
    id: 'eth',
    name: 'Ethereum',
    tag: 'ETH // Layer 1',
    logo: 'Ξ',
    logoColor: '#627EEA',
    logoBg: 'rgba(98,126,234,.15)',
    edgeColor: 'rgba(98,126,234,.5)',
    glowColor: 'rgba(98,126,234,.45)',
    bg: 'radial-gradient(ellipse 90% 80% at 20% 30%,rgba(98,126,234,.12) 0%,transparent 65%)',
    stats: [
      { label: 'TVL',    value: '$62.4B' },
      { label: '24h TXs',value: '1.24M'  },
      { label: 'Gas',    value: '18 gwei' },
      { label: 'MCap',   value: '$386B'  },
    ],
    hidden: {
      title: 'Deep Signal // ETH',
      badge: '🏛 Foundation Chain',
      items: [
        { label: 'Staking APR',  value: '3.8%',  sub: '32M ETH staked' },
        { label: 'Validators',   value: '982K',  sub: '+1.2% this week' },
        { label: 'DeFi TVL',     value: '$62.4B',sub: 'Dominance 52%' },
        { label: 'NFT Vol 7d',   value: '$184M', sub: '▲ +18% WoW' },
      ],
      bars: [
        { label: 'Developer Activity',   pct: 96, color: '#627EEA' },
        { label: 'Whale Concentration',  pct: 68, color: '#F7931A' },
      ],
    },
  },
  {
    id: 'sol',
    name: 'Solana',
    tag: 'SOL // High-throughput L1',
    logo: '◎',
    logoColor: '#9945FF',
    logoBg: 'rgba(153,69,255,.15)',
    edgeColor: 'rgba(20,241,149,.5)',
    glowColor: 'rgba(20,241,149,.35)',
    bg: 'radial-gradient(ellipse 80% 70% at 80% 20%,rgba(20,241,149,.08) 0%,transparent 60%)',
    stats: [
      { label: 'TPS',       value: '3,841'  },
      { label: 'Validators',value: '1,874'  },
      { label: 'TVL',       value: '$8.2B'  },
      { label: 'Fees 24h',  value: '$842K'  },
    ],
    hidden: {
      title: 'Deep Signal // SOL',
      badge: '⚡ Speed Chain',
      items: [
        { label: 'Block Time',   value: '400ms', sub: 'Near-instant finality' },
        { label: 'Active dApps', value: '2,840', sub: '▲ +340 this month' },
        { label: 'Staking APY',  value: '6.2%',  sub: '71% of SOL staked' },
        { label: 'DePIN',        value: '48',    sub: 'Fastest growing sector' },
      ],
      bars: [
        { label: 'Ecosystem Growth', pct: 88, color: '#14F195' },
        { label: 'Retail Sentiment', pct: 82, color: '#9945FF' },
      ],
    },
  },
  {
    id: 'base',
    name: 'Base',
    tag: 'BASE // Coinbase L2',
    logo: 'B',
    logoColor: '#0052FF',
    logoBg: 'rgba(0,82,255,.15)',
    edgeColor: 'rgba(0,82,255,.5)',
    glowColor: 'rgba(0,82,255,.4)',
    bg: 'radial-gradient(ellipse 100% 80% at 50% 0%,rgba(0,82,255,.1) 0%,transparent 65%)',
    stats: [
      { label: 'TVL',       value: '$4.8B'  },
      { label: 'Addresses', value: '18.4M'  },
      { label: 'Fees',      value: '$0.004' },
      { label: 'TXs 24h',   value: '2.1M'  },
    ],
    hidden: {
      title: 'Deep Signal // BASE',
      badge: '🔵 Coinbase Backed',
      items: [
        { label: 'Whale Inflows',  value: '$14M', sub: 'Last 4 hours' },
        { label: 'Unique Users 7d',value: '4.2M', sub: '▲ +31% WoW' },
        { label: 'Protocol Rev',   value: '$6.2M',sub: 'Monthly run rate' },
        { label: 'AI dApps',       value: '24',   sub: 'Fastest sector' },
      ],
      bars: [
        { label: 'Institutional Interest', pct: 74, color: '#0052FF' },
        { label: 'Builder Activity',       pct: 91, color: '#00F0FF' },
      ],
    },
  },
  {
    id: 'arb',
    name: 'Arbitrum',
    tag: 'ARB // Optimistic L2',
    logo: '▲',
    logoColor: '#28A0F0',
    logoBg: 'rgba(40,160,240,.15)',
    edgeColor: 'rgba(40,160,240,.5)',
    glowColor: 'rgba(40,160,240,.4)',
    bg: 'radial-gradient(ellipse 80% 70% at 15% 50%,rgba(40,160,240,.1) 0%,transparent 60%)',
    stats: [
      { label: 'TVL',       value: '$19.2B' },
      { label: 'TXs 24h',   value: '892K'   },
      { label: 'Fees',      value: '$0.07'  },
      { label: 'Protocols', value: '600+'   },
    ],
    hidden: {
      title: 'Deep Signal // ARB',
      badge: '⚙ DeFi Powerhouse',
      items: [
        { label: 'GMX Vol 24h', value: '$480M', sub: 'Top perp protocol' },
        { label: 'STIP Usage',  value: '$214M', sub: 'Grant program' },
        { label: 'Bridge In',   value: '$28M',  sub: 'Last 24 hours' },
        { label: 'DAO Votes',   value: '41',    sub: 'Active proposals' },
      ],
      bars: [
        { label: 'DeFi Dominance',    pct: 78, color: '#28A0F0' },
        { label: 'Perp Trading Share', pct: 64, color: '#5B8CFF' },
      ],
    },
  },
  {
    id: 'avax',
    name: 'Avalanche',
    tag: 'AVAX // L1 + Subnets',
    logo: '▲',
    logoColor: '#E84142',
    logoBg: 'rgba(232,65,66,.15)',
    edgeColor: 'rgba(232,65,66,.5)',
    glowColor: 'rgba(232,65,66,.4)',
    bg: 'radial-gradient(ellipse 80% 70% at 80% 60%,rgba(232,65,66,.09) 0%,transparent 60%)',
    stats: [
      { label: 'TVL',        value: '$1.2B'  },
      { label: 'Subnets',    value: '14'     },
      { label: 'TPS',        value: '4,500'  },
      { label: 'Validators', value: '1,244'  },
    ],
    hidden: {
      title: 'Deep Signal // AVAX',
      badge: '🔺 Subnet Innovator',
      items: [
        { label: 'Subnet Growth', value: '+4/mo', sub: 'Enterprise focus' },
        { label: 'Gaming dApps',  value: '82',    sub: 'Largest ecosystem' },
        { label: 'Block Time',    value: '2s',    sub: 'Sub-second finality' },
        { label: 'Staking APY',   value: '8.1%',  sub: 'Low entry stake' },
      ],
      bars: [
        { label: 'Gaming Ecosystem',   pct: 82, color: '#E84142' },
        { label: 'Enterprise Pipeline', pct: 58, color: '#FF8A80' },
      ],
    },
  },
]
