/**
 * app/api/research/route.js
 *
 * THIS IS THE MOST EXCITING FUTURE UPGRADE IN THE ENTIRE CODEBASE.
 *
 * Current state: the useNexusResearch hook does local keyword matching.
 * Future state: this API route calls a real AI model.
 *
 * The upgrade path:
 *
 * STEP 1 — Anthropic Claude (simplest):
 *   import Anthropic from '@anthropic-ai/sdk'
 *   const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
 *   const message = await client.messages.create({
 *     model: 'claude-opus-4-5',
 *     max_tokens: 1024,
 *     system: NEXUS_SYSTEM_PROMPT,   // defined below
 *     messages: [{ role: 'user', content: query }],
 *   })
 *   return NextResponse.json({ text: message.content[0].text, confidence: 91 })
 *
 * STEP 2 — RAG pipeline (richer answers):
 *   1. Embed the query with an embedding model
 *   2. Query a vector DB (Pinecone, Supabase pgvector) for relevant on-chain data
 *   3. Pass the retrieved context + query to Claude
 *   4. Return grounded, verifiable answers
 *
 * STEP 3 — Streaming (real-time typing effect):
 *   const stream = await client.messages.stream({ ... })
 *   return new Response(stream.toReadableStream(), {
 *     headers: { 'Content-Type': 'text/event-stream' }
 *   })
 *   // Client uses EventSource to receive tokens as they arrive
 *
 * WHY SERVER-SIDE?
 * Your ANTHROPIC_API_KEY must NEVER be in the browser. Running the AI call
 * server-side means the key stays in process.env and never reaches the client.
 */

import { NextResponse } from 'next/server'

const NEXUS_SYSTEM_PROMPT = `
You are NEXUS Intelligence, an advanced Web3 and on-chain analytics AI.
Your role is to provide concise, signal-driven insights about blockchain markets,
whale movements, DeFi narratives, and emerging crypto trends.

Always structure your responses with:
1. Key signal or finding
2. Supporting on-chain evidence (simulated for now)
3. Risk factors or counterarguments
4. A confidence score (0-100)

Keep responses under 250 words. Be specific. Be analytical. Be the signal.
`.trim()

// Simple keyword-based response (matches current hook behavior)
// Replace this function body with an actual AI API call
async function generateResearchResponse(query) {
  const q = query.toLowerCase()

  // This is where you'd call: await anthropic.messages.create(...)
  if (q.includes('whale')) {
    return {
      text: '24h whale activity — NEXUS tracked $2.4B in whale-tier movements across monitored wallets.\n\n$14.2M USDC → Base ecosystem. $8.7M ETH withdrawn from Binance — accumulation signal.\n\nNet interpretation: Risk-on positioning increasing. Capital deployment cycle beginning.',
      confidence: 96,
    }
  }

  if (q.includes('defi') || q.includes('yield')) {
    return {
      text: 'NEXUS narrative engine detects three DeFi narratives entering acceleration phase.\n\n1. Real-world yield — protocols bridging TradFi yield on-chain. Signal: 89/100.\n\n2. Intent-based trading — UniswapX, CowSwap gaining share. Signal: 82/100.\n\n3. Restaking derivatives — EigenLayer AVS pipeline. Signal: 76/100.',
      confidence: 84,
    }
  }

  return {
    text: 'Based on current on-chain signals, the next dominant L2 narrative is likely Base × AI infrastructure — driven by Coinbase institutional reach and accelerating dApp deployments.\n\nKey signals: smart money inflows +84% in 30 days. Developer commit activity at ATH.\n\nRisk: ETH gas dependency and regulatory clarity remain headwinds.',
    confidence: 91,
  }
}

export async function POST(request) {
  try {
    const { query } = await request.json()

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 })
    }

    const response = await generateResearchResponse(query)

    return NextResponse.json({
      ...response,
      query,
      timestamp: new Date().toISOString(),
    })

  } catch (error) {
    console.error('Research API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
