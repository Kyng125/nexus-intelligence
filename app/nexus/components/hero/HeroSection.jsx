'use client'

/**
 * components/hero/HeroSection.jsx
 *
 * THE BIGGEST MIGRATION CHALLENGE:
 * The hero has a Three.js canvas (the animated orb). In the original,
 * Three.js was loaded via a CDN <script> tag and then immediately used.
 *
 * In Next.js, CDN scripts don't work like that — you need to either:
 *   A) Use React Three Fiber (R3F) — the React-native way to use Three.js
 *   B) Use the vanilla Three.js package with useEffect + dynamic import
 *
 * We use OPTION B for minimal disruption — the orb logic is nearly
 * identical to the original, just wrapped in useEffect so it runs
 * CLIENT-SIDE ONLY, after the DOM is ready.
 *
 * We use next/dynamic to import the OrbCanvas component with 
 * ssr: false — this means Next.js won't try to run Three.js on the server.
 * Three.js uses window, document, WebGL — all browser-only APIs.
 *
 * WHAT IS dynamic()?
 * next/dynamic is like React.lazy() but with server-awareness.
 * `ssr: false` tells Next.js: "don't try to render this during SSR."
 * This prevents hydration errors from Three.js touching browser APIs.
 */

import dynamic from 'next/dynamic'
import styles from './HeroSection.module.css'

// This import is deferred until the client — Three.js never runs on server
const OrbCanvas = dynamic(() => import('./OrbCanvas'), { ssr: false })

const STATS = [
  { val: '$2.4', unit: 'T', label: 'Volume Tracked' },
  { val: '12',   unit: '+', label: 'Chains Live'    },
  { val: '247',  unit: 'K', label: 'Signals / Day'  },
  { val: '94',   unit: '%', label: 'AI Accuracy'     },
]

export default function HeroSection() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.heroInner}>
        {/* Left: Text content */}
        <div className={styles.heroLeft}>
          <div className={styles.eyebrow}>
            <div className={styles.eyDot} />
            <span className={styles.eyLine} />
            Web3 Intelligence Platform
          </div>

          <h1 className={styles.h1}>
            Track the <span className={styles.grad}>Signals</span><br />
            Before the World<br />
            Notices.
          </h1>

          <p className={styles.sub}>
            Real-time intelligence for the next digital economy. Whale tracking,
            narrative detection, and AI-powered research — all in one cinematic interface.
          </p>

          <div className={styles.actions}>
            <button className={styles.btnPrimary}>
              Enter The Network <span className={styles.arrow}>↗</span>
            </button>
            <button className={styles.btnGhost}>
              View Live Signals <span className={styles.arrow}>→</span>
            </button>
          </div>

          <div className={styles.statsRow}>
            {STATS.map(s => (
              <div key={s.label}>
                <div className={styles.statVal}>
                  {s.val}<span>{s.unit}</span>
                </div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: 3D Orb + float cards */}
        <div className={styles.heroRight}>
          <div className={styles.orbGlowOuter} />
          <OrbCanvas />
          <FloatCards />
        </div>
      </div>

      <ScrollCue />
    </section>
  )
}

function FloatCards() {
  return (
    <>
      <div className={`${styles.fc} ${styles.fc1}`}>
        <div className={styles.fcLabel}>Bitcoin</div>
        <div className={styles.fcVal}>$67,420 <span>▲ 2.4%</span></div>
        <SparkLine color="#00F0FF" />
        <div className={styles.fcLive}><div className={styles.fcLiveDot} />Live</div>
      </div>

      <div className={`${styles.fc} ${styles.fc2}`}>
        <div className={styles.fcLabel}>Whale Alert</div>
        <div className={styles.fcValNeon}>$14M moved</div>
        <div className={styles.fcSub}>Base → Arbitrum</div>
        <div className={styles.fcTime}>2 mins ago</div>
      </div>

      <div className={`${styles.fc} ${styles.fc3}`}>
        <div className={styles.fcLabel}>AI Narrative Score</div>
        <div className={styles.fcVal}>84.7 <span style={{ color: 'var(--purple)' }}>Neural</span></div>
        <SparkLine color="#9D4EDD" />
      </div>

      <div className={`${styles.fc} ${styles.fc4}`}>
        <div className={styles.fcLabel}>Gas Tracker</div>
        <div className={styles.fcValSm}>18 <span className={styles.fcGwei}>gwei</span></div>
        <div className={styles.fcGood}>▼ Low — ideal</div>
      </div>
    </>
  )
}

// Sparkline bars rendered as JSX instead of imperative DOM manipulation
const SPARK_VALS = [40, 55, 35, 70, 50, 80, 60, 90, 75, 100]
function SparkLine({ color }) {
  return (
    <div className={styles.sparkLine}>
      {SPARK_VALS.map((v, i) => (
        <div
          key={i}
          className={styles.sparkBar}
          style={{
            height: `${v}%`,
            background: i === SPARK_VALS.length - 1 ? color : `${color}60`,
          }}
        />
      ))}
    </div>
  )
}

function ScrollCue() {
  return (
    <div className={styles.scrollCue}>
      <div className={styles.scrollTxt}>Scroll</div>
      <div className={styles.scrollTrack} />
    </div>
  )
}
