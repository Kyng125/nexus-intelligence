'use client'

/**
 * components/features/FeaturesBentoSection.jsx
 *
 * The original built each bento card by constructing long innerHTML strings
 * with conditional content based on f.extra === 'predict' etc.
 * That's essentially hand-rolling what JSX does — but with no type safety
 * and no component reuse.
 *
 * Here we use a VARIANT pattern: each feature card has a `variant` prop
 * that renders a specific inner component. This is standard React practice
 * for "same frame, different content" situations.
 *
 * The tilt interaction uses our useTiltCard hook — one hook, used
 * for testimonials, ecosystem cards, AND feature cards.
 */

import { useTiltCard } from '../../hooks/useTiltCard'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import styles from './FeaturesBentoSection.module.css'

export default function FeaturesBentoSection({ features }) {
  const [ref, isVisible] = useIntersectionObserver()

  return (
    <div id="features">
      <div ref={ref} className={`${styles.section} ${isVisible ? styles.vis : ''}`}>
        <div className={styles.eyebrow}>
          <span className={styles.eyLine} />
          Platform Capabilities
        </div>
        <div className={styles.title}>
          The Full <span>Intelligence</span> Stack.
        </div>
        <div className={styles.bento}>
          {features.map(f => (
            <FeatureCard key={f.id} feature={f} />
          ))}
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ feature: f }) {
  const { tiltStyle, shinePosition, handlers } = useTiltCard({ maxDeg: 11, scale: 1.014 })

  return (
    <div
      className={`${styles.card} ${styles[`card_${f.variant}`]}`}
      style={{ '--fc': f.edgeGlow, ...tiltStyle }}
      {...handlers}
    >
      <div className={styles.cardBg} style={{ background: f.bg }} />
      <div className={styles.shine} style={shinePosition} />
      <div className={styles.inner}>
        <div className={styles.featureEyebrow} style={{ color: f.color }}>
          <div className={styles.eyDot} style={{ background: f.color, boxShadow: `0 0 5px ${f.color}` }} />
          {f.label}
        </div>
        <div className={styles.featureTitle}>{f.title}</div>
        <div className={styles.featureDesc}>{f.desc}</div>
        <FeatureVariant variant={f.variant} color={f.color} />
      </div>
    </div>
  )
}

/* ── Variant inner content ── */

function FeatureVariant({ variant, color }) {
  switch (variant) {
    case 'predict':   return <PredictVariant color={color} />
    case 'cross':     return <CrossChainVariant color={color} />
    case 'sentiment': return <SentimentVariant color={color} />
    case 'narrative': return <NarrativeVariant color={color} />
    case 'alerts':    return <AlertsVariant color={color} />
    case 'stats':     return <StatsVariant color={color} />
    default:          return null
  }
}

