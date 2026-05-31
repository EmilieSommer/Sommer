import { useRef } from 'react'
import useReveal from '../../hooks/useReveal'
import './Section.css'
import './ExperienceSection.css'

const BASE = import.meta.env.BASE_URL
const S = `${BASE}assets/nykredit/slides/`

const SLIDES = [
  {
    src: `${S}slide_posters.png`,
    bg:  `${S}slide_posters_bg.jpg`,
    label: 'Posters, roll-ups & social media',
    heading: <>Posters, roll-ups<br />and social media</>,
    desc: 'Created posters and large-format roll-ups for events and campaigns, plus social media content for Instagram and internal channels, keeping print and digital visually consistent.',
  },
  {
    src: `${S}slide_branded.png`,
    bg:  `${S}slide_branded_bg.jpg`,
    label: 'Branded merchandise',
    heading: <>Branded<br />merchandise</>,
    desc: 'Prepared production-ready files for a wide range of branded items: jerseys, water bottles, pens, beach flags, congress stands, sponsor checks, and roll-ups.',
  },
  {
    src: `${S}slide_print.png`,
    bg:  `${S}slide_print_bg.jpg`,
    label: 'Print materials & fact sheets',
    heading: <>Print materials and<br />fact sheets</>,
    desc: 'Designed invitations, greeting cards, and fact sheets tested for accessibility. Maintained logo files across every format and built logo libraries used by the whole group.',
  },
  {
    src: `${S}slide_website.png`,
    bg:  `${S}slide_website_bg.jpg`,
    label: 'Website, app & digital assets',
    heading: <>Website, app and<br />digital assets</>,
    desc: 'Designed UI components for the Nykredit website and co-developed a custom iPad app for the design team. Set up templates and component libraries in Optimizely and Frontify, and curated the photography library used across the group.',
  },
  {
    src: `${S}slide_infographics.png`,
    bg:  `${S}slide_infographics_bg.jpg`,
    label: 'Infographics & presentations',
    heading: <>Infographics and<br />presentations</>,
    desc: 'Designed infographics for internal screens like coffee machines and elevator displays, and set up PowerPoint templates used across the group.',
  },
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

function NykreditGallery() {
  return (
    <div className="nk-gallery">
      {SLIDES.map((slide, i) => (
        <div key={slide.label} className="nk-gallery__card">
          <div className="nk-gallery__frame">
            <img className="nk-gallery__bg"    src={slide.bg}  alt="" draggable={false} aria-hidden="true" />
            <img className="nk-gallery__slide" src={slide.src} alt={slide.label} draggable={false} />
            <div className="nk-slide-text">
              <h3 className="nk-slide-text__heading">{slide.heading}</h3>
              <p className="nk-slide-text__desc">{slide.desc}</p>
            </div>
            <div className="nk-gallery__caption">
              <span className="nk-gallery__num">0{i + 1}</span>
              <span className="nk-gallery__name">{slide.label}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ExperienceSection() {
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
          website, a custom iPad app for the design team, brand templates and component
          libraries in Frontify, fact sheets tested for accessibility, plus print work
          ranging from Instagram posts to congress stands and beach flags. I was also
          there during the merger of two Danish banks, which meant a lot of careful work
          keeping the new visual identity consistent across the whole Nykredit Group.
        </p>

        <div className="exp-tools r">
          {TOOLS.map(t => <span key={t} className="tag">{t}</span>)}
        </div>

        <div className="r">
          <NykreditGallery />
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
