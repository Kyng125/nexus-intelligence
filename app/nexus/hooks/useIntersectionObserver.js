'use client'

/**
 * hooks/useIntersectionObserver.js
 *
 * WHY THIS HOOK?
 *
 * The original HTML used IntersectionObserver in 4 separate places:
 *   - Global reveal: document.querySelectorAll('.reveal').forEach(el => revObs.observe(el))
 *   - Timeline eras: document.querySelectorAll('.tl-era').forEach(e => tlObs.observe(e))
 *   - Testimonial cards: document.querySelectorAll('.holo-card').forEach(c => holoObs.observe(c))
 *
 * Each one:
 *   1. Queried the DOM with querySelector (no type safety, breaks if IDs change)
 *   2. Created a new observer object every time
 *   3. Had no cleanup — observers kept watching DOM nodes even after page changes
 *
 * The React pattern is:
 *   1. Attach a ref to the element
 *   2. Pass that ref to this hook
 *   3. Hook returns `isVisible` boolean
 *   4. Component uses `isVisible` to toggle a CSS class or style
 *
 * The hook handles all cleanup automatically via useEffect's return function.
 */

import { useState, useEffect, useRef } from 'react'

/**
 * Returns [ref, isVisible] — attach ref to an element to observe it.
 * @param {IntersectionObserverInit} options
 */
export function useIntersectionObserver(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        // Once visible, unobserve — we don't need to keep watching
        observer.unobserve(element)
      }
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px',
      ...options,
    })

    observer.observe(element)

    // Cleanup: disconnect observer when component unmounts
    return () => observer.disconnect()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return [ref, isVisible]
}

/**
 * Returns a ref and a progress value (0-1) for scroll-based animations
 * Used by the timeline to animate the spine line.
 */
export function useScrollVisibility(threshold = 0.25) {
  return useIntersectionObserver({ threshold })
}
