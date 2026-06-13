import './ProjectTeaser.css'

const BASE = import.meta.env.BASE_URL
const P = `${BASE}assets/projects/`
const C = `${BASE}assets/nykredit/cases/`

const TILES = [
  { kind: 'video', src: `${P}liv_bg.mp4`,                title: 'Liv',                  target: 'projects' },
  { kind: 'image', src: `${C}rollups/Page 1.png`,       title: 'Roll-ups',             target: 'experience' },
  { kind: 'video', src: `${P}floop_bg.mp4`,             title: 'Floop VR',              target: 'projects' },
  { kind: 'video', src: `${P}asymetric_bg.mp4`,         title: 'Asymetric Cinema',      target: 'projects' },
  { kind: 'image', src: `${C}merchandise/Image 1.png`,  title: 'Branded merchandise',   target: 'experience' },
  { kind: 'video', src: `${P}veil_bg.mp4`,              title: 'Veil of Fear',          target: 'projects' },
  { kind: 'video', src: `${P}torsken_bg.mp4`,           title: 'Torsken ringer',        target: 'projects' },
  { kind: 'image', src: `${C}image_library/Frame 5601.png`, title: 'Image library',     target: 'experience' },
]

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function ProjectTeaser() {
  // Duplicate the tiles once so the marquee can loop seamlessly
  const items = [...TILES, ...TILES]

  return (
    <section className="teaser" aria-label="Featured work">
      <div className="teaser__header">
        <span className="teaser__eyebrow">Featured work</span>
        <span className="teaser__hint">Drag or hover to pause · click to jump</span>
      </div>

      <div className="teaser__viewport">
        <div className="teaser__track">
          {items.map((tile, i) => (
            <button
              key={`${tile.title}-${i}`}
              className="teaser__tile"
              onClick={() => scrollTo(tile.target)}
              aria-label={`Jump to ${tile.title}`}
            >
              {tile.kind === 'video' ? (
                <video src={tile.src} autoPlay muted loop playsInline />
              ) : (
                <img src={tile.src} alt={tile.title} draggable={false} />
              )}
              <span className="teaser__tile-label">{tile.title}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
