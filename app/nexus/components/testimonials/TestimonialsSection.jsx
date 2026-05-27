'use client'

import { useTiltCard } from '../../hooks/useTiltCard'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import styles from './TestimonialsSection.module.css'

export default function TestimonialsSection({ testimonials }) {
  const [ref, isVisible] = useIntersectionObserver()

  return (
    <div id="testimonials">
      <div ref={ref} className={`${styles.section} ${isVisible ? styles.vis : ''}`}>
        <div className={styles.eyebrow}>
          <span className={styles.eyLine} />
          Trusted by the Network
        </div>
        <div className={styles.title}>
          What the <span>Operators</span> Say.
        </div>

        <div className={styles.grid}>
          {testimonials.map(t => (
            <TestiCard key={t.id} t={t} />
          ))}
        </div>

        <div className={styles.strip}>
          {[
            { val: '14K+', label: 'Active Users' },
            { val: '4.9',  label: 'Avg Rating'   },
            { val: '$2.4T',label: 'Vol Tracked'   },
            { val: '247K', label: 'Signals/Day'   },
            { val: '94%',  label: 'Accuracy'      },
          ].map(s => (
            <div key={s.label} className={styles.stripStat}>
              <div className={styles.stripVal}>{s.val}</div>
              <div className={styles.stripLbl}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TestiCard({ t }) {
  const { tiltStyle, shinePosition, handlers } = useTiltCard({ maxDeg: 9, scale: 1.016 })

  return (
    <div
      className={styles.card}
      style={{ '--hc': t.glowColor, '--hd': t.delay, ...tiltStyle }}
      {...handlers}
    >
      <div className={styles.shimmer} />
      <div className={styles.shine} style={shinePosition} />

      <div className={styles.top}>
        <div className={styles.profWrap}>
          <div className={styles.profRingO} />
          <div
            className={styles.profRingI}
            style={{
              background: `linear-gradient(135deg, ${t.ringColors.from}, ${t.ringColors.to})`,
              boxShadow: `0 0 14px ${t.ringColors.from}60`,
            }}
          />
          <div className={styles.profAv} style={{ background: t.avatarGradient }}>
            {t.initials}
          </div>
        </div>
        <div className={styles.identity}>
          <div className={styles.name}>{t.name}</div>
          <div className={styles.role}>{t.role}</div>
        </div>
        <div className={styles.verified}>✓</div>
      </div>

      <div className={styles.stars}>
        {'★★★★★'.split('').map((s, i) => (
          <span key={i} className={styles.star}>{s}</span>
        ))}
      </div>

      <div className={styles.quote} style={{ '--qc': t.quoteColor }}>
        {t.quote}
      </div>

      <div
        className={styles.feat}
        style={{ color: t.featureColor, background: t.featureBg, borderColor: t.featureBorder }}
      >
        ◈ {t.feature}
      </div>

      <div className={styles.metrics}>
        {t.metrics.map(m => (
          <span key={m} className={styles.metric}>{m}</span>
        ))}
      </div>
    </div>
  )
}
