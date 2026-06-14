import { useState, useEffect } from 'react'
import './SideNav.css'

export default function SideNav({ items }) {
  const [active, setActive] = useState(items[0]?.id)

  useEffect(() => {
    const observers = items.map(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { threshold: 0.4 }
      )
      observer.observe(el)
      return observer
    })

    return () => observers.forEach((o) => o?.disconnect())
  }, [items])

  function scrollTo(id) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="side-nav" aria-label="Section navigation">
      <ul className="side-nav__list">
{items.map(({ id, label, variant = 'normal' }) => (
          <li key={id} className="side-nav__item">
            <button
              className={`side-nav__dot side-nav__dot--${variant} ${active === id ? 'side-nav__dot--active' : ''}`}
              onClick={() => scrollTo(id)}
              aria-label={`Go to ${label}`}
            >
              <span className="side-nav__label">{label}</span>
              <span className="side-nav__dot-inner" />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
