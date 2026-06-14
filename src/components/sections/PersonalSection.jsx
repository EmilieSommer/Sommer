import { useState, useEffect } from 'react'
import Lightbox from '../Lightbox'
import './Section.css'
import './PersonalSection.css'
// Bundled fallback for when the API is unavailable (static GitHub Pages build).
import personalData from '../../../server/data/personal.json'

const BASE = import.meta.env.BASE_URL

// Stored paths are relative ("assets/personal/x.png"); prepend the base URL.
const resolveWork = (work) => ({ ...work, src: `${BASE}${work.src}` })

export default function PersonalSection() {
  const [works, setWorks] = useState(() => personalData.map(resolveWork))
  const [lightboxIndex, setLightboxIndex] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/personal')
      .then((res) => {
        if (!res.ok) throw new Error(`API responded ${res.status}`)
        return res.json()
      })
      .then((data) => { if (!cancelled) setWorks(data.map(resolveWork)) })
      .catch(() => { /* keep the bundled fallback data */ })
    return () => { cancelled = true }
  }, [])

  return (
    <section className="content-section" id="personal">
      <div className="section__inner">
        <span className="section__eyebrow">04 - Personal</span>
        <h2 className="section__heading">My own work</h2>
        <p className="section__meta">Paintings · mixed media · 3D renders · concept experiments</p>

        <div className="personal-grid">
          {works.map((work, i) => (
            <button
              key={work.id}
              className="personal-card"
              onClick={() => setLightboxIndex(i)}
              aria-label={`View ${work.title}`}
            >
              <img src={work.src} alt={work.title} draggable={false} />
              <div className="personal-card__overlay">
                <span className="personal-card__category">{work.category}</span>
                <span className="personal-card__title">{work.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={works.map(w => ({ src: w.src, alt: w.title }))}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  )
}
