'use client'

/**
 * hooks/useNexusScroll.js
 *
 * WHY A CUSTOM HOOK?
 *
 * In the original HTML, scroll behavior was handled by raw event listeners
 * scattered across the script block:
 *
 *   window.addEventListener('scroll', () => {
 *     nav.classList.toggle('scrolled', window.scrollY > 40)
 *   })
 *
 * Problems with that approach:
 *   1. The event listener is never cleaned up (memory leak)
 *   2. It runs whether or not the component is visible
 *   3. Accessing `window` fails on the server (Next.js SSR)
 *   4. Logic is duplicated every time you need scroll state
 *
 * A custom hook solves all four:
 *   1. useEffect cleanup function removes the listener on unmount
 *   2. Only runs when the hook is used inside a mounted component
 *   3. The 'use client' directive ensures this never runs on the server
 *   4. Any component that needs scroll position just calls this hook
 *
 * WHY "passive: true"?
 * Passive scroll listeners tell the browser "I won't call preventDefault()".
 * This lets the browser optimize scrolling — never blocking the main thread.
 */

import { useState, useEffect } from 'react'

/**
 * Returns the current scroll Y position and a boolean for "has scrolled past threshold"
 * @param {number} threshold - px from top to trigger "scrolled" state
 */
export function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrollY(y)
      setScrolled(y > threshold)
    }

    // Add listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    // CRITICAL: cleanup on unmount — prevents memory leaks
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return { scrolled, scrollY }
}

/**
 * Returns scroll progress through a ref'd element (0–1)
 * Used by the timeline spine animation.
 * @param {React.RefObject} ref - ref to the element to track
 */
export function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const pct = Math.max(
        0,
        Math.min(1, (-rect.top / (rect.height - window.innerHeight)))
      )
      setProgress(pct)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [ref])

  return progress
}
