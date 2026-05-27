'use client'

/**
 * hooks/useSignalFeed.js
 *
 * WHY THIS HOOK?
 * The original had filtering, live injection, and display logic all mixed
 * together in the script block. This hook is the "brain" of the signal feed.
 *
 * It owns:
 *   - activeFilter state
 *   - filtered signals derived state
 *   - live signal injection via setInterval
 *
 * The component only needs to call this hook and render what it returns.
 * This separation means:
 *   - You can test filtering logic without any DOM
 *   - You can replace the setInterval with a WebSocket later by only
 *     changing this file — the UI component stays identical
 *
 * FUTURE UPGRADE PATH:
 *   Replace setInterval + LIVE_POOL with:
 *     const socket = new WebSocket('wss://api.nexus.com/signals')
 *     socket.onmessage = (e) => addSignal(JSON.parse(e.data))
 */

import { useState, useEffect, useCallback } from 'react'
import { SIGNAL_FILTERS } from '../lib/data/signals'

const LIVE_POOL = [
  {
    id: `live-${Date.now()}-0`,
    type: 'whale',
    chain: 'Arbitrum',
    text: 'New whale entered <strong>GMX long position</strong> — $3.8M notional.',
    time: 'just now',
    tags: ['#arb', '#gmx'],
    signal: 82,
    isNew: true,
  },
  {
    id: `live-${Date.now()}-1`,
    type: 'ai',
    chain: 'Base',
    text: 'NEXUS AI flagged <strong>correlated buying pattern</strong> across 14 wallets on Base. Confidence: 91%.',
    time: 'just now',
    tags: ['#base', '#ai'],
    signal: 91,
    isNew: true,
  },
  {
    id: `live-${Date.now()}-2`,
    type: 'narrative',
    chain: 'Multi-chain',
    text: '<strong>RWA narrative momentum</strong> accelerating — 4 protocols in accumulation phase.',
    time: 'just now',
    tags: ['#rwa', '#narrative'],
    signal: 87,
    isNew: true,
  },
]

export function useSignalFeed(initialSignals) {
  const [signals, setSignals] = useState(initialSignals)
  const [activeFilter, setActiveFilter] = useState('all')
  const [liveIndex, setLiveIndex] = useState(0)

  // Filter signals based on activeFilter
  const filteredSignals = activeFilter === 'all'
    ? signals
    : signals.filter(s => s.type === activeFilter)

  // Inject a live signal into the feed
  const addSignal = useCallback((newSignal) => {
    setSignals(prev => {
      // If filter is active and this signal doesn't match, skip it
      // We still add to state (so switching filter shows it), 
      // but the filtered view won't show it until filter matches
      const updated = [{ ...newSignal, id: `live-${Date.now()}`, isNew: true }, ...prev]
      // Cap at 20 signals
      return updated.slice(0, 20)
    })
  }, [])

  // Live injection interval — replace this with WebSocket in production
  useEffect(() => {
    let idx = 0
    const interval = setInterval(() => {
      const signal = LIVE_POOL[idx % LIVE_POOL.length]
      addSignal({ ...signal, id: `live-${Date.now()}-${idx}` })
      idx++
    }, 7000)

    return () => clearInterval(interval)
  }, [addSignal])

  return {
    signals: filteredSignals,
    activeFilter,
    setActiveFilter,
    filters: SIGNAL_FILTERS,
  }
}
