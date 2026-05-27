'use client'

/**
 * hooks/useNexusResearch.js
 *
 * WHY THIS HOOK?
 * The AI research panel in the original HTML mixed:
 *   - DOM manipulation (appendChild, innerHTML)
 *   - Simulated typing (setInterval + innerHTML updates)
 *   - State (what question was asked, what response to show)
 *   - Business logic (which response matches which query keyword)
 *
 * This hook extracts the STATE and LOGIC, leaving the component
 * responsible only for rendering.
 *
 * FUTURE UPGRADE PATH (this is the most exciting one):
 *   Replace the local AI_RESPONSES lookup with a real API call:
 *
 *   const res = await fetch('/api/research', {
 *     method: 'POST',
 *     body: JSON.stringify({ query })
 *   })
 *   const { text, confidence } = await res.json()
 *
 *   And /api/research/route.js would call Anthropic's API, your
 *   custom model, or a RAG pipeline over your on-chain data.
 *   Zero changes needed to the UI component.
 */

import { useState, useCallback, useRef } from 'react'

const AI_RESPONSES = {
  default: {
    text: `Based on current on-chain signals and developer activity, the next dominant L2 narrative is likely to be Base × AI infrastructure — driven by Coinbase institutional reach and accelerating dApp deployments.\n\nKey signals: smart money inflows into Base +84% in 30 days. Developer commit activity at all-time high across 3 key protocols. VC pipeline shows 14 unannounced projects targeting Base in Q1.\n\nRisk factors: ETH gas market dependency and regulatory clarity remain primary headwinds.`,
    confidence: 91,
  },
  whale: {
    text: `24h whale activity — NEXUS tracked $2.4B in whale-tier movements across monitored wallets.\n\n$14.2M USDC → Base ecosystem. $8.7M ETH withdrawn from Binance — accumulation signal. $6.1M stablecoin rotation ETH → Arbitrum.\n\nNet interpretation: Risk-on positioning increasing. Stablecoin deployment into yield protocols signals 30–45 day capital deployment cycle beginning.`,
    confidence: 96,
  },
  defi: {
    text: `NEXUS narrative engine detects three DeFi narratives entering acceleration phase.\n\n1. Real-world yield — protocols bridging TradFi yield on-chain. Signal strength: 89/100.\n\n2. Intent-based trading — UniswapX, CowSwap gaining routing share. Signal strength: 82/100.\n\n3. Restaking derivatives — EigenLayer AVS launch pipeline. Signal strength: 76/100.`,
    confidence: 84,
  },
}

function getResponse(query) {
  const q = query.toLowerCase()
  if (q.includes('whale')) return AI_RESPONSES.whale
  if (q.includes('defi') || q.includes('yield')) return AI_RESPONSES.defi
  return AI_RESPONSES.default
}

export function useNexusResearch() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: AI_RESPONSES.default.text,
      confidence: AI_RESPONSES.default.confidence,
      isTyping: false,
    },
  ])
  const [confidence, setConfidence] = useState(91)
  const [isThinking, setIsThinking] = useState(false)

  const sendQuery = useCallback(() => {
    const query = input.trim()
    if (!query) return

    // 1. Add user message
    setMessages(prev => [...prev, { role: 'user', text: query }])
    setInput('')
    setIsThinking(true)

    // 2. Simulate network delay (replace with real fetch later)
    setTimeout(() => {
      const response = getResponse(query)
      setIsThinking(false)
      setConfidence(response.confidence)
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: response.text,
          confidence: response.confidence,
          isTyping: true,
        },
      ])
    }, 1600)
  }, [input])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendQuery()
    }
  }, [sendQuery])

  return {
    input,
    setInput,
    messages,
    confidence,
    isThinking,
    sendQuery,
    handleKeyDown,
  }
}
