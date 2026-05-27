'use client'

/**
 * components/ui/PageLoader.jsx
 *
 * WHAT CHANGED:
 * Old: setInterval + direct DOM style mutations (lbar.style.width = lp + '%')
 * New: React state → style prop. The interval is cleaned up on unmount.
 *
 * WHY useState INSTEAD OF useRef FOR lp?
 * Because we need the component to re-render as the progress changes.
 * useRef doesn't trigger re-renders — it's for values you want to persist
 * WITHOUT causing re-renders (like storing a timeout ID).
 */

import { useState, useEffect } from 'react'
import styles from './PageLoader.module.css'

const LOAD_MSGS = [
  'Initialising systems...',
  'Connecting to chain data...',
  'Loading AI engine...',
  'Calibrating signals...',
  'NEXUS online.',
]

export default function PageLoader() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [msgIndex, setMsgIndex] = useState(0)

  useEffect(() => {
    let lp = 0
    const interval = setInterval(() => {
      lp += Math.random() * 18 + 8
      if (lp > 95) lp = 95
      setProgress(lp)
      setMsgIndex(Math.min(Math.floor(lp / 20), LOAD_MSGS.length - 1))
    }, 120)

    const timeout = setTimeout(() => {
      clearInterval(interval)
      setProgress(100)
      setMsgIndex(LOAD_MSGS.length - 1)
      setTimeout(() => setDone(true), 300)
    }, 1800)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  if (done) return null

  return (
    <div className={`${styles.loader} ${done ? styles.done : ''}`}>
      <div className={styles.logo}>NEXUS <em>{'//'}</em></div>
      <div className={styles.barTrack}>
        <div className={styles.barFill} style={{ width: `${progress}%` }} />
      </div>
      <div className={styles.txt}>{LOAD_MSGS[msgIndex]}</div>
    </div>
  )
}
