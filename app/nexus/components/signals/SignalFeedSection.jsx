'use client'

/**
 * components/signals/SignalFeedSection.jsx
 *
 * THIS IS THE CLEAREST EXAMPLE OF STATE-DRIVEN vs DOM-DRIVEN:
 *
 * Old:
 *   renderFeed(filter) {
 *     list.innerHTML = ''                              // Clear DOM
 *     filtered.forEach(s => list.appendChild(buildSignal(s)))  // Re-populate DOM
 *   }
 *
 * New:
 *   const { signals, activeFilter, setActiveFilter } = useSignalFeed(initialSignals)
 *   // JSX automatically re-renders when signals or activeFilter changes
 *
 * The key insight: in React, you never clear the DOM. You update STATE,
 * and React figures out the minimal DOM changes needed. This is called
 * "reconciliation" and it's React's superpower.
 *
 * dangerouslySetInnerHTML: We use this for the signal text field because
 * the original data contains <strong> HTML tags. In production you'd
 * sanitize this with a library like DOMPurify since it's technically XSS-able.
 * For a portfolio project with known static data, it's acceptable.
 */

import { useSignalFeed } from '../../hooks/useSignalFeed'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { SIGNAL_TYPE_CONFIG } from '../../lib/data/signals'
import styles from './SignalFeedSection.module.css'

const TRENDING = [
  { name: 'AI × DeFi',   pct: '+240%', up: true },
  { name: 'RWA Adoption', pct: '+118%', up: true },
  { name: 'L2 Activity',  pct: '+84%',  up: true },
  { name: 'NFT Volume',   pct: '-12%',  up: false },
  { name: 'CEX Inflows',  pct: '-38%',  up: false },
]

export default function SignalFeedSection({ signals: initialSignals }) {
  const [ref, isVisible] = useIntersectionObserver()
  const { signals, activeFilter, setActiveFilter, filters } = useSignalFeed(initialSignals)

  return (
    <div id="intelligence">
      <div ref={ref} className={`${styles.section} ${isVisible ? styles.vis : ''}`}>
        <div className={styles.eyebrow}>
          <span className={styles.eyLine} />
          Intelligence Feed
        </div>
        <div className={styles.sectionHead}>
          <div className={styles.title}>
            Live <span>Signal</span> Feed
          </div>
        </div>

        {/* Filter pills */}
        <div className={styles.filterRow}>
          {filters.map(f => (
            <button
              key={f.key}
              className={`${styles.pill} ${activeFilter === f.key ? styles.pillActive : ''}`}
              style={{ '--pc': f.color }}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className={styles.feedLayout}>
          {/* Signal list */}
          <div className={styles.feed}>
            <div className={styles.feedList}>
              {signals.map(signal => (
                <SignalCard key={signal.id} signal={signal} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            <AlertLevelCard signals={signals} />
            <TrendingCard />
          </div>
        </div>
      </div>
    </div>
  )
}

function SignalCard({ signal }) {
  const cfg = SIGNAL_TYPE_CONFIG[signal.type] || SIGNAL_TYPE_CONFIG.whale

  return (
    <div className={`${styles.signalItem} ${signal.isNew ? styles.signalNew : ''}`}>
      <div
        className={styles.typeBadge}
        style={{ color: cfg.color, background: cfg.bg, borderColor: cfg.border }}
      >
        {cfg.icon} {cfg.label}
      </div>
      <div className={styles.signalBody}>
        <div
          className={styles.signalText}
          dangerouslySetInnerHTML={{ __html: signal.text }}
        />
        <div className={styles.signalMeta}>
          <span className={styles.chain}>{signal.chain}</span>
          <span className={styles.time}>{signal.time}</span>
          <div className={styles.tags}>
            {signal.tags.map(tag => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.signalRight}>
        <div className={styles.sigScore}>{signal.signal}</div>
        <div className={styles.sigLabel}>Signal</div>
      </div>
    </div>
  )
}

function AlertLevelCard({ signals }) {
  const whaleCount = signals.filter(s => s.type === 'whale').length
  return (
    <div className={styles.sideCard}>
      <div className={styles.cardLabel}>Alert Level</div>
      <div className={styles.alertLevel}>
        <div className={styles.alertRing}>
          <div className={styles.alertNum}>7</div>
        </div>
        <div className={styles.alertTxt}>
          <b>Elevated</b>
          <span>Whale activity +240% above 7-day baseline</span>
        </div>
      </div>
    </div>
  )
}

function TrendingCard() {
  return (
    <div className={styles.sideCard}>
      <div className={styles.cardLabel}>Trending Narratives</div>
      {TRENDING.map(t => (
        <div key={t.name} className={styles.trendRow}>
          <span className={styles.trendName}>{t.name}</span>
          <span className={styles.trendPct} style={{ color: t.up ? 'var(--green)' : 'var(--red)' }}>
            {t.up ? '▲' : '▼'} {t.pct}
          </span>
        </div>
      ))}
    </div>
  )
}
