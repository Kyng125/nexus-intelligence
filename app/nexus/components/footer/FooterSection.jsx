'use client'

/**
 * components/footer/FooterSection.jsx
 *
 * Two interactive pieces:
 *   1. Live UTC clock — setInterval in useEffect, cleaned up on unmount
 *   2. Newsletter — controlled input + form validation with React state
 *
 * The original newsletter used direct style mutation to show error/success:
 *   inp.style.borderColor = 'rgba(244,63,94,.5)'
 *   btn.textContent = '✓ Subscribed'
 *   btn.style.background = 'rgba(34,197,94,.15)'
 *
 * The React pattern: track `submitState` ('idle' | 'error' | 'success')
 * and derive visual styling from that state. Clean, readable, no hidden DOM changes.
 *
 * FUTURE UPGRADE: Replace the newsletter mock with a real API call:
 *   const res = await fetch('/api/newsletter', { method:'POST', body: JSON.stringify({ email }) })
 *   The UI component doesn't need to change at all.
 */

import { useState, useEffect } from 'react'
import styles from './FooterSection.module.css'

const PRODUCT_LINKS = [
  'Signal Feed', 'AI Research', 'Ecosystem Explorer',
  'Whale Tracker', 'Smart Alerts', 'API Access',
]

const COMPANY_LINKS = [
  'About NEXUS', 'Research Blog', 'Careers',
  'Press Kit', 'Partners', 'Status Page',
]

export default function FooterSection() {
  const [clock, setClock] = useState('')
  const [email, setEmail] = useState('')
  const [submitState, setSubmitState] = useState('idle') // 'idle' | 'error' | 'success'

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setClock(
        `© 2026 NEXUS Intelligence Inc. // ` +
        `${String(now.getUTCHours()).padStart(2,'0')}:` +
        `${String(now.getUTCMinutes()).padStart(2,'0')}:` +
        `${String(now.getUTCSeconds()).padStart(2,'0')} UTC`
      )
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleSubscribe = () => {
    if (!email.trim() || !email.includes('@')) {
      setSubmitState('error')
      setTimeout(() => setSubmitState('idle'), 1400)
      return
    }
    setSubmitState('success')
    setEmail('')
    setTimeout(() => setSubmitState('idle'), 3500)
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}    aria-hidden="true" />
      <div className={styles.topGlow}       aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.top}>

          {/* Brand column */}
          <div>
            <div className={styles.logo}>
              <div className={styles.logoDot} />
              NEXUS <em>{'//'}</em>
            </div>
            <div className={styles.desc}>
              Real-time Web3 intelligence for the next digital economy.
              Track signals before the world notices.
            </div>
            <div className={styles.social}>
              {['𝕏','⌘','◎','✈','◈'].map((icon, i) => (
                <button key={i} className={styles.socBtn}>{icon}</button>
              ))}
            </div>
          </div>

          {/* Product links */}
          <div>
            <div className={styles.colTitle}>Product</div>
            <div className={styles.links}>
              {PRODUCT_LINKS.map(l => (
                <div key={l} className={styles.link}>
                  <span className={styles.linkArr}>›</span>{l}
                </div>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div>
            <div className={styles.colTitle}>Company</div>
            <div className={styles.links}>
              {COMPANY_LINKS.map(l => (
                <div key={l} className={styles.link}>
                  <span className={styles.linkArr}>›</span>{l}
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <div className={styles.colTitle}>Intelligence Briefing</div>
            <div className={styles.nlDesc}>
              Weekly signal digest — the 5 most important on-chain movements, curated by NEXUS AI.
            </div>
            <input
              className={`${styles.nlInput} ${submitState === 'error' ? styles.nlInputError : ''}`}
              type="email"
              placeholder={submitState === 'success' ? 'Welcome to the network.' : 'your@email.com'}
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
            />
            <button
              className={`${styles.nlBtn} ${submitState === 'success' ? styles.nlBtnSuccess : ''}`}
              onClick={handleSubscribe}
            >
              {submitState === 'success' ? '✓ Subscribed' : 'Subscribe to Signals'}
            </button>
            <div className={styles.nlNote}>No spam · Unsubscribe anytime</div>
          </div>

        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <div className={styles.copy}>{clock}</div>
          <div className={styles.legal}>
            {['Privacy','Terms','Cookies','Docs'].map(l => (
              <div key={l} className={styles.legalLink}>{l}</div>
            ))}
          </div>
          <div className={styles.status}>
            <div className={styles.statusDot} />
            <div className={styles.statusTxt}>All Systems Operational</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
