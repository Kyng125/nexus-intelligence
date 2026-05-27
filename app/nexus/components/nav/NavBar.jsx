'use client'

/**
 * components/nav/NavBar.jsx
 *
 * WHAT CHANGED FROM THE ORIGINAL:
 * Old: window.addEventListener('scroll', () => nav.classList.toggle('scrolled', ...))
 * New: useScrolled hook returns `scrolled` boolean → className is derived from state
 *
 * WHY IS THIS "use client"?
 * The nav needs to know the scroll position — that's a browser-only concept.
 * A server-rendered nav can't know if the user has scrolled.
 *
 * PATTERN TO NOTICE:
 * The nav is "scrolled" when scrollY > 40. That logic lives in the hook,
 * not the component. The component just asks "are we scrolled?" and renders
 * accordingly. This is separation of concerns: hook owns the question,
 * component owns the answer's visual representation.
 */

import { useScrolled } from '../../hooks/useNexusScroll'
import styles from './NavBar.module.css'

const NAV_LINKS = [
  { label: 'Markets',      href: '#markets'      },
  { label: 'Intelligence', href: '#intelligence'  },
  { label: 'Ecosystems',   href: '#ecosystems'    },
  { label: 'Research',     href: '#research'      },
  { label: 'Timeline',     href: '#timeline'      },
]

export default function NavBar() {
  const { scrolled } = useScrolled(40)

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo}>
        <div className={styles.logoDot} />
        NEXUS <em>{'//'}</em>
      </div>

      <div className={styles.links}>
        {NAV_LINKS.map(link => (
          <a key={link.href} className={styles.link} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>

      <div className={styles.right}>
        <div className={styles.livePill}>
          <div className={styles.pillDot} />
          Live
        </div>
        <button className={styles.cta}>Enter Network</button>
      </div>
    </nav>
  )
}
