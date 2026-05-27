'use client'

import { useState } from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import styles from './EcosystemSection.module.css'

export default function EcosystemSection({ chains }) {
  const [ref, isVisible] = useIntersectionObserver()

  return (
    <div id="ecosystems">
      <div ref={ref} className={`${styles.section} ${isVisible ? styles.vis : ''}`}>
        <div className={styles.eyebrow}>
          <span className={styles.eyLine} />
          Ecosystem Explorer
        </div>
        <div className={styles.sectionHead}>
          <div className={styles.title}>
            Multi-chain <span>Intelligence</span>
          </div>
          <div className={styles.sub}>Hover any chain to reveal deep signal metrics.</div>
        </div>
        <div className={styles.bento}>
          {chains.map(chain => (
            <ChainCard key={chain.id} chain={chain} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ChainCard({ chain }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`${styles.card} ${hovered ? styles.cardHovered : ''}`}
      style={{ '--ec': chain.edgeColor, '--eg': chain.glowColor }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.cardBg} style={{ background: chain.bg }} />

      {/* Default face */}
      <div className={`${styles.face} ${hovered ? styles.faceHidden : ''}`}>
        <div
          className={styles.logo}
          style={{ color: chain.logoColor, background: chain.logoBg }}
        >
          {chain.logo}
        </div>
        <div className={styles.chainName}>{chain.name}</div>
        <div className={styles.chainTag}>{chain.tag}</div>
        <div className={styles.statsGrid}>
          {chain.stats.map(s => (
            <div key={s.label} className={styles.stat}>
              <div className={styles.statVal}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Hover deep-signal overlay */}
      <div className={`${styles.overlay} ${hovered ? styles.overlayVisible : ''}`}>
        <div className={styles.overlayTitle}>{chain.hidden.title}</div>
        <div className={styles.overlayBadge}>{chain.hidden.badge}</div>
        <div className={styles.overlayItems}>
          {chain.hidden.items.map(item => (
            <div key={item.label} className={styles.overlayItem}>
              <div>
                <div className={styles.overlayItemVal}>{item.value}</div>
                <div className={styles.overlayItemLabel}>{item.label}</div>
              </div>
              <div className={styles.overlayItemSub}>{item.sub}</div>
            </div>
          ))}
        </div>
        {chain.hidden.bars.map(bar => (
          <div key={bar.label} className={styles.barRow}>
            <div className={styles.barLabel}>{bar.label}</div>
            <div className={styles.barTrack}>
              <div
                className={styles.barFill}
                style={{ width: `${bar.pct}%`, background: bar.color + '80' }}
              />
            </div>
            <div className={styles.barPct}>{bar.pct}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}
