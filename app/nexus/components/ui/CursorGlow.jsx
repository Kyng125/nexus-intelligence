'use client'

/**
 * components/ui/CursorGlow.jsx
 *
 * WHY "use client"?
 * This component needs to:
 *   1. Listen to mousemove events → browser-only
 *   2. Update position state → useState
 *   3. Read window.innerWidth etc. → browser-only API
 *
 * It's "use client" because of these browser dependencies.
 * It's a LEAF component — it renders nothing that other components
 * need to build on top of, making it safe to isolate as client-only.
 *
 * WHAT CHANGED FROM THE ORIGINAL:
 * Old:
 *   const cg = document.getElementById('cursor-glow')
 *   document.addEventListener('mousemove', e => {
 *     cg.style.left = e.clientX + 'px'
 *     cg.style.top  = e.clientY + 'px'
 *     cg.style.opacity = '1'
 *   })
 *
 * New:
 *   - Position stored in React state (x, y, visible)
 *   - Event listener registered in useEffect (with cleanup)
 *   - Position applied via style prop (declarative, not imperative)
 *   - No getElementById needed — React renders the element itself
 */

import { useState, useEffect } from 'react'
import styles from './CursorGlow.module.css'

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0, visible: false })

  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY, visible: true })
    const onLeave = () => setPos(p => ({ ...p, visible: false }))

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      className={styles.cursorGlow}
      aria-hidden="true"
      style={{
        left: pos.x,
        top: pos.y,
        opacity: pos.visible ? 1 : 0,
      }}
    />
  )
}
