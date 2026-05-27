'use client'

/**
 * hooks/useTiltCard.js
 *
 * WHY THIS HOOK EXISTS:
 *
 * The original HTML had this pattern repeated 4+ times across the script:
 *
 *   card.addEventListener('mousemove', ev => {
 *     const r = card.getBoundingClientRect()
 *     const x = (ev.clientX - r.left) / r.width
 *     const y = (ev.clientY - r.top) / r.height
 *     card.style.transform = `perspective(900px) rotateX(...) rotateY(...)`
 *   })
 *   card.addEventListener('mouseleave', () => { card.style.transform = '' })
 *
 * This is imperative, DOM-mutating code. In React, we want state-driven
 * rendering: "given THIS state, show THAT UI."
 *
 * This hook:
 *   1. Tracks mouse position as React state
 *   2. Returns transform values that your CSS/JSX can consume declaratively
 *   3. Is reusable across testimonials, ecosystem cards, feature cards
 *   4. Cleans up after itself
 *
 * USAGE:
 *   const { tiltStyle, shineStyle, handlers } = useTiltCard({ maxDeg: 9 })
 *   <div style={tiltStyle} {...handlers}>
 *     <div className="shine" style={shineStyle} />
 *   </div>
 */

import { useState, useCallback } from 'react'

export function useTiltCard({ maxDeg = 9, scale = 1.016 } = {}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false })

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width   // 0 → 1
    const y = (e.clientY - rect.top)  / rect.height   // 0 → 1
    setTilt({ x, y, active: true })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0, active: false })
  }, [])

  // Derive transform string from state — no direct style mutation
  const tiltStyle = tilt.active
    ? {
        transform: `perspective(900px) rotateX(${(tilt.y - 0.5) * -maxDeg}deg) rotateY(${(tilt.x - 0.5) * maxDeg}deg) scale3d(${scale},${scale},${scale})`,
        transition: 'transform 0.05s linear',
      }
    : {
        transform: '',
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
      }

  // Shine layer position — percentage for CSS custom properties
  const shinePosition = {
    '--sx': `${tilt.x * 100}%`,
    '--sy': `${tilt.y * 100}%`,
  }

  return {
    tiltStyle,
    shinePosition,
    isActive: tilt.active,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  }
}
