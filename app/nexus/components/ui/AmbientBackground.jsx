/**
 * components/ui/AmbientBackground.jsx
 *
 * WHY A SERVER COMPONENT?
 * This renders purely decorative elements with zero interactivity.
 * No state, no events, no browser APIs. It's safe to render on the server
 * and ship as static HTML — the browser doesn't need to download any JS for this.
 *
 * WHY NOT INLINE STYLES?
 * The styles are in globals.css. Static decorative elements are exactly
 * what CSS is designed to handle — no need for JS-in-CSS here.
 *
 * NOTE: cursor-glow IS interactive (follows mouse), so it's a separate
 * client component: CursorGlow.jsx
 */

import CursorGlow from './CursorGlow'
import styles from './AmbientBackground.module.css'

export default function AmbientBackground() {
  return (
    <>
      <div className={styles.globalAmbient} aria-hidden="true" />
      <div className={styles.globalGrid}    aria-hidden="true" />
      <CursorGlow />
    </>
  )
}
