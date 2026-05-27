'use client'

/**
 * components/cta/CtaSection.jsx
 *
 * The aurora parallax originally used:
 *   ctaSection.addEventListener('mousemove', e => {
 *     auroraLayers.forEach((l, i) => {
 *       l.style.transform = `translate(${x*d}px, ${y*d*.6}px) scale(1)`
 *     })
 *   })
 *
 * New approach: mousemove → state (x, y) → CSS custom properties on each layer.
 * The layers read --dx and --dy via inline style and compute their offset.
 * This is more declarative and avoids querySelectorAll.
 */

import { useState, useCallback } from 'react'
import styles from './CtaSection.module.css'

const CTA_CHIPS = [
  { label: 'System Online',    color: 'var(--green)'  },
  { label: '247K Signals Today', color: 'var(--neon)' },
  { label: 'AI Confidence 94%', color: 'var(--purple)'},
  { label: '12 Chains Live',   color: 'var(--accent)' },
]

const AURORA_LAYERS = [1, 2, 3, 4]

export default function CtaSection() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [active, setActive] = useState(false)

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMouse({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    })
    setActive(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setMouse({ x: 0, y: 0 })
    setActive(false)
  }, [])

  return (
    <div
      id="cta"
      className={styles.cta}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Aurora layers with parallax */}
      <div className={styles.aurora} aria-hidden="true">
        {AURORA_LAYERS.map(i => {
          const depth = i * 16
          const transform = active
            ? `translate(${mouse.x * depth}px, ${mouse.y * depth * 0.6}px) scale(1)`
            : ''
          return (
            <div
              key={i}
              className={`${styles.al} ${styles[`al${i}`]}`}
              style={{ transform }}
            />
          )
        })}
      </div>

      <div className={styles.scanlines}   aria-hidden="true" />
      <div className={styles.gridBg}      aria-hidden="true" />
      <div className={styles.vignette}    aria-hidden="true" />
      <div className={styles.edgeLine}    aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.eyebrow}>
          <div className={styles.eyDot} />
          <span className={styles.eyLine} />
          The Network is Live
          <span className={styles.eyLine} />
          <div className={styles.eyDot} />
        </div>

        <div className={styles.heading}>
          The Future Leaves Clues.
          <span className={styles.grad}>Nexus Finds Them First.</span>
        </div>

        <div className={styles.sub}>
          Join 14,000+ analysts, traders, and founders who see the signal before the noise.
        </div>

        <div className={styles.chips}>
          {CTA_CHIPS.map(chip => (
            <div key={chip.label} className={styles.chip}>
              <div className={styles.chipDot} style={{ background: chip.color, boxShadow: `0 0 5px ${chip.color}` }} />
              {chip.label}
            </div>
          ))}
        </div>

        <div className={styles.btns}>
          <div className={styles.btnWrap}>
            <div className={styles.btnRing} />
            <button className={styles.btn}>
              Enter The Network <span className={styles.btnArrow}>↗</span>
            </button>
          </div>
          <div className={styles.secLink}>
            View Live Signals →
          </div>
        </div>
      </div>
    </div>
  )
}
