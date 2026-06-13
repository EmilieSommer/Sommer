import { useRef } from 'react'
import useReveal from '../../hooks/useReveal'
import './Section.css'
import './ExperienceSection.css'

const BASE = import.meta.env.BASE_URL
const S = `${BASE}assets/nykredit/slides/`

const PREVIEW_SLIDES = [
  `${S}nk_rollups.svg`,
  `${S}nk_merchandise.svg`,
  `${S}nk_some.svg`,
  `${S}nk_ui_components.svg`,
  `${S}nk_website_modules.svg`,
]

const TOOLS = ['Figma', 'Adobe Illustrator', 'InDesign', 'Photoshop', 'Frontify', 'Optimizely']

const PREVIOUS_ROLES = [
  {
    company: 'Italic',
    role: 'Intern, Video Game Company',
    period: '2022 - 2023',
    bullets: ['Testing', 'Content creation', 'Unity', 'DaVinci Resolve', 'Idea generation'],
  },
  {
    company: 'Sports Compass',
    role: 'Intern Designer',
    period: '2017 - 2019',
    bullets: ['Social media marketing through design', 'Produced animated films', 'Designed stickers'],
  },
  {
    company: 'Peak Balance',
    role: 'Illustrator',
    period: '2017 - 2018',
    bullets: ['Speed drawings', 'Sketched ideas'],
  },
]

function NykreditShowcaseButton({ onClick }) {
  return (
    <button className="nk-entry" onClick={onClick} aria-label="View Nykredit showcase">
      <div className="nk-entry__previews" aria-hidden="true">
        {PREVIEW_SLIDES.map((src, i) => (
          <div key={src} className="nk-entry__preview" style={{ '--i': i }}>
            <img src={src} alt="" draggable={false} loading="lazy" />
          </div>
        ))}
      </div>
      <div className="nk-entry__overlay" />
      <div className="nk-entry__content">
        <div className="nk-entry__left">
          <span className="nk-entry__eyebrow">13 slide categories</span>
          <h3 className="nk-entry__title">View Nykredit showcase</h3>
        </div>
        <span className="nk-entry__cta">Enter →</span>
      </div>
    </button>
  )
}

export default function ExperienceSection({ onOpenNykredit }) {
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  return (
    <section ref={sectionRef} className="content-section" id="experience">
      <div className="section__inner">
        <span className="section__eyebrow r">02 - Experience</span>
        <h2 className="section__heading r">Nykredit</h2>
        <p className="section__meta r">Student Assistant · Design Team · June 2024 - present</p>

        <p className="exp-desc r">
          I joined Nykredit's in-house design team as a Student Assistant and ended up
          working on almost every format the bank produces: UI components for the public
          website, brand templates and component libraries in Frontify, fact sheets tested
          for accessibility, plus print work ranging from Instagram posts to congress stands
          and beach flags. I was also there during the merger of two Danish banks, which
          meant a lot of careful work keeping the new visual identity consistent across
          the whole Nykredit Group.
        </p>

        <div className="exp-tools r">
          {TOOLS.map(t => <span key={t} className="tag">{t}</span>)}
        </div>

        <div className="r">
          <NykreditShowcaseButton onClick={onOpenNykredit} />
        </div>

        <div className="exp-previous r">
          <span className="exp-previous__label">Previously</span>
          <ul className="exp-previous__list">
            {PREVIOUS_ROLES.map((job) => (
              <li key={job.company} className="exp-previous__item">
                <div className="exp-previous__main">
                  <h3 className="exp-previous__company">{job.company}</h3>
                  <p className="exp-previous__role">{job.role}</p>
                  <p className="exp-previous__bullets">{job.bullets.join(' · ')}</p>
                </div>
                <span className="exp-previous__period">{job.period}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
