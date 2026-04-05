import { useState } from 'react'
import './Section.css'
import './AboutSection.css'

const TOOLS = [
  { name: 'Figma',        level: 5 },
  { name: 'Photoshop',    level: 4 },
  { name: 'Illustrator',  level: 3 },
  { name: 'InDesign',     level: 4 },
  { name: 'Optimizely',   level: 3 },
  { name: 'Canva',        level: 4 },
  { name: 'Procreate',    level: 5 },
  { name: 'Unity',        level: 4 },
  { name: 'Blender',      level: 2 },
  { name: 'Nomad Sculpt', level: 5 },
]

const EDUCATION = [
  {
    school: 'Aalborg University',
    degree: 'Bachelor i Medialogi',
    period: '2023 — nu',
    description: 'Medialogi handler om samspillet mellem mennesker og teknologi. Jeg arbejder med interaktionsdesign, UX, prototyping, programmering, spiludvikling og brugertest — en bred og praksisnær uddannelse der kombinerer det visuelle med det funktionelle.',
  },
  {
    school: 'Den Skandinaviske Designhøjskole',
    degree: 'Arkitektur og Bydesign',
    period: '2020 — 2021',
    description: 'Et år med fokus på arkitektur, byrum og designprocesser.',
  },
  {
    school: 'Rysensteen Gymnasium',
    degree: 'Spansk, Drama-linje',
    period: '2016 — 2019',
    description: null,
  },
]

const SKILLS = [
  'Interaction design',
  'UX research',
  'Usability testing',
  'Wireframing & prototyping',
  'Design systems',
  'Visual design',
  'Concept development',
  'Illustration',
  '3D modelling',
]

const MAX = 5

function ToolRow({ name, level }) {
  return (
    <li className="tool-row">
      <span className="tool-row__name">{name}</span>
      <span className="tool-row__dots" aria-label={`${level} out of ${MAX}`}>
        {Array.from({ length: MAX }).map((_, i) => (
          <span key={i} className={`tool-dot ${i < level ? 'tool-dot--filled' : ''}`} />
        ))}
      </span>
    </li>
  )
}

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={`accordion ${open ? 'accordion--open' : ''}`}>
      <button className="accordion__trigger" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="accordion__title">{title}</span>
        <span className="accordion__icon" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      <div className="accordion__body">
        <div className="accordion__content">
          {children}
        </div>
      </div>
    </div>
  )
}

export default function AboutSection() {
  return (
    <section className="content-section" id="about">
      <div className="section__inner">
        <span className="section__eyebrow">01 — About</span>
        <div className="about-grid">

          <div className="about-portrait">
            {/* Replace with <img src="..." alt="Emilie Sommer" /> */}
            <div className="portrait-placeholder" aria-hidden="true" />
          </div>

          <div className="about-text">
            <h2 className="section__heading">About me</h2>
            <p className="about-bio">
              I'm a designer and Medialogi student with a passion for the space where people and technology meet.
              Whether I'm designing interfaces, developing games, or exploring new concepts,
              I bring optimism, curiosity, and a drive to create things that leave a real impression.
            </p>

            <div className="accordion-group">

              <Accordion title="Tools" defaultOpen={true}>
                <ul className="tools-list">
                  {TOOLS.map((tool) => (
                    <ToolRow key={tool.name} {...tool} />
                  ))}
                </ul>
              </Accordion>

              <Accordion title="Skills">
                <ul className="skills-list">
                  {SKILLS.map((skill) => (
                    <li key={skill} className="skill-tag">{skill}</li>
                  ))}
                </ul>
              </Accordion>

              <Accordion title="Education">
                <ul className="education-list">
                  {EDUCATION.map((edu) => (
                    <li key={edu.school} className="education-item">
                      <div className="education-item__header">
                        <span className="education-item__school">{edu.school}</span>
                        <span className="education-item__period">{edu.period}</span>
                      </div>
                      <span className="education-item__degree">{edu.degree}</span>
                      {edu.description && (
                        <p className="education-item__desc">{edu.description}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </Accordion>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
