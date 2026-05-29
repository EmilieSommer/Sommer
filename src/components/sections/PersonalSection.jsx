import { useState } from 'react'
import Lightbox from '../Lightbox'
import './Section.css'
import './PersonalSection.css'

const BASE = import.meta.env.BASE_URL
const P = `${BASE}assets/personal/`

const PERSONAL_WORKS = [
  { id: 'ikea',           title: 'Assembly Manual',   category: 'Editorial',      src: `${P}editorial_ikea.png` },
  { id: 'three-faces',    title: 'Three Faces',       category: 'Portrait',       src: `${P}art_three_faces.png` },
  { id: 'self-portrait',  title: 'Self Portrait',     category: '3D render',      src: `${P}render_self.png` },
  { id: 'city-sunset',    title: 'City at Sunset',    category: 'Mixed media',    src: `${P}art_city_sunset.png` },
  { id: 'studio',         title: 'Product Studio',    category: '3D render',      src: `${P}render_studio.png` },
  { id: 'action',         title: 'Action',            category: 'Mixed media',    src: `${P}art_action.png` },
  { id: 'algae',          title: 'Algae Cups',        category: 'Product design', src: `${P}concept_algae.png` },
  { id: 'floating',       title: 'Floating',          category: '3D render',      src: `${P}render_floating.png` },
  { id: 'plastycycle',    title: 'Plastycycle',       category: 'Concept design', src: `${P}concept_plastycycle.png` },
  { id: 'warm-strokes',   title: 'Warm Strokes',      category: 'Painting',       src: `${P}art_warm_strokes.png` },
  { id: 'insect-park',    title: 'Insect Park',       category: 'Concept design', src: `${P}concept_insect.png` },
  { id: 'bubbles',        title: 'Bubble Room',       category: '3D render',      src: `${P}render_bubbles.png` },
  { id: 'pink-haze',      title: 'Pink Haze',         category: 'Mixed media',    src: `${P}art_pink_haze.png` },
  { id: 'communal',       title: 'Communal Food',     category: 'Concept design', src: `${P}concept_communal.png` },
  { id: 'octopus',        title: 'Mug Companion',     category: '3D sculpt',      src: `${P}render_octopus.png` },
  { id: 'solo-food',      title: 'Solo Food Box',     category: 'Product design', src: `${P}concept_solo_food.png` },
]

export default function PersonalSection() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  return (
    <section className="content-section" id="personal">
      <div className="section__inner">
        <span className="section__eyebrow">07 — Personal</span>
        <h2 className="section__heading">My own work</h2>
        <p className="section__sub">
          A collection of personal pieces — paintings, mixed media, 3D renders, and
          concept design experiments made outside of school and work.
        </p>

        <div className="personal-grid">
          {PERSONAL_WORKS.map((work, i) => (
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
          images={PERSONAL_WORKS.map(w => ({ src: w.src, alt: w.title }))}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  )
}
