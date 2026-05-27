'use client'

import { useRef } from 'react'
import { useTiltCard } from '../../hooks/useTiltCard'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { useScrollProgress } from '../../hooks/useNexusScroll'
import styles from './TimelineSection.module.css'

/**
 * components/timeline/TimelineSection.jsx
 *
 * SCROLL PROGRESS + INTERSECTION OBSERVER COMBINATION:
 *
 * The timeline has two separate animation systems:
 *   1. The spine line that grows as you scroll through the section
 *      → useScrollProgress(sectionRef) — returns 0-1 progress value
 *   2. Each era card that fades in when it enters the viewport
 *      → useIntersectionObserver on each EraCard
 *
 * In the original: two separate event listeners + querySelector loops.
 * Here: composable hooks that each own one concern.
 */

export default function TimelineSection({ eras }) {
  const sectionRef = useRef(null)
  const spineProgress = useScrollProgress(sectionRef)

  return (
    <div id="timeline" ref={sectionRef} className={styles.wrapper}>
      <div className={styles.section}>
        <div className={styles.eyebrow}>
          <span className={styles.eyLine} />
          The Arc of History
        </div>
        <div className={styles.title}>
          Understanding the <span>Cycle.</span>
        </div>

        <div className={styles.tlWrap}>
          {/* Vertical spine */}
          <div className={styles.spineLine}>
            <div
              className={styles.spineFill}
              style={{ height: `${spineProgress * 100}%` }}
            />
          </div>

          {/* Era cards */}
          <div className={styles.eras}>
            {eras.map((era, i) => (
              <EraCard key={era.id} era={era} isEven={i % 2 === 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function EraCard({ era, isEven }) {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.25, rootMargin: '-8% 0px -8% 0px' })
  const { tiltStyle, handlers } = useTiltCard({ maxDeg: 5, scale: 1 })

  const content = (
    <div className={styles.content}>
      <div
        className={`${styles.card} ${isVisible ? styles.cardLit : ''}`}
        style={tiltStyle}
        {...handlers}
      >
        <div className={styles.badge} style={{ color: era.edgeColor }}>
          {era.icon} {era.badge}
        </div>
        <div className={styles.eraName}>{era.name}</div>
        <div className={styles.eraDesc}>{era.desc}</div>
        <div className={styles.stats}>
          {era.stats.map(s => (
            <span key={s} className={styles.stat}>{s}</span>
          ))}
        </div>
        <div className={styles.events}>
          {era.events.map(ev => (
            <div key={ev} className={styles.event}>
              <div className={styles.eventDot} style={{ background: era.edgeColor }} />
              {ev}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const node = (
    <div className={styles.nodeCol}>
      <div className={`${styles.node} ${isVisible ? styles.nodeLit : ''}`}
           style={{ borderColor: isVisible ? era.edgeColor : undefined, boxShadow: isVisible ? `0 0 20px ${era.edgeColor}40` : undefined }}>
        {era.icon}
      </div>
      <div className={styles.year} style={{ color: isVisible ? era.edgeColor : undefined }}>{era.year}</div>
    </div>
  )

  const empty = <div className={styles.empty} />

  return (
    <div
      ref={ref}
      className={`${styles.era} ${isEven ? styles.eraEven : ''} ${isVisible ? styles.eraLit : ''}`}
    >
      {isEven ? <>{empty}{node}{content}</> : <>{content}{node}{empty}</>}
    </div>
  )
}