function PredictVariant({ color }) {
  return (
    <>
      <div className={styles.pstatRow}>
        {[
          { v: '91', u: '%', l: 'Accuracy', ch: '▲ +3.2%' },
          { v: '72', u: 'h', l: 'Lookahead' },
          { v: '247', u: '', l: 'Signals' },
        ].map(s => (
          <div key={s.l}>
            <div className={styles.pstatV}>
              {s.v}<span style={{ fontSize: 12, color }}>{s.u}</span>
            </div>
            <div className={styles.pstatL}>{s.l}</div>
            {s.ch && <div className={styles.pstatC}>{s.ch}</div>}
          </div>
        ))}
      </div>
      <div className={styles.predChart}>
        <svg className={styles.predSvg} viewBox="0 0 400 90" preserveAspectRatio="none">
          <defs>
            <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5B8CFF" stopOpacity=".5" />
              <stop offset="100%" stopColor="#5B8CFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path fill="url(#pg)" d="M0,70 L50,60 L100,52 L150,45 L200,50 L250,35 L290,22 L290,90 L0,90Z" opacity=".5"/>
          <path fill="none" stroke="#5B8CFF" strokeWidth="2" strokeLinecap="round" d="M0,70 L50,60 L100,52 L150,45 L200,50 L250,35 L290,22"/>
          <path fill="none" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="6 4" d="M290,22 L330,14 L380,6 L400,3" opacity=".7"/>
          <circle cx="290" cy="22" r="4" fill="#00F0FF" filter="drop-shadow(0 0 4px #00F0FF)"/>
        </svg>
      </div>
    </>
  )
}

function CrossChainVariant() {
  return (
    <>
      <div className={styles.arcFlowWrap}>
        <svg viewBox="0 0 260 110" preserveAspectRatio="xMidYMid meet">
          <circle cx="36" cy="82" r="9" fill="rgba(98,126,234,.2)" stroke="#627EEA" strokeWidth="1.5"/>
          <text x="36" y="86" textAnchor="middle" fontSize="7" fill="#627EEA" fontFamily="IBM Plex Mono">ETH</text>
          <circle cx="120" cy="28" r="9" fill="rgba(0,240,255,.15)" stroke="#00F0FF" strokeWidth="1.5"/>
          <text x="120" y="32" textAnchor="middle" fontSize="7" fill="#00F0FF" fontFamily="IBM Plex Mono">BASE</text>
          <circle cx="210" cy="70" r="9" fill="rgba(40,160,240,.2)" stroke="#28A0F0" strokeWidth="1.5"/>
          <text x="210" y="74" textAnchor="middle" fontSize="7" fill="#28A0F0" fontFamily="IBM Plex Mono">ARB</text>
          <path className={styles.arcP} d="M45,77 Q78,18 111,33" stroke="#627EEA"/>
          <path className={styles.arcP} d="M129,28 Q170,10 201,65" stroke="#00F0FF"/>
          <path className={styles.arcP} d="M45,72 Q130,105 201,73" stroke="#28A0F0"/>
          <circle r="3" fill="#627EEA">
            <animateMotion dur="3s" repeatCount="indefinite" path="M45,77 Q78,18 111,33"/>
          </circle>
          <circle r="3" fill="#00F0FF">
            <animateMotion dur="2.4s" repeatCount="indefinite" path="M129,28 Q170,10 201,65"/>
          </circle>
        </svg>
      </div>
      <div className={styles.flowRow}>
        <div className={styles.flowItem}>
          <div className={styles.flowDot} style={{background:'#627EEA'}}/>
          ETH → Base<span className={styles.flowAmt} style={{color:'#00F0FF'}}>$14.2M</span>
        </div>
        <div className={styles.flowItem}>
          <div className={styles.flowDot} style={{background:'#28A0F0'}}/>
          ETH → Arbitrum<span className={styles.flowAmt} style={{color:'#28A0F0'}}>$8.7M</span>
        </div>
      </div>
    </>
  )
}

function SentimentVariant() {
  const score = 74
  const circumference = 163.4
  const offset = circumference - (score / 100) * circumference

  return (
    <>
      <div className={styles.gaugeWrap}>
        <svg viewBox="0 0 130 76">
          <defs>
            <linearGradient id="gg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#F43F5E"/>
              <stop offset="50%"  stopColor="#FBB224"/>
              <stop offset="100%" stopColor="#22C55E"/>
            </linearGradient>
          </defs>
          <path className={styles.gaugeBase} d="M14,71 A52,52 0 0,1 116,71" strokeDasharray={circumference}/>
          <path
            className={styles.gaugeFill}
            d="M14,71 A52,52 0 0,1 116,71"
            stroke="url(#gg)"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
          <g style={{transform:`rotate(${-90 + (score/100)*180}deg)`, transformOrigin:'65px 71px'}}>
            <line x1="65" y1="71" x2="65" y2="24" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity=".7"/>
            <circle cx="65" cy="71" r="3.5" fill="#fff" opacity=".8"/>
          </g>
        </svg>
      </div>
      <div className={styles.gaugeLbls}>
        <span>Fear</span><span>Neutral</span><span>Greed</span>
      </div>
      <div className={styles.sentScore}>{score} <span>/ 100</span></div>
      <div className={styles.sentTags}>
        {['Greed','Accumulation','Risk-on'].map(t=>(
          <span key={t} className={styles.sentTag}>{t}</span>
        ))}
      </div>
    </>
  )
}

function NarrativeVariant() {
  const rows = [
    { label:'AI × DeFi',   pct:92, grad:'linear-gradient(90deg,#FBB224,#F43F5E)' },
    { label:'RWA Adoption', pct:78, grad:'linear-gradient(90deg,#5B8CFF,#9D4EDD)' },
    { label:'L2 Scaling',   pct:71, grad:'linear-gradient(90deg,#00F0FF,#5B8CFF)' },
  ]
  const tags = [
    { label:'🔥 AI × DeFi',  color:'#FBB224', bg:'rgba(251,178,36,.12)', border:'rgba(251,178,36,.35)' },
    { label:'⚡ Restaking',   color:'#F43F5E', bg:'rgba(244,63,94,.1)',   border:'rgba(244,63,94,.25)'  },
    { label:'✦ RWA',          color:'#22C55E', bg:'rgba(34,197,94,.1)',   border:'rgba(34,197,94,.25)'  },
    { label:'◎ L2 Wars',      color:'#5B8CFF', bg:'rgba(91,140,255,.1)',  border:'rgba(91,140,255,.25)' },
    { label:'◈ DePIN',        color:'#9D4EDD', bg:'rgba(157,78,221,.1)',  border:'rgba(157,78,221,.25)' },
  ]
  return (
    <>
      <div className={styles.nheat}>
        {rows.map(r => (
          <div key={r.label} className={styles.nhRow}>
            {r.label}
            <div className={styles.nhBar}>
              <div className={styles.nhFill} style={{width:`${r.pct}%`, background:r.grad}}/>
            </div>
            <div className={styles.nhPct}>{r.pct}%</div>
          </div>
        ))}
      </div>
      <div className={styles.ntags}>
        {tags.map(t=>(
          <span key={t.label} className={styles.ntag} style={{color:t.color,background:t.bg,borderColor:t.border}}>
            {t.label}
          </span>
        ))}
      </div>
    </>
  )
}

const INITIAL_ALERTS = [
  { cls:'crit', text:'<strong>$14M whale</strong> entered Base — Aerodrome confirmed', time:'2m' },
  { cls:'warn', text:'<strong>Gas spike</strong> — 42 gwei detected', time:'7m' },
  { cls:'info', text:'<strong>AI narrative</strong> score crossed 90', time:'14m' },
]

function AlertsVariant() {
  return (
    <div className={styles.alertList}>
      {INITIAL_ALERTS.map((a, i) => (
        <div key={i} className={styles.alertItem}>
          <div className={`${styles.adot} ${styles[`adot_${a.cls}`]}`} />
          <div className={styles.alertTxt} dangerouslySetInnerHTML={{ __html: a.text }} />
          <div className={styles.alertTime}>{a.time}</div>
        </div>
      ))}
    </div>
  )
}

function StatsVariant() {
  const stats = [
    { label:'Daily Signals', val:'247K',  chg:'▲ +18%'   },
    { label:'Chains Live',   val:'12',    chg:'▲ +2 new'  },
    { label:'Vol Tracked',   val:'$2.4T', chg:'▲ +6.1%'  },
    { label:'AI Accuracy',   val:'94%',   chg:'▲ +0.8%'  },
  ]
  return (
    <div className={styles.statsGrid}>
      {stats.map(s => (
        <div key={s.label} className={styles.statBox}>
          <div className={styles.sbLbl}>{s.label}</div>
          <div className={styles.sbVal}>{s.val}</div>
          <div className={styles.sbChg}>{s.chg}</div>
        </div>
      ))}
    </div>
  )
}
