'use client'

/**
 * components/ticker/TickerSection.jsx
 *
 * WHAT CHANGED:
 * Old: document.createElement('div') in a loop + appendChild
 * New: {data.map(item => <TickerItem key={...} />)}
 *
 * WHY MAP INSTEAD OF FOREACH + APPENDCHILD?
 * React's map pattern is:
 *   - Declarative: you describe WHAT to render, not HOW to insert it
 *   - Keyed: React can efficiently update only changed items (not full re-render)
 *   - Pure: no side effects — the same data always produces the same output
 *
 * The ticker duplication (original did [...TICKER_DATA, ...TICKER_DATA]) is
 * preserved for the CSS marquee animation. We do it in JSX.
 */

import { useState, useEffect } from 'react'
import styles from './TickerSection.module.css'

export default function TickerSection({ data }) {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(
        `${String(now.getUTCHours()).padStart(2, '0')}:` +
        `${String(now.getUTCMinutes()).padStart(2, '0')}:` +
        `${String(now.getUTCSeconds()).padStart(2, '0')} UTC`
      )
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  // Duplicate for seamless marquee loop
  const doubled = [...data, ...data]

  return (
    <div className={styles.tickerSection} id="markets">
      <div className={styles.fadeLeft}  aria-hidden="true" />
      <div className={styles.fadeRight} aria-hidden="true" />

      <div className={styles.badge}>
        <div className={styles.badgeDot} />
        <span className={styles.badgeTxt}>Live</span>
      </div>

      <div className={styles.tickerWrap}>
        <div className={styles.tickerTrack}>
          {doubled.map((item, i) => {
            if (item.type === 'div') {
              return <div key={i} className={styles.divider} />
            }
            return (
              <div key={i} className={styles.item}>
                <div className={styles.icon} style={{ color: item.color || 'var(--muted)' }}>
                  {item.icon}
                </div>
                <div className={styles.body}>
                  <div className={styles.name}>{item.name}</div>
                  <div className={styles.val}>{item.val}</div>
                </div>
                <div className={`${styles.chg} ${styles[`dir_${item.dir}`]}`}>
                  {item.dir === 'up' ? '▲ ' : item.dir === 'dn' ? '▼ ' : ''}
                  {item.chg}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className={styles.ctx}>
        <div className={styles.ctxStats}>
          <div className={styles.ctxStat}><b>MCap</b>$2.41T</div>
          <div className={styles.ctxDivl} />
          <div className={styles.ctxStat}><b>24h Vol</b>$94.8B</div>
          <div className={styles.ctxDivl} />
          <div className={styles.ctxStat}><b>BTC Dom</b><b style={{color:'#F7931A'}}>51.3%</b></div>
          <div className={styles.ctxDivl} />
          <div className={styles.ctxStat}><b>Signals</b><b style={{color:'var(--neon)'}}>247 active</b></div>
        </div>
        <div className={styles.time}>{time}</div>
      </div>
    </div>
  )
}
