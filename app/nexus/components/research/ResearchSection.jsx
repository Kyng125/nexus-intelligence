'use client'

/**
 * components/research/ResearchSection.jsx
 *
 * THE MOST FUTURE-PROOF COMPONENT IN THE CODEBASE.
 *
 * The AI "chat" simulation here is powered by useNexusResearch hook which
 * contains a simple keyword-matching function. But the INTERFACE it exposes
 * (input → response → confidence) is identical to what a real LLM would return.
 *
 * The upgrade path is zero-friction:
 *   1. Add  app/api/research/route.js  (Next.js API route)
 *   2. In useNexusResearch, replace:
 *        const response = getResponse(query)     // local keyword match
 *      with:
 *        const res = await fetch('/api/research', { method:'POST', body: JSON.stringify({query}) })
 *        const response = await res.json()
 *   3. Done. This component never changes.
 *
 * The typing animation (original used setInterval + innerHTML) is replaced
 * with a CSS animation on each character using React state. This is cleaner
 * and doesn't fight React's rendering cycle.
 */

import { useState, useEffect, useRef } from 'react'
import { useNexusResearch } from '../../hooks/useNexusResearch'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import styles from './ResearchSection.module.css'

const SUGGESTIONS = [
  { query: 'Which chains are accumulating smart money?', label: 'Smart money chains' },
  { query: 'What is the next DeFi narrative?',           label: 'DeFi narrative'       },
  { query: 'Summarize whale movements today.',           label: 'Whale summary'         },
]

const DATA_SOURCES = [
  { name: 'On-chain Data',    pct: 98, color: '#00F0FF' },
  { name: 'Social Sentiment', pct: 91, color: '#9D4EDD' },
  { name: 'VC Flow Signals',  pct: 84, color: '#5B8CFF' },
  { name: 'Dev Activity',     pct: 79, color: '#22C55E' },
  { name: 'Exchange Flows',   pct: 72, color: '#FBB224' },
]

export default function ResearchSection() {
  const [ref, isVisible] = useIntersectionObserver()
  const {
    input, setInput,
    messages, confidence,
    isThinking, sendQuery, handleKeyDown,
  } = useNexusResearch()
  const convoRef = useRef(null)

  // Auto-scroll conversation to bottom on new messages
  useEffect(() => {
    if (convoRef.current) {
      convoRef.current.scrollTop = convoRef.current.scrollHeight
    }
  }, [messages, isThinking])

  return (
    <div id="research">
      <div ref={ref} className={`${styles.section} ${isVisible ? styles.vis : ''}`}>
        <div className={styles.eyebrow}>
          <span className={styles.eyLine} />
          AI Research Engine
        </div>
        <div className={styles.title}>
          Intelligence on <span>Demand.</span>
        </div>

        <div className={styles.layout}>
          {/* Main chat panel */}
          <div className={styles.panel}>
            {/* Terminal header bar */}
            <div className={styles.termBar}>
              <div className={styles.termDots}>
                <div className={styles.dot} style={{background:'#F43F5E',opacity:.7}} />
                <div className={styles.dot} style={{background:'#FBB224',opacity:.7}} />
                <div className={styles.dot} style={{background:'#22C55E',opacity:.7}} />
              </div>
              <div className={styles.termTitle}>NEXUS // AI Research Terminal</div>
              <div className={styles.termBadge}>
                <div className={styles.termBadgeDot} />
                Neural Active
              </div>
            </div>

            {/* Conversation area */}
            <div className={styles.convo} ref={convoRef}>
              {messages.map((msg, i) => (
                msg.role === 'user'
                  ? <UserBubble key={i} text={msg.text} />
                  : <AIBubble key={i} text={msg.text} isTyping={msg.isTyping} />
              ))}
              {isThinking && <ThinkingBubble />}
            </div>

            {/* Suggestion chips */}
            {messages.length <= 1 && (
              <div className={styles.suggestions}>
                {SUGGESTIONS.map(s => (
                  <button
                    key={s.label}
                    className={styles.sug}
                    onClick={() => { setInput(s.query); }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input row */}
            <div className={styles.inputRow}>
              <input
                className={styles.input}
                placeholder="Ask NEXUS AI anything about on-chain intelligence..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button className={styles.sendBtn} onClick={sendQuery}>
                ↑
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            <ConfidenceRing confidence={confidence} />
            <DataSourcesCard />
          </div>
        </div>
      </div>
    </div>
  )
}

function UserBubble({ text }) {
  return <div className={styles.userBubble}>{text}</div>
}

function AIBubble({ text, isTyping }) {
  return (
    <div className={styles.aiBubble}>
      <div className={styles.aiAvatar}>◈</div>
      <div
        className={`${styles.aiText} ${isTyping ? styles.typing : ''}`}
        dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br>') }}
      />
    </div>
  )
}

function ThinkingBubble() {
  return (
    <div className={styles.aiBubble}>
      <div className={styles.aiAvatar}>◈</div>
      <div className={styles.thinkDots}>
        <div className={styles.thinkDot} />
        <div className={styles.thinkDot} />
        <div className={styles.thinkDot} />
      </div>
    </div>
  )
}

function ConfidenceRing({ confidence }) {
  const circumference = 226.2
  const offset = circumference - (confidence / 100) * circumference

  return (
    <div className={styles.sideCard}>
      <div className={styles.cardLabel}>AI Confidence Score</div>
      <div className={styles.ringWrap}>
        <svg width="90" height="90" viewBox="0 0 90 90">
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#9D4EDD" />
              <stop offset="100%" stopColor="#00F0FF" />
            </linearGradient>
          </defs>
          <circle cx="45" cy="45" r="36" className={styles.ringBase} />
          <circle
            cx="45" cy="45" r="36"
            className={styles.ringFill}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className={styles.ringLabel}>
          <div className={styles.ringPct}>{confidence}%</div>
          <div className={styles.ringSubLabel}>Neural</div>
        </div>
      </div>
      <div className={styles.ringFooter}>Analysis Confidence</div>
    </div>
  )
}

function DataSourcesCard() {
  return (
    <div className={styles.sideCard}>
      <div className={styles.cardLabel}>Data Sources</div>
      {DATA_SOURCES.map(src => (
        <div key={src.name} className={styles.srcRow}>
          <div className={styles.srcDot} style={{ background: src.color }} />
          <div className={styles.srcName}>{src.name}</div>
          <div className={styles.srcBar}>
            <div className={styles.srcFill} style={{ width: `${src.pct}%`, background: src.color + '60' }} />
          </div>
          <div className={styles.srcPct}>{src.pct}%</div>
        </div>
      ))}
    </div>
  )
}
